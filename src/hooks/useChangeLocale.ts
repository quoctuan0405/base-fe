import { useRouter } from 'next/router';
import { SupportedLanguage } from '../../next-i18next';

export const useChangeLocale = () => {
  const router = useRouter();

  const changeLocale = (newLocale: SupportedLanguage) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  return changeLocale;
};
