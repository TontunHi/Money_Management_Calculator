import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react'; // เอา Languages icon ออก เพราะจะทำปุ่ม Text แทน
import { CalculatorView } from './views/CalculatorView';
import { AppLogo } from './components/Logo'; // Import Logo

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'th' ? 'en' : 'th';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* ใช้ Logo Component */}
          <AppLogo className="w-10 h-10 shadow-lg shadow-primary/20 rounded-xl" />
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
              {t('app_title')}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Professional Tool for Traders
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {/* ปุ่มภาษาแบบ Text ชัดๆ */}
          <button 
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm font-semibold min-w-[3rem]"
          >
            {i18n.language.toUpperCase()}
          </button>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans pb-12">
        <Header />
        
        <main className="px-4 py-8">
           <CalculatorView />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;