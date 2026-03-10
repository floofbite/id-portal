"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultLang,
  readStoredLanguage,
  saveLanguage,
  t,
  type Language,
} from "./index";

export function useTranslations() {
  const [language, setLanguageState] = useState<Language>(defaultLang);

  useEffect(() => {
    setLanguageState(readStoredLanguage());
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    saveLanguage(nextLanguage);
  }, []);

  const translate = useCallback(
    (key: string, params?: Record<string, string>) => t(key, language, params),
    [language]
  );

  return useMemo(
    () => ({ t: translate, language, setLanguage }),
    [translate, language, setLanguage]
  );
}
