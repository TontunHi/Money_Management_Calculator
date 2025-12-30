// src/models/Calculator.ts

export type AccountType = 'USD' | 'USC';
export type TradeType = 'BUY' | 'SELL';

export interface TradeInput {
  balance: number;
  accountType: AccountType;
  riskPercent: number;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  commission: number;
  spread: number;
  pair?: string;
}

export interface CalculationResult {
  lotSize: number;
  riskAmount: number;
  rewardAmount: number;
  riskRewardRatio: number;
  breakEvenPrice: number;
  pipsRisk: number;
  pipsReward: number;
  // *** เพิ่มตัวนี้ครับ ***
  spreadCost: number; // ต้นทุนสเปรด ($)
  
  isError: boolean;
  errorMessage?: string;
}

export const XAUUSD_CONTRACT_SIZE = 100;