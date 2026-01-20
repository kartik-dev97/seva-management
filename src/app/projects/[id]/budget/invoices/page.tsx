import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
    Search,
    FileText,
    Send,
    CheckCircle2,
    Clock,
    AlertCircle,
    Download
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Invoice data
const invoices = [
    {
        id: 'INV-001',
        vendor: 'ABC Printing Services',
        description: 'Educational materials printing - 500 copies',
        amount: 75000,
        issueDate: new Date('2026-02-15'),
        dueDate: new Date('2026-03-15'),
        status: 'paid',
        paidDate: new Date('2026-03-10'),
    },
    {
        id: 'INV-002',
        vendor: 'XYZ Transport',
        description: 'Vehicle hire for field visits - March',
        amount: 45000,
        issueDate: new Date('2026-03-01'),
        dueDate: new Date('2026-03-31'),
        status: 'pending',
        paidDate: null,
    },
    {
        id: 'INV-003',
        vendor: 'Community Center',
        description: 'Venue rental for workshop - 2 days',
        amount: 25000,
        issueDate: new Date('2026-03-05'),
        dueDate: new Date('2026-03-20'),
        status: 'pending',
        paidDate: null,
    },
    {
        id: 'INV-004',
        vendor: 'Office Supplies Co.',
        description: 'Stationery and office supplies',
        amount: 18000,
        issueDate: new Date('2026-02-20'),
        dueDate: new Date('2026-03-05'),
        status: 'overdue',
        paidDate: null,
    },
    {
        id: 'INV-005',
        vendor: 'Tech Solutions',
        description: 'Projector and equipment rental',
        amount: 12000,
        issueDate: new Date('2026-02-25'),
        dueDate: new Date('2026-03-10'),
        status: 'paid',
        paidDate: new Date('2026-03-08'),
    },
];

const statusConfig = {
    paid: { label: 'Paid', icon: CheckCircle2, color: 'text-green-600 bg-green-500/10' },
    pending: { label: 'Pending', icon: Clock, color: 'text-orange-600 bg-orange-500/10' },
    overdue: { label: 'Overdue', icon: AlertCircle, color: 'text-red-600 bg-red-500/10' },
};

export default async function InvoiceManagementPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

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
                            Back to Budget
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Invoice Management</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Track vendor invoices for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Invoice
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Invoices</p>
                            <p className="text-2xl font-semibold mt-1">₹{(totalAmount / 1000).toFixed(0)}K</p>
                            <p className="text-[11px] text-muted-foreground mt-1">{invoices.length} invoices</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Paid</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">₹{(paidAmount / 1000).toFixed(0)}K</p>
                            <p className="text-[11px] text-green-600 mt-1">{invoices.filter(i => i.status === 'paid').length} invoices</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Pending</p>
                            <p className="text-2xl font-semibold mt-1 text-orange-600">₹{(pendingAmount / 1000).toFixed(0)}K</p>
                            <p className="text-[11px] text-orange-600 mt-1">{invoices.filter(i => i.status === 'pending').length} invoices</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Overdue</p>
                            <p className="text-2xl font-semibold mt-1 text-red-600">₹{(overdueAmount / 1000).toFixed(0)}K</p>
                            <p className="text-[11px] text-red-600 mt-1">{invoices.filter(i => i.status === 'overdue').length} invoices</p>
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
                                    <Input placeholder="Search invoices..." className="pl-8 text-[13px]" />
                                </div>
                            </div>
                            <Select defaultValue="all-status">
                                <SelectTrigger className="w-[150px] text-[13px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-status">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Invoices List */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {invoices.map((invoice) => {
                                const config = statusConfig[invoice.status as keyof typeof statusConfig];
                                const Icon = config.icon;

                                return (
                                    <div key={invoice.id} className="p-4 rounded-lg border border-border/40 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                                    <FileText className="h-5 w-5 text-primary/70" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-[14px] font-semibold">{invoice.id}</h4>
                                                        <Badge className={cn('text-[10px]', config.color)}>
                                                            <Icon className="h-3 w-3 mr-1" />
                                                            {config.label}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-[12px] text-muted-foreground mt-0.5">{invoice.vendor}</p>
                                                    <p className="text-[12px] mt-1">{invoice.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[18px] font-semibold">₹{(invoice.amount / 1000).toFixed(1)}K</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 md:grid-cols-3 text-[12px]">
                                            <div>
                                                <p className="text-muted-foreground">Issue Date</p>
                                                <p className="font-medium">{format(invoice.issueDate, 'MMM dd, yyyy')}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Due Date</p>
                                                <p className={cn("font-medium", invoice.status === 'overdue' && 'text-red-600')}>
                                                    {format(invoice.dueDate, 'MMM dd, yyyy')}
                                                </p>
                                            </div>
                                            {invoice.paidDate && (
                                                <div>
                                                    <p className="text-muted-foreground">Paid Date</p>
                                                    <p className="font-medium text-green-600">{format(invoice.paidDate, 'MMM dd, yyyy')}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                            <Button variant="outline" size="sm" className="text-[11px] gap-1">
                                                <Download className="h-3 w-3" />
                                                Download
                                            </Button>
                                            {invoice.status !== 'paid' && (
                                                <Button size="sm" className="text-[11px] gap-1">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Mark as Paid
                                                </Button>
                                            )}
                                            {invoice.status === 'pending' && (
                                                <Button variant="ghost" size="sm" className="text-[11px] gap-1">
                                                    <Send className="h-3 w-3" />
                                                    Send Reminder
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
