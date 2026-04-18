export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'academic' | 'extracurricular' | 'holiday' | 'assignment';
  location?: string;
  courseId?: string;
}
