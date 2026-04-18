import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}

export function formatRelativeTime(dateString: string): string {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy h:mm a');
}
