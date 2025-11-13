"use client";

import { TCategories } from "@/app/admin/dashboard/category/_utils/category-schema";
import { getImagePath } from "@/commons/helpers/string-helper";
import type { TUserMenu } from "@/commons/types/user-type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { HomeIcon, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type TProps = {
  menuItems: TUserMenu[];
  categoryList: TCategories[];
};
export default function MainMenu({ menuItems, categoryList }: TProps) {
  const addItem = useCart((state) => state.addItem);
  const totalItems = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { tableId } = useParams<{ tableId?: string }>();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace("category-", "");
          setActiveCategory(Number(categoryId));
        }
      });
    };

    categoryList.forEach((category) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [categoryList]);

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsByCategory = filteredMenuItems.reduce((acc, item) => {
    const categoryId = item.category.id;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(item);
    return acc;
  }, {} as Record<number, typeof filteredMenuItems>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md bg-white min-h-screen relative">
        <header className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-linear-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Restaurant</h1>
            </div>
            <Link href={`/${tableId}/cart`} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-500 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </header>

        <nav className="sticky top-[116px] z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                href={`#category-${category.id}`}
                className="shrink-0"
              >
                <button
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
        </nav>

        <main className="px-4 py-4 pb-24">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Products</h2>

          {filteredMenuItems.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No products found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}

          {categoryList.map((category) => {
            const items = itemsByCategory[category.id] || [];
            if (items.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className="mb-8 scroll-mt-48"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow rounded-2xl"
                    >
                      <div className="p-3">
                        <div className="relative h-28 w-full mb-3 overflow-hidden rounded-xl">
                          <Image
                            src={getImagePath(item.image) || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {!item.available && (
                            <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
                              <Badge
                                variant="secondary"
                                className="text-xs font-semibold"
                              >
                                Sold Out
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 leading-tight text-sm line-clamp-1">
                            {item.name}
                          </h3>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-base font-bold text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              className="h-7 w-7 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                              disabled={!item.available}
                              onClick={() =>
                                addItem({
                                  id: item.id,
                                  name: item.name,
                                  image: item.image,
                                  price: item.price,
                                })
                              }
                            >
                              <span className="text-lg leading-none">+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-around px-4 py-3">
              <Link
                href={`/${tableId}`}
                className="flex flex-col items-center gap-1 text-gray-400"
              >
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
              </Link>

              <Link
                href={`/${tableId}/cart`}
                className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Cart</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
