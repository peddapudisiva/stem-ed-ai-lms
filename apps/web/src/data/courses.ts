import type { Course } from '../types/course';

export const DEMO_COURSES: Record<string, Course> = {
  'cs-101': {
    id: 'cs-101',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    description: 'Foundations of programming, algorithms, and computational thinking using Python.',
    teacherId: 'usr_teacher_001',
    credits: 3.0,
    department: 'Computer Science',
    standards: [
      { id: 'std-cs-1', code: 'CSTA 1A-AP-08', description: 'Model daily processes by creating and following algorithms' },
      { id: 'std-cs-2', code: 'CSTA 1A-AP-09', description: 'Model the way programs store and manipulate data' },
      { id: 'std-cs-3', code: 'CSTA 1B-AP-10', description: 'Create programs that include sequences, events, loops, and conditionals' }
    ]
  },
  'math-201': {
    id: 'math-201',
    name: 'AP Calculus AB',
    code: 'MATH201',
    description: 'Advanced placement calculus covering limits, derivatives, integrals, and the Fundamental Theorem of Calculus.',
    teacherId: 'usr_teacher_001',
    credits: 4.0,
    department: 'Mathematics',
    standards: [
      { id: 'std-ma-1', code: 'LIM-1', description: 'Reasoning with definitions, theorems, and properties' },
      { id: 'std-ma-2', code: 'CHA-1', description: 'Derivative at a point and as a function' },
      { id: 'std-ma-3', code: 'FUN-1', description: 'Limits and Continuity' }
    ]
  },
  'eng-101': {
    id: 'eng-101',
    name: 'English Literature and Composition',
    code: 'ENG101',
    description: 'Reading, analyzing, and writing about imaginative literature.',
    teacherId: 'usr_teacher_002',
    credits: 3.0,
    department: 'Language Arts',
    standards: [
      { id: 'std-eng-1', code: 'RL.9-10.1', description: 'Cite strong and thorough textual evidence' },
      { id: 'std-eng-2', code: 'RL.9-10.2', description: 'Determine a theme or central idea of a text' }
    ]
  },
  'sci-101': {
    id: 'sci-101',
    name: 'Biology',
    code: 'SCI101',
    description: 'Study of living organisms, their origins, how they survive, reproduce, change over time, and interact with each other.',
    teacherId: 'usr_teacher_003',
    credits: 4.0,
    department: 'Science',
    standards: [
      { id: 'std-sci-1', code: 'HS-LS1-1', description: 'Construct an explanation based on evidence for how the structure of DNA determines the structure of proteins' },
      { id: 'std-sci-2', code: 'HS-LS1-2', description: 'Develop and use a model to illustrate the hierarchical organization of interacting systems' }
    ]
  }
};
