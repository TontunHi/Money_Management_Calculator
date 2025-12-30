# 💰 Money Management Calculator

A professional **Position Size Calculator** web application designed for traders (specifically XAUUSD/Gold). Built with a focus on **Minimalist Design**, **Production-Ready Architecture**, and **Real-world Usage**.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)

---

## ✨ Features

- **🎯 Precision Calculation:** Calculate Lot size based on Risk %, Balance, and Stop Loss.
- **🌗 Dark & Light Mode:** Fully supported themes with persistence (saves user preference).
- **🌐 Multi-Language:** Support **English** and **Thai (ภาษาไทย)** via i18n.
- **📱 Mobile-First:** Responsive design that works perfectly on all devices.
- **🛡️ Risk Management:** Visual indicators for Risk/Reward Ratio, Break Even Point, and Spread Cost.
- **🏛️ MVC Architecture:** Clean code structure separating Logic (Model), State (Controller), and UI (View).

## 🚀 Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **State/Logic:** Custom Hooks, React Context
- **Internationalization:** i18next

## 📂 Project Structure (MVC)

We follow a clean separation of concerns pattern:

```bash
src/
├── components/     # Reusable UI (Buttons, Inputs)
├── controllers/    # Business Logic & State Management (Hooks)
├── models/         # TypeScript Interfaces & Types
├── views/          # Page Layouts & Screens
├── utils/          # Pure Functions (Calculations, Formatting)
└── contexts/       # Global State (Theme)
