import {
  User,
  UserRole,
  Department,
  Project,
  ProjectStatus,
  Event,
  EventStatus,
  EventRole,
  Task,
  TaskStatus,
  TaskPriority,
  TaskVisibility,
  Meeting,
  MeetingType,
  FileMetadata,
  FileCategory,
  Folder,
  Transaction,
  TransactionType,
  Budget,
  Notification,
  NotificationType,
  AttendanceRecord,
  AttendanceStatus,
  Activity,
  KPI,
  AIMessage,
  Thread,
  Message,
} from './types';

// Helper function to generate random date
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Users/Employees Data
export const users: User[] = [
  {
    id: 'user-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@seva.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.ADMIN,
    department: Department.ADMINISTRATION,
    phone: '+91 98765 43210',
    joinDate: new Date('2020-01-15'),
    status: 'active',
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@seva.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.HEAD,
    department: Department.PROGRAMS,
    phone: '+91 98765 43211',
    joinDate: new Date('2020-03-20'),
    status: 'active',
  },
  {
    id: 'user-3',
    name: 'Amit Patel',
    email: 'amit.patel@seva.org',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.MANAGER,
    department: Department.FINANCE,
    phone: '+91 98765 43212',
    joinDate: new Date('2021-06-10'),
    status: 'active',
  },
  {
    id: 'user-4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@seva.org',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.MANAGER,
    department: Department.HR,
    phone: '+91 98765 43213',
    joinDate: new Date('2021-08-15'),
    status: 'active',
  },
  {
    id: 'user-5',
    name: 'Vikram Singh',
    email: 'vikram.singh@seva.org',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.EMPLOYEE,
    department: Department.OPERATIONS,
    phone: '+91 98765 43214',
    joinDate: new Date('2022-01-20'),
    status: 'active',
  },
  {
    id: 'user-6',
    name: 'Anita Desai',
    email: 'anita.desai@seva.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.EMPLOYEE,
    department: Department.PROGRAMS,
    phone: '+91 98765 43215',
    joinDate: new Date('2022-03-10'),
    status: 'active',
  },
  {
    id: 'user-7',
    name: 'Karan Malhotra',
    email: 'karan.malhotra@seva.org',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.VOLUNTEER,
    department: Department.FUNDRAISING,
    phone: '+91 98765 43216',
    joinDate: new Date('2023-05-15'),
    status: 'active',
  },
  {
    id: 'user-8',
    name: 'Meera Iyer',
    email: 'meera.iyer@seva.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.EMPLOYEE,
    department: Department.PROGRAMS,
    phone: '+91 98765 43217',
    joinDate: new Date('2022-09-01'),
    status: 'active',
  },
  {
    id: 'user-9',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@seva.org',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.EMPLOYEE,
    department: Department.OPERATIONS,
    phone: '+91 98765 43218',
    joinDate: new Date('2023-01-10'),
    status: 'active',
  },
  {
    id: 'user-10',
    name: 'Kavita Nair',
    email: 'kavita.nair@seva.org',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
    role: UserRole.VOLUNTEER,
    department: Department.PROGRAMS,
    phone: '+91 98765 43219',
    joinDate: new Date('2023-06-20'),
    status: 'active',
  },
];

