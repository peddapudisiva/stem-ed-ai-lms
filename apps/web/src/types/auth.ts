export type Role = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string;
  avatarUrl?: string;
}

export interface DemoCredentials {
  email: string;
  role: Role;
}
