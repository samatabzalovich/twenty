import { i18n } from '@lingui/core';

// Common metadata labels that may arrive from the API still in English
const STANDARD_LABELS_RU: Record<string, string> = {
  'All Tasks': 'Все задачи',
  'All Companies': 'Все компании',
  'All People': 'Все контакты',
  'All Opportunities': 'Все сделки',
  'All Notes': 'Все заметки',
  'All Dashboards': 'Все панели управления',
  'All Workflows': 'Все рабочие процессы',
  'By Status': 'По статусу',
  'By Stage': 'По стадии',
  'Assigned to Me': 'Назначено мне',
  'To do': 'К выполнению',
  Done: 'Готово',
  'In Progress': 'В работе',
  Workflows: 'Рабочие процессы',
  Workflow: 'Рабочий процесс',
  Screening: 'Квалификация',
  Meeting: 'Встреча',
  Proposal: 'КП',
  Customer: 'Клиент',
  'List Members': 'Участники списков',
  'List Member': 'Участник списка',
  Lists: 'Списки',
};

export const translateStandardLabelIfNeeded = (label: string): string => {
  if (i18n.locale !== 'ru-RU') {
    return label;
  }

  return STANDARD_LABELS_RU[label] ?? label;
};
