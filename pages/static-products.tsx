import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface StaticProps {
  products: Product[];
}

/**
 * SSG (Static Site Generation)
 * This page is rendered at build time using getStaticProps.
 * Benefits: Extremely fast delivery via CDN, reduced server resources, 
 * best SEO for static data.
 */
import fallbackProducts from '@/data/fallback-products.json';

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const API_URL = 'https://fakestoreapi.com/products';
  
  try {
    const res = await fetch(API_URL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });
    
    // Check if the response is successful
    if (!res.ok) {
      console.error(`SSG Page: API returned status ${res.status}. Falling back to local data.`);
      return { 
        props: { products: fallbackProducts as Product[] },
        revalidate: 10
      };
    }

    // Check if the content-type is JSON before parsing
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('SSG Page: Expected JSON but received HTML. Falling back to local data.');
      return { 
        props: { products: fallbackProducts as Product[] },
        revalidate: 10
      };
    }

    const products: Product[] = await res.json();

    return {
      props: {
        products,
      },
      revalidate: 60, // ISR: Refresh data every 60 seconds
    };
  } catch (error) {
    console.error('SSG Page: Fetch error. Falling back to local data.', error);
    return {
      props: {
        products: fallbackProducts as Product[],
      },
      revalidate: 10,
    };
  }
};

export default function StaticProducts({ products }: StaticProps) {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
          SSG: Static Site Generation
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Generated at build time using <strong>getStaticProps</strong>. This page is ultra-fast 
          and can be served directly from a CDN.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <Link href={`/product/${product.id}`}>
              <div className="aspect-square relative p-8 bg-gray-50 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain duration-500 group-hover:grayscale-0 grayscale-[0.2]"
                />
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600/80">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                  <div className="text-sm font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                    Build Time Ready
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
