'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { hrKPIs } from '@/lib/hr-data';
import {
    Users,
    UserPlus,
    UserCheck,
    Calendar,
    Briefcase,
    Award,
    Search,
    MapPin,
    HeartHandshake
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function HRDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">People & Culture</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage staff, volunteers, and field workers.
                    </p>
                </div>
                <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Onboard New
                </Button>
            </div>

            {/* NGO HR KPIs at Top */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Staff Headcount</p>
                                <div className="text-2xl font-bold text-foreground">{hrKPIs.totalEmployees}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <HeartHandshake className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Volunteers</p>
                                <div className="text-2xl font-bold text-foreground">124</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Training Compliance</p>
                                <div className="text-2xl font-bold text-foreground">92%</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                <UserCheck className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recruitment</p>
                                <div className="text-2xl font-bold text-foreground">12 Active</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Toolbar */}
            <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-2 shadow-sm">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" className="h-9 gap-2 text-sm font-medium hover:bg-muted/50">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        Quick Find
                    </Button>
                </div>

                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                    <Link href="/hr/employees">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <Users className="h-3.5 w-3.5" />
                            Staff Directory
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/hr/volunteers">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <HeartHandshake className="h-3.5 w-3.5" />
                            Volunteers
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/hr/training">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <Award className="h-3.5 w-3.5" />
                            Training Hub
                        </Button>
                    </Link>
                    <div className="h-4 w-px bg-border/50" />
                    <Link href="/hr/recruitment">
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-background shadow-none">
                            <UserPlus className="h-3.5 w-3.5" />
                            Onboarding
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Recent Activity / Onboarding */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border/40 bg-card/50 shadow-sm">
                    <CardHeader className="px-6 py-4 border-b">
                        <CardTitle className="text-base font-semibold">New Additions</CardTitle>
                        <CardDescription>Recently onboarded staff and volunteers</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                            {[
                                { name: 'Sarah Jenkins', role: 'Field Nurse', type: 'Volunteer', joined: '2d ago' },
                                { name: 'Michael Chen', role: 'Project Coord', type: 'Full-time', joined: '5d ago' },
                                { name: 'Aarav Gupta', role: 'Driver', type: 'Contract', joined: '1w ago' },
                            ].map((person, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-medium">
                                            {person.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{person.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{person.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="text-[10px] font-normal mb-1">{person.type}</Badge>
                                        <p className="text-[10px] text-muted-foreground">{person.joined}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Upcoming Performance Reviews</CardTitle>
                        <CardDescription>Scheduled evaluations for this month</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                            {[
                                { name: 'Priya Sharma', role: 'HR Director', date: 'Tomorrow', reviewer: 'Board' },
                                { name: 'Rajesh Kumar', role: 'Ops Lead', date: 'Oct 24', reviewer: 'Director' },
                                { name: 'Team Alpha', role: 'Field Unit', date: 'Oct 28', reviewer: 'P. Sharma' },
                            ].map((review, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{review.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{review.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-foreground">{review.date}</p>
                                        <p className="text-[10px] text-muted-foreground">Reviewer: {review.reviewer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
