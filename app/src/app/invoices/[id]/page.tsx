'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { IInvoice } from '@/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;

  const [invoice, setInvoice] = useState<IInvoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState('0');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await apiClient.getInvoiceById(invoiceId);
        setInvoice(response.data.data);
      } catch (error) {
        console.error('Failed to fetch invoice:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }, [invoiceId]);

  const handleSendInvoice = async () => {
    try {
      await apiClient.sendInvoice(invoiceId);
      setInvoice((prev) => prev ? { ...prev, status: 'sent' } : null);
      alert('Invoice sent successfully');
    } catch (error) {
      console.error('Failed to send invoice:', error);
      alert('Failed to send invoice');
    }
  };

  const handlePayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    setIsProcessing(true);

    try {
      const amount = Math.round(parseFloat(paymentAmount) * 100); // Amount in paise

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: 'PayPilot',
        description: `Payment for Invoice ${invoice?.invoiceNumber}`,
        order_id: invoiceId,
        handler: async (response: any) => {
          try {
            // Record payment in backend
            await apiClient.recordPayment(invoiceId, parseFloat(paymentAmount));
            setInvoice((prev) => 
              prev 
                ? { 
                    ...prev, 
                    paidAmount: prev.paidAmount + parseFloat(paymentAmount),
                    status: (prev.paidAmount + parseFloat(paymentAmount)) >= prev.amount ? 'paid' : 'partially_paid'
                  } 
                : null
            );
            setPaymentAmount('0');
            alert('Payment recorded successfully');
          } catch (error) {
            console.error('Failed to record payment:', error);
            alert('Payment recorded but failed to update invoice');
          }
        },
        prefill: {
          name: 'Client Name',
          email: 'client@email.com',
        },
        theme: {
          color: '#2563eb',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Failed to process payment:', error);
      alert('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendReminder = async () => {
    try {
      await apiClient.sendReminder(invoiceId);
      alert('Reminder sent successfully');
    } catch (error) {
      console.error('Failed to send reminder:', error);
      alert('Failed to send reminder');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const outstanding = invoice.amount - invoice.paidAmount;
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
          <p className="text-gray-600 mt-2">Issued on {formatDate(invoice.issueDate)}</p>
        </div>
        <div className="space-x-2">
          {invoice.status !== 'sent' && invoice.status !== 'paid' && (
            <button
              onClick={handleSendInvoice}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Invoice
            </button>
          )}
          {invoice.status !== 'paid' && (
            <button
              onClick={handleSendReminder}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              Send Reminder
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Invoice Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Invoice Details</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="text-lg font-medium text-gray-900">{formatDate(invoice.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-medium text-gray-900 capitalize">
                  {invoice.status.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Items</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-gray-700">Description</th>
                  <th className="text-right py-2 text-gray-700">Qty</th>
                  <th className="text-right py-2 text-gray-700">Unit Price</th>
                  <th className="text-right py-2 text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-gray-900">{item.description}</td>
                    <td className="text-right py-3 text-gray-700">{item.quantity}</td>
                    <td className="text-right py-3 text-gray-700">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="text-right py-3 font-medium text-gray-900">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Notes</p>
              <p className="text-gray-900">{invoice.notes}</p>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow p-8 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{invoice.amount.toLocaleString('en-IN')}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{invoice.paidAmount.toLocaleString('en-IN')}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-red-600">₹{outstanding.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {outstanding > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  max={outstanding}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Pay with Razorpay'}
              </button>
            </div>
          )}

          {invoice.status === 'paid' && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center font-medium">
              ✓ Invoice Paid
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