// Projects Data
export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Rural Education Initiative',
    description: 'Providing quality education to rural communities through mobile learning centers and teacher training programs.',
    backgroundImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
    status: ProjectStatus.IN_PROGRESS,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    budget: 5000000,
    spent: 2750000,
    department: Department.PROGRAMS,
    lead: 'user-2',
    members: [
      { userId: 'user-2', role: 'Project Lead', joinedAt: new Date('2024-01-01') },
      { userId: 'user-6', role: 'Coordinator', joinedAt: new Date('2024-01-05') },
      { userId: 'user-8', role: 'Field Officer', joinedAt: new Date('2024-01-10') },
    ],
    tags: ['Education', 'Rural', 'Community'],
    progress: 55,
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'proj-2',
    title: 'Clean Water Project',
    description: 'Installing water purification systems in 50 villages to provide access to clean drinking water.',
    backgroundImage: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800&q=80',
    status: ProjectStatus.IN_PROGRESS,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-02-28'),
    budget: 8000000,
    spent: 4200000,
    department: Department.OPERATIONS,
    lead: 'user-5',
    members: [
      { userId: 'user-5', role: 'Project Lead', joinedAt: new Date('2024-03-01') },
      { userId: 'user-9', role: 'Engineer', joinedAt: new Date('2024-03-05') },
    ],
    tags: ['Water', 'Health', 'Infrastructure'],
    progress: 52,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'proj-3',
    title: 'Women Empowerment Program',
    description: 'Skill development and microfinance support for women entrepreneurs in underserved communities.',
    backgroundImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    status: ProjectStatus.IN_PROGRESS,
    startDate: new Date('2023-09-01'),
    endDate: new Date('2024-08-31'),
    budget: 3500000,
    spent: 2100000,
    department: Department.PROGRAMS,
    lead: 'user-2',
    members: [
      { userId: 'user-2', role: 'Project Lead', joinedAt: new Date('2023-09-01') },
      { userId: 'user-6', role: 'Training Coordinator', joinedAt: new Date('2023-09-05') },
      { userId: 'user-10', role: 'Volunteer', joinedAt: new Date('2023-10-01') },
    ],
    tags: ['Women', 'Empowerment', 'Skills'],
    progress: 60,
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'proj-4',
    title: 'Healthcare Outreach',
    description: 'Mobile health clinics providing medical services and health awareness in remote areas.',
    backgroundImage: 'https://images.unsplash.com/photo-1584515933487-9d3005c010aa?w=800&q=80',
    status: ProjectStatus.PLANNING,
    startDate: new Date('2026-02-01'),
    endDate: new Date('2027-01-31'),
    budget: 6000000,
    spent: 450000,
    department: Department.PROGRAMS,
    lead: 'user-2',
    members: [
      { userId: 'user-2', role: 'Project Lead', joinedAt: new Date('2026-01-10') },
    ],
    tags: ['Healthcare', 'Mobile', 'Rural'],
    progress: 8,
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'proj-5',
    title: 'Digital Literacy Campaign',
    description: 'Teaching basic computer skills and digital literacy to youth and adults in rural areas.',
    backgroundImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    status: ProjectStatus.COMPLETED,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    budget: 2000000,
    spent: 1950000,
    department: Department.PROGRAMS,
    lead: 'user-6',
    members: [
      { userId: 'user-6', role: 'Project Lead', joinedAt: new Date('2023-01-01') },
      { userId: 'user-8', role: 'Trainer', joinedAt: new Date('2023-01-15') },
    ],
    tags: ['Education', 'Technology', 'Youth'],
    progress: 100,
    createdAt: new Date('2022-11-01'),
    updatedAt: new Date('2024-01-05'),
  },
];

