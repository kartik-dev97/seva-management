import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Plus,
    DollarSign,
    FileText,
    Users,
    Calendar
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProjectSubNav } from '@/components/project/project-sub-nav';

// Sample expense categories
const expenseCategories = [
    { id: '1', name: 'Staff Salaries', allocated: 2500000, spent: 1200000, color: 'bg-blue-500' },
    { id: '2', name: 'Materials & Supplies', allocated: 1000000, spent: 650000, color: 'bg-green-500' },
    { id: '3', name: 'Transportation', allocated: 500000, spent: 280000, color: 'bg-purple-500' },
    { id: '4', name: 'Training & Workshops', allocated: 800000, spent: 450000, color: 'bg-orange-500' },
    { id: '5', name: 'Marketing & Outreach', allocated: 300000, spent: 180000, color: 'bg-pink-500' },
    { id: '6', name: 'Administrative', allocated: 400000, spent: 190000, color: 'bg-yellow-500' },
    { id: '7', name: 'Contingency', allocated: 500000, spent: 50000, color: 'bg-gray-500' },
];

// Recent transactions
const recentTransactions = [
    { id: '1', date: '2026-03-10', description: 'Teacher training materials', category: 'Materials & Supplies', amount: 45000, status: 'approved' },
    { id: '2', date: '2026-03-08', description: 'Monthly salary - March', category: 'Staff Salaries', amount: 280000, status: 'approved' },
    { id: '3', date: '2026-03-05', description: 'Vehicle fuel & maintenance', category: 'Transportation', amount: 18500, status: 'approved' },
    { id: '4', date: '2026-03-03', description: 'Social media campaign', category: 'Marketing & Outreach', amount: 35000, status: 'pending' },
    { id: '5', date: '2026-02-28', description: 'Office supplies', category: 'Administrative', amount: 12000, status: 'approved' },
    { id: '6', date: '2026-02-25', description: 'Workshop venue rental', category: 'Training & Workshops', amount: 25000, status: 'approved' },
];

export default async function ProjectBudgetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalAllocated = expenseCategories.reduce((sum, cat) => sum + cat.allocated, 0);
    const totalSpent = expenseCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const remaining = totalAllocated - totalSpent;
    const utilizationRate = (totalSpent / totalAllocated) * 100;
    const burnRate = totalSpent / 3; // Assuming 3 months elapsed
    const projectedCompletion = totalAllocated / burnRate;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href={`/projects/${id}`}
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Project
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Budget Overview</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Financial tracking for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${id}/budget/expenses`}>View All Expenses</Link>
                        </Button>
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Expense
                        </Button>
                    </div>
                </div>

                {/* Sub Navigation */}
                <ProjectSubNav projectId={id} />

                {/* Budget Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <DollarSign className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Total Budget</p>
                                    <p className="text-[18px] font-semibold">₹{(totalAllocated / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <TrendingUp className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Total Spent</p>
                                    <p className="text-[18px] font-semibold">₹{(totalSpent / 100000).toFixed(1)}L</p>
                                    <p className="text-[10px] text-orange-600">{utilizationRate.toFixed(1)}% used</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <TrendingDown className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Remaining</p>
                                    <p className="text-[18px] font-semibold">₹{(remaining / 100000).toFixed(1)}L</p>
                                    <p className="text-[10px] text-green-600">{(100 - utilizationRate).toFixed(1)}% left</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                    <Calendar className="h-5 w-5 text-purple-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Burn Rate</p>
                                    <p className="text-[18px] font-semibold">₹{(burnRate / 100000).toFixed(1)}L/mo</p>
                                    <p className="text-[10px] text-muted-foreground">{projectedCompletion.toFixed(1)} months to complete</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Budget Utilization */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Overall Budget Utilization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[13px]">
                                <span className="text-muted-foreground">Budget Progress</span>
                                <span className="font-medium">{utilizationRate.toFixed(1)}%</span>
                            </div>
                            <Progress value={utilizationRate} className="h-3" />
                            <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                                <span>₹0</span>
                                <span>₹{(totalAllocated / 100000).toFixed(1)}L</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Breakdown */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Budget by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {expenseCategories.map((category) => {
                                const percentage = (category.spent / category.allocated) * 100;
                                const isOverBudget = percentage > 100;
                                const isNearLimit = percentage > 80 && percentage <= 100;

                                return (
                                    <div key={category.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("h-2 w-2 rounded-full", category.color)} />
                                                <span className="text-[13px] font-medium">{category.name}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-[13px]">
                                                <span className="text-muted-foreground">
                                                    ₹{(category.spent / 1000).toFixed(0)}K / ₹{(category.allocated / 1000).toFixed(0)}K
                                                </span>
                                                {isOverBudget && (
                                                    <Badge variant="destructive" className="text-[10px]">Over Budget</Badge>
                                                )}
                                                {isNearLimit && !isOverBudget && (
                                                    <Badge variant="secondary" className="text-[10px]">Near Limit</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress
                                                value={Math.min(100, percentage)}
                                                className="h-2 flex-1"
                                            />
                                            <span className="text-[12px] font-medium w-12 text-right">{percentage.toFixed(0)}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-[15px] font-semibold">Recent Transactions</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={`/projects/${id}/budget/expenses`}>View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                            <FileText className="h-4 w-4 text-primary/70" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-[11px] text-muted-foreground">{transaction.category}</p>
                                                <span className="text-[11px] text-muted-foreground">•</span>
                                                <p className="text-[11px] text-muted-foreground">{transaction.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[14px] font-semibold">₹{(transaction.amount / 1000).toFixed(1)}K</span>
                                        <Badge
                                            variant={transaction.status === 'approved' ? 'default' : 'secondary'}
                                            className="text-[10px]"
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Budget Insights */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Budget Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div className="text-[12px]">
                                    <strong className="text-blue-600 dark:text-blue-400">On Track:</strong>
                                    <p className="text-muted-foreground mt-1">
                                        Current spend rate indicates budget completion in {projectedCompletion.toFixed(1)} months,
                                        aligned with project timeline.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <FileText className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                <div className="text-[12px]">
                                    <strong className="text-orange-600 dark:text-orange-400">Pending Approvals:</strong>
                                    <p className="text-muted-foreground mt-1">
                                        1 expense pending approval (₹35K for Social media campaign). Review required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
