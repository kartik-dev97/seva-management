'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { financeData } from '@/lib/finance-data';
import { format } from 'date-fns';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    PieChart,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Filter,
    FileText,
    Clock
} from 'lucide-react';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Progress } from '@radix-ui/react-progress';

export function FinanceDashboard() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const remainingBudget = financeData.totalBudget - financeData.ytdSpent;
    const percentUsed = (financeData.ytdSpent / financeData.totalBudget) * 100;

    const recentTransactions = [
        { id: 'TRX001', description: 'Grant for Rural Development Project', category: 'Rural Dev', date: '2023-10-26', amount: 1500000, status: 'Approved' },
        { id: 'TRX002', description: 'Purchase of educational materials', category: 'Urban Edu', date: '2023-10-25', amount: 250000, status: 'Approved' },
        { id: 'TRX003', description: 'Logistics for medical camp', category: 'Health', date: '2023-10-24', amount: 120000, status: 'Pending' },
        { id: 'TRX004', description: 'Volunteer travel reimbursement', category: 'Admin', date: '2023-10-23', amount: 30000, status: 'Approved' },
        { id: 'TRX005', description: 'Event venue booking', category: 'Events', date: '2023-10-22', amount: 500000, status: 'Pending' },
        { id: 'TRX006', description: 'Software license renewal', category: 'Operations', date: '2023-10-21', amount: 80000, status: 'Approved' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Finance Overview</h1>
                    <p className="text-muted-foreground mt-1">
                        Track grants, program expenses, and operational funds.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Report
                    </Button>
                    <Button className="gap-2">
                        <DollarSign className="h-4 w-4" />
                        New Request
                    </Button>
                </div>
            </div>

            {/* NGO KPIs - Moved to Top */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Grants</p>
                                <div className="text-xl font-bold text-foreground">{formatCurrency(financeData.totalBudget)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Deployed</p>
                                <div className="text-xl font-bold text-foreground">{formatCurrency(financeData.ytdSpent)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <PieChart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available</p>
                                <div className="text-xl font-bold text-foreground">{formatCurrency(remainingBudget)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin & Ops</p>
                                <div className="text-xl font-bold text-foreground">{formatCurrency(4500000)}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Toolbar - Project Style */}
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-2 shadow-sm">
                <div className="flex items-center gap-1">
                    <Link href="/finance/approvals">
                        <Button variant="outline" className="h-9 gap-2 text-sm font-medium hover:bg-muted/50 border-border bg-background text-foreground shadow-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            Approval Queue
                            <Badge className="ml-1 h-5 min-w-[20px] bg-zinc-900 text-zinc-100 flex items-center justify-center p-0 text-[10px] dark:bg-zinc-100 dark:text-zinc-900">3</Badge>
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                    <Link href="/finance/projects">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <Activity className="h-3.5 w-3.5" />
                            Projects
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/finance/events">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <PieChart className="h-3.5 w-3.5" />
                            Events
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/finance/logistics">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Logistics
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/finance/reports">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <FileText className="h-3.5 w-3.5" />
                            Reports
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-border/40 bg-card/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">Budget Utilization</CardTitle>
                        <CardDescription>Monthly spending vs allocation</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={financeData.monthlyBurnDown} barSize={28}>
                                    <XAxis
                                        dataKey="month"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `₹${value / 100000}L`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                    />
                                    <Bar
                                        dataKey="budget"
                                        fill="hsl(var(--muted)/20)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="actual"
                                        fill="hsl(var(--foreground))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="col-span-3 space-y-6">
                    <Card className="border-border/40 bg-card/50 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Allocation by Department</CardTitle>
                            <CardDescription>Funds distribution across sectors</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {financeData.categories.map((cat) => {
                                    const percent = (cat.spent / cat.allocated) * 100;
                                    return (
                                        <div key={cat.id}>
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-foreground">
                                                        <Activity className="h-3.5 w-3.5" />
                                                    </div>
                                                    <span className="font-medium text-foreground text-sm">{cat.name}</span>
                                                </div>
                                                <span className="text-muted-foreground text-xs font-mono">{percent.toFixed(0)}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-zinc-700/90 rounded-full transition-all"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Transactions List */}
            <Card className="border-border/40 bg-card/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                    <div>
                        <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
                        <CardDescription>Latest disbursements and expense requests</CardDescription>
                    </div>
                    <Link href="/finance/transactions">
                        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                            View All <ArrowUpRight className="h-3 w-3" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="bg-muted/30">
                                <tr className="border-b transition-colors">
                                    <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">Transaction</th>
                                    <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">Department</th>
                                    <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider py-3">Date</th>
                                    <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider text-right py-3">Amount</th>
                                    <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider text-right py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {recentTransactions.map((t, i) => (
                                    <tr key={i} className="group transition-colors hover:bg-muted/30">
                                        <td className="p-4 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background border border-border/50 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary transition-colors">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-foreground">{t.description}</div>
                                                    <div className="text-[11px] text-muted-foreground">{t.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 px-6 align-middle">
                                            <Badge variant="secondary" className="font-normal text-[11px] bg-secondary/50 hover:bg-secondary">
                                                {t.category}
                                            </Badge>
                                        </td>
                                        <td className="p-4 px-6 align-middle text-xs text-muted-foreground font-medium">
                                            {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                        </td>
                                        <td className="p-4 px-6 align-middle text-right font-medium text-sm">
                                            {formatCurrency(t.amount)}
                                        </td>
                                        <td className="p-4 px-6 align-middle text-right">
                                            <Badge variant="outline" className={cn(
                                                "font-medium text-[10px] border-0 px-2 py-0.5",
                                                t.status === 'Approved' ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20" :
                                                    t.status === 'Pending' ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20" : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-500/20"
                                            )}>
                                                {t.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
