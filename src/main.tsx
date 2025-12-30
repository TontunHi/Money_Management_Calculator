import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// สำคัญมาก: ต้อง Import 2 ไฟล์นี้ เพื่อให้ Tailwind และ i18n ทำงาน
import './styles/index.css' 
import './utils/i18n.ts'       

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)