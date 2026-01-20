import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { tasks, getUserById, getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    ArrowLeft,
    Calendar,
    User,
    Paperclip,
    MessageSquare,
    MoreHorizontal,
    Eye,
    Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TaskStatus, TaskPriority, TaskVisibility } from '@/lib/types';
import { format } from 'date-fns';

const priorityColors = {
    [TaskPriority.LOW]: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    [TaskPriority.MEDIUM]: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    [TaskPriority.HIGH]: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    [TaskPriority.URGENT]: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

const statusColors = {
    [TaskStatus.TODO]: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    [TaskStatus.IN_REVIEW]: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    [TaskStatus.COMPLETED]: 'bg-green-500/10 text-green-600 dark:text-green-400',
    [TaskStatus.BLOCKED]: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        notFound();
    }

    const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
    const project = task.projectId ? getProjectById(task.projectId) : null;
    const creator = getUserById(task.createdBy);

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <Link
                        href="/tasks"
                        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Tasks
                    </Link>
                    <div className="flex items-start justify-between">
                        <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
                        <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <pre className="whitespace-pre-wrap text-[13px] text-muted-foreground font-sans">
                                        {task.description}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Attachments */}
                        {task.attachments.length > 0 && (
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                        <Paperclip className="h-4 w-4" />
                                        Attachments ({task.attachments.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {task.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="flex items-center justify-between p-3 rounded-lg border border-border/40"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/5">
                                                        <Paperclip className="h-4 w-4 text-primary/70" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-medium">{attachment.name}</p>
                                                        <p className="text-[11px] text-muted-foreground">
                                                            {(attachment.size / 1024).toFixed(0)} KB • {format(attachment.uploadedAt, 'PPP')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">Download</Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Comments */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Comments ({task.comments.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {task.comments.map((comment) => {
                                        const commentUser = getUserById(comment.userId);
                                        return (
                                            <div key={comment.id} className="flex gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={commentUser?.avatar} alt={commentUser?.name} />
                                                    <AvatarFallback className="text-[11px]">
                                                        {commentUser?.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[13px] font-medium">{commentUser?.name}</span>
                                                        <span className="text-[11px] text-muted-foreground">
                                                            {format(comment.createdAt, 'PPp')}
                                                        </span>
                                                    </div>
                                                    <p className="text-[13px] text-muted-foreground mt-1">{comment.content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Comment Input */}
                                    <div className="flex gap-3 pt-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-[11px]">You</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <textarea
                                                placeholder="Leave a comment..."
                                                className="w-full min-h-[80px] p-3 text-[13px] rounded-lg border border-border/60 bg-background/50 resize-none outline-none focus:border-primary/40"
                                            />
                                            <div className="flex justify-end mt-2">
                                                <Button size="sm">Comment</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Priority */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-[11px] text-muted-foreground mb-2">Status</p>
                                    <Badge className={cn('text-[11px]', statusColors[task.status])}>
                                        {task.status}
                                    </Badge>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-[11px] text-muted-foreground mb-2">Priority</p>
                                    <Badge className={cn('text-[11px]', priorityColors[task.priority])}>
                                        {task.priority}
                                    </Badge>
                                </div>
                                {task.dueDate && (
                                    <>
                                        <Separator />
                                        <div>
                                            <p className="text-[11px] text-muted-foreground mb-2">Due Date</p>
                                            <div className="flex items-center gap-2 text-[13px]">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                {format(task.dueDate, 'PPP')}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Assignee */}
                        {assignee && (
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold">Assignee</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Link href={`/employees/${assignee.id}`} className="flex items-center gap-3 hover:bg-accent/50 p-2 -m-2 rounded-lg transition-colors">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                                            <AvatarFallback>
                                                {assignee.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-[13px] font-medium">{assignee.name}</p>
                                            <p className="text-[12px] text-muted-foreground">{assignee.role}</p>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}

                        {/* Project Link */}
                        {project && (
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold">Project</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="flex items-center gap-2 text-[13px] text-primary hover:underline"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                        {project.title}
                                    </Link>
                                </CardContent>
                            </Card>
                        )}

                        {/* Visibility */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Visibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-[13px]">{task.visibility}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metadata */}
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-[12px]">
                                <div>
                                    <p className="text-muted-foreground">Created by</p>
                                    <p className="font-medium mt-1">{creator?.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Created on</p>
                                    <p className="font-medium mt-1">{format(task.createdAt, 'PPP')}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Last updated</p>
                                    <p className="font-medium mt-1">{format(task.updatedAt, 'PPp')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
