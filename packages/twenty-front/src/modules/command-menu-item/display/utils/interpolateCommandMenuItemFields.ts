import { i18n } from '@lingui/core';
import { APP_LOCALES } from 'twenty-shared/translations';
import { type CommandMenuContextApi, type Nullable } from 'twenty-shared/types';
import {
  interpolateCommandMenuItemTemplate,
  isDefined,
} from 'twenty-shared/utils';
import { type CommandMenuItemFieldsFragment } from '~/generated-metadata/graphql';

type InterpolatedCommandMenuItemFields = {
  iconKey: Nullable<string>;
  label: string;
  shortLabel: Nullable<string>;
};

const COMMAND_MENU_LABELS_RU: Record<string, string> = {
  'Export View': 'Экспорт представления',
  'Create View': 'Создать представление',
  Search: 'Поиск',
  'Ask AI': 'Спросить AI',
  'View Previous AI Chats': 'Предыдущие чаты AI',
  'Compose Email': 'Написать письмо',
  'Compose Campaign': 'Создать кампанию',
  'Go to Settings': 'Перейти в настройки',
  'Go to Experience Settings': 'Настройки оформления',
  'Go to Accounts Settings': 'Настройки аккаунтов',
  'Go to Emails Settings': 'Настройки почты',
  'Go to Calendars Settings': 'Настройки календарей',
  'Go to General Settings': 'Общие настройки',
  'Go to Data Model Settings': 'Настройки модели данных',
  'Go to Members Settings': 'Настройки участников',
  'Go to Roles Settings': 'Настройки ролей',
  'Go to Domains Settings': 'Настройки доменов',
  'Go to Billing Settings': 'Настройки биллинга',
  'Go to APIs & Webhooks Settings': 'Настройки API и вебхуков',
  'Go to Apps Settings': 'Настройки приложений',
  'Go to AI Settings': 'Настройки AI',
  'Go to Security Settings': 'Настройки безопасности',
  'Go to Admin Panel Settings': 'Панель администратора',
  'Go to Community Settings': 'Настройки сообщества',
  'Add to Favorites': 'Добавить в избранное',
  'Remove from Favorites': 'Убрать из избранного',
  'Export to PDF': 'Экспорт в PDF',
  'Edit Layout': 'Редактировать макет',
  'Edit Dashboard': 'Редактировать панель',
  'Save Dashboard': 'Сохранить панель',
  'Cancel Edition': 'Отменить изменения',
  'Duplicate Dashboard': 'Дублировать панель',
  'Activate Workflow': 'Активировать процесс',
  'Deactivate Workflow': 'Деактивировать процесс',
  'Discard Draft': 'Отменить черновик',
  'Test Workflow': 'Протестировать процесс',
  'See Active Version': 'Активная версия',
  'See Runs': 'Запуски',
  'See Versions History': 'История версий',
  'Add a Node': 'Добавить узел',
  'Tidy up Workflow': 'Упорядочить процесс',
  'Duplicate Workflow': 'Дублировать процесс',
  'See Version': 'Смотреть версию',
  'See Workflow': 'Смотреть процесс',
  Stop: 'Остановить',
  Retry: 'Повторить',
  'Use as Draft': 'Использовать как черновик',
  Reply: 'Ответить',
  'Send Email': 'Отправить письмо',
};

const COMMAND_MENU_TEMPLATE_PREFIXES_RU: Record<string, string> = {
  'New ${': 'Новый ${',
  'Go to ${': 'Перейти к: ${',
  'Import ${': 'Импорт: ${',
  'See deleted ${': 'Удалённые: ${',
  'Hide deleted ${': 'Скрыть удалённые: ${',
  'Export ${': 'Экспорт: ${',
  'Update ${': 'Обновить: ${',
  'Merge ${': 'Объединить: ${',
  'Delete ${': 'Удалить: ${',
  'Restore ${': 'Восстановить: ${',
  'Permanently destroy ${': 'Удалить навсегда: ${',
  'Create new ${': 'Создать: ${',
  'Navigate to next ${': 'К следующему: ${',
  'Navigate to previous ${': 'К предыдущему: ${',
};

// Server often resolves templates before the client sees them
const COMMAND_MENU_RESOLVED_PREFIXES_RU: Record<string, string> = {
  'Go to ': 'Перейти к: ',
  'New ': 'Новый ',
  'Import ': 'Импорт: ',
  'See deleted ': 'Удалённые: ',
  'Hide deleted ': 'Скрыть удалённые: ',
  'Create new ': 'Создать: ',
};

