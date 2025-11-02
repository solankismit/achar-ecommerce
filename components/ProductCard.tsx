'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    stock: number;
    weights: string[];
    bestSeller?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${product.id}-${selectedWeight}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      weight: selectedWeight,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.bestSeller && (
              <Badge className="absolute top-2 left-2 bg-[#FF9933] hover:bg-[#FF9933]/90">
                Best Seller
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-[#138808] hover:bg-[#138808]/90">
                {discount}% OFF
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-[#FF9933] transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-[#FF9933] text-[#FF9933]" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-[#138808]">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {product.stock < 10 && (
            <p className="text-xs text-red-600 mb-2">Only {product.stock} left in stock!</p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <select
            value={selectedWeight}
            onChange={(e) => {
              e.preventDefault();
              setSelectedWeight(e.target.value);
            }}
            onClick={(e) => e.preventDefault()}
            className="flex-1 border rounded-md px-2 py-1 text-sm"
          >
            {product.weights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-[#FF9933] hover:bg-[#FF9933]/90"
            disabled={added}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {added ? 'Added!' : 'Add'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}