import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CalculatorProvider } from './context/CalculatorContext';
import { LanguageProvider } from './context/LanguageContext';
import { CompareScenarios } from './pages/CompareScenarios';
import { Home } from './pages/Home';
import { Reports } from './pages/Reports';
import { RiskAnalysis } from './pages/RiskAnalysis';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <CalculatorProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<CompareScenarios />} />
            <Route path="/risk" element={<RiskAnalysis />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </CalculatorProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
