import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import th from '../locales/th.json';

// Production Note: การแยกไฟล์ json ช่วยให้เราส่งไปแปลได้ง่ายขึ้น
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...en },
      th: { ...th }
    },
    lng: "th", // เริ่มต้นภาษาไทย
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;