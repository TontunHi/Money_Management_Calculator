import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  suffix?: string; // เช่น %, $, Pts
  step?: number;
  min?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  step = 0.01,
  min = 0
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </label>
      <div className="relative group">
        <input
          type="number"
          value={value === 0 ? '' : value} // ถ้าเป็น 0 ให้แสดงว่างๆ (UX)
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          step={step}
          min={min}
          // ป้องกันการ Scroll เมาส์แล้วตัวเลขเปลี่ยนโดยไม่ตั้งใจ
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                     text-slate-900 dark:text-slate-100 rounded-lg px-4 py-2.5 outline-none 
                     focus:border-primary focus:ring-1 focus:ring-primary transition-all
                     placeholder:text-slate-300 dark:placeholder:text-slate-600 font-mono"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};