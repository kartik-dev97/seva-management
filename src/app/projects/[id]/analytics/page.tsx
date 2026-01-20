import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, tasks, events } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Activity,
    Users,
    CheckCircle2,
    Calendar,
    IndianRupee,
    Target
} from 'lucide-react';
import Link from 'next/link';
import { differenceInDays } from 'date-fns';

export default async function AnalyticsDashboardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const projectEvents = events.filter(e => e.projectId === project.id);

    const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
    const taskCompletionRate = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0;

    const daysElapsed = differenceInDays(new Date(), project.startDate);
    const totalDays = project.endDate ? differenceInDays(project.endDate, project.startDate) : 180;
    const timeProgress = (daysElapsed / totalDays) * 100;

    const budgetUtilization = (project.spent / project.budget) * 100;

    // KPI data
    const kpis = [
        {
            name: 'Project Health',
            value: project.progress >= timeProgress ? 'On Track' : 'At Risk',
            trend: project.progress >= timeProgress ? 'up' : 'down',
            color: project.progress >= timeProgress ? 'text-green-600' : 'text-orange-600'
        },
        {
            name: 'Budget Health',
            value: budgetUtilization <= project.progress ? 'Good' : 'Review',
            trend: budgetUtilization <= project.progress ? 'up' : 'down',
            color: budgetUtilization <= project.progress ? 'text-green-600' : 'text-orange-600'
        },
        {
            name: 'Team Velocity',
            value: '85%',
            trend: 'up',
            color: 'text-green-600'
        },
        {
            name: 'Quality Score',
            value: '92%',
            trend: 'up',
            color: 'text-green-600'
        },
    ];

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
                            <h1 className="text-2xl font-semibold tracking-tight">Analytics Dashboard</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Deep insights for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Last 7 Days</Button>
                        <Button variant="outline" size="sm">Last 30 Days</Button>
                        <Button size="sm">All Time</Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    {kpis.map((kpi) => (
                        <Card key={kpi.name} className="border-border/40 bg-card/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-[11px] text-muted-foreground">{kpi.name}</p>
                                    {kpi.trend === 'up' ? (
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-orange-600" />
                                    )}
                                </div>
                                <p className={`text-[18px] font-semibold mt-1 ${kpi.color}`}>{kpi.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Progress Metrics */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Overall Progress */}
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                Progress Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[13px]">
                                    <span>Overall Progress</span>
                                    <span className="font-medium">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-3" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[13px]">
                                    <span>Time Elapsed</span>
                                    <span className="font-medium">{timeProgress.toFixed(0)}%</span>
                                </div>
                                <Progress value={timeProgress} className="h-3" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[13px]">
                                    <span>Budget Utilization</span>
                                    <span className="font-medium">{budgetUtilization.toFixed(0)}%</span>
                                </div>
                                <Progress value={budgetUtilization} className="h-3" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task Metrics */}
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Task Analytics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 rounded-lg bg-muted/30">
                                    <p className="text-3xl font-bold">{projectTasks.length}</p>
                                    <p className="text-[12px] text-muted-foreground">Total Tasks</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-green-500/10">
                                    <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
                                    <p className="text-[12px] text-muted-foreground">Completed</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-blue-500/10">
                                    <p className="text-3xl font-bold text-blue-600">
                                        {projectTasks.filter(t => t.status === 'In Progress').length}
                                    </p>
                                    <p className="text-[12px] text-muted-foreground">In Progress</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-orange-500/10">
                                    <p className="text-3xl font-bold text-orange-600">
                                        {projectTasks.filter(t => t.status === 'Blocked').length}
                                    </p>
                                    <p className="text-[12px] text-muted-foreground">Blocked</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* More Analytics */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Team Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Team Size</span>
                                    <span className="text-[13px] font-medium">{project.members.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Avg Tasks/Member</span>
                                    <span className="text-[13px] font-medium">
                                        {(projectTasks.length / project.members.length).toFixed(1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Completion Rate</span>
                                    <span className="text-[13px] font-medium text-green-600">
                                        {taskCompletionRate.toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Timeline Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Days Elapsed</span>
                                    <span className="text-[13px] font-medium">{daysElapsed}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Days Remaining</span>
                                    <span className="text-[13px] font-medium">{totalDays - daysElapsed}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Events Scheduled</span>
                                    <span className="text-[13px] font-medium">{projectEvents.length}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <IndianRupee className="h-4 w-4" />
                                Financial Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Total Budget</span>
                                    <span className="text-[13px] font-medium">₹{(project.budget / 100000).toFixed(1)}L</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Spent</span>
                                    <span className="text-[13px] font-medium text-orange-600">₹{(project.spent / 100000).toFixed(1)}L</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px]">Remaining</span>
                                    <span className="text-[13px] font-medium text-green-600">
                                        ₹{((project.budget - project.spent) / 100000).toFixed(1)}L
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Insights */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            AI Insights & Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                <p className="text-[13px]">
                                    <strong className="text-green-600">✓ Positive:</strong> Task completion rate of {taskCompletionRate.toFixed(0)}% is above the 70% target benchmark.
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <p className="text-[13px]">
                                    <strong className="text-blue-600">ℹ Insight:</strong> Project is {project.progress >= timeProgress ? 'on track' : 'behind schedule'}. Current progress ({project.progress}%) vs timeline ({timeProgress.toFixed(0)}%).
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <p className="text-[13px]">
                                    <strong className="text-orange-600">⚠ Action:</strong> Consider reassigning blocked tasks to maintain project velocity.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
