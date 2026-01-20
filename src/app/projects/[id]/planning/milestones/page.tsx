import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Plus,
    Flag,
    CheckCircle2,
    Clock,
    Calendar,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, differenceInDays, isPast } from 'date-fns';

// Phases and milestones
const phases = [
    {
        id: '1',
        name: 'Planning Phase',
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-02-28'),
        status: 'completed',
        progress: 100,
        milestones: [
            { id: 'm1', name: 'Project Charter Approved', date: new Date('2026-01-20'), status: 'completed' },
            { id: 'm2', name: 'Budget Finalized', date: new Date('2026-02-05'), status: 'completed' },
            { id: 'm3', name: 'Team Assembled', date: new Date('2026-02-15'), status: 'completed' },
            { id: 'm4', name: 'Planning Review', date: new Date('2026-02-28'), status: 'completed' },
        ]
    },
    {
        id: '2',
        name: 'Execution Phase',
        startDate: new Date('2026-03-01'),
        endDate: new Date('2026-05-31'),
        status: 'in-progress',
        progress: 45,
        milestones: [
            { id: 'm5', name: 'Materials Procurement Complete', date: new Date('2026-03-15'), status: 'completed' },
            { id: 'm6', name: 'First Workshop Conducted', date: new Date('2026-03-25'), status: 'in-progress' },
            { id: 'm7', name: 'Mid-term Review', date: new Date('2026-04-15'), status: 'upcoming' },
            { id: 'm8', name: 'Community Outreach Complete', date: new Date('2026-05-01'), status: 'upcoming' },
            { id: 'm9', name: 'Final Deployment', date: new Date('2026-05-31'), status: 'upcoming' },
        ]
    },
    {
        id: '3',
        name: 'Monitoring & Evaluation',
        startDate: new Date('2026-06-01'),
        endDate: new Date('2026-06-30'),
        status: 'upcoming',
        progress: 0,
        milestones: [
            { id: 'm10', name: 'Impact Assessment', date: new Date('2026-06-10'), status: 'upcoming' },
            { id: 'm11', name: 'Stakeholder Feedback', date: new Date('2026-06-20'), status: 'upcoming' },
            { id: 'm12', name: 'Final Report Submitted', date: new Date('2026-06-30'), status: 'upcoming' },
        ]
    },
];

const statusColors = {
    'completed': 'bg-green-500',
    'in-progress': 'bg-blue-500',
    'upcoming': 'bg-gray-400',
    'at-risk': 'bg-orange-500',
    'delayed': 'bg-red-500',
};

export default async function MilestonesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalMilestones = phases.reduce((sum, p) => sum + p.milestones.length, 0);
    const completedMilestones = phases.reduce((sum, p) => sum + p.milestones.filter(m => m.status === 'completed').length, 0);
    const upcomingMilestones = phases.flatMap(p => p.milestones).filter(m => m.status === 'upcoming').slice(0, 3);

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
                            <h1 className="text-2xl font-semibold tracking-tight">Phases & Milestones</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Track project phases for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Milestone
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Milestones</p>
                            <p className="text-2xl font-semibold mt-1">{totalMilestones}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Completed</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">{completedMilestones}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Current Phase</p>
                            <p className="text-[15px] font-semibold mt-1">Execution</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Next Milestone</p>
                            <p className="text-[13px] font-semibold mt-1">Mar 25</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Milestones */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Upcoming Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {upcomingMilestones.map((milestone) => {
                                const daysUntil = differenceInDays(milestone.date, new Date());
                                return (
                                    <div key={milestone.id} className="flex-shrink-0 w-64 p-4 rounded-lg border border-border/40">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                <Flag className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-medium">{milestone.name}</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                    {format(milestone.date, 'MMM dd, yyyy')}
                                                </p>
                                                <Badge variant="secondary" className="text-[10px] mt-2">
                                                    {daysUntil > 0 ? `${daysUntil} days left` : 'Today'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Phase Timeline */}
                <div className="space-y-6">
                    {phases.map((phase, phaseIndex) => (
                        <Card key={phase.id} className="border-border/40 bg-card/50">
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full text-white text-[14px] font-bold",
                                            statusColors[phase.status as keyof typeof statusColors]
                                        )}>
                                            {phaseIndex + 1}
                                        </div>
                                        <div>
                                            <CardTitle className="text-[15px] font-semibold">{phase.name}</CardTitle>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                                {format(phase.startDate, 'MMM dd')} - {format(phase.endDate, 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant={phase.status === 'completed' ? 'default' : 'secondary'} className="text-[10px]">
                                        {phase.status.replace('-', ' ')}
                                    </Badge>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{phase.progress}%</span>
                                    </div>
                                    <Progress value={phase.progress} className="h-2" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative pl-8 space-y-3 mt-4">
                                    {/* Vertical line */}
                                    <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

                                    {phase.milestones.map((milestone, i) => {
                                        const isCompleted = milestone.status === 'completed';
                                        const isInProgress = milestone.status === 'in-progress';

                                        return (
                                            <div key={milestone.id} className="relative flex items-center gap-3">
                                                {/* Circle */}
                                                <div className={cn(
                                                    "absolute -left-5 h-6 w-6 rounded-full flex items-center justify-center border-2 bg-background",
                                                    isCompleted ? 'border-green-500' : isInProgress ? 'border-blue-500' : 'border-gray-300'
                                                )}>
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    ) : isInProgress ? (
                                                        <Clock className="h-3 w-3 text-blue-500" />
                                                    ) : (
                                                        <div className="h-2 w-2 rounded-full bg-gray-300" />
                                                    )}
                                                </div>

                                                <div className="flex-1 flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-accent/30 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <Flag className={cn(
                                                            "h-4 w-4",
                                                            isCompleted ? 'text-green-500' : isInProgress ? 'text-blue-500' : 'text-gray-400'
                                                        )} />
                                                        <div>
                                                            <p className={cn(
                                                                "text-[13px] font-medium",
                                                                isCompleted && 'line-through text-muted-foreground'
                                                            )}>
                                                                {milestone.name}
                                                            </p>
                                                            <p className="text-[11px] text-muted-foreground">
                                                                {format(milestone.date, 'MMM dd, yyyy')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
