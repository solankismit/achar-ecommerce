'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedWeight}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      weight: selectedWeight,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FFF5E1]/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.bestSeller && (
                <Badge className="absolute top-4 left-4 bg-[#FF9933] hover:bg-[#FF9933]/90">
                  Best Seller
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-[#138808] hover:bg-[#138808]/90">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-[#FF9933]'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF9933] text-[#FF9933]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-[#138808]">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge className="bg-[#138808] hover:bg-[#138808]/90">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            {/* Weight Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Select Weight:</label>
              <div className="flex flex-wrap gap-3">
                {product.weights.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 rounded-lg border-2 transition-all ${
                      selectedWeight === weight
                        ? 'border-[#FF9933] bg-[#FF9933] text-white'
                        : 'border-gray-300 hover:border-[#FF9933]'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 text-lg font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {product.stock < 10 && (
                  <span className="text-red-600 font-semibold">
                    Only {product.stock} left in stock!
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                disabled={added}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Truck className="h-6 w-6 text-[#FF9933]" />
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <Shield className="h-6 w-6 text-[#138808]" />
                <div>
                  <p className="font-semibold text-sm">100% Authentic</p>
                  <p className="text-xs text-muted-foreground">Traditional recipes</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <RotateCcw className="h-6 w-6 text-[#FF9933]" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Info</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-6">
                <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                <p className="text-muted-foreground leading-relaxed">{product.ingredients}</p>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-6">
                <h3 className="text-xl font-bold mb-4">Nutritional Information</h3>
                <p className="text-muted-foreground leading-relaxed">{product.nutritionalInfo}</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#138808]">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}