# NPS Retirement Planner
A modern, responsive web application designed as a prototype for the **National Pension System (NPS)**, developed for the **Government of India / PFRDA**.
This application helps users plan their retirement by calculating potential corpus growth, estimating monthly pension, analyzing risk based on market volatility, and comparing different investment scenarios.
![NPS Planner Screenshot](https://via.placeholder.com/800x400?text=NPS+Retirement+Planner+Prototype)
## Features
*   **Pension Calculator**: Estimate retirement corpus and monthly pension based on current age, retirement age, contribution, and expected returns.
*   **Visual Projections**: Interactive charts (Area Chart) to visualize corpus growth over time.
*   **Risk Analysis**: Simulate market volatility (Monte Carlo Simulation) to understand the range of possible outcomes (Optimistic, Median, Pessimistic).
*   **Scenario Comparison**: Compare multiple investment strategies side-by-side to make informed decisions.
*   **Detailed Reports**: Generate and view a summary report of the retirement plan.
*   **Multilingual Support**: Fully localized in **English (EN)** and **Hindi (HI)**.
*   **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.
## Tech Stack
*   **Frontend Framework**: [React](https://reactjs.org/) (v18)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Charting**: [Recharts](https://recharts.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
## Directory Structure
```
nps-planner/
├── src/
│   ├── assets/             # Static assets (images, logos)
│   ├── components/         # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   │   ├── calculator/ # Calculator form, charts, summary
│   │   │   ├── comparison/ # Comparison table, charts
│   │   │   └── risk/       # Risk analysis charts (Fan Chart)
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   └── ui/             # Generic UI elements (Button, Card, Input)
│   ├── context/            # React Context (State Management)
│   │   ├── CalculatorContext.tsx # Manages calculator state
│   │   └── LanguageContext.tsx   # Manages language state (i18n)
│   ├── pages/              # Application Pages (Home, Reports, etc.)
│   ├── utils/              # Utility functions and helpers
│   │   ├── calculator.ts   # Core calculation logic
│   │   ├── cn.ts           # Class name merger utility
│   │   ├── simulation.ts   # Monte Carlo simulation logic
│   │   └── translations.ts # i18n dictionary (English/Hindi)
│   ├── App.tsx             # Main Application Component
│   ├── main.tsx            # Entry Point
│   └── index.css           # Global Styles (Tailwind imports)
├── public/                 # Public static assets
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project Documentation
```
## Getting Started
### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   npm (comes with Node.js)
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/nps-planner.git
    cd nps-planner
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173`.
### Building for Production
To create a production-ready build:
```bash
npm run build
```
The output will be in the `dist/` directory, ready to be deployed to any static hosting service.
