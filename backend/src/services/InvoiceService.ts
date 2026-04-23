import { Invoice, Client } from '../models/index';
import { IInvoice, InvoiceStatus, InvoiceItem } from '../../shared/types/index';
import { generateInvoiceNumber, calculateDaysOverdue } from '../../shared/utils/index';
import { createTimelineEvent } from '../utils/timeline';
import { EventType } from '../../shared/types/index';

export class InvoiceService {
  async createInvoice(
    userId: string,
    clientId: string,
    amount: number,
    dueDate: Date,
    items: InvoiceItem[],
    notes?: string
  ): Promise<IInvoice> {
    // Get the sequence number for invoice generation
    const invoiceCount = await Invoice.countDocuments({ userId });

    const invoiceNumber = generateInvoiceNumber(userId, invoiceCount + 1);

    const invoice = new Invoice({
      userId,
      clientId,
      invoiceNumber,
      amount,
      dueDate,
      issueDate: new Date(),
      items,
      notes: notes || null,
      status: InvoiceStatus.DRAFT,
    });

    await invoice.save();

    // Create timeline event
    await createTimelineEvent(
      userId,
      EventType.INVOICE_CREATED,
      `Invoice ${invoiceNumber} created`,
      invoice._id,
      clientId
    );

    return invoice;
  }

  async getInvoiceById(invoiceId: string, userId: string): Promise<IInvoice | null> {
    return Invoice.findOne({ _id: invoiceId, userId });
  }

  async getInvoicesByUserId(
    userId: string,
    status?: InvoiceStatus,
    page: number = 1,
    limit: number = 10
  ): Promise<{ invoices: IInvoice[]; total: number }> {
    const skip = (page - 1) * limit;
    const query: any = { userId };

    if (status) {
      query.status = status;
    }

    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('clientId', 'name email');

    const total = await Invoice.countDocuments(query);

    return { invoices, total };
  }

  async getInvoicesByClientId(clientId: string, userId: string): Promise<IInvoice[]> {
    return Invoice.find({ clientId, userId }).sort({ createdAt: -1 });
  }

  async updateInvoice(
    invoiceId: string,
    userId: string,
    updates: Partial<IInvoice>
  ): Promise<IInvoice | null> {
    return Invoice.findOneAndUpdate({ _id: invoiceId, userId }, updates, { new: true });
  }

  async sendInvoice(invoiceId: string, userId: string): Promise<IInvoice | null> {
    const invoice = await this.updateInvoice(invoiceId, userId, { status: InvoiceStatus.SENT });

    if (invoice) {
      await createTimelineEvent(
        userId,
        EventType.INVOICE_SENT,
        `Invoice ${invoice.invoiceNumber} sent to client`,
        invoiceId,
        invoice.clientId
      );
    }

    return invoice;
  }

  async recordPayment(
    invoiceId: string,
    userId: string,
    paidAmount: number
  ): Promise<IInvoice | null> {
    const invoice = await this.getInvoiceById(invoiceId, userId);
    if (!invoice) return null;

    const totalPaid = invoice.paidAmount + paidAmount;
    const newStatus =
      totalPaid >= invoice.amount
        ? InvoiceStatus.PAID
        : InvoiceStatus.PARTIALLY_PAID;

    const updated = await this.updateInvoice(invoiceId, userId, {
      paidAmount: totalPaid,
      status: newStatus,
    });

    if (updated) {
      await createTimelineEvent(
        userId,
        EventType.PAYMENT_RECEIVED,
        `Payment of ${paidAmount} received for invoice ${invoice.invoiceNumber}`,
        invoiceId,
        invoice.clientId,
        { amount: paidAmount, totalPaid }
      );
    }

    return updated;
  }

  async sendReminder(invoiceId: string, userId: string): Promise<IInvoice | null> {
    const invoice = await this.getInvoiceById(invoiceId, userId);
    if (!invoice) return null;

    const updated = await this.updateInvoice(invoiceId, userId, {
      lastReminder: new Date(),
      remindersCount: invoice.remindersCount + 1,
    });

    if (updated) {
      await createTimelineEvent(
        userId,
        EventType.REMINDER_SENT,
        `Reminder sent for invoice ${invoice.invoiceNumber}`,
        invoiceId,
        invoice.clientId
      );
    }

    return updated;
  }

  async getOverdueInvoices(userId: string): Promise<IInvoice[]> {
    const invoices = await Invoice.find({
      userId,
      status: { $ne: InvoiceStatus.PAID, $ne: InvoiceStatus.CANCELLED },
    });

    return invoices.filter((invoice) => calculateDaysOverdue(invoice.dueDate) > 0);
  }

  async getUpcomingDueInvoices(userId: string, daysAhead: number = 7): Promise<IInvoice[]> {
    const now = new Date();
    const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

    return Invoice.find({
      userId,
      status: { $ne: InvoiceStatus.PAID, $ne: InvoiceStatus.CANCELLED },
      dueDate: { $gte: now, $lte: futureDate },
    });
  }
}

export default new InvoiceService();