// Events Data
export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Annual Fundraising Gala',
    description: 'Fundraising event to support upcoming projects with donors and supporters.',
    projectId: undefined,
    status: EventStatus.UPCOMING,
    startDate: new Date('2026-02-15T18:00:00'),
    endDate: new Date('2026-02-15T22:00:00'),
    location: 'Grand Hotel, Mumbai',
    budget: 800000,
    spent: 350000,
    attendees: [
      { userId: 'user-1', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-2', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-3', role: EventRole.PARTICIPANT },
    ],
    tags: ['Fundraising', 'Networking'],
    color: '#3b82f6',
    createdBy: 'user-1',
    createdAt: new Date('2025-12-01'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'event-2',
    title: 'Teacher Training Workshop',
    description: 'Training session for teachers in modern pedagogy and digital teaching tools.',
    projectId: 'proj-1',
    status: EventStatus.UPCOMING,
    startDate: new Date('2026-01-25T09:00:00'),
    endDate: new Date('2026-01-27T17:00:00'),
    location: 'Seva Training Center, Pune',
    budget: 150000,
    spent: 95000,
    attendees: [
      { userId: 'user-2', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-6', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-8', role: EventRole.VOLUNTEER, confirmedAt: new Date() },
    ],
    tags: ['Education', 'Training'],
    color: '#10b981',
    createdBy: 'user-2',
    createdAt: new Date('2025-11-20'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'event-3',
    title: 'Community Health Camp',
    description: 'Free health checkup camp with medical professionals for village communities.',
    projectId: 'proj-4',
    status: EventStatus.UPCOMING,
    startDate: new Date('2026-02-05T08:00:00'),
    endDate: new Date('2026-02-05T16:00:00'),
    location: 'Village Panchayat, Satara',
    budget: 75000,
    spent: 45000,
    attendees: [
      { userId: 'user-2', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-5', role: EventRole.VOLUNTEER, confirmedAt: new Date() },
    ],
    tags: ['Healthcare', 'Community'],
    color: '#ef4444',
    createdBy: 'user-2',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'event-4',
    title: 'Water System Inauguration',
    description: 'Official inauguration of newly installed water purification system in village.',
    projectId: 'proj-2',
    status: EventStatus.UPCOMING,
    startDate: new Date('2026-01-30T10:00:00'),
    endDate: new Date('2026-01-30T13:00:00'),
    location: 'Village Square, Nashik',
    budget: 50000,
    spent: 35000,
    attendees: [
      { userId: 'user-1', role: EventRole.CHIEF_GUEST, confirmedAt: new Date() },
      { userId: 'user-5', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-9', role: EventRole.PARTICIPANT, confirmedAt: new Date() },
    ],
    tags: ['Water', 'Inauguration'],
    color: '#06b6d4',
    createdBy: 'user-5',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'event-5',
    title: 'Women Entrepreneur Meet',
    description: 'Networking event for women beneficiaries to share experiences and learn from each other.',
    projectId: 'proj-3',
    status: EventStatus.COMPLETED,
    startDate: new Date('2026-01-10T14:00:00'),
    endDate: new Date('2026-01-10T18:00:00'),
    location: 'Community Hall, Kolhapur',
    budget: 40000,
    spent: 38000,
    attendees: [
      { userId: 'user-2', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-6', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-10', role: EventRole.VOLUNTEER, confirmedAt: new Date() },
    ],
    tags: ['Women', 'Networking'],
    color: '#ec4899',
    createdBy: 'user-2',
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2026-01-11'),
  },
];

// Tasks Data  
export const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Prepare annual budget report',
    description: '# Budget Report\n\nCompile comprehensive budget report for all projects including:\n- Expenditure analysis\n- Budget vs actual comparison\n- Forecast for next quarter',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    visibility: TaskVisibility.RESTRICTED,
    assigneeId: 'user-3',
    projectId: undefined,
    eventId: undefined,
    startDate: new Date('2026-01-10'),
    dueDate: new Date('2026-01-31'),
    tags: ['Finance', 'Report'],
    attachments: [
      {
        id: 'att-1',
        name: 'Q4_expenses.xlsx',
        url: '/files/q4_expenses.xlsx',
        type: 'spreadsheet',
        size: 524288,
        uploadedBy: 'user-3',
        uploadedAt: new Date('2026-01-15'),
      },
    ],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-1',
        content: 'Please include detailed breakdown for each project',
        createdAt: new Date('2026-01-16'),
      },
    ],
    subtasks: [
      { id: 'st-1', title: 'Collect Q4 data', isCompleted: true },
      { id: 'st-2', title: 'Format report', isCompleted: false },
      { id: 'st-3', title: 'Submit for review', isCompleted: false },
    ],
    progress: 33,
    createdBy: 'user-1',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'task-2',
    title: 'Organize teacher training materials',
    description: 'Prepare and organize all training materials, handouts, and digital resources for upcoming workshop.',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    visibility: TaskVisibility.PUBLIC,
    assigneeId: 'user-6',
    projectId: 'proj-1',
    eventId: 'event-2',
    startDate: new Date('2026-01-15'),
    dueDate: new Date('2026-01-23'),
    tags: ['Education', 'Training'],
    attachments: [],
    comments: [],
    subtasks: [
        { id: 'st-4', title: 'Print handouts', isCompleted: false },
        { id: 'st-5', title: 'Load tablets with software', isCompleted: false },
    ],
    progress: 0,
    createdBy: 'user-2',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'task-3',
    title: 'Coordinate with medical team',
    description: 'Contact and confirm availability of doctors and nurses for health camp.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
    visibility: TaskVisibility.PUBLIC,
    assigneeId: 'user-2',
    projectId: 'proj-4',
    eventId: 'event-3',
    startDate: new Date('2026-01-08'),
    dueDate: new Date('2026-01-20'),
    tags: ['Healthcare', 'Coordination'],
    attachments: [],
    comments: [
      {
        id: 'comment-2',
        userId: 'user-2',
        content: 'Confirmed 3 doctors and 5 nurses',
        createdAt: new Date('2026-01-19'),
      },
    ],
    subtasks: [
        { id: 'st-6', title: 'List required specialties', isCompleted: true },
        { id: 'st-7', title: 'Contact local hospitals', isCompleted: true },
        { id: 'st-8', title: 'Confirm logistics for travel', isCompleted: true },
    ],
    progress: 100,
    createdBy: 'user-2',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'task-4',
    title: 'Design fundraising brochure',
    description: 'Create attractive brochure highlighting Seva achievements and upcoming projects for gala event.',
    status: TaskStatus.IN_REVIEW,
    priority: TaskPriority.HIGH,
    visibility: TaskVisibility.PUBLIC,
    assigneeId: 'user-7',
    projectId: undefined,
    eventId: 'event-1',
    startDate: new Date('2026-01-05'),
    dueDate: new Date('2026-02-05'),
    tags: ['Fundraising', 'Design'],
    attachments: [
      {
        id: 'att-2',
        name: 'brochure_draft_v2.pdf',
        url: '/files/brochure_draft_v2.pdf',
        type: 'document',
        size: 2097152,
        uploadedBy: 'user-7',
        uploadedAt: new Date('2026-01-18'),
      },
    ],
    comments: [
      {
        id: 'comment-3',
        userId: 'user-1',
        content: 'Looks great! Just minor edits needed on page 3.',
        createdAt: new Date('2026-01-19'),
      },
    ],
    subtasks: [
        { id: 'st-9', title: 'Draft content', isCompleted: true },
        { id: 'st-10', title: 'First design draft', isCompleted: true },
        { id: 'st-11', title: 'Review by stakeholders', isCompleted: false },
    ],
    progress: 66,
    createdBy: 'user-1',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'task-5',
    title: 'Update employee attendance records',
    description: 'Review and update attendance records for December 2025.',
    status: TaskStatus.BLOCKED,
    priority: TaskPriority.MEDIUM,
    visibility: TaskVisibility.RESTRICTED,
    assigneeId: 'user-4',
    projectId: undefined,
    eventId: undefined,
    startDate: new Date('2026-01-05'),
    dueDate: new Date('2026-01-15'),
    tags: ['HR', 'Attendance'],
    attachments: [],
    comments: [
      {
        id: 'comment-4',
        userId: 'user-4',
        content: 'Waiting for final approvals from department heads',
        createdAt: new Date('2026-01-14'),
      },
    ],
    subtasks: [
        { id: 'st-12', title: 'Extract logs from biometric', isCompleted: true },
        { id: 'st-13', title: 'Verify manual entries', isCompleted: false },
    ],
    progress: 50,
    createdBy: 'user-4',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-14'),
  },
];

