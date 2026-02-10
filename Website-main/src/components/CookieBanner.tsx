import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";

const CONSENT_KEY = "querit-cookie-consent";

type CookiePreferences = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
};

const CookieBanner = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  const content = {
    en: {
      title: "Cookies",
      description:
        "We use cookies to enable core functionality and improve the site. You can accept all, reject non-essential cookies, or manage your preferences.",
      acceptAll: "Accept all",
      rejectAll: "Reject",
      settings: "Preferences",
      save: "Save preferences",
      back: "Back",
      learnMore: "Read cookie policy",
      necessary: "Essential",
      necessaryDesc: "Required for core site functionality.",
      preferences: "Preferences",
      preferencesDesc: "Remember your choices and provide personalization.",
      analytics: "Analytics",
      analyticsDesc: "Help us understand how the site is used.",
      marketing: "Marketing",
      marketingDesc: "Used to deliver relevant content and measure campaigns.",
    },
    fi: {
      title: "Evästeet",
      description:
        "Käytämme evästeitä perustoimintojen varmistamiseen ja sivuston kehittämiseen. Voit hyväksyä kaikki, hylätä ei-välttämättömät tai hallita asetuksia.",
      acceptAll: "Hyväksy kaikki",
      rejectAll: "Hylkää",
      settings: "Valinnat",
      save: "Tallenna valinnat",
      back: "Takaisin",
      learnMore: "Lue evästekäytäntö",
      necessary: "Välttämättömät",
      necessaryDesc: "Tarvitaan sivuston perustoimintoihin.",
      preferences: "Mieltymykset",
      preferencesDesc: "Muistetaan valinnat ja personointi.",
      analytics: "Analytiikka",
      analyticsDesc: "Auttaa ymmärtämään, miten sivustoa käytetään.",
      marketing: "Markkinointi",
      marketingDesc: "Käytetään sisällön kohdentamiseen ja kampanjoiden mittaukseen.",
    },
  } as const;

  const t = content[language];

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      setIsVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as { prefs?: Partial<CookiePreferences> };
      if (parsed?.prefs) {
        setPreferences({ ...defaultPreferences, ...parsed.prefs, necessary: true });
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      const saved = localStorage.getItem(CONSENT_KEY);
      setIsVisible(!saved);
      setIsSettingsOpen(true);
    };

    window.addEventListener("cookie-settings-open", handleOpenSettings);
    return () => window.removeEventListener("cookie-settings-open", handleOpenSettings);
  }, []);

  const saveConsent = (nextPreferences: CookiePreferences, status: "accepted" | "rejected" | "custom") => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        status,
        prefs: nextPreferences,
        timestamp: new Date().toISOString(),
      })
    );
    setPreferences(nextPreferences);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent(
      {
        necessary: true,
        preferences: true,
        analytics: true,
        marketing: true,
      },
      "accepted"
    );
  };

  const handleRejectAll = () => {
    saveConsent(
      {
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false,
      },
      "rejected"
    );
  };

  const handleSave = () => {
    saveConsent(preferences, "custom");
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const preferenceRows = useMemo(
    () => [
      {
        key: "necessary",
        label: t.necessary,
        description: t.necessaryDesc,
        checked: true,
        disabled: true,
      },
      {
        key: "preferences",
        label: t.preferences,
        description: t.preferencesDesc,
        checked: preferences.preferences,
        onChange: (checked: boolean) =>
          setPreferences((prev) => ({ ...prev, preferences: checked })),
      },
      {
        key: "analytics",
        label: t.analytics,
        description: t.analyticsDesc,
        checked: preferences.analytics,
        onChange: (checked: boolean) =>
          setPreferences((prev) => ({ ...prev, analytics: checked })),
      },
      {
        key: "marketing",
        label: t.marketing,
        description: t.marketingDesc,
        checked: preferences.marketing,
        onChange: (checked: boolean) =>
          setPreferences((prev) => ({ ...prev, marketing: checked })),
      },
    ],
    [preferences.analytics, preferences.marketing, preferences.preferences, t]
  );

  if (!isVisible && !isSettingsOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      {isVisible ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-5 shadow-elevated backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              <Link
                to="/cookies"
                className="text-sm text-primary hover:underline w-fit"
              >
                {t.learnMore}
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button variant="outline" size="sm" onClick={handleRejectAll}>
                {t.rejectAll}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
                {t.settings}
              </Button>
              <Button variant="default" size="sm" onClick={handleAcceptAll}>
                {t.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {preferenceRows.map((row) => (
              <div key={row.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{row.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{row.description}</p>
                </div>
                <Switch
                  id={`cookie-${row.key}`}
                  checked={row.checked}
                  disabled={row.disabled}
                  onCheckedChange={row.onChange}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={handleCloseSettings}>
              {t.back}
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CookieBanner;
