import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/ConversionWidgets';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ComparePage from './pages/ComparePage';
import KeuzehulpPage from './pages/KeuzehulpPage';
import OffertePage from './pages/OffertePage';
import {
  OverOnsPage, OnderhoudPage, StoringsdienstPage, ZakelijkPage,
  InstallatieservicePage, FAQPage, ContactPage, BlogPage,
} from './pages/ContentPages';

const categorySlugs = [
  'cv-ketels', 'boilers', 'hybride-warmtepompen', 'thermostaten',
  'expansievaten', 'rookgasafvoer', 'installatiemateriaal', 'onderhoudscontracten',
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {categorySlugs.map((slug) => (
            <Route key={slug} path={`/${slug}`} element={<CategoryPage />} />
          ))}
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/vergelijken" element={<ComparePage />} />
          <Route path="/keuzehulp" element={<KeuzehulpPage />} />
          <Route path="/configurator" element={<Navigate to="/keuzehulp" replace />} />
          <Route path="/offerte" element={<OffertePage />} />
          <Route path="/over-ons" element={<OverOnsPage />} />
          <Route path="/onderhoud" element={<OnderhoudPage />} />
          <Route path="/storingsdienst" element={<StoringsdienstPage />} />
          <Route path="/zakelijk" element={<ZakelijkPage />} />
          <Route path="/installatieservice" element={<InstallatieservicePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
