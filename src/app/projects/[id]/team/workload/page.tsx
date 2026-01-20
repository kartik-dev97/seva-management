import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, tasks, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function TeamWorkloadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    // Get all project tasks
    const projectTasks = tasks.filter(t => t.projectId === project.id);

    // Calculate workload for each team member
    const workloadData = project.members.map((member) => {
        const user = getUserById(member.userId);
        if (!user) return null;

        const memberTasks = projectTasks.filter(t => t.assigneeId === member.userId);
        const completedTasks = memberTasks.filter(t => t.status === 'Completed').length;
        const inProgressTasks = memberTasks.filter(t => t.status === 'In Progress').length;
        const todoTasks = memberTasks.filter(t => t.status === 'To Do').length;
        const blockedTasks = memberTasks.filter(t => t.status === 'Blocked').length;

        const completionRate = memberTasks.length > 0 ? (completedTasks / memberTasks.length) * 100 : 0;

        // Calculate workload score (0-100)
        // Higher score = more loaded
        const workloadScore = Math.min(100, (memberTasks.length / 10) * 100);

        return {
            user,
            role: member.role,
            totalTasks: memberTasks.length,
            completedTasks,
            inProgressTasks,
            todoTasks,
            blockedTasks,
            completionRate,
            workloadScore,
        };
    }).filter(Boolean);

    // Sort by workload score
    workloadData.sort((a, b) => (b?.workloadScore || 0) - (a?.workloadScore || 0));

    const getWorkloadColor = (score: number) => {
        if (score >= 75) return 'text-red-600 dark:text-red-400';
        if (score >= 50) return 'text-orange-600 dark:text-orange-400';
        if (score >= 25) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-green-600 dark:text-green-400';
    };

    const getWorkloadLabel = (score: number) => {
        if (score >= 75) return 'Overloaded';
        if (score >= 50) return 'Heavy';
        if (score >= 25) return 'Moderate';
        return 'Light';
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <Link
                        href={`/projects/${id}`}
                        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Project
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Team Workload Distribution</h1>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            Monitor task distribution and team capacity for {project.title}
                        </p>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Tasks</p>
                            <p className="text-2xl font-semibold mt-1">{projectTasks.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Avg Tasks/Member</p>
                            <p className="text-2xl font-semibold mt-1">
                                {project.members.length > 0 ? (projectTasks.length / project.members.length).toFixed(1) : 0}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Overloaded</p>
                            <p className="text-2xl font-semibold mt-1 text-red-600">
                                {workloadData.filter(w => (w?.workloadScore || 0) >= 75).length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Available</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">
                                {workloadData.filter(w => (w?.workloadScore || 0) < 50).length}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Workload List */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {workloadData.map((data) => {
                                if (!data) return null;
                                const { user, role, totalTasks, completedTasks, inProgressTasks, todoTasks, blockedTasks, completionRate, workloadScore } = data;

                                return (
                                    <div key={user.id} className="p-4 rounded-lg border border-border/40 space-y-4">
                                        {/* Member Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <Link href={`/employees/${user.id}`}>
                                                    <Avatar className="h-12 w-12 hover:ring-2 ring-primary transition-all">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </Link>
                                                <div>
                                                    <Link href={`/employees/${user.id}`} className="text-[14px] font-semibold hover:text-primary">
                                                        {user.name}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <Badge variant="secondary" className="text-[10px]">{role}</Badge>
                                                        <span className="text-[12px] text-muted-foreground">•</span>
                                                        <span className={cn("text-[12px] font-medium", getWorkloadColor(workloadScore))}>
                                                            {getWorkloadLabel(workloadScore)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[13px] font-semibold">{totalTasks} tasks</p>
                                                <p className="text-[11px] text-muted-foreground">{completionRate.toFixed(0)}% complete</p>
                                            </div>
                                        </div>

                                        {/* Task Breakdown */}
                                        <div className="grid grid-cols-4 gap-3">
                                            <div className="flex items-center gap-2 p-2 rounded bg-muted/30">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-[11px] text-muted-foreground">To Do</p>
                                                    <p className="text-[14px] font-semibold">{todoTasks}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 rounded bg-blue-500/10">
                                                <Clock className="h-4 w-4 text-blue-500" />
                                                <div>
                                                    <p className="text-[11px] text-muted-foreground">In Progress</p>
                                                    <p className="text-[14px] font-semibold">{inProgressTasks}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 rounded bg-green-500/10">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <div>
                                                    <p className="text-[11px] text-muted-foreground">Completed</p>
                                                    <p className="text-[14px] font-semibold">{completedTasks}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 p-2 rounded bg-red-500/10">
                                                <XCircle className="h-4 w-4 text-red-500" />
                                                <div>
                                                    <p className="text-[11px] text-muted-foreground">Blocked</p>
                                                    <p className="text-[14px] font-semibold">{blockedTasks}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Workload Bar */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-muted-foreground">Workload Capacity</span>
                                                <span className="font-medium">{workloadScore.toFixed(0)}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full transition-all",
                                                        workloadScore >= 75 ? 'bg-red-500' :
                                                            workloadScore >= 50 ? 'bg-orange-500' :
                                                                workloadScore >= 25 ? 'bg-yellow-500' : 'bg-green-500'
                                                    )}
                                                    style={{ width: `${workloadScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Recommendations */}
                                        {workloadScore >= 75 && (
                                            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-[12px] text-red-600 dark:text-red-400">
                                                    <strong>Overloaded:</strong> Consider redistributing {Math.ceil(totalTasks * 0.3)} tasks to balance workload
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Workload Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-[13px]">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>
                                    <strong>Balance Distribution:</strong> Aim for 3-8 tasks per member for optimal productivity
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>
                                    <strong>Monitor Blocked Tasks:</strong> Help team members resolve blockers quickly
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>
                                    <strong>Regular Check-ins:</strong> Review workload weekly and adjust assignments
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
