import { i18n } from '@lingui/core';
import { translateStandardLabelIfNeeded } from '@/localization/utils/translate-standard-label-if-needed';
import { isDefined } from 'twenty-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const getFolderNavigationMenuItemLabel = (
  item: Pick<NavigationMenuItem, 'name'>,
): string => {
  const folderName = item.name;

  if (!isDefined(folderName) || folderName === '') {
    return 'Folder';
  }

  if (i18n.locale === 'ru-RU' && folderName === 'Workflows') {
    return 'Рабочие процессы';
  }

  return translateStandardLabelIfNeeded(folderName);
};
