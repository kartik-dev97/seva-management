import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    ArrowLeft,
    FileText,
    UserPlus,
    Edit,
    Trash2,
    Upload,
    CheckCircle2,
    MessageSquare,
    DollarSign,
    Calendar,
    Settings
} from 'lucide-react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

// Comprehensive activity log data
const activities = [
    {
        id: '1',
        type: 'expense_added',
        userId: 'user-2',
        timestamp: new Date('2026-03-10T14:30:00'),
        description: 'added expense "Teacher training materials"',
        metadata: { amount: 45000, category: 'Materials & Supplies' }
    },
    {
        id: '2',
        type: 'task_completed',
        userId: 'user-3',
        timestamp: new Date('2026-03-09T16:45:00'),
        description: 'completed task "Prepare educational materials"',
        metadata: { taskId: 'task-1' }
    },
    {
        id: '3',
        type: 'member_added',
        userId: 'user-1',
        timestamp: new Date('2026-03-08T10:20:00'),
        description: 'added Kavya Menon to the team',
        metadata: { role: 'Volunteer Coordinator' }
    },
    {
        id: '4',
        type: 'comment_added',
        userId: 'user-4',
        timestamp: new Date('2026-03-08T09:15:00'),
        description: 'commented on task "Create promotional materials"',
        metadata: { comment: 'Updated designs based on feedback' }
    },
    {
        id: '5',
        type: 'file_uploaded',
        userId: 'user-5',
        timestamp: new Date('2026-03-07T15:30:00'),
        description: 'uploaded file "Workshop_Agenda.pdf"',
        metadata: { fileName: 'Workshop_Agenda.pdf', size: '2.4 MB' }
    },
    {
        id: '6',
        type: 'budget_updated',
        userId: 'user-1',
        timestamp: new Date('2026-03-06T11:00:00'),
        description: 'updated budget allocation for Materials category',
        metadata: { from: 800000, to: 1000000 }
    },
    {
        id: '7',
        type: 'task_created',
        userId: 'user-2',
        timestamp: new Date('2026-03-05T14:20:00'),
        description: 'created task "Confirm venue booking"',
        metadata: { assignee: 'Rajesh Kumar', priority: 'High' }
    },
    {
        id: '8',
        type: 'milestone_reached',
        userId: 'system',
        timestamp: new Date('2026-03-04T00:00:00'),
        description: 'reached milestone "Planning Phase Complete"',
        metadata: { progress: 100 }
    },
    {
        id: '9',
        type: 'event_created',
        userId: 'user-2',
        timestamp: new Date('2026-03-03T10:30:00'),
        description: 'created event "Teacher Training Workshop"',
        metadata: { date: '2026-03-15', attendees: 30 }
    },
    {
        id: '10',
        type: 'project_updated',
        userId: 'user-1',
        timestamp: new Date('2026-03-02T16:00:00'),
        description: 'updated project status from Planning to In Progress',
        metadata: { previousStatus: 'Planning', newStatus: 'In Progress' }
    },
    {
        id: '11',
        type: 'expense_approved',
        userId: 'user-1',
        timestamp: new Date('2026-03-01T13:45:00'),
        description: 'approved expense "Office supplies"',
        metadata: { amount: 12000 }
    },
    {
        id: '12',
        type: 'task_assigned',
        userId: 'user-3',
        timestamp: new Date('2026-02-28T11:30:00'),
        description: 'assigned task "Budget allocation" to Amit Patel',
        metadata: { taskId: 'task-5' }
    },
];

const getActivityIcon = (type: string) => {
    switch (type) {
        case 'task_created':
        case 'task_completed':
        case 'task_assigned':
            return FileText;
        case 'member_added':
            return UserPlus;
        case 'expense_added':
        case 'expense_approved':
        case 'budget_updated':
            return DollarSign;
        case 'comment_added':
            return MessageSquare;
        case 'file_uploaded':
            return Upload;
        case 'event_created':
            return Calendar;
        case 'project_updated':
            return Settings;
        case 'milestone_reached':
            return CheckCircle2;
        default:
            return Edit;
    }
};