// KPIs for Dashboard
export const kpis: KPI[] = [
  {
    id: 'kpi-1',
    label: 'Active Projects',
    value: 3,
    change: 15,
    trend: 'up',
    icon: 'FolderKanban',
  },
  {
    id: 'kpi-2',
    label: 'Upcoming Events',
    value: 4,
    change: 25,
    trend: 'up',
    icon: 'Calendar',
  },
  {
    id: 'kpi-3',
    label: 'Team Members',
    value: 10,
    change: 0,
    trend: 'neutral',
    icon: 'Users',
  },
  {
    id: 'kpi-4',
    label: 'Budget Utilization',
    value: 58,
    change: -5,
    trend: 'down',
    icon: 'TrendingUp',
  },
];

// Recent Activities
export const activities: Activity[] = [
  {
    id: 'act-1',
    userId: 'user-2',
    type: 'task',
    action: 'completed',
    targetId: 'task-3',
    targetName: 'Coordinate with medical team',
    timestamp: new Date('2026-01-19T14:30:00'),
  },
  {
    id: 'act-2',
    userId: 'user-7',
    type: 'task',
    action: 'submitted for review',
    targetId: 'task-4',
    targetName: 'Design fundraising brochure',
    timestamp: new Date('2026-01-18T16:20:00'),
  },
  {
    id: 'act-3',
    userId: 'user-5',
    type: 'event',
    action: 'created',
    targetId: 'event-4',
    targetName: 'Water System Inauguration',
    timestamp: new Date('2026-01-18T11:00:00'),
  },
  {
    id: 'act-4',
    userId: 'user-3',
    type: 'file',
    action: 'uploaded',
    targetId: 'att-1',
    targetName: 'Q4_expenses.xlsx',
    timestamp: new Date('2026-01-15T10:15:00'),
  },
  {
    id: 'act-5',
    userId: 'user-1',
    type: 'project',
    action: 'updated',
    targetId: 'proj-1',
    targetName: 'Rural Education Initiative',
    timestamp: new Date('2026-01-15T09:00:00'),
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: NotificationType.TASK,
    title: 'Task Assigned',
    message: 'You have been assigned a new task: Organize teacher training materials',
    link: '/tasks/task-2',
    isRead: false,
    createdAt: new Date('2026-01-12T10:00:00'),
  },
  {
    id: 'notif-2',
    type: NotificationType.EVENT,
    title: 'Event Reminder',
    message: 'Teacher Training Workshop starts in 5 days',
    link: '/events/event-2',
    isRead: false,
    createdAt: new Date('2026-01-20T08:00:00'),
  },
  {
    id: 'notif-3',
    type: NotificationType.MESSAGE,
    title: 'New Message',
    message: 'Rajesh Kumar sent you a message',
    link: '/messages',
    isRead: true,
    createdAt: new Date('2026-01-19T15:30:00'),
  },
  {
    id: 'notif-4',
    type: NotificationType.SYSTEM,
    title: 'System Update',
    message: 'New features added: AI Assistant now available',
    link: '/ai-assistant',
    isRead: true,
    createdAt: new Date('2026-01-18T09:00:00'),
  },
];

