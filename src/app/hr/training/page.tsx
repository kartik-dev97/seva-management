'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Award,
    BookOpen,
    CheckCircle2,
    Clock,
    Plus,
    Search,
    ShieldCheck,
    Users,
    ChevronRight,
    PlayCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const courses = [
    {
        id: 'CRS-001',
        title: 'NGO Compliance & Ethics',
        category: 'Mandatory',
        duration: '2 hours',
        completedBy: 145,
        totalEnrolled: 156,
        status: 'high-priority',
        description: 'Core principles of ethical field work and regulatory compliance.'
    },
    {
        id: 'CRS-002',
        title: 'Emergency First Aid',
        category: 'Field Work',
        duration: '6 hours',
        completedBy: 89,
        totalEnrolled: 120,
        status: 'active',
        description: 'Advanced first aid training for disaster relief staff.'
    },
    {
        id: 'CRS-003',
        title: 'Grant Writing Basics',
        category: 'Operations',
        duration: '4 hours',
        completedBy: 34,
        totalEnrolled: 40,
        status: 'active',
        description: 'Learn to draft compelling grant proposals for international donors.'
    }
];

export default function TrainingHubPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Training Hub</h1>
                        <p className="text-muted-foreground mt-1">
                            Upskilling staff and volunteers for better field impact.
                        </p>
                    </div>
                    <Button className="gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800">
                        <Plus className="h-4 w-4" />
                        New Course
                    </Button>
                </div>

                {/* Training Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                    <Award className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Certificates Issued</p>
                                    <div className="text-2xl font-bold">428</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Compliance Rate</p>
                                    <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">92%</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Learners</p>
                                    <div className="text-2xl font-bold">56</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-200 dark:ring-zinc-700">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Learning Hours</p>
                                    <div className="text-2xl font-bold">1.2k</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Course List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            Available Courses
                        </h2>
                        <div className="grid gap-4">
                            {courses.map(course => (
                                <Card key={course.id} className="group hover:border-zinc-300 transition-all cursor-pointer bg-card/50">
                                    <CardContent className="p-5 flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors border border-zinc-200 dark:border-zinc-700">
                                            <PlayCircle className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{course.title}</h3>
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] uppercase font-bold border-0 px-2 py-0.5",
                                                    course.status === 'high-priority' ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-600"
                                                )}>
                                                    {course.status === 'high-priority' ? 'Mandatory' : course.category}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-dashed">
                                                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    {course.duration}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                    <Users className="h-3 w-3" />
                                                    {course.completedBy}/{course.totalEnrolled} Completed
                                                </div>
                                                <div className="flex-1 max-w-[100px] ml-auto">
                                                    <Progress value={(course.completedBy / course.totalEnrolled) * 100} className="h-1 bg-zinc-100 dark:bg-zinc-800" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Compliance & Quick Links */}
                    <div className="space-y-6">
                        <Card className="border-zinc-200 shadow-sm overflow-hidden">
                            <CardHeader className="bg-zinc-50 dark:bg-zinc-900 border-b">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-zinc-500" />
                                    Department Compliance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                {[
                                    { dept: 'Medical Field Team', value: 98 },
                                    { dept: 'Logistics & Supply', value: 85 },
                                    { dept: 'Accountability & Finance', value: 100 },
                                    { dept: 'Admin/HR', value: 92 },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-medium">
                                            <span>{item.dept}</span>
                                            <span>{item.value}%</span>
                                        </div>
                                        <Progress value={item.value} className="h-1 bg-zinc-100 dark:bg-zinc-800" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-200 bg-zinc-900 text-zinc-100">
                            <CardContent className="p-6 space-y-4">
                                <Award className="h-10 w-10 text-zinc-400 mb-2" />
                                <h3 className="font-bold text-lg leading-tight">Certification Month</h3>
                                <p className="text-zinc-400 text-sm">October focus: Disaster Response Certification. All field staff must complete CRS-002 by month end.</p>
                                <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 font-bold border-0 h-10">
                                    Track Progress
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
