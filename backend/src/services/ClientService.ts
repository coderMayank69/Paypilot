import { Client } from '../models/index';
import { IClient } from '../../shared/types/index';

export class ClientService {
  async createClient(
    userId: string,
    name: string,
    email: string,
    phone?: string,
    address?: string,
    paymentTerms?: number
  ): Promise<IClient> {
    const client = new Client({
      userId,
      name,
      email,
      phone: phone || null,
      address: address || null,
      paymentTerms: paymentTerms || 30,
    });

    await client.save();
    return client;
  }

  async getClientById(clientId: string, userId: string): Promise<IClient | null> {
    return Client.findOne({ _id: clientId, userId });
  }

  async getClientsByUserId(userId: string, page: number = 1, limit: number = 10): Promise<{ clients: IClient[]; total: number }> {
    const skip = (page - 1) * limit;
    const clients = await Client.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Client.countDocuments({ userId });

    return { clients, total };
  }

  async updateClient(clientId: string, userId: string, updates: Partial<IClient>): Promise<IClient | null> {
    return Client.findOneAndUpdate({ _id: clientId, userId }, updates, { new: true });
  }

  async deleteClient(clientId: string, userId: string): Promise<boolean> {
    const result = await Client.deleteOne({ _id: clientId, userId });
    return result.deletedCount === 1;
  }

  async updateClientStats(clientId: string, totalInvoices: number, totalOutstanding: number): Promise<void> {
    await Client.findByIdAndUpdate(clientId, {
      totalInvoices,
      totalOutstanding,
      lastInvoiceDate: new Date(),
    });
  }
}

export default new ClientService();
