import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { User } from "../App";
import { Navbar } from "../components/Navbar";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const QUICK_REPLIES = [
  "Find best deals",
  "How to sell?",
  "Track delivery",
  "Compare prices",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("cheap") || q.includes("best price") || q.includes("lowest"))
    return "🏆 Great question! Head to our Price Compare page and search for any product. We show prices from Amazon, Flipkart, Meesho, Ajio & Snapdeal side by side and highlight the cheapest option for you!";
  if (q.includes("sell") || q.includes("list") || q.includes("upload"))
    return "🛍️ Selling is easy on PriceHunt! Go to the Marketplace page and click 'Sell a Product'. Fill in your product name, description, price, category and delivery days. Your product will be live instantly!";
  if (q.includes("delivery") || q.includes("shipping") || q.includes("track"))
    return "🚚 Delivery times vary by platform and location. On our Price Compare page, each platform card shows estimated delivery (e.g. '2-3 days' or 'Tomorrow'). Faster delivery platforms are clearly indicated!";
  if (q.includes("compare") || q.includes("comparison"))
    return "⚡ Our price comparison aggregates prices from 5 major platforms: Amazon, Flipkart, Meesho, Ajio & Snapdeal. Just search any product name, and we show all prices ranked from cheapest to most expensive!";
  if (q.includes("return") || q.includes("refund"))
    return "↩️ Each platform has its own return policy. Amazon and Flipkart offer 7-30 day returns. Meesho offers 7 days. Always check the seller's policy before buying!";
  if (q.includes("payment") || q.includes("upi") || q.includes("card"))
    return "💳 PriceHunt redirects you to the platform's secure checkout. You can pay via UPI, credit/debit card, net banking, or cash on delivery depending on the platform.";
  if (q.includes("how") && q.includes("work"))
    return "🔍 PriceHunt is a smart price comparison tool! Search for any product, see prices on 5 platforms, spot the best deal, then click Buy Now to purchase. Simple, fast, and free!";
  const products = [
    "bottle",
    "phone",
    "laptop",
    "headphone",
    "watch",
    "shoes",
    "clothes",
    "shirt",
    "bag",
    "tv",
  ];
  for (const p of products) {
    if (q.includes(p)) {
      return `💡 Looking for a ${p}? Try searching it on our Price Compare page! We show the best prices across all major platforms. Meesho often has great deals on everyday items, while Amazon tends to be good for electronics!`;
    }
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey"))
    return "👋 Hey there! I'm ShopBot, your personal shopping assistant. I can help you find the best deals, guide you through selling, or answer any shopping questions. What are you looking for today?";
  return "🤖 I'm ShopBot! I can help you find the best deals, compare prices, and guide you through selling on PriceHunt. Try asking me about any product, or use the quick replies below!";
}

interface AssistantPageProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

export function AssistantPage({
  user,
  onLogout,
  cartCount,
}: AssistantPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: `👋 Hi${user ? `${user.name.split(" ")[0]}` : ""}! I'm ShopBot, your AI shopping assistant. I can help you find the best deals, compare prices across platforms, or guide you through selling. What can I help you with today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: bottomRef is stable
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        const botMsg: Message = {
          id: Date.now() + 1,
          role: "bot",
          text: getBotResponse(text),
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
      },
      1200 + Math.random() * 800,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        user={user}
        onLogout={onLogout}
        cartCount={cartCount}
        activePage="/assistant"
      />

      <div
        className="py-4 px-4 text-white flex items-center gap-3 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.62 0.25 345))",
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <div className="font-display font-bold">ShopBot</div>
          <div className="text-xs text-white/70">
            AI Shopping Assistant • Always online
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-300px)] px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-ocid="assistant.panel"
                >
                  {msg.role === "bot" && (
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-2 text-sm"
                      style={{ background: "oklch(0.55 0.22 295 / 0.15)" }}
                    >
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-white rounded-br-sm"
                        : "bg-white shadow-sm border text-gray-800 rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.62 0.25 345))",
                          }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start items-end gap-2"
                data-ocid="assistant.loading_state"
              >
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                  style={{ background: "oklch(0.55 0.22 295 / 0.15)" }}
                >
                  🤖
                </div>
                <div className="bg-white shadow-sm border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <div
                    className="w-2 h-2 rounded-full typing-dot"
                    style={{ background: "oklch(0.55 0.22 295)" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full typing-dot"
                    style={{ background: "oklch(0.55 0.22 295)" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full typing-dot"
                    style={{ background: "oklch(0.55 0.22 295)" }}
                  />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="bg-white border-t shadow-lg px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_REPLIES.map((qr) => (
              <button
                type="button"
                key={qr}
                onClick={() => sendMessage(qr)}
                className="px-3 py-1.5 text-xs rounded-full border transition-colors"
                style={{
                  borderColor: "oklch(0.55 0.22 295)",
                  color: "oklch(0.55 0.22 295)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.55 0.22 295)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "oklch(0.55 0.22 295)";
                }}
                data-ocid="assistant.button"
              >
                {qr}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Ask ShopBot anything about products, prices, delivery..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage(input)
              }
              className="flex-1 rounded-xl"
              data-ocid="assistant.input"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="rounded-xl text-white"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 295), oklch(0.7 0.22 50))",
              }}
              data-ocid="assistant.primary_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
