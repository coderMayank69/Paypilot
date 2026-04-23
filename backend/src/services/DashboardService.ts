import { Invoice, Client } from '../models/index';
import { InvoiceStatus } from '../../shared/types/index';
import { getRiskSummary } from '../utils/risk';

export class DashboardService {
  async getDashboardMetrics(userId: string) {
    // Get invoice statistics
    const totalInvoices = await Invoice.countDocuments({ userId });
    const paidInvoices = await Invoice.countDocuments({ userId, status: InvoiceStatus.PAID });
    const overduInvoices = await Invoice.countDocuments({
      userId,
      status: { $in: [InvoiceStatus.OVERDUE, InvoiceStatus.PARTIALLY_PAID] },
    });

    // Get financial metrics
    const invoiceData = await Invoice.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalPaid: { $sum: '$paidAmount' },
        },
      },
    ]);

    const totalAmount = invoiceData[0]?.totalAmount || 0;
    const totalPaid = invoiceData[0]?.totalPaid || 0;
    const outstanding = totalAmount - totalPaid;

    // Get client count
    const totalClients = await Client.countDocuments({ userId });

    // Get risk summary
    const riskSummary = await getRiskSummary(userId);

    return {
      summary: {
        totalInvoices,
        paidInvoices,
        overduInvoices,
        totalClients,
      },
      financials: {
        totalAmount,
        totalPaid,
        outstanding,
      },
      risk: riskSummary,
    };
  }

  async getRecentActivity(userId: string, limit: number = 10) {
    // Get recent invoices
    const recentInvoices = await Invoice.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('clientId', 'name email');

    return recentInvoices;
  }

  async getCashflowForecast(userId: string) {
    const invoices = await Invoice.find({
      userId,
      status: { $ne: InvoiceStatus.PAID, $ne: InvoiceStatus.CANCELLED },
    });

    const forecast = [];
    const today = new Date();

    // Next 30 days forecast
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const dueThatDay = invoices
        .filter((invoice) => {
          const dueDate = new Date(invoice.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === date.getTime();
        })
        .reduce((sum, invoice) => sum + (invoice.amount - invoice.paidAmount), 0);

      if (dueThatDay > 0) {
        forecast.push({
          date,
          amount: dueThatDay,
        });
      }
    }

    return forecast;
  }

  async getClientPerformance(userId: string) {
    const clients = await Client.find({ userId }).lean();

    const clientPerformance = await Promise.all(
      clients.map(async (client) => {
        const invoices = await Invoice.find({ clientId: client._id });
        const totalInvoices = invoices.length;
        const paidInvoices = invoices.filter((inv) => inv.status === InvoiceStatus.PAID).length;
        const paymentRate = totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0;

        return {
          clientId: client._id,
          clientName: client.name,
          totalInvoices,
          paidInvoices,
          paymentRate: Math.round(paymentRate),
          outstanding: client.totalOutstanding,
        };
      })
    );

    return clientPerformance.sort((a, b) => b.outstanding - a.outstanding);
  }
}

export default new DashboardService();
