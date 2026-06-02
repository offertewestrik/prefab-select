import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Lock, Check, ChevronDown, ChevronUp } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Toggles state
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('prefabCookieConsent');
    const savedSettings = localStorage.getItem('prefabCookieSettings');
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setAnalytics(parsed.analytics ?? true);
        setMarketing(parsed.marketing ?? true);
      } catch (e) {
        // Fallback
      }
    }

    // To ensure you can preview, test, and view the cookie block immediately,
    // we show the banner by default on page load.
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 800);

    const handleOpen = () => {
      setShowBanner(true);
      setShowDetails(true); // Open settings view when they manually click from footer
    };

    window.addEventListener('openPrefabCookieConsent', handleOpen);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('openPrefabCookieConsent', handleOpen);
    };
  }, []);

  const saveConsent = (analyticsAccepted: boolean, marketingAccepted: boolean) => {
    localStorage.setItem(
      'prefabCookieSettings',
      JSON.stringify({ analytics: analyticsAccepted, marketing: marketingAccepted })
    );

    const overallConsent = marketingAccepted ? 'accepted' : 'declined';
    localStorage.setItem('prefabCookieConsent', overallConsent);
    
    setShowBanner(false);
    
    window.dispatchEvent(new Event('prefabCookieConsentChanged'));
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent(true, true);
  };

  const handleDeclineAll = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent(false, false);
  };

  const handleAcceptSelection = () => {
    saveConsent(analytics, marketing);
  };

  if (!showBanner) return null;

  return (
    <div 
      id="cookie-consent-floating"
      className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-[420px] w-auto z-[9999] animate-fade-in-up"
    >
      <div 
        id="cookie-floating-card"
        className="bg-white rounded-[2rem] border border-slate-100 p-5 md:p-6 shadow-[0_25px_60px_rgba(29,78,216,0.12)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_30px_70px_rgba(29,78,216,0.18)]"
      >
        {/* Subtle premium blue branding top strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-950 via-blue-600 to-blue-400" />
        
        {/* Main Minimal Header */}
        <div className="flex items-center gap-3 mb-3 mt-1">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
            <Cookie size={18} className="stroke-[2.5]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[12px] font-display font-black uppercase tracking-wider text-blue-950">
              Cookie Instellingen
            </h3>
            <p className="text-[9px] text-slate-400 font-sans tracking-wide">
              Prefab Select respecteert uw privacy
            </p>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex-shrink-0">
            <ShieldCheck size={11} />
            <span>AVG</span>
          </div>
        </div>

        {/* Shortened contextual text */}
        <p className="text-[11px] text-slate-500 leading-relaxed mb-4 text-justify font-medium">
          Wij gebruiken cookies om uw surfervaring te analyseren, de website te optimaliseren en relevante advertenties te tonen via Meta Pixel.
        </p>

        {/* COLLAPSIBLE PREFERENCES ACCORDION */}
        <div className="mb-4">
          <button 
            id="btn-toggle-cookie-settings"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full py-2 px-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
          >
            <span>Instellingen beheren</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showDetails && (
            <div className="mt-2.5 space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {/* Category 1: Functioneel */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50/55 rounded-xl border border-slate-100">
                <div className="flex items-start gap-2 max-w-[70%]">
                  <div className="p-1 bg-slate-100 text-slate-400 rounded-md mt-0.5">
                    <Lock size={12} />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-black uppercase tracking-wider text-blue-950 block">
                      Functioneel
                    </span>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Vereiste basisfuncties.
                    </p>
                  </div>
                </div>
                <div className="relative inline-flex items-center justify-center p-0.5 w-9 h-5 bg-blue-600 rounded-full opacity-60">
                  <Check size={8} className="text-white absolute right-1 stroke-[3]" />
                  <span className="w-3.5 h-3.5 bg-white rounded-full transform translate-x-2" />
                </div>
              </div>

              {/* Category 2: Analytics */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50/55 rounded-xl border border-slate-100">
                <div className="flex items-start gap-2 max-w-[70%]">
                  <div className="p-1 bg-slate-100 text-emerald-500 rounded-md mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full block" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-black uppercase tracking-wider text-blue-950 block">
                      Analytisch
                    </span>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Anonieme website-statistieken.
                    </p>
                  </div>
                </div>
                <button
                  id="switch-cookie-analytics"
                  onClick={() => setAnalytics(!analytics)}
                  className={`relative inline-flex items-center h-5 rounded-full w-9 cursor-pointer transition-colors duration-300 ${
                    analytics ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform duration-300 ${
                    analytics ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Category 3: Marketing */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50/55 rounded-xl border border-slate-100">
                <div className="flex items-start gap-2 max-w-[70%]">
                  <div className="p-1 bg-slate-100 text-blue-500 rounded-md mt-0.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full block" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-black uppercase tracking-wider text-blue-950 block">
                      Marketing & Sociale
                    </span>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Voor Meta Pixel & advertenties.
                    </p>
                  </div>
                </div>
                <button
                  id="switch-cookie-marketing"
                  onClick={() => setMarketing(!marketing)}
                  className={`relative inline-flex items-center h-5 rounded-full w-9 cursor-pointer transition-colors duration-300 ${
                    marketing ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform duration-300 ${
                    marketing ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Buttons layout based on expanded details state */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              id="btn-cookie-deny-floating"
              onClick={handleDeclineAll}
              className="flex-1 border text-slate-600 bg-slate-50 hover:bg-slate-100 hover:border-slate-200 rounded-xl py-2 px-3 font-black uppercase tracking-widest text-[9px] transition-all duration-200 cursor-pointer text-center"
            >
              Weigeren
            </button>
            
            {showDetails ? (
              <button
                id="btn-cookie-save-selection"
                onClick={handleAcceptSelection}
                className="flex-1 border-2 border-blue-950 text-blue-950 hover:bg-blue-950/5 rounded-xl py-1.5 px-3 font-black uppercase tracking-widest text-[9px] transition-all duration-200 cursor-pointer text-center"
              >
                Sla selectie op
              </button>
            ) : (
              <button
                id="btn-cookie-settings-inline"
                onClick={() => setShowDetails(true)}
                className="flex-1 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl py-2 px-3 font-black uppercase tracking-widest text-[9px] transition-all duration-200 cursor-pointer text-center"
              >
                Beheren
              </button>
            )}
          </div>

          <button
            id="btn-cookie-accept-all-floating"
            onClick={handleAcceptAll}
            className="w-full bg-blue-950 hover:bg-blue-900 text-white rounded-xl py-2.5 px-4 font-black uppercase tracking-widest text-[9px] shadow-[0_10px_20px_rgba(23,37,84,0.15)] transition-all duration-200 cursor-pointer text-center"
          >
            Alle cookies accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
