import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, tasks, events } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Download,
    Target,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Users,
    IndianRupee
} from 'lucide-react';
import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

export default async function ProgressReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const projectEvents = events.filter(e => e.projectId === project.id);

    const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = projectTasks.filter(t => t.status === 'In Progress').length;
    const blockedTasks = projectTasks.filter(t => t.status === 'Blocked').length;

    const daysElapsed = differenceInDays(new Date(), project.startDate);
    const totalDays = project.endDate ? differenceInDays(project.endDate, project.startDate) : 365;
    const timeProgress = (daysElapsed / totalDays) * 100;

    const budgetProgress = (project.spent / project.budget) * 100;
    const isOnTrack = project.progress >= timeProgress - 10 && project.progress <= timeProgress + 10;
    const isBudgetOnTrack = budgetProgress <= project.progress + 10;

    // Milestones
    const milestones = [
        { id: '1', name: 'Project Planning', targetDate: new Date('2026-02-15'), status: 'completed', progress: 100 },
        { id: '2', name: 'Resource Allocation', targetDate: new Date('2026-03-01'), status: 'completed', progress: 100 },
        { id: '3', name: 'Implementation Start', targetDate: new Date('2026-03-15'), status: 'in-progress', progress: 75 },
        { id: '4', name: 'Mid-term Review', targetDate: new Date('2026-04-30'), status: 'upcoming', progress: 0 },
        { id: '5', name: 'Final Evaluation', targetDate: new Date('2026-06-30'), status: 'upcoming', progress: 0 },
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
                            <h1 className="text-2xl font-semibold tracking-tight">Progress Report</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Comprehensive progress analysis for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export PDF
                    </Button>
                </div>

                {/* Executive Summary */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-muted-foreground">Overall Progress</span>
                                    <span className="text-[13px] font-semibold">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-3" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-muted-foreground">Timeline Progress</span>
                                    <span className="text-[13px] font-semibold">{timeProgress.toFixed(0)}%</span>
                                </div>
                                <Progress value={timeProgress} className="h-3" />
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/30">
                            <div className="flex items-start gap-3">
                                {isOnTrack ? (
                                    <>
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-[13px]">
                                            <strong className="text-green-600">On Track:</strong>
                                            <p className="text-muted-foreground mt-1">
                                                Project is progressing according to schedule. Current completion rate aligns with time elapsed.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-[13px]">
                                            <strong className="text-orange-600">Attention Required:</strong>
                                            <p className="text-muted-foreground mt-1">
                                                Project progress ({project.progress}%) is {project.progress < timeProgress ? 'behind' : 'ahead of'} schedule ({timeProgress.toFixed(0)}%). Review required.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Completed Tasks</p>
                                    <p className="text-[18px] font-semibold">{completedTasks}/{projectTasks.length}</p>
                                    <p className="text-[10px] text-green-600">{((completedTasks / projectTasks.length) * 100).toFixed(0)}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <TrendingUp className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">In Progress</p>
                                    <p className="text-[18px] font-semibold">{inProgressTasks}</p>
                                    <p className="text-[10px] text-blue-600">Active tasks</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <IndianRupee className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Budget Used</p>
                                    <p className="text-[18px] font-semibold">{budgetProgress.toFixed(0)}%</p>
                                    <p className="text-[10px] text-orange-600">₹{(project.spent / 100000).toFixed(1)}L spent</p>
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
                                    <p className="text-[11px] text-muted-foreground">Events</p>
                                    <p className="text-[18px] font-semibold">{projectEvents.length}</p>
                                    <p className="text-[10px] text-purple-600">Scheduled</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Milestones */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Milestone Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {milestones.map((milestone, index) => (
                                <div key={milestone.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full border-2",
                                                milestone.status === 'completed' ? 'bg-green-500/10 border-green-500 text-green-600' :
                                                    milestone.status === 'in-progress' ? 'bg-blue-500/10 border-blue-500 text-blue-600' :
                                                        'bg-gray-500/10 border-gray-300 text-gray-600'
                                            )}>
                                                {milestone.status === 'completed' ? (
                                                    <CheckCircle2 className="h-4 w-4" />
                                                ) : (
                                                    <span className="text-[11px] font-semibold">{index + 1}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium">{milestone.name}</p>
                                                <p className="text-[11px] text-muted-foreground">
                                                    Target: {format(milestone.targetDate, 'MMM dd, yyyy')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[13px] font-medium">{milestone.progress}%</span>
                                            <Badge
                                                variant={
                                                    milestone.status === 'completed' ? 'default' :
                                                        milestone.status === 'in-progress' ? 'secondary' : 'outline'
                                                }
                                                className="text-[10px]"
                                            >
                                                {milestone.status.replace('-', ' ')}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Progress value={milestone.progress} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Issues & Blockers */}
                {blockedTasks > 0 && (
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold text-red-600 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Issues & Blockers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-3 rounded-lg border border-red-500/20 bg-background">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                        <div className="text-[13px]">
                                            <strong className="text-red-600">Blocked Tasks:</strong>
                                            <p className="text-muted-foreground mt-1">
                                                {blockedTasks} task{blockedTasks > 1 ? 's are' : ' is'} currently blocked and require immediate attention to prevent project delays.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recommendations */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-[13px]">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    Continue current pace to maintain {project.progress}% completion rate
                                </span>
                            </li>
                            {blockedTasks > 0 && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong>Priority:</strong> Resolve {blockedTasks} blocked task{blockedTasks > 1 ? 's' : ''} to prevent cascading delays
                                    </span>
                                </li>
                            )}
                            {!isBudgetOnTrack && (
                                <li className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong>Budget Alert:</strong> Current spending rate ({budgetProgress.toFixed(0)}%) is {budgetProgress > project.progress ? 'above' : 'below'} project progress. Review budget allocation.
                                    </span>
                                </li>
                            )}
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    Schedule weekly status meetings to maintain team alignment
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Report Metadata */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                            <span>Report generated on {format(new Date(), 'PPP')}</span>
                            <span>Next review: {format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'PPP')}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
