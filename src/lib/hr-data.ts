
export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    location: string;
    joinDate: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    managerId?: string;
    avatar?: string;
    performanceRating?: number; // 1-5
}

export const employees: Employee[] = [
    {
        id: 'EMP-001',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.k@seva.org',
        phone: '+91 98765 43210',
        role: 'Senior Project Manager',
        department: 'Operations',
        location: 'Mumbai HQ',
        joinDate: '2020-03-15',
        status: 'Active',
        performanceRating: 4.5,
    },
    {
        id: 'EMP-002',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.s@seva.org',
        phone: '+91 98765 43211',
        role: 'HR Director',
        department: 'Human Resources',
        location: 'Delhi',
        joinDate: '2019-06-01',
        status: 'Active',
        performanceRating: 4.8,
    },
    {
        id: 'EMP-003',
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'amit.p@seva.org',
        phone: '+91 98765 43212',
        role: 'Field Coordinator',
        department: 'Operations',
        location: 'Bangalore',
        joinDate: '2021-01-10',
        status: 'On Leave',
        performanceRating: 4.0,
    },
    {
        id: 'EMP-004',
        firstName: 'Sneha',
        lastName: 'Reddy',
        email: 'sneha.r@seva.org',
        phone: '+91 98765 43213',
        role: 'Finance Manager',
        department: 'Finance',
        location: 'Mumbai HQ',
        joinDate: '2022-05-20',
        status: 'Active',
        performanceRating: 4.2,
    },
    {
        id: 'EMP-005',
        firstName: 'Vikram',
        lastName: 'Singh',
        email: 'vikram.s@seva.org',
        phone: '+91 98765 43214',
        role: 'Software Engineer',
        department: 'Technology',
        location: 'Remote',
        joinDate: '2023-08-01',
        status: 'Active',
        performanceRating: 4.6,
    }
];

export const hrKPIs = {
    totalEmployees: 142,
    openPositions: 8,
    attritionRate: '4.2%',
    onLeaveToday: 5,
    upcomingPerformanceReviews: 12,
};
