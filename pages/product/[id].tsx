import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

/**
 * Dynamic Routing + SSR
 * This page uses dynamic parameters ([id]) to fetch data from the server 
 * on each request.
 */
export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    
    if (!res.ok) {
        console.error(`Failed to fetch product ${id}: Status ${res.status}`);
        return { notFound: true };
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error(`Product ${id}: Expected JSON, but received:`, text.substring(0, 100));
      return { notFound: true };
    }

    const product: Product = await res.json();
    
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-10 transition-colors group">
        <svg className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center p-12 border border-gray-100 shadow-xl group">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-12 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>

        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest border border-blue-100">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {product.title}
            </h1>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</span>
            <span className="text-gray-400 font-medium text-lg italic">Includes Taxes</span>
          </div>

          <p className="text-lg leading-relaxed text-gray-600 border-l-4 border-blue-200 pl-6 italic">
            &quot;{product.description}&quot;
          </p>

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300">
              Add to Premium Cart
            </button>
            <button className="flex-1 bg-white border-2 border-gray-100 text-gray-900 font-bold py-5 rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