const getActivityColor = (type: string) => {
    switch (type) {
        case 'task_completed':
        case 'milestone_reached':
        case 'expense_approved':
            return 'bg-green-500/10 text-green-600';
        case 'task_created':
        case 'file_uploaded':
            return 'bg-blue-500/10 text-blue-600';
        case 'member_added':
            return 'bg-purple-500/10 text-purple-600';
        case 'expense_added':
        case 'budget_updated':
            return 'bg-orange-500/10 text-orange-600';
        default:
            return 'bg-gray-500/10 text-gray-600';
    }
};

export default async function ProjectActivityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-6">
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
                        <h1 className="text-2xl font-semibold tracking-tight">Activity Log</h1>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            Complete audit trail for {project.title}
                        </p>
                    </div>
                </div>

                {/* Activity Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Activities</p>
                            <p className="text-2xl font-semibold mt-1">{activities.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">This Week</p>
                            <p className="text-2xl font-semibold mt-1">
                                {activities.filter(a => {
                                    const weekAgo = new Date();
                                    weekAgo.setDate(weekAgo.getDate() - 7);
                                    return a.timestamp > weekAgo;
                                }).length}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Most Active</p>
                            <p className="text-2xl font-semibold mt-1">Priya S.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Last Activity</p>
                            <p className="text-[13px] font-semibold mt-1">
                                {formatDistanceToNow(activities[0].timestamp, { addSuffix: true })}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Timeline */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative space-y-4">
                            {/* Timeline line */}
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                            {activities.map((activity, index) => {
                                const Icon = getActivityIcon(activity.type);
                                const user = activity.userId !== 'system' ? getUserById(activity.userId) : null;

                                return (
                                    <div key={activity.id} className="relative flex gap-4">
                                        {/* Icon */}
                                        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-background ${getActivityColor(activity.type)}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="rounded-lg border border-border/40 p-4 bg-card/30 hover:bg-card/50 transition-colors">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {user ? (
                                                            <Link href={`/employees/${user.id}`} className="flex items-center gap-2 hover:text-primary">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                                    <AvatarFallback className="text-[10px]">
                                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="text-[13px] font-medium">{user.name}</span>
                                                            </Link>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                                                    <Settings className="h-3 w-3" />
                                                                </div>
                                                                <span className="text-[13px] font-medium">System</span>
                                                            </div>
                                                        )}
                                                        <span className="text-[13px] text-muted-foreground">{activity.description}</span>
                                                    </div>
                                                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                                    </span>
                                                </div>

                                                {/* Metadata */}
                                                {activity.metadata && (
                                                    <div className="mt-2 text-[12px] text-muted-foreground">
                                                        {activity.type === 'expense_added' && (
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-3 w-3" />
                                                                <span>Amount: ₹{((activity.metadata as any).amount / 1000).toFixed(1)}K</span>
                                                                <span>•</span>
                                                                <span>{(activity.metadata as any).category}</span>
                                                            </div>
                                                        )}
                                                        {activity.type === 'file_uploaded' && (
                                                            <div className="flex items-center gap-2">
                                                                <Upload className="h-3 w-3" />
                                                                <span>{(activity.metadata as any).fileName}</span>
                                                                <span>•</span>
                                                                <span>{(activity.metadata as any).size}</span>
                                                            </div>
                                                        )}
                                                        {activity.type === 'member_added' && (
                                                            <div className="flex items-center gap-2">
                                                                <UserPlus className="h-3 w-3" />
                                                                <span>Role: {(activity.metadata as any).role}</span>
                                                            </div>
                                                        )}
                                                        {activity.type === 'budget_updated' && (
                                                            <div className="flex items-center gap-2">
                                                                <DollarSign className="h-3 w-3" />
                                                                <span>₹{((activity.metadata as any).from / 1000).toFixed(0)}K → ₹{((activity.metadata as any).to / 1000).toFixed(0)}K</span>
                                                            </div>
                                                        )}
                                                        {activity.type === 'milestone_reached' && (
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                <span>Progress: {(activity.metadata as any).progress}%</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-2 text-[11px] text-muted-foreground">
                                                    {format(activity.timestamp, 'MMM dd, yyyy • h:mm a')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