// Object plural labels that may still arrive in English after "Go to "
const COMMAND_MENU_OBJECT_LABELS_RU: Record<string, string> = {
  Companies: 'Компании',
  People: 'Контакты',
  Opportunities: 'Сделки',
  Notes: 'Заметки',
  Tasks: 'Задачи',
  Dashboards: 'Панели управления',
  Workflows: 'Рабочие процессы',
  Attachments: 'Вложения',
  'List Members': 'Участники списков',
  'List Member': 'Участник списка',
  Lists: 'Списки',
  Messages: 'Сообщения',
  'Message Threads': 'Потоки сообщений',
  'Message Participants': 'Участники сообщений',
  'Calendar Events': 'События календаря',
  'Calendar Event Participants': 'Участники события календаря',
  'Workspace Members': 'Участники рабочей области',
  'Timeline Activities': 'Хронология действий',
  'Workflow Runs': 'Запуски рабочего процесса',
  'Workflow Versions': 'Версии рабочего процесса',
  'Automated Triggers': 'Автоматизированные триггеры',
  Blocklists: 'Чёрные списки',
};

const isFeminineRussianNoun = (noun: string) => {
  const normalizedNoun = noun.trim().toLowerCase();

  return normalizedNoun.endsWith('а') || normalizedNoun.endsWith('я');
};

const applyRussianNewLabelGender = (label: string) => {
  const match = label.match(/^Новый (.+)$/);

  if (!isDefined(match)) {
    return label;
  }

  const noun = match[1];

  if (isFeminineRussianNoun(noun)) {
    return 'Новая ' + noun;
  }

  if (noun.toLowerCase().endsWith('о') || noun.toLowerCase().endsWith('е')) {
    return 'Новое ' + noun;
  }

  return label;
};

const translateCommandMenuTemplate = (template: string) => {
  const exactTranslation = COMMAND_MENU_LABELS_RU[template];

  if (isDefined(exactTranslation)) {
    return exactTranslation;
  }

  for (const [englishPrefix, translatedPrefix] of Object.entries(
    COMMAND_MENU_TEMPLATE_PREFIXES_RU,
  )) {
    if (template.startsWith(englishPrefix)) {
      return translatedPrefix + template.slice(englishPrefix.length);
    }
  }

  for (const [englishPrefix, translatedPrefix] of Object.entries(
    COMMAND_MENU_RESOLVED_PREFIXES_RU,
  )) {
    if (template.startsWith(englishPrefix)) {
      const remainder = template.slice(englishPrefix.length);

      return (
        translatedPrefix +
        (COMMAND_MENU_OBJECT_LABELS_RU[remainder] ?? remainder)
      );
    }
  }

  // Template path already rewrote "Go to ${...}" → "Перейти к: ${...}"
  // before interpolation; translate English object names left in the suffix
  for (const russianPrefix of [
    'Перейти к: ',
    'Новый ',
    'Новая ',
    'Новое ',
    'Импорт: ',
    'Удалённые: ',
    'Скрыть удалённые: ',
    'Создать: ',
  ]) {
    if (template.startsWith(russianPrefix)) {
      const remainder = template.slice(russianPrefix.length);
      const translatedRemainder = COMMAND_MENU_OBJECT_LABELS_RU[remainder];

      if (isDefined(translatedRemainder)) {
        return russianPrefix + translatedRemainder;
      }
    }
  }

  return COMMAND_MENU_OBJECT_LABELS_RU[template] ?? template;
};

const translateTemplateIfAvailable = (template: Nullable<string>) => {
  if (!isDefined(template) || template === '') {
    return template;
  }

  if (i18n.locale !== APP_LOCALES['ru-RU']) {
    return template;
  }

  return translateCommandMenuTemplate(template);
};

const finalizeRussianCommandMenuLabel = (label: string) => {
  return applyRussianNewLabelGender(translateCommandMenuTemplate(label));
};

export const interpolateCommandMenuItemFields = (
  item: CommandMenuItemFieldsFragment,
  commandMenuContextApi: CommandMenuContextApi,
): InterpolatedCommandMenuItemFields => {
  const iconKey = interpolateCommandMenuItemTemplate({
    label: item.icon,
    context: commandMenuContextApi,
  });

  const label =
    interpolateCommandMenuItemTemplate({
      label: translateTemplateIfAvailable(item.label),
      context: commandMenuContextApi,
    }) ?? item.label;

  const shortLabel = interpolateCommandMenuItemTemplate({
    label: translateTemplateIfAvailable(item.shortLabel),
    context: commandMenuContextApi,
  });

  const shouldLocalize = i18n.locale === APP_LOCALES['ru-RU'];

  return {
    iconKey,
    label: shouldLocalize ? finalizeRussianCommandMenuLabel(label) : label,
    shortLabel:
      shouldLocalize && isDefined(shortLabel)
        ? finalizeRussianCommandMenuLabel(shortLabel)
        : shortLabel,
  };
};
