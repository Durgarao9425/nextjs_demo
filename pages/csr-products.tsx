import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

/**
 * CSR (Client-Side Rendering)
 * This page fetches data on the client side using useEffect.
 * Benefits: Real-time user interaction, reduces server load, 
 * showing loading states.
 */
export default function CSRProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6 animate-pulse">
        <div className="w-24 h-24 border-8 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-2xl font-black text-gray-300 tracking-widest uppercase">
          Client Side Rendering...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
        <h2 className="text-3xl font-black text-red-600 mb-4">{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="relative pt-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              CSR <span className="text-emerald-600">Client-Side</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Fetching data in the browser with <strong>useEffect</strong>.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 italic transition-all animate-bounce">
              Dynamic Client Load
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col h-full">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 p-2 sm:p-4 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
              <div className="aspect-[4/5] relative bg-gray-50 rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden flex items-center justify-center mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 sm:p-8 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="px-2 pb-2 flex-grow flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1 leading-none">{product.category}</p>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight flex-grow">
                  {product.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Price</span>
                    <span className="text-lg sm:text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="bg-emerald-600 p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
