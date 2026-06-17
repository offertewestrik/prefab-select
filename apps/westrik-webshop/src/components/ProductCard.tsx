import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, GitCompareArrows, Zap } from 'lucide-react';
import type { Product } from '../data/types';
import { euro } from '../lib/format';
import { Badge, ProductImage, Stars } from './ui';
import { useCompare } from '../lib/compare';

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle, full } = useCompare();
  const active = has(product.id);
  const disabled = !active && full;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-silver-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative p-4">
        <Link to={`/product/${product.slug}`} className="block">
          <ProductImage product={product} className="aspect-[4/3]" />
        </Link>
        {product.badge && (
          <div className="absolute left-6 top-6">
            <Badge tone={product.badge === 'Bestseller' ? 'amber' : product.badge === 'CW6' || product.badge === 'All-in' ? 'green' : 'navy'}>
              {product.badge}
            </Badge>
          </div>
        )}
        <button
          onClick={() => toggle(product.id)}
          disabled={disabled}
          title={active ? 'Verwijder uit vergelijking' : 'Vergelijk dit product'}
          className={`absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-colors ${
            active
              ? 'border-navy-600 bg-navy-600 text-white'
              : 'border-silver-200 bg-white/80 text-navy-600 hover:border-navy-400 disabled:opacity-40'
          }`}
          aria-label="Vergelijken"
        >
          {active ? <Check size={16} /> : <GitCompareArrows size={16} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-navy-500">{product.brand}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-navy-900">
          <Link to={`/product/${product.slug}`} className="hover:text-navy-600">{product.model}</Link>
        </h3>
        <p className="mt-1 text-sm text-silver-500">{product.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.cwKlasse && <Chip>CW{product.cwKlasse}</Chip>}
          {product.vermogenKw && <Chip>{product.vermogenKw} kW</Chip>}
          {product.inhoudLiter && <Chip>{product.inhoudLiter} L</Chip>}
          {product.hybridReady && <Chip><Zap size={11} className="text-sky-accent" /> Hybrid Ready</Chip>}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-silver-500">{product.rating} ({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {product.listPrice && (
              <span className="block text-xs text-silver-400 line-through">{euro(product.listPrice)}</span>
            )}
            <span className="font-display text-2xl font-extrabold text-navy-900">{euro(product.price)}</span>
            <span className="ml-1 text-xs text-silver-500">incl. btw</span>
          </div>
          <Link
            to={`/product/${product.slug}`}
            className="rounded-xl bg-navy-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Bekijk
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-navy-50 px-2 py-1 text-[11px] font-semibold text-navy-700">
      {children}
    </span>
  );
}
