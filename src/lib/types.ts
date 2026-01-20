// User and Employee Types
export enum UserRole {
  ADMIN = 'ADMIN',
  HEAD = 'HEAD',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  VOLUNTEER = 'VOLUNTEER',
}

export enum Department {
  ADMINISTRATION = 'Administration',
  FINANCE = 'Finance',
  HR = 'HR',
  OPERATIONS = 'Operations',
  PROGRAMS = 'Programs',
  FUNDRAISING = 'Fundraising',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  department: Department;
  phone?: string;
  joinDate: Date;
  status: 'active' | 'inactive';
}

// Project Types
export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface ProjectMember {
  userId: string;
  role: string;
  joinedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  backgroundImage?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  department: Department;
  lead: string; // userId
  members: ProjectMember[];
  tags: string[];
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

// Event Types
export enum EventStatus {
  UPCOMING = 'Upcoming',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum EventRole {
  ORGANIZER = 'Organizer',
  CHIEF_GUEST = 'Chief Guest',
  VOLUNTEER = 'Volunteer',
  PARTICIPANT = 'Participant',
}

export interface EventAttendee {
  userId: string;
  role: EventRole;
  confirmedAt?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  location: string;
  budget: number;
  spent: number;
  attendees: EventAttendee[];
  tags: string[];
  color?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task Types
export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  IN_REVIEW = 'In Review',
  COMPLETED = 'Completed',
  BLOCKED = 'Blocked',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

export enum TaskVisibility {
  PUBLIC = 'Public',
  RESTRICTED = 'Restricted',
  PRIVATE = 'Private',
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface TaskSubtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskComment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;
  assigneeId?: string;
  projectId?: string;
  eventId?: string;
  startDate?: Date;
  dueDate?: Date;
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  subtasks: TaskSubtask[];
  progress: number; // calculated from subtasks or set manually
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Meeting Types
export enum MeetingType {
  STANDALONE = 'Standalone',
  PROJECT = 'Project',
  EVENT = 'Event',
}

export interface MeetingParticipant {
  userId: string;
  isRequired: boolean;
  status: 'accepted' | 'declined' | 'pending';
}

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  projectId?: string;
  eventId?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  meetingLink?: string;
  agenda: string;
  notes?: string;
  participants: MeetingParticipant[];
  createdBy: string;
  createdAt: Date;
}

// File Types
export enum FileCategory {
  DOCUMENT = 'Document',
  IMAGE = 'Image',
  VIDEO = 'Video',
  SPREADSHEET = 'Spreadsheet',
  PRESENTATION = 'Presentation',
  OTHER = 'Other',
}

export interface FileMetadata {
  id: string;
  name: string;
  category: FileCategory;
  size: number;
  url: string;
  thumbnailUrl?: string;
  projectId?: string;
  eventId?: string;
  folderId?: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  isStarred?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  projectId?: string;
  eventId?: string;
  createdBy: string;
  createdAt: Date;
  isSystem?: boolean; // True for auto-generated folders like "Projects", "Events"
}

// Finance Types
export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  projectId?: string;
  eventId?: string;
  date: Date;
  createdBy: string;
}

export interface Budget {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  projectId?: string;
  eventId?: string;
  year: number;
  quarter?: number;
}

// Message Types
export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  attachments?: FileMetadata[];
  createdAt: Date;
  isRead: boolean;
}

export interface Thread {
  id: string;
  participants: string[]; // userIds
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export enum NotificationType {
  TASK = 'Task',
  EVENT = 'Event',
  MESSAGE = 'Message',
  SYSTEM = 'System',
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

// AI Assistant Types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'chart' | 'table' | 'pdf' | 'text';
    data: any;
  }[];
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: string;
  data: any;
  createdAt: Date;
}

// Attendance Types
export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  HALF_DAY = 'Half Day',
  LEAVE = 'Leave',
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: Date;
  status: AttendanceStatus;
  checkIn?: Date;
  checkOut?: Date;
  notes?: string;
}

// Vision Board Types
export interface VisionCard {
  id: string;
  type: 'text' | 'image' | 'link';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisionBoard {
  id: string;
  name: string;
  cards: VisionCard[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard KPI Types
export interface KPI {
  id: string;
  label: string;
  value: number;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// Activity Feed Types
export interface Activity {
  id: string;
  userId: string;
  type: 'project' | 'event' | 'task' | 'file' | 'meeting';
  action: string;
  targetId: string;
  targetName: string;
  timestamp: Date;
}
