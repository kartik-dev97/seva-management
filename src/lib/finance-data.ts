
import { startOfYear, eachMonthOfInterval, format } from 'date-fns';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedBy: string;
}

export interface BudgetCategory {
    id: string;
    name: string;
    allocated: number;
    spent: number;
}

export const financeData = {
    totalBudget: 125000000,
    ytdSpent: 84500000,
    currency: 'INR',
    monthlyBurnDown: [
        { month: 'Jan', budget: 10000000, actual: 9500000 },
        { month: 'Feb', budget: 10000000, actual: 10200000 },
        { month: 'Mar', budget: 10000000, actual: 9800000 },
        { month: 'Apr', budget: 10000000, actual: 11000000 },
        { month: 'May', budget: 10000000, actual: 10500000 },
        { month: 'Jun', budget: 10000000, actual: 9900000 },
        { month: 'Jul', budget: 10000000, actual: 11500000 },
        { month: 'Aug', budget: 10000000, actual: 12100000 }, // Current-ish
    ],
    categories: [
        { id: '1', name: 'Personnel & Payroll', allocated: 60000000, spent: 45000000 },
        { id: '2', name: 'Project Operations', allocated: 30000000, spent: 21000000 },
        { id: '3', name: 'Logistics & Transport', allocated: 20000000, spent: 15000000 },
        { id: '4', name: 'Events & Marketing', allocated: 15000000, spent: 3500000 },
    ] as BudgetCategory[],
    transactions: [
        { id: 't1', date: '2024-08-15', description: 'Server Infrastructure Q3', amount: 450000, type: 'debit', category: 'Technology', status: 'approved', requestedBy: 'Dev Team' },
        { id: 't2', date: '2024-08-14', description: 'Logistics Fleet Maintenance', amount: 120000, type: 'debit', category: 'Logistics', status: 'approved', requestedBy: 'Fleet Mgr' },
        { id: 't3', date: '2024-08-12', description: 'Corporate Grant - CSR', amount: 1500000, type: 'credit', category: 'Revenue', status: 'approved', requestedBy: 'Sales' },
        { id: 't4', date: '2024-08-10', description: 'Annual Team Retreat Advance', amount: 500000, type: 'debit', category: 'Events', status: 'pending', requestedBy: 'HR' },
        { id: 't5', date: '2024-08-08', description: 'Project Alpha Material Cost', amount: 850000, type: 'debit', category: 'Projects', status: 'approved', requestedBy: 'Ops Lead' },
    ] as Transaction[]
};
