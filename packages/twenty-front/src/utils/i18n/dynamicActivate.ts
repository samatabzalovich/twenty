import { i18n } from '@lingui/core';
import { APP_LOCALES, DEFAULT_LOCALE } from 'twenty-shared/translations';

export const dynamicActivate = async (locale: keyof typeof APP_LOCALES) => {
  if (!Object.values(APP_LOCALES).includes(locale)) {
    // oxlint-disable-next-line no-console
    console.warn(`Invalid locale "${locale}", defaulting to "${DEFAULT_LOCALE}"`);
    locale = DEFAULT_LOCALE;
  }
  const { messages } = await import(`../../locales/generated/${locale}.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
};
