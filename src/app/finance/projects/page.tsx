'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function ProjectFinancePage() {
    const projects = [
        { id: 'PRJ-2024-A', name: 'Rural Education Initiative', budget: 15000000, spent: 8500000, roi: '+15%', lastExpense: '₹50,000 - Materials' },
        { id: 'PRJ-2024-B', name: 'Clean Water Infrastructure', budget: 25000000, spent: 1200000, roi: 'N/A', lastExpense: '₹2,50,000 - Pump Equip' },
        { id: 'PRJ-2024-C', name: 'Digital Literacy Campaign', budget: 5000000, spent: 4800000, roi: '+22%', lastExpense: '₹12,000 - Ads' },
    ];

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
                            <h1 className="text-2xl font-light tracking-tight">Project Budgets</h1>
                            <p className="text-sm text-muted-foreground">ROI and expense tracking per project</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="border-border/50 shadow-sm hover:border-zinc-300 transition-colors">
                            <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <Briefcase className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{project.name}</CardTitle>
                                            <CardDescription>{project.id}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-emerald-600 flex items-center gap-1 justify-end">
                                            <TrendingUp className="h-3 w-3" />
                                            {project.roi}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Proj. ROI</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Total Budget</p>
                                        <p className="text-xl font-semibold">₹{project.budget.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Total Spent</p>
                                        <p className="text-xl font-semibold">₹{project.spent.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Last Expense</p>
                                        <p className="text-sm font-medium">{project.lastExpense}</p>
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
