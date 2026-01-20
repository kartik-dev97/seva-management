'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function EventFinancePage() {
    const eventBudgets = [
        { id: 'EVT-001', name: 'Annual Tech Summit', date: 'Oct 15, 2024', allocated: 5000000, spent: 2500000, status: 'In Progress' },
        { id: 'EVT-002', name: 'Leadership Retreat', date: 'Nov 01, 2024', allocated: 2000000, spent: 1800000, status: 'Near Limit' },
        { id: 'EVT-003', name: 'Community Outreach', date: 'Sep 20, 2024', allocated: 100000, spent: 45000, status: 'On Track' },
        { id: 'EVT-004', name: 'Q4 Planning', date: 'Dec 10, 2024', allocated: 50000, spent: 0, status: 'Upcoming' },
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
                            <h1 className="text-2xl font-light tracking-tight">Event Budgets</h1>
                            <p className="text-sm text-muted-foreground">Cost tracking for organizational events</p>
                        </div>
                    </div>
                    <Button>New Event Budget</Button>
                </div>

                <div className="grid gap-6">
                    {eventBudgets.map((event) => {
                        const progress = (event.spent / event.allocated) * 100;
                        return (
                            <Card key={event.id} className="border-border/50 shadow-sm overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-lg">{event.name}</h3>
                                                <Badge variant="outline" className="font-normal">{event.status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                                                <span className="font-mono">{event.id}</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 max-w-md space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Utilization</span>
                                                <span className="font-medium">{progress.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${progress > 90 ? 'bg-red-500' : 'bg-zinc-800'}`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-right min-w-[150px]">
                                            <div className="text-xl font-bold">₹{event.spent.toLocaleString('en-IN')}</div>
                                            <div className="text-xs text-muted-foreground">of ₹{event.allocated.toLocaleString('en-IN')}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
