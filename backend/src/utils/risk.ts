import { calculateRiskScore } from '../../shared/utils/index';
import { Invoice, RiskScore } from '../models/index';
import { calculateDaysOverdue } from '../../shared/utils/index';

interface RiskFactors {
  daysOverdue: number;
  clientPaymentHistory: number;
  invoiceAge: number;
  outstandingAmount: number;
}

export const calculateInvoiceRiskScore = (factors: RiskFactors) => {
  return calculateRiskScore(factors);
};

export const updateInvoiceRiskScore = async (invoiceId: string, factors: RiskFactors) => {
  const { score, level } = calculateRiskScore(factors);

  const riskScore = await RiskScore.findOneAndUpdate(
    { invoiceId },
    {
      score,
      level,
      factors,
    },
    { upsert: true, new: true }
  );

  return riskScore;
};

export const recalculateAllRiskScores = async (userId: string) => {
  const invoices = await Invoice.find({ userId });

  for (const invoice of invoices) {
    const daysOverdue = calculateDaysOverdue(invoice.dueDate);
    const invoiceAge = Math.floor(
      (Date.now() - invoice.issueDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // TODO: Calculate client payment history based on past invoices
    const clientPaymentHistory = 0;

    const factors: RiskFactors = {
      daysOverdue,
      clientPaymentHistory,
      invoiceAge,
      outstandingAmount: invoice.amount - invoice.paidAmount,
    };

    await updateInvoiceRiskScore(invoice._id as string, factors);
  }
};

export const getRiskSummary = async (userId: string) => {
  const riskScores = await RiskScore.find({}).populate({
    path: 'invoiceId',
    match: { userId },
  });

  const summary = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    totalAtRisk: 0,
  };

  riskScores.forEach((risk) => {
    if (!risk.invoiceId) return;

    switch (risk.level) {
      case 'critical':
        summary.critical++;
        break;
      case 'high':
        summary.high++;
        break;
      case 'medium':
        summary.medium++;
        break;
      case 'low':
        summary.low++;
        break;
    }
  });

  summary.totalAtRisk = summary.critical + summary.high + summary.medium;

  return summary;
};
