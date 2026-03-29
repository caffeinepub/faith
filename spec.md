# PriceHunt - E-Commerce Price Comparison & Marketplace

## Current State
New project. No existing files.

## Requested Changes (Diff)

### Add
- **Login/Signup page**: Interactive auth page with name, email, password, phone number, full address fields. Animated, colorful design.
- **Price Comparison page**: Search for a product and see simulated price results from Amazon, Flipkart, Meesho, Ajio, Snapdeal with price, delivery time, ratings, and a "Buy Now" link button for each platform.
- **Marketplace / Sell page**: Sellers can upload a product with image, name, description, price, category, delivery estimate. Buyers can browse and purchase listed products.
- **AI Assistant page**: Chat interface with an AI assistant that helps users find deals, compare products, and answer shopping questions (simulated responses with smart pre-built Q&A + keyword matching).
- **Navigation**: Top navbar with links to all 4 pages, user profile display after login.

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: User profiles (signup/login), product listings (create/read), marketplace orders (buy intent), price comparison data (simulated per product query)
2. Frontend pages: Login/Signup, Price Comparison, Marketplace, AI Assistant
3. Components: authorization (login/signup), blob-storage (product image uploads), http-outcalls (optional for real pricing, use simulated fallback)
4. Auth gate: price comparison and marketplace require login
5. AI assistant: rule-based response system with shopping context
