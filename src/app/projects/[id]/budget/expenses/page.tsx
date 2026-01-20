import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ArrowLeft,
    Plus,
    Download,
    Filter,
    Search,
    Receipt,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

// Comprehensive expense data
const expenses = [
    {
        id: 'exp-1',
        date: new Date('2026-03-10'),
        description: 'Teacher training materials - workbooks, guides, stationery',
        category: 'Materials & Supplies',
        amount: 45000,
        status: 'approved',
        submittedBy: 'Priya Sharma',
        approvedBy: 'Rajesh Kumar',
        receipt: 'receipt_001.pdf',
        notes: 'Purchased from authorized vendor, included 50 workbooks'
    },
    {
        id: 'exp-2',
        date: new Date('2026-03-08'),
        description: 'Monthly salary - March 2026',
        category: 'Staff Salaries',
        amount: 280000,
        status: 'approved',
        submittedBy: 'Amit Patel',
        approvedBy: 'Rajesh Kumar',
        receipt: 'payroll_march.pdf',
        notes: '4 team members - regular payroll'
    },
    {
        id: 'exp-3',
        date: new Date('2026-03-05'),
        description: 'Vehicle fuel & maintenance for field visits',
        category: 'Transportation',
        amount: 18500,
        status: 'approved',
        submittedBy: 'Vikram Singh',
        approvedBy: 'Amit Patel',
        receipt: 'fuel_invoices.pdf',
        notes: 'Covered 3 field visits to rural schools'
    },
    {
        id: 'exp-4',
        date: new Date('2026-03-03'),
        description: 'Social media campaign - Facebook & Instagram ads',
        category: 'Marketing & Outreach',
        amount: 35000,
        status: 'pending',
        submittedBy: 'Meera Iyer',
        approvedBy: null,
        receipt: 'ad_campaign_invoice.pdf',
        notes: 'Awareness campaign for community engagement'
    },
    {
        id: 'exp-5',
        date: new Date('2026-02-28'),
        description: 'Office supplies - printer ink, paper, folders',
        category: 'Administrative',
        amount: 12000,
        status: 'approved',
        submittedBy: 'Anita Desai',
        approvedBy: 'Amit Patel',
        receipt: 'office_supplies.pdf',
        notes: 'Monthly office supplies replenishment'
    },
    {
        id: 'exp-6',
        date: new Date('2026-02-25'),
        description: 'Workshop venue rental - Community Center',
        category: 'Training & Workshops',
        amount: 25000,
        status: 'approved',
        submittedBy: 'Priya Sharma',
        approvedBy: 'Rajesh Kumar',
        receipt: 'venue_booking.pdf',
        notes: 'Full day booking for teacher training workshop'
    },
    {
        id: 'exp-7',
        date: new Date('2026-02-20'),
        description: 'Projector rental for presentations',
        category: 'Training & Workshops',
        amount: 8000,
        status: 'approved',
        submittedBy: 'Kavya Menon',
        approvedBy: 'Priya Sharma',
        receipt: 'equipment_rental.pdf',
        notes: '2-day rental for workshop'
    },
    {
        id: 'exp-8',
        date: new Date('2026-02-18'),
        description: 'Printing promotional flyers - 5000 copies',
        category: 'Marketing & Outreach',
        amount: 15000,
        status: 'rejected',
        submittedBy: 'Meera Iyer',
        approvedBy: 'Amit Patel',
        receipt: 'printing_quote.pdf',
        notes: 'Rejected - over budget for marketing category'
    },
];

export default async function ExpenseTrackerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const approvedExpenses = expenses.filter(e => e.status === 'approved').reduce((sum, exp) => sum + exp.amount, 0);
    const pendingExpenses = expenses.filter(e => e.status === 'pending').length;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href={`/projects/${id}/budget`}
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Budget Overview
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Expense Tracker</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Detailed expense management for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Expense
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Expenses</p>
                            <p className="text-2xl font-semibold mt-1">₹{(totalExpenses / 100000).toFixed(2)}L</p>
                            <p className="text-[11px] text-muted-foreground mt-1">{expenses.length} transactions</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Approved</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">₹{(approvedExpenses / 100000).toFixed(2)}L</p>
                            <p className="text-[11px] text-green-600 mt-1">{expenses.filter(e => e.status === 'approved').length} items</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Pending Review</p>
                            <p className="text-2xl font-semibold mt-1 text-orange-600">{pendingExpenses}</p>
                            <p className="text-[11px] text-orange-600 mt-1">Awaiting approval</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">This Month</p>
                            <p className="text-2xl font-semibold mt-1">₹{(343500 / 100000).toFixed(2)}L</p>
                            <p className="text-[11px] text-muted-foreground mt-1">March 2026</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search expenses..."
                                        className="pl-8 text-[13px]"
                                    />
                                </div>
                            </div>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px] text-[13px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="salaries">Staff Salaries</SelectItem>
                                    <SelectItem value="materials">Materials & Supplies</SelectItem>
                                    <SelectItem value="transport">Transportation</SelectItem>
                                    <SelectItem value="training">Training & Workshops</SelectItem>
                                    <SelectItem value="marketing">Marketing & Outreach</SelectItem>
                                    <SelectItem value="admin">Administrative</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all-status">
                                <SelectTrigger className="w-[150px] text-[13px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-status">All Status</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Expenses List */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Expense History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="p-4 rounded-lg border border-border/40 space-y-3 hover:bg-accent/30 transition-colors"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-[14px] font-semibold">{expense.description}</h4>
                                                <Badge
                                                    variant={
                                                        expense.status === 'approved' ? 'default' :
                                                            expense.status === 'pending' ? 'secondary' :
                                                                'destructive'
                                                    }
                                                    className="text-[10px]"
                                                >
                                                    {expense.status === 'approved' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                                    {expense.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                                    {expense.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                                                    {expense.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                                                <span>{expense.category}</span>
                                                <span>•</span>
                                                <span>{format(expense.date, 'MMM dd, yyyy')}</span>
                                                <span>•</span>
                                                <span>by {expense.submittedBy}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[18px] font-semibold">₹{(expense.amount / 1000).toFixed(1)}K</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="grid gap-3 md:grid-cols-2 text-[12px]">
                                        <div className="space-y-1">
                                            <p className="text-muted-foreground">Notes:</p>
                                            <p>{expense.notes}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-muted-foreground">Receipt:</p>
                                            <div className="flex items-center gap-2">
                                                <Receipt className="h-4 w-4 text-muted-foreground" />
                                                <a href="#" className="text-primary hover:underline">{expense.receipt}</a>
                                            </div>
                                            {expense.approvedBy && (
                                                <p className="text-green-600 mt-2">
                                                    ✓ Approved by {expense.approvedBy}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {expense.status === 'pending' && (
                                        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                            <Button size="sm" variant="default">Approve</Button>
                                            <Button size="sm" variant="outline">Reject</Button>
                                            <Button size="sm" variant="ghost">Request Info</Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
