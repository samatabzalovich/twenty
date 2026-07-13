import { type View } from '@/views/types/View';
import { translateStandardLabelIfNeeded } from '@/localization/utils/translate-standard-label-if-needed';
import { isDefined } from 'twenty-shared/utils';
import { type NavigationMenuItem } from '~/generated-metadata/graphql';

export const getViewNavigationMenuItemLabel = (
  item: Pick<NavigationMenuItem, 'viewId'>,
  views: Pick<View, 'id' | 'name' | 'objectMetadataId' | 'key'>[],
): string => {
  const view = views.find((viewItem) => viewItem.id === item.viewId);
  if (!isDefined(view)) {
    return '';
  }
  return translateStandardLabelIfNeeded(view.name);
};
