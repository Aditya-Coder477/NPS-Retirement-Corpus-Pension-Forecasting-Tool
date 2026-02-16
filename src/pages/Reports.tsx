import { Download, Printer } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { calculateProjection, formatCurrency } from '../utils/calculator';

import { useCalculator } from '../context/CalculatorContext';

export function Reports() {
  const { inputs } = useCalculator();
  const { t } = useLanguage();

  const results = calculateProjection(inputs);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8 no-print">
          <div>
             <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t.reports.title}
            </h1>
            <p className="text-gray-500 mt-2">
              {t.reports.generatedOn} {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> {t.reports.print}
            </Button>
            <Button onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" /> {t.reports.download}
            </Button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="bg-white p-8 border border-gray-200 shadow-sm rounded-lg max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
            <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">{t.nav.title}</h2>
                        <p className="text-sm text-gray-500">{t.reports.officialEstimate}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold">Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-xs text-gray-400">ID: REF-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{t.reports.inputParams}</h3>
                     <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.calculator.currentAge}</td>
                                <td className="py-2 font-medium text-right">{inputs.currentAge} {t.reports.years}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.calculator.retirementAge}</td>
                                <td className="py-2 font-medium text-right">{inputs.retirementAge} {t.reports.years}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.calculator.monthlyContribution}</td>
                                <td className="py-2 font-medium text-right">{formatCurrency(inputs.monthlyContribution)}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.calculator.expectedReturn}</td>
                                <td className="py-2 font-medium text-right">{inputs.expectedReturn}%</td>
                            </tr>
                        </tbody>
                     </table>
                </div>

                <div>
                     <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{t.reports.projectedOutcomes}</h3>
                     <table className="w-full text-sm">
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.reports.investingPeriod}</td>
                                <td className="py-2 font-medium text-right">{inputs.retirementAge - inputs.currentAge} {t.reports.years}</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.results.invested}</td>
                                <td className="py-2 font-medium text-right">{formatCurrency(results.investedAmount)}</td>
                            </tr>
                             <tr className="border-b border-gray-100">
                                <td className="py-2 text-gray-600">{t.results.gains}</td>
                                <td className="py-2 font-medium text-right text-green-600">{formatCurrency(results.gains)}</td>
                            </tr>
                        </tbody>
                     </table>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{t.results.totalCorpus}</p>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(results.totalCorpus)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-500 mb-1">{t.results.monthlyPension}</p>
                         <p className="text-3xl font-bold text-gray-900">{formatCurrency(results.monthlyPension)}</p>
                    </div>
                </div>
            </div>

            <div className="text-xs text-gray-400 mt-12 pt-6 border-t border-gray-200">
                <p><strong>{t.reports.disclaimer}</strong></p>
                <p className="mt-2">{t.reports.footer}</p>
            </div>
        </div>
      </div>
    </Layout>
  );
}
