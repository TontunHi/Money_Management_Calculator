// src/utils/calculator.ts
import type { TradeInput, CalculationResult } from '../models/Calculator';
import { XAUUSD_CONTRACT_SIZE } from '../models/Calculator';

export const calculatePositionSize = (input: TradeInput): CalculationResult => {
  const { 
    balance, 
    riskPercent, 
    entryPrice, 
    stopLoss, 
    takeProfit, 
    commission,
    spread
  } = input;

  // ... (Code ส่วน Validate เดิม คงไว้เหมือนเดิม) ...
  if (entryPrice <= 0 || stopLoss <= 0 || balance <= 0) {
    return createErrorResult("กรุณากรอกข้อมูลราคาและเงินทุนให้ถูกต้อง");
  }

  if (entryPrice === stopLoss) {
    return createErrorResult("ราคาเข้าและจุดยอมแพ้ต้องไม่เท่ากัน");
  }

  const isLong = entryPrice > stopLoss;
  const priceDiff = Math.abs(entryPrice - stopLoss);
  const riskAmount = balance * (riskPercent / 100);

  // คำนวณ Lot
  const lossPerLotFromPrice = priceDiff * XAUUSD_CONTRACT_SIZE;
  const totalLossPerLot = lossPerLotFromPrice + commission; 
  
  if (totalLossPerLot <= 0) return createErrorResult("เกิดข้อผิดพลาดในการคำนวณ");

  let rawLot = riskAmount / totalLossPerLot;
  const lotSize = Math.floor(rawLot * 100) / 100;

  if (lotSize < 0.01) {
    return createErrorResult(`ทุนไม่พอสำหรับความเสี่ยง ${riskPercent}% (แนะนำลด SL หรือเพิ่มทุน)`);
  }

  const spreadCost = spread * 1 * lotSize; 

  // 2. Break Even (เหมือนเดิม ถูกแล้ว)
  const commCostPerUnit = commission / XAUUSD_CONTRACT_SIZE;
  const breakEvenPrice = isLong 
    ? entryPrice + commCostPerUnit 
    : entryPrice - commCostPerUnit;

  // 3. Reward
  let rewardAmount = 0;
  let riskRewardRatio = 0;
  let pipsReward = 0;
  const pipsRisk = (priceDiff * 10); 
  
  if (takeProfit > 0) {
    const tpDiff = Math.abs(takeProfit - entryPrice);
    pipsReward = tpDiff * 10;
    const grossProfit = tpDiff * XAUUSD_CONTRACT_SIZE * lotSize;
    rewardAmount = grossProfit - (commission * lotSize);
    
    const actualRisk = totalLossPerLot * lotSize;
    if (actualRisk > 0) riskRewardRatio = rewardAmount / actualRisk;
  }

  return {
    lotSize,
    riskAmount: parseFloat((totalLossPerLot * lotSize).toFixed(2)),
    rewardAmount: parseFloat(rewardAmount.toFixed(2)),
    riskRewardRatio: parseFloat(riskRewardRatio.toFixed(2)),
    breakEvenPrice: parseFloat(breakEvenPrice.toFixed(2)),
    pipsRisk: parseFloat(pipsRisk.toFixed(1)),
    pipsReward: parseFloat(pipsReward.toFixed(1)),
    spreadCost: parseFloat(spreadCost.toFixed(2)), // Return ค่านี้กลับไป
    isError: false
  };
};

const createErrorResult = (msg: string): CalculationResult => ({
  lotSize: 0,
  riskAmount: 0,
  rewardAmount: 0,
  riskRewardRatio: 0,
  breakEvenPrice: 0,
  pipsRisk: 0,
  pipsReward: 0,
  spreadCost: 0,
  isError: true,
  errorMessage: msg
});
