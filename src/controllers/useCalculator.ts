import { useState, useEffect } from 'react';

// *** จุดเปลี่ยนชีวิตคือตรงนี้ครับ: ต้องมีคำว่า type ***
import type { TradeInput, CalculationResult } from '../models/Calculator';

import { calculatePositionSize } from '../utils/calculator';

// ค่าเริ่มต้น
const initialInput: TradeInput = {
  accountType: 'USD',
  balance: 1000,
  riskPercent: 1,
  entryPrice: 0,
  stopLoss: 0,
  takeProfit: 0,
  commission: 0,
  spread: 0,
} as TradeInput; 

export const useCalculator = () => {
  const [input, setInput] = useState<TradeInput>(() => {
    // Restore from LocalStorage
    try {
      const saved = localStorage.getItem('mm-calculator-input');
      return saved ? JSON.parse(saved) : initialInput;
    } catch (e) {
      return initialInput;
    }
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    localStorage.setItem('mm-calculator-input', JSON.stringify(input));
    
    if (input.entryPrice > 0 && input.stopLoss > 0) {
      const calcResult = calculatePositionSize(input);
      setResult(calcResult);
    } else {
      setResult(null);
    }
  }, [input]);

  const updateInput = (field: keyof TradeInput, value: any) => {
    setInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setInput(initialInput);
    setResult(null);
    localStorage.removeItem('mm-calculator-input');
  };

  return {
    input,
    result,
    updateInput,
    resetCalculator
  };
};