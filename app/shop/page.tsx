'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 500]);
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-[#FFF5E1]/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#138808] mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Discover our range of authentic Indian pickles, papads, chutneys, and masalas
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === 'all'}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-[#FF9933]"
                      />
                      <span>All Products</span>
                    </label>
                    {categoriesData.map((cat) => (
                      <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.slug}
                          checked={selectedCategory === cat.slug}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-[#FF9933]"
                        />
                        <span>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
              variant="outline"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            {/* Mobile Filters */}
            {showFilters && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Category</h3>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        {categoriesData.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <Button onClick={clearFilters} className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}