/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // สำคัญ: เปิดใช้งาน Dark Mode แบบ Manual
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Sarabun', 'sans-serif'], // แนะนำให้หา Font Sarabun มาใส่ หรือใช้ System font ไปก่อน
      },
      colors: {
        // กำหนดสี Semantic เพื่อให้อ้างอิงง่ายและเปลี่ยนทีเดียวได้ทั้งเว็บ
        primary: '#D4AF37', // Gold color for XAUUSD feeling
        profit: '#10B981',  // Emerald 500
        loss: '#EF4444',    // Red 500
      }
    },
  },
  plugins: [],
}