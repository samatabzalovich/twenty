import { type FlatObjectMetadataItem } from '@/metadata-store/types/FlatObjectMetadataItem';
import { translateStandardLabelIfNeeded } from '@/localization/utils/translate-standard-label-if-needed';
import { isDefined } from 'twenty-shared/utils';

export const resolveViewNamePlaceholders = (
  viewName: string | undefined,
  objectMetadataItem: FlatObjectMetadataItem | undefined,
): string => {
  if (!isDefined(viewName) || !isDefined(objectMetadataItem)) {
    return translateStandardLabelIfNeeded(viewName ?? '');
  }

  const resolvedViewName = viewName
    .replace('{objectLabelPlural}', objectMetadataItem.labelPlural)
    .replace('{objectLabelSingular}', objectMetadataItem.labelSingular);

  return translateStandardLabelIfNeeded(resolvedViewName);
};
