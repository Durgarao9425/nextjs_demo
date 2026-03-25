import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface HomeProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    
    if (!res.ok) {
        console.error(`Failed to fetch from FakeStoreAPI: Status ${res.status}`);
        return { props: { products: [] } };
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Home Page: Expected JSON, but received:', text.substring(0, 100));
      return { props: { products: [] } };
    }

    const products: Product[] = await res.json();
    return { props: { products } };
  } catch (error) {
    console.error('Home Page: Error in getServerSideProps:', error);
    return { props: { products: [] } };
  }
};

export default function Home({ products }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* 🌟 New Hero-style Search Area */}
      <div className="relative pt-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Premium <span className="text-blue-600 font-outline-2">Catalog</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              Explore {products.length} curated items from our global partners.
            </p>
          </div>

          {/* Sleek Minimalist Search Bar */}
          <div className="w-full md:max-w-md relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter by name..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-blue-600 rounded-2xl outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400 shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 📦 Optimized Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col h-full">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 p-2 sm:p-4 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
              {/* Product Image */}
              <div className="aspect-[4/5] relative bg-gray-50 rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden flex items-center justify-center mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4 sm:p-8 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur shadow-sm text-[9px] font-black uppercase tracking-widest text-gray-600 whitespace-nowrap">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2 pb-2 flex-grow flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight flex-grow">
                  {product.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Price</span>
                    <span className="text-lg sm:text-xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="bg-blue-600 p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20 animate-pulse">
            <p className="text-gray-400 font-bold italic">No items matching your search...</p>
          </div>
        )}
      </div>
    </div>
  );
}
