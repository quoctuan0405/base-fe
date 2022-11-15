import { useRouter } from 'next/router';

export const supportedLanguages = ['en', 'vi'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];
export const defaultLanguage = 'vi';

export const useLocale = () => {
  const router = useRouter();

  const changeLocale = (newLocale: SupportedLanguage) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  const isSupportedLocale = (
    locale: string | undefined
  ): locale is SupportedLanguage => {
    if (locale && (supportedLanguages as readonly string[]).includes(locale)) {
      return true;
    } else {
      return false;
    }
  };

  let locale: SupportedLanguage = isSupportedLocale(router.locale)
    ? router.locale
    : defaultLanguage;

  return [locale, changeLocale] as const;
};