// AI Chat History
export const aiChatHistory: AIMessage[] = [
  {
    id: 'ai-1',
    role: 'user',
    content: 'Show me budget analysis for Rural Education Initiative',
    timestamp: new Date('2026-01-18T14:00:00'),
  },
  {
    id: 'ai-2',
    role: 'assistant',
    content: 'Here is the budget analysis for the Rural Education Initiative project:',
    timestamp: new Date('2026-01-18T14:00:05'),
    attachments: [
      {
        type: 'chart',
        data: {
          budget: 5000000,
          spent: 2750000,
          remaining: 2250000,
          categories: [
            { name: 'Training', spent: 1200000, allocated: 2000000 },
            { name: 'Materials', spent: 800000, allocated: 1500000 },
            { name: 'Travel', spent: 450000, allocated: 800000 },
            { name: 'Other', spent: 300000, allocated: 700000 },
          ],
        },
      },
    ],
  },
];

// Meetings Data
export const meetings: Meeting[] = [
  {
    id: 'meet-1',
    title: 'Weekly Board Meeting',
    type: MeetingType.STANDALONE,
    startDate: new Date('2026-01-22T10:00:00'),
    endDate: new Date('2026-01-22T11:30:00'),
    location: 'Conference Room A',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    agenda: '1. Financial Review\n2. Project Progress\n3. New Proposals',
    notes: 'Q1 goals look on track.',
    participants: [
      { userId: 'user-1', isRequired: true, status: 'accepted' },
      { userId: 'user-2', isRequired: true, status: 'accepted' },
      { userId: 'user-3', isRequired: true, status: 'pending' },
    ],
    createdBy: 'user-1',
    createdAt: new Date('2026-01-15'),
  },
  {
    id: 'meet-2',
    title: 'Rural Education Strategy',
    type: MeetingType.PROJECT,
    projectId: 'proj-1',
    startDate: new Date('2026-01-25T14:00:00'),
    endDate: new Date('2026-01-25T15:00:00'),
    location: 'Zoom Internal',
    meetingLink: 'https://zoom.us/j/123456789',
    agenda: 'Reviewing curriculum for next quarter.',
    participants: [
      { userId: 'user-2', isRequired: true, status: 'accepted' },
      { userId: 'user-6', isRequired: true, status: 'accepted' },
    ],
    createdBy: 'user-2',
    createdAt: new Date('2026-01-18'),
  },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

// Helper function to get task by ID
export const getTaskById = (id: string): Task | undefined => {
  return tasks.find((task) => task.id === id);
};

// Helper function to get event by ID
export const getEventById = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
};

