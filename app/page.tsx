'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Shield, Truck, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import testimonialsData from '@/data/testimonials.json';
import { useState } from 'react';

export default function Home() {
  const bestSellers = productsData.filter((p) => p.bestSeller).slice(0, 6);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/7038148/pexels-photo-7038148.jpeg"
            alt="Traditional Indian Pickles"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Taste of Tradition, Delivered Fresh
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Authentic homemade Indian pickles, papads, and masalas crafted with love and traditional recipes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white px-8">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
            >
              Explore Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-[#FFF5E1]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#138808]">
            Our Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesData.map((category) => (
              <Link key={category.id} href={`/shop?category=${category.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                        <p className="text-sm text-white/80">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#138808]">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#FFF5E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-[#138808]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Homemade & Fresh</h3>
                <p className="text-sm text-muted-foreground">
                  Prepared daily with authentic traditional methods
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#FFF5E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#FF9933]" />
                </div>
                <h3 className="text-lg font-bold mb-2">100% Natural</h3>
                <p className="text-sm text-muted-foreground">
                  No artificial colors, flavors, or preservatives
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#FFF5E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#138808]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Traditional Recipes</h3>
                <p className="text-sm text-muted-foreground">
                  Passed down through generations of families
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#FFF5E1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-[#FF9933]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and secure shipping across India and worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-[#FFF5E1]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#138808]">
              Best Sellers
            </h2>
            <Link href="/shop">
              <Button variant="outline" className="border-[#138808] text-[#138808] hover:bg-[#138808] hover:text-white">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1596518431969-f8f37e0c4204"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#138808]">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                For three generations, our family has been crafting authentic Indian pickles, papads, and masalas using recipes passed down from our grandmothers.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                What started in our home kitchen has now grown into a beloved brand, bringing the authentic taste of traditional Indian flavors to homes across India and around the world.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every jar of pickle, every papad, and every masala blend is made with the same love, care, and traditional methods our family has used for decades.
              </p>
              <Button size="lg" className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#FFF5E1]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#138808]">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#FF9933] text-[#FF9933]"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with Our Latest Offers
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get exclusive deals, recipes, and updates on new products.
              </p>
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-[#FF9933] hover:bg-white/90"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}