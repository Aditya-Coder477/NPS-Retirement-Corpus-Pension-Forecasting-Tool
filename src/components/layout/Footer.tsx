export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-semibold text-primary">NPS Retirement Planner</span>
            <span className="text-xs text-gray-500">
              © {new Date().getFullYear()} Pension Fund Regulatory and Development Authority.
            </span>
          </div>
          
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Use</a>
            <a href="#" className="hover:text-primary">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