// Helper function to get meeting by ID
export const getMeetingById = (id: string): Meeting | undefined => {
  return meetings.find((meeting) => meeting.id === id);
};

// Helper function to get tasks by project
export const getTasksByProject = (projectId: string): Task[] => {
  return tasks.filter((task) => task.projectId === projectId);
};

// Helper function to get events by project
export const getEventsByProject = (projectId: string): Event[] => {
  return events.filter((event) => event.projectId === projectId);
};

// Helper function to get meetings by project
export const getMeetingsByProject = (projectId: string): Meeting[] => {
  return meetings.filter((meeting) => meeting.projectId === projectId);
};
// File Data
export const folders: Folder[] = [
  {
    id: 'f-1',
    name: 'Projects',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-01'),
    isSystem: true,
  },
  {
    id: 'f-2',
    name: 'Events',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-01'),
    isSystem: true,
  },
  {
    id: 'f-3',
    name: 'Rural Education Initiative',
    parentId: 'f-1',
    projectId: 'proj-1',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'f-4',
    name: 'Urban Literacy Drive',
    parentId: 'f-1',
    projectId: 'proj-2',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'f-5',
    name: 'Documentation',
    parentId: 'f-3',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-06'),
  },
  {
    id: 'f-6',
    name: 'Financials',
    parentId: 'f-3',
    createdBy: 'user-1',
    createdAt: new Date('2026-01-06'),
  },
];

export const files: FileMetadata[] = [
  {
    id: 'file-1',
    name: 'Project_Proposal_v1.pdf',
    category: FileCategory.DOCUMENT,
    size: 2456789,
    url: '#',
    projectId: 'proj-1',
    folderId: 'f-5',
    uploadedBy: 'user-1',
    uploadedAt: new Date('2026-01-10'),
    tags: ['Proposal', 'Important'],
    isStarred: true,
  },
  {
    id: 'file-2',
    name: 'Budget_Q1_Final.xlsx',
    category: FileCategory.SPREADSHEET,
    size: 156789,
    url: '#',
    projectId: 'proj-1',
    folderId: 'f-6',
    uploadedBy: 'user-2',
    uploadedAt: new Date('2026-01-12'),
    tags: ['Budget', 'Finance'],
  },
  {
    id: 'file-3',
    name: 'Site_Visit_Photo_1.jpg',
    category: FileCategory.IMAGE,
    size: 3456789,
    url: '#',
    projectId: 'proj-1',
    uploadedBy: 'user-3',
    uploadedAt: new Date('2026-01-15'),
    tags: ['Photos', 'Field'],
  },
];

// Helper functions for files
export const getFolders = () => folders;
export const getFiles = () => files;

export const getFilesByProject = (projectId: string) => 
  files.filter(f => f.projectId === projectId);

export const getFilesByFolder = (folderId: string) => 
  files.filter(f => f.folderId === folderId);
