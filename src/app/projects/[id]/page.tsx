import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, getTasksByProject, getEventsByProject, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Calendar,
    IndianRupee,
    Users,
    ArrowLeft,
    CheckCircle2,
    Clock,
    ListTodo,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProjectStatus } from '@/lib/types';
import { format } from 'date-fns';
import { ProjectSubNav } from '@/components/project/project-sub-nav';

const statusColors = {
    [ProjectStatus.PLANNING]: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    [ProjectStatus.IN_PROGRESS]: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    [ProjectStatus.ON_HOLD]: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    [ProjectStatus.COMPLETED]: 'bg-green-500/10 text-green-600 dark:text-green-400',
    [ProjectStatus.CANCELLED]: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const projectTasks = getTasksByProject(project.id);
    const projectEvents = getEventsByProject(project.id);
    const lead = getUserById(project.lead);
    const budgetUsed = (project.spent / project.budget) * 100;

    const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
    const upcomingEvents = projectEvents.filter(e => e.startDate >= new Date()).slice(0, 3);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
                            <Badge className={cn('text-[11px]', statusColors[project.status])}>
                                {project.status}
                            </Badge>
                        </div>
                        <p className="text-[13px] text-muted-foreground max-w-3xl">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${id}/settings`}>Settings</Link>
                        </Button>
                    </div>
                </div>

                {/* Sub Navigation */}
                <ProjectSubNav projectId={id} />

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <IndianRupee className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Budget</p>
                                    <p className="text-[15px] font-semibold">₹{(project.budget / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <Users className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Team</p>
                                    <p className="text-[15px] font-semibold">{project.members.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <Calendar className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Events</p>
                                    <p className="text-[15px] font-semibold">{projectEvents.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <ListTodo className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Tasks</p>
                                    <p className="text-[15px] font-semibold">{completedTasks}/{projectTasks.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <CheckCircle2 className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Progress</p>
                                    <p className="text-[15px] font-semibold">{project.progress}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Progress & Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Progress Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[13px] text-muted-foreground">Overall Completion</span>
                                        <span className="text-[13px] font-medium">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[13px] text-muted-foreground">Budget Utilization</span>
                                        <span className="text-[13px] font-medium">{budgetUsed.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={budgetUsed} className="h-2" />
                                </div>
                                <div className="flex items-center justify-between text-[13px] pt-2 border-t border-border/40">
                                    <div>
                                        <p className="text-muted-foreground">Start Date</p>
                                        <p className="font-medium mt-1">{format(project.startDate, 'MMM dd, yyyy')}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">End Date</p>
                                        <p className="font-medium mt-1">
                                            {project.endDate ? format(project.endDate, 'MMM dd, yyyy') : 'Ongoing'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Events */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold">Upcoming Events</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/projects/${id}/events`} className="text-[12px]">
                                        View All <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {upcomingEvents.length > 0 ? (
                                    <div className="space-y-3">
                                        {upcomingEvents.map((event) => (
                                            <Link
                                                key={event.id}
                                                href={`/events/${event.id}`}
                                                className="flex items-center gap-3 p-3 rounded-lg border border-border/40 hover:bg-accent/50 transition-colors"
                                            >
                                                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary/5">
                                                    <span className="text-[16px] font-bold">{format(event.startDate, 'd')}</span>
                                                    <span className="text-[10px] text-muted-foreground">{format(event.startDate, 'MMM')}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[13px] font-medium">{event.title}</p>
                                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{format(event.startDate, 'h:mm a')}</span>
                                                        <span>•</span>
                                                        <span>{event.location}</span>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary" className="text-[10px]">{event.status}</Badge>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[13px] text-muted-foreground text-center py-6">
                                        No upcoming events
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recent Tasks */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold">Recent Tasks</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/projects/${id}/tasks/timeline`} className="text-[12px]">
                                        View All <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {projectTasks.slice(0, 5).map((task) => (
                                        <Link
                                            key={task.id}
                                            href={`/tasks/${task.id}`}
                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    task.status === 'Completed' ? 'bg-green-500' :
                                                        task.status === 'In Progress' ? 'bg-blue-500' :
                                                            task.status === 'Blocked' ? 'bg-red-500' : 'bg-gray-400'
                                                )} />
                                                <span className="text-[13px]">{task.title}</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px]">{task.status}</Badge>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Project Lead */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Project Lead</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {lead && (
                                    <Link href={`/employees/${lead.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={lead.avatar} alt={lead.name} />
                                            <AvatarFallback>
                                                {lead.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-[13px] font-medium">{lead.name}</p>
                                            <p className="text-[12px] text-muted-foreground">{lead.email}</p>
                                        </div>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-[11px] text-muted-foreground mb-1">Department</p>
                                    <Badge variant="secondary" className="text-[11px]">{project.department}</Badge>
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground mb-2">Tags</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-[11px]">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Members Preview */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold">Team</CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/projects/${id}/team`} className="text-[12px]">
                                        View All
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex -space-x-2">
                                    {project.members.slice(0, 5).map((member) => {
                                        const user = getUserById(member.userId);
                                        return user ? (
                                            <Link key={member.userId} href={`/employees/${user.id}`}>
                                                <Avatar className="h-8 w-8 border-2 border-background hover:z-10 transition-transform hover:scale-110">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback className="text-[10px]">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        ) : null;
                                    })}
                                    {project.members.length > 5 && (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                                            +{project.members.length - 5}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
