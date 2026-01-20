import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Download,
    TrendingUp,
    TrendingDown,
    IndianRupee,
    PieChart,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

// Financial data
const financialData = {
    summary: {
        totalBudget: 6000000,
        totalSpent: 3000000,
        totalReceived: 4500000,
        pendingPayments: 250000,
        cashInHand: 1250000,
    },
    monthlyExpenses: [
        { month: 'Jan', budget: 450000, actual: 420000 },
        { month: 'Feb', budget: 550000, actual: 580000 },
        { month: 'Mar', budget: 600000, actual: 520000 },
    ],
    categoryBreakdown: [
        { category: 'Staff Salaries', budget: 2500000, spent: 1200000, percentage: 48 },
        { category: 'Materials', budget: 1000000, spent: 650000, percentage: 65 },
        { category: 'Transportation', budget: 500000, spent: 280000, percentage: 56 },
        { category: 'Training', budget: 800000, spent: 450000, percentage: 56 },
        { category: 'Marketing', budget: 300000, spent: 180000, percentage: 60 },
        { category: 'Administrative', budget: 400000, spent: 190000, percentage: 48 },
        { category: 'Contingency', budget: 500000, spent: 50000, percentage: 10 },
    ],
    transactions: [
        { id: 1, date: new Date('2026-03-10'), description: 'Teacher training materials', type: 'expense', amount: 45000 },
        { id: 2, date: new Date('2026-03-08'), description: 'ABC Foundation - Grant', type: 'income', amount: 250000 },
        { id: 3, date: new Date('2026-03-05'), description: 'Vehicle fuel', type: 'expense', amount: 18500 },
        { id: 4, date: new Date('2026-03-01'), description: 'Monthly salaries', type: 'expense', amount: 280000 },
        { id: 5, date: new Date('2026-02-28'), description: 'Individual Donor', type: 'income', amount: 25000 },
    ],
};

export default async function FinancialReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const { summary, categoryBreakdown, transactions } = financialData;
    const utilizationRate = (summary.totalSpent / summary.totalBudget) * 100;
    const collectionRate = (summary.totalReceived / summary.totalBudget) * 100;

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
                            <h1 className="text-2xl font-semibold tracking-tight">Financial Report</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Detailed financial analysis for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <IndianRupee className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Total Budget</p>
                                    <p className="text-[16px] font-semibold">₹{(summary.totalBudget / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Received</p>
                                    <p className="text-[16px] font-semibold text-green-600">₹{(summary.totalReceived / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <TrendingDown className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Spent</p>
                                    <p className="text-[16px] font-semibold text-orange-600">₹{(summary.totalSpent / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                    <BarChart3 className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Cash in Hand</p>
                                    <p className="text-[16px] font-semibold">₹{(summary.cashInHand / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                                    <PieChart className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Utilization</p>
                                    <p className="text-[16px] font-semibold">{utilizationRate.toFixed(0)}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Budget vs Actual by Category */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Budget vs Actual by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-[13px]">
                                <thead>
                                    <tr className="border-b border-border/40">
                                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Budget</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Spent</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Remaining</th>
                                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Utilization</th>
                                        <th className="py-3 px-4 font-medium text-muted-foreground w-32">Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryBreakdown.map((cat) => (
                                        <tr key={cat.category} className="border-b border-border/40 hover:bg-accent/30">
                                            <td className="py-3 px-4 font-medium">{cat.category}</td>
                                            <td className="py-3 px-4 text-right">₹{(cat.budget / 1000).toFixed(0)}K</td>
                                            <td className="py-3 px-4 text-right">₹{(cat.spent / 1000).toFixed(0)}K</td>
                                            <td className="py-3 px-4 text-right text-green-600">₹{((cat.budget - cat.spent) / 1000).toFixed(0)}K</td>
                                            <td className="py-3 px-4 text-right">{cat.percentage}%</td>
                                            <td className="py-3 px-4">
                                                <div className="h-2 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className={`h-full ${cat.percentage > 80 ? 'bg-orange-500' : 'bg-green-500'}`}
                                                        style={{ width: `${cat.percentage}%` }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="font-semibold bg-muted/30">
                                        <td className="py-3 px-4">Total</td>
                                        <td className="py-3 px-4 text-right">₹{(summary.totalBudget / 100000).toFixed(1)}L</td>
                                        <td className="py-3 px-4 text-right">₹{(summary.totalSpent / 100000).toFixed(1)}L</td>
                                        <td className="py-3 px-4 text-right text-green-600">₹{((summary.totalBudget - summary.totalSpent) / 100000).toFixed(1)}L</td>
                                        <td className="py-3 px-4 text-right">{utilizationRate.toFixed(0)}%</td>
                                        <td className="py-3 px-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'income' ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
                                            {tx.type === 'income' ? (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-orange-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium">{tx.description}</p>
                                            <p className="text-[11px] text-muted-foreground">{format(tx.date, 'MMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[14px] font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-orange-600'}`}>
                                        {tx.type === 'income' ? '+' : '-'}₹{(tx.amount / 1000).toFixed(1)}K
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Report Footer */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                            <span>Report generated on {format(new Date(), 'PPP')}</span>
                            <span>Prepared by: Finance Team</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
