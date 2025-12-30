import { useTranslation } from 'react-i18next';
import { useCalculator } from '../controllers/useCalculator';
import { NumberInput } from '../components/NumberInput';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { RefreshCcw, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export const CalculatorView = () => {
  const { t } = useTranslation();
  const { input, updateInput, result, resetCalculator } = useCalculator();

  const isBuy = input.entryPrice > input.stopLoss;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* --- Left Column: Inputs --- */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Account Settings */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            1. {t('account_section')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
               <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                 {t('account_type')}
               </label>
               <select 
                 value={input.accountType}
                 onChange={(e) => updateInput('accountType', e.target.value)}
                 className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-primary text-slate-900 dark:text-slate-100"
               >
                 <option value="USD">Standard (USD)</option>
                 <option value="USC">Cent (USC)</option>
               </select>
            </div>
            <NumberInput 
              label={t('balance')} 
              value={input.balance} 
              onChange={(v) => updateInput('balance', v)}
              suffix={input.accountType}
            />
            <NumberInput 
              label={t('risk') + " (%)"} 
              value={input.riskPercent} 
              onChange={(v) => updateInput('riskPercent', v)} 
              suffix="%"
            />
             <NumberInput 
              label={t('commission')} 
              value={input.commission || 0} 
              onChange={(v) => updateInput('commission', v)} 
              suffix="$"
            />
          </div>
        </section>

        {/* Trade Settings */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            2. {t('trade_section')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberInput 
              label={t('entry')} 
              value={input.entryPrice} 
              onChange={(v) => updateInput('entryPrice', v)} 
            />
            <NumberInput 
              label={t('stop_loss')} 
              value={input.stopLoss} 
              onChange={(v) => updateInput('stopLoss', v)} 
              suffix={input.entryPrice > 0 && input.stopLoss > 0 
                ? (isBuy ? 'BUY' : 'SELL') 
                : ''}
            />
            <NumberInput 
              label={t('take_profit')} 
              value={input.takeProfit} 
              onChange={(v) => updateInput('takeProfit', v)} 
            />
            {/* เพิ่มช่อง Spread */}
            <NumberInput 
              label="Spread (Points)" 
              value={input.spread || 0} 
              onChange={(v) => updateInput('spread', v)}
              placeholder="e.g. 20"
              suffix="Pts"
            />
          </div>
        </section>

        <button 
          onClick={resetCalculator}
          className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition text-sm"
        >
          <RefreshCcw size={16} /> {t('reset_btn')}
        </button>
      </div>

      {/* --- Right Column: Results --- */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          {!result ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <span className="text-2xl font-bold">?</span>
              </div>
              <p className="text-slate-500">{t('empty_state')}</p>
            </div>
          ) : result.isError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 dark:text-red-400">{result.errorMessage}</p>
            </div>
          ) : (
            // *** แก้ไข Theme ตรงนี้ ***
            <div className={clsx(
              "rounded-2xl shadow-xl overflow-hidden relative transition-all",
              // Light Mode: ขาว สะอาด เงาชัด ตัวหนังสือเข้ม
              "bg-white text-slate-900 border border-slate-200",
              // Dark Mode: ดำไล่สี ตัวหนังสือขาว ไร้ขอบ
              "dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:text-white dark:border-none"
            )}>
              {/* Background Effect (แสดงเฉพาะ Dark Mode ก็ได้ หรือปรับสีให้เข้ากับ Light) */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={clsx("text-xs font-bold px-2 py-1 rounded uppercase tracking-wider", isBuy ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss')}>
                      {isBuy ? t('buy') : t('sell')}
                    </span>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm mt-2">{t('lot_size')}</h3>
                  </div>
                  {isBuy ? <TrendingUp className="text-profit" size={32} /> : <TrendingDown className="text-loss" size={32} />}
                </div>

                <div className="text-6xl font-bold mb-2 tracking-tight text-slate-900 dark:text-white">
                  {result.lotSize} <span className="text-2xl font-normal text-slate-400">Lot</span>
                </div>
                
                <div className="text-slate-500 dark:text-slate-400 mb-8 font-mono text-sm">
                  {t('risk_label')}: {formatCurrency(result.riskAmount, input.accountType)} 
                  <span className="mx-2">•</span> 
                  {result.pipsRisk} Pips
                </div>

                <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50 mb-6"></div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">{t('reward_label')}</p>
                    <p className="text-xl font-semibold text-profit font-mono">
                      {result.rewardAmount > 0 ? `+${formatCurrency(result.rewardAmount, input.accountType)}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">{t('rr_label')}</p>
                    <p className="text-xl font-semibold text-slate-800 dark:text-white font-mono">
                      {result.riskRewardRatio > 0 ? `1 : ${result.riskRewardRatio}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">{t('be_label')}</p>
                    <p className="text-lg font-medium text-primary font-mono">
                      {formatNumber(result.breakEvenPrice)}
                    </p>
                  </div>
                  {/* แสดง Spread Cost */}
                  <div>
                     <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">Spread Cost</p>
                     <p className="text-lg font-medium text-slate-600 dark:text-slate-300 font-mono">
                       -{formatCurrency(result.spreadCost, input.accountType)}
                     </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};