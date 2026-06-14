import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export function MetaPixel() {
  const location = useLocation();
  const pixelId = (import.meta as any).env.VITE_META_PIXEL_ID || '2695577824162463';
  const [consent, setConsent] = useState(() => localStorage.getItem('prefabCookieConsent'));

  useEffect(() => {
    const handleConsentChange = () => {
      setConsent(localStorage.getItem('prefabCookieConsent'));
    };

    window.addEventListener('prefabCookieConsentChanged', handleConsentChange);
    return () => {
      window.removeEventListener('prefabCookieConsentChanged', handleConsentChange);
    };
  }, []);

  useEffect(() => {
    if (!pixelId || consent !== 'accepted') {
      return;
    }

    // Initialize Meta Pixel tracking script if not already initialized
    if (!window.fbq) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      window.fbq('init', pixelId);
    }
  }, [pixelId, consent]);

  // Track standard PageView on every route change
  useEffect(() => {
    if (pixelId && consent === 'accepted' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, pixelId, consent]);

  return null;
}
