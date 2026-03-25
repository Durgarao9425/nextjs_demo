import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans">
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
              N
            </div>
            <span className="hidden sm:block text-2xl font-black tracking-tight text-slate-900">
              Next<span className="text-blue-600">Store</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar py-2">
            <Link href="/" className="whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all">Home (SSR)</Link>
            <Link href="/static-products" className="whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all">SSG</Link>
            <Link href="/csr-products" className="whitespace-nowrap px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all">CSR</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          <p className="text-gray-400 font-bold tracking-tight">© 2026 NextStore • Built with Premium Technology</p>
          <div className="flex justify-center md:justify-end space-x-6 text-sm font-bold text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">GitHub</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
