import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ShoppingBag, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { User } from "../App";
import { Navbar } from "../components/Navbar";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  delivery: string;
  seller: string;
  color: string;
  emoji: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    description: "Premium sound with 24hr battery, noise cancellation",
    price: 1499,
    category: "Electronics",
    delivery: "2-3 days",
    seller: "TechMart India",
    color: "#6C63FF",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Bamboo Water Bottle",
    description: "Eco-friendly 1L insulated bottle, keeps cold 24hr",
    price: 349,
    category: "Home",
    delivery: "3-5 days",
    seller: "GreenLife Co",
    color: "#27AE60",
    emoji: "🧴",
  },
  {
    id: 3,
    name: "Men's Casual Hoodie",
    description: "Soft fleece, oversized fit, multiple colors available",
    price: 799,
    category: "Fashion",
    delivery: "4-6 days",
    seller: "StyleHub",
    color: "#F43397",
    emoji: "👕",
  },
  {
    id: 4,
    name: "Smart Fitness Band",
    description: "Heart rate, sleep tracker, 7-day battery life",
    price: 2299,
    category: "Electronics",
    delivery: "1-2 days",
    seller: "FitTech",
    color: "#FF6B35",
    emoji: "⌚",
  },
  {
    id: 5,
    name: "Yoga Mat Premium",
    description: "Non-slip, 6mm thick, carry strap included",
    price: 599,
    category: "Sports",
    delivery: "3-4 days",
    seller: "ZenFit Store",
    color: "#9B59B6",
    emoji: "🧘",
  },
  {
    id: 6,
    name: "Coffee Maker 4-Cup",
    description: "Auto shut-off, brew strength control, compact",
    price: 1899,
    category: "Home",
    delivery: "2-3 days",
    seller: "KitchenPlus",
    color: "#8B4513",
    emoji: "☕",
  },
  {
    id: 7,
    name: "Vitamin C Serum",
    description: "Brightening 20% Vitamin C, hyaluronic acid formula",
    price: 449,
    category: "Beauty",
    delivery: "5-7 days",
    seller: "GlowUp Beauty",
    color: "#F39C12",
    emoji: "✨",
  },
  {
    id: 8,
    name: "Study Desk Lamp",
    description: "LED, adjustable brightness, USB charging port",
    price: 899,
    category: "Electronics",
    delivery: "3-5 days",
    seller: "HomeOffice Hub",
    color: "#2874F0",
    emoji: "💡",
  },
];

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Books",
  "Other",
];
const COLORS = ["#6C63FF", "#F43397", "#27AE60", "#FF6B35", "#2874F0"];
const EMOJIS = ["📦", "🛍️", "🎁", "⭐", "🔥"];

interface MarketplacePageProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
  onAddToCart: () => void;
}

export function MarketplacePage({
  user,
  onLogout,
  cartCount,
  onAddToCart,
}: MarketplacePageProps) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    delivery: "",
  });

  const handleSell = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      price: Number.parseInt(form.price) || 0,
      category: form.category,
      delivery: `${form.delivery} days`,
      seller: user?.name ?? "Anonymous",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
    setProducts((prev) => [newProduct, ...prev]);
    setSuccess(true);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      delivery: "",
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={onLogout}
        cartCount={cartCount}
        activePage="/marketplace"
      />

      <section
        className="py-12 px-4 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.5 0.22 240) 0%, oklch(0.55 0.22 295) 50%, oklch(0.62 0.25 345) 100%)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-extrabold mb-2"
        >
          PriceHunt Marketplace
        </motion.h1>
        <p className="text-white/80">
          Buy from verified sellers or list your own products
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="browse">
          <TabsList className="mb-6">
            <TabsTrigger value="browse" data-ocid="marketplace.tab">
              🛍️ Browse Products
            </TabsTrigger>
            <TabsTrigger value="sell" data-ocid="marketplace.tab">
              ➕ Sell a Product
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                  className="card-hover bg-white rounded-2xl shadow-sm border overflow-hidden"
                  data-ocid={`marketplace.item.${i + 1}`}
                >
                  <div
                    className="h-40 flex items-center justify-center text-5xl"
                    style={{ background: `${p.color}22` }}
                  >
                    {p.emoji}
                  </div>
                  <div className="p-4">
                    <Badge
                      variant="secondary"
                      className="text-xs mb-2"
                      style={{ background: `${p.color}22`, color: p.color }}
                    >
                      {p.category}
                    </Badge>
                    <h3 className="font-display font-bold text-sm mb-1 line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg font-extrabold text-gray-800">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {p.delivery}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      by {p.seller}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs"
                        onClick={onAddToCart}
                        data-ocid="marketplace.secondary_button"
                      >
                        <ShoppingBag className="w-3 h-3 mr-1" /> Cart
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs text-white"
                        style={{ background: p.color }}
                        data-ocid="marketplace.primary_button"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {products.length === 0 && (
              <div
                className="text-center py-20"
                data-ocid="marketplace.empty_state"
              >
                <div className="text-5xl mb-3">📫</div>
                <p className="text-muted-foreground">
                  No products yet. Be the first to sell!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sell">
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-display font-bold mb-6">
                List Your Product
              </h2>
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl mb-4 text-green-700"
                    style={{ background: "#dcfce7" }}
                    data-ocid="marketplace.success_state"
                  >
                    <CheckCircle className="w-5 h-5" /> Product listed
                    successfully!
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSell} className="space-y-4">
                <div>
                  <Label htmlFor="p-name">Product Name</Label>
                  <Input
                    id="p-name"
                    placeholder="e.g. Leather Wallet"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="mt-1"
                    data-ocid="marketplace.input"
                  />
                </div>
                <div>
                  <Label htmlFor="p-desc">Description</Label>
                  <Textarea
                    id="p-desc"
                    placeholder="Describe your product..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                    className="mt-1 resize-none"
                    rows={3}
                    data-ocid="marketplace.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-price">Price (₹)</Label>
                    <Input
                      id="p-price"
                      type="number"
                      placeholder="499"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      required
                      className="mt-1"
                      data-ocid="marketplace.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="p-delivery">Delivery Days</Label>
                    <Input
                      id="p-delivery"
                      type="number"
                      placeholder="3"
                      value={form.delivery}
                      onChange={(e) =>
                        setForm({ ...form, delivery: e.target.value })
                      }
                      required
                      className="mt-1"
                      data-ocid="marketplace.input"
                    />
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v })}
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="marketplace.select"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Product Image</Label>
                  <label
                    htmlFor="p-image"
                    className="mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-colors flex flex-col items-center"
                    data-ocid="marketplace.dropzone"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload image
                    </p>
                    <input
                      id="p-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      data-ocid="marketplace.upload_button"
                    />
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full text-white py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
                  }}
                  data-ocid="marketplace.submit_button"
                >
                  List Product
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground border-t mt-8">
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
