import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
// @ts-ignore — JSX modules
import { CartProvider } from "./context/CartContext";
// @ts-ignore
import { WishlistProvider } from "./context/WishlistContext";
// @ts-ignore
import { UIProvider } from "./context/UIContext";
// @ts-ignore
import AnnouncementBar from "./components/AnnouncementBar";
// @ts-ignore
import Navbar from "./components/Navbar";
// @ts-ignore
import Footer from "./components/Footer";
// @ts-ignore
import Newsletter from "./components/Newsletter";
// @ts-ignore
import SearchOverlay from "./components/SearchOverlay";
// @ts-ignore
import QuickViewModal from "./components/QuickViewModal";
// @ts-ignore
import CartDrawer from "./components/CartDrawer";
// @ts-ignore
import { ToastStack } from "./components/ui";
// @ts-ignore
import Home from "./pages/Home";
// @ts-ignore
import Collection from "./pages/Collection";
// @ts-ignore
import ProductDetails from "./pages/ProductDetails";
// @ts-ignore
import Wishlist from "./pages/Wishlist";
// @ts-ignore
import Cart from "./pages/Cart";
// @ts-ignore
import Checkout from "./pages/Checkout";
// @ts-ignore
import Account from "./pages/Account";
// @ts-ignore
import Info from "./pages/Info";
// @ts-ignore
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <UIProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="flex min-h-dvh flex-col">
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/collection/:slug" element={<Collection />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/info/:topic" element={<Info />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Newsletter />
              <Footer />
            </div>
            <SearchOverlay />
            <QuickViewModal />
            <CartDrawer />
            <ToastStack />
          </HashRouter>
        </UIProvider>
      </CartProvider>
    </WishlistProvider>
  );
}