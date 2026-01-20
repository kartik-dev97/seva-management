'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { financeData } from '@/lib/finance-data';

export default function BudgetPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/finance">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-light tracking-tight">Budget Allocation</h1>
                            <p className="text-sm text-muted-foreground">Manage and distribute funds across departments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Allocation
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6">
                    {financeData.categories.map((cat) => (
                        <Card key={cat.id} className="border-border/50 shadow-sm overflow-hidden">
                            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-medium">{cat.name}</CardTitle>
                                        <CardDescription>Fiscal Year 2024</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.allocated)}</div>
                                        <div className="text-xs text-muted-foreground">Total Allocated</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Utilization</span>
                                            <span className="font-medium">{((cat.spent / cat.allocated) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-zinc-800 rounded-full"
                                                style={{ width: `${(cat.spent / cat.allocated) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                                            <span>Spent: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.spent)}</span>
                                            <span>Remaining: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.allocated - cat.spent)}</span>
                                        </div>
                                    </div>

                                    {/* Placeholder breakdown for sub-items */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                                        <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                                            <p className="text-xs text-muted-foreground mb-1">Q1 Allocation</p>
                                            <p className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.allocated * 0.25)}</p>
                                        </div>
                                        <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                                            <p className="text-xs text-muted-foreground mb-1">Q2 Allocation</p>
                                            <p className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.allocated * 0.25)}</p>
                                        </div>
                                        <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                                            <p className="text-xs text-muted-foreground mb-1">Q3 Allocation</p>
                                            <p className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cat.allocated * 0.25)}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
