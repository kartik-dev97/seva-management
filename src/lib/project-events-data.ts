import { Event, EventStatus, EventRole } from './types';

export interface ProjectEvent extends Event {
    type?: string;
    attendeesCount?: number;
    priority?: string;
}

export const projectEventData: ProjectEvent[] = [
  {
    id: 'pe-1',
    title: 'Quarterly Review Meeting',
    description: 'Review project progress with all stakeholders and plan next quarter activities.',
    status: EventStatus.UPCOMING,
    type: 'Meeting',
    startDate: new Date('2026-04-05T10:00:00'),
    endDate: new Date('2026-04-05T12:00:00'),
    location: 'Conference Room A',
    attendeesCount: 15,
    priority: 'High',
    budget: 5000,
    spent: 0,
    tags: ['Review', 'Strategy'],
    createdBy: 'user-1',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
    attendees: [
      { userId: 'user-1', role: EventRole.ORGANIZER, confirmedAt: new Date() },
      { userId: 'user-2', role: EventRole.PARTICIPANT, confirmedAt: new Date() },
      { userId: 'user-3', role: EventRole.PARTICIPANT, confirmedAt: new Date() }
    ]
  },
  {
    id: 'pe-2',
    title: 'Volunteer Training Workshop',
    description: 'Training session for new volunteers joining the project.',
    status: EventStatus.UPCOMING,
    type: 'Workshop',
    startDate: new Date('2026-04-10T09:00:00'),
    endDate: new Date('2026-04-10T17:00:00'),
    location: 'Training Center',
    attendeesCount: 25,
    priority: 'Medium',
    budget: 12000,
    spent: 4500,
    tags: ['Training', 'Volunteers'],
    createdBy: 'user-1',
    createdAt: new Date('2026-03-05'),
    updatedAt: new Date('2026-03-05'),
    attendees: []
  },
  {
    id: 'pe-3',
    title: 'Community Outreach Event',
    description: 'Engaging with local community for awareness and participation.',
    status: EventStatus.UPCOMING,
    type: 'Event',
    startDate: new Date('2026-04-15T08:00:00'),
    endDate: new Date('2026-04-15T18:00:00'),
    location: 'Community Center',
    attendeesCount: 100,
    priority: 'High',
    budget: 25000,
    spent: 8000,
    tags: ['Outreach', 'Community'],
    createdBy: 'user-2',
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-10'),
    attendees: []
  },
  {
    id: 'pe-4',
    title: 'Team Sync Meeting',
    description: 'Weekly sync with project team to discuss updates and blockers.',
    status: EventStatus.COMPLETED,
    type: 'Meeting',
    startDate: new Date('2026-03-15T11:00:00'),
    endDate: new Date('2026-03-15T12:00:00'),
    location: 'Virtual - Zoom',
    attendeesCount: 8,
    priority: 'Low',
    budget: 0,
    spent: 0,
    tags: ['Team', 'Sync'],
    createdBy: 'user-1',
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
    attendees: []
  },
  {
    id: 'pe-5',
    title: 'Donor Appreciation Dinner',
    description: 'Annual dinner to thank and recognize our project donors.',
    status: EventStatus.COMPLETED,
    type: 'Event',
    startDate: new Date('2026-03-01T19:00:00'),
    endDate: new Date('2026-03-01T22:00:00'),
    location: 'Grand Ballroom, Taj Hotel',
    attendeesCount: 50,
    priority: 'High',
    budget: 45000,
    spent: 42000,
    tags: ['Donor', 'Event'],
    createdBy: 'user-1',
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-15'),
    attendees: []
  },
  {
    id: 'pe-6',
    title: 'Site Visit - Field Assessment',
    description: 'Assessment visit to project implementation sites.',
    status: EventStatus.COMPLETED,
    type: 'Visit',
    startDate: new Date('2026-02-20T08:00:00'),
    endDate: new Date('2026-02-20T17:00:00'),
    location: 'Rural District Sites',
    attendeesCount: 6,
    priority: 'Medium',
    budget: 8000,
    spent: 7200,
    tags: ['Field', 'Visit'],
    createdBy: 'user-5',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
    attendees: []
  },
];

export function getProjectEventById(id: string) {
  return projectEventData.find(e => e.id === id);
}
