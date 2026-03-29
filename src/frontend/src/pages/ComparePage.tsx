import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Search, Star, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { User } from "../App";
import { Navbar } from "../components/Navbar";

interface PlatformResult {
  id: string;
  name: string;
  logo: string;
  color: string;
  bgColor: string;
  price: number;
  rating: number;
  delivery: string;
  available: boolean;
}

function seededRandom(seed: string, offset: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  }
  return ((hash + offset * 1337) % 10000) / 10000;
}

function generatePrices(query: string): PlatformResult[] {
  const basePrice = 200 + Math.floor(seededRandom(query, 0) * 800);
  const platforms = [
    {
      id: "amazon",
      name: "Amazon",
      logo: "🛒",
      color: "#FF9900",
      bgColor: "#FFF8F0",
      multiplier: 1.0,
    },
    {
      id: "flipkart",
      name: "Flipkart",
      logo: "🏪",
      color: "#2874F0",
      bgColor: "#F0F6FF",
      multiplier: 0.95,
    },
    {
      id: "meesho",
      name: "Meesho",
      logo: "🛍️",
      color: "#F43397",
      bgColor: "#FFF0F8",
      multiplier: 0.85,
    },
    {
      id: "ajio",
      name: "Ajio",
      logo: "👗",
      color: "#C0392B",
      bgColor: "#FFF5F5",
      multiplier: 1.05,
    },
    {
      id: "snapdeal",
      name: "Snapdeal",
      logo: "⚡",
      color: "#E74C3C",
      bgColor: "#FFF5F0",
      multiplier: 0.9,
    },
  ];
  return platforms.map((p, i) => {
    const variation = 0.85 + seededRandom(`${query}${p.id}`, i) * 0.4;
    const price = Math.round(basePrice * p.multiplier * variation);
    const rating = 3.5 + seededRandom(`${query}${p.id}r`, i) * 1.5;
    const deliveryDays =
      1 + Math.floor(seededRandom(`${query}${p.id}d`, i) * 6);
    return {
      ...p,
      price,
      rating: Math.round(rating * 10) / 10,
      delivery: deliveryDays === 1 ? "Tomorrow" : `${deliveryDays} days`,
      available: seededRandom(`${query}${p.id}a`, i) > 0.1,
    };
  });
}

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
];

interface ComparePageProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

export function ComparePage({ user, onLogout, cartCount }: ComparePageProps) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState("");
  const [results, setResults] = useState<PlatformResult[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    setSearched(q);
    setResults(generatePrices(q));
  };

  const cheapest =
    results.length > 0 ? Math.min(...results.map((r) => r.price)) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={onLogout}
        cartCount={cartCount}
        activePage="/compare"
      />

      <section
        className="py-16 px-4 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 295) 0%, oklch(0.62 0.25 345) 50%, oklch(0.68 0.22 55) 100%)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-extrabold mb-3"
        >
          Compare Prices Across All Platforms
        </motion.h1>
        <p className="text-white/80 text-lg mb-8">
          Find the best deal in seconds. Save money every time.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex max-w-2xl mx-auto gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for a product (e.g. water bottle, headphones...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-12 h-14 text-gray-800 bg-white rounded-xl text-base shadow-lg border-0"
              data-ocid="compare.search_input"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-14 px-8 text-white rounded-xl font-semibold shadow-lg border-0"
            style={{ background: "oklch(0.68 0.22 55)" }}
            data-ocid="compare.primary_button"
          >
            Compare
          </Button>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => {
                setQuery(cat);
                setSearched(cat.toLowerCase());
                setResults(generatePrices(cat.toLowerCase()));
              }}
              className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-colors backdrop-blur-sm border border-white/20"
              data-ocid="compare.tab"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-display font-bold mb-2">
                Results for "{searched}"
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                Prices are indicative and may vary.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                {results.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="card-hover rounded-2xl p-5 border-2 shadow-sm"
                    style={{
                      backgroundColor: r.bgColor,
                      borderColor:
                        r.price === cheapest ? r.color : "transparent",
                    }}
                    data-ocid={`compare.item.${i + 1}`}
                  >
                    {r.price === cheapest && (
                      <Badge
                        className="mb-2 text-white text-xs"
                        style={{ background: r.color }}
                      >
                        🏆 Best Price
                      </Badge>
                    )}
                    <div className="text-3xl mb-2">{r.logo}</div>
                    <h3
                      className="font-display font-bold text-lg"
                      style={{ color: r.color }}
                    >
                      {r.name}
                    </h3>
                    <div className="text-2xl font-extrabold text-gray-800 mt-1">
                      ₹{r.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {r.rating}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Truck className="w-3 h-3" />
                      {r.delivery}
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 text-white text-xs gap-1"
                      style={{ background: r.color }}
                      data-ocid="compare.primary_button"
                    >
                      Buy Now <ExternalLink className="w-3 h-3" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-display font-bold text-lg">
                    Price Comparison Table
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...results]
                      .sort((a, b) => a.price - b.price)
                      .map((r) => (
                        <TableRow key={r.id} data-ocid="compare.row">
                          <TableCell>
                            <span className="flex items-center gap-2 font-medium">
                              {r.logo} {r.name}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className="font-bold"
                              style={{
                                color:
                                  r.price === cheapest ? "green" : undefined,
                              }}
                            >
                              ₹{r.price.toLocaleString()}
                              {r.price === cheapest && " ✓"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              {r.rating}
                            </span>
                          </TableCell>
                          <TableCell>{r.delivery}</TableCell>
                          <TableCell>
                            <Badge
                              variant={r.available ? "default" : "secondary"}
                            >
                              {r.available ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {results.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-display font-bold mb-2">
              Search for any product
            </h3>
            <p>
              Compare prices across Amazon, Flipkart, Meesho, Ajio & Snapdeal
              instantly!
            </p>
          </div>
        )}
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
