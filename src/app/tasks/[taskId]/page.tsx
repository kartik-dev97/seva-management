'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/app-layout';
import {
    getTaskById,
    users,
    projects,
    getProjectById,
    getTasksByProject
} from '@/lib/mock-data';
import {
    TaskStatus,
    TaskPriority,
    TaskVisibility,
    Task
} from '@/lib/types';
import {
    ArrowLeft,
    Clock,
    Calendar as CalendarIcon,
    Tag,
    AlertCircle,
    Users,
    CheckCircle2,
    Plus,
    MoreVertical,
    MessageSquare,
    Paperclip,
    Send,
    ChevronDown,
    Flag,
    Eye,
    History,
    Archive,
    Trash2,
    Share2,
    Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function TaskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = params.taskId as string;

    const taskData = useMemo(() => getTaskById(taskId), [taskId]);
    const [task, setTask] = useState<Task | undefined>(taskData);
    const [commentText, setCommentText] = useState('');

    if (!task) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <AlertCircle className="h-12 w-12 text-zinc-300" />
                    <h2 className="text-xl font-semibold">Task not found</h2>
                    <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
                </div>
            </AppLayout>
        );
    }

    const project = task.projectId ? getProjectById(task.projectId) : null;
    const assignee = users.find(u => u.id === task.assigneeId);
    const creator = users.find(u => u.id === task.createdBy);

    const handleAddComment = () => {
        if (!commentText.trim()) return;

        const newComment = {
            id: `c-${Date.now()}`,
            userId: 'user-1', // Mocking current user
            content: commentText,
            createdAt: new Date(),
        };

        setTask(prev => prev ? ({
            ...prev,
            comments: [...prev.comments, newComment]
        }) : prev);

        setCommentText('');
    };

    const toggleSubtask = (subtaskId: string) => {
        setTask(prev => {
            if (!prev) return prev;
            const updatedSubtasks = prev.subtasks.map(s =>
                s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s
            );

            // Re-calculate progress
            const completedCount = updatedSubtasks.filter(s => s.isCompleted).length;
            const progress = updatedSubtasks.length > 0
                ? Math.round((completedCount / updatedSubtasks.length) * 100)
                : prev.progress;

            return {
                ...prev,
                subtasks: updatedSubtasks,
                progress
            };
        });
    };

    return (
        <AppLayout hideSidebarPadding>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0 border-r border-zinc-100">
                    {/* Top Top Bar */}
                    <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-50 shrink-0">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900" onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-2 text-[13px] font-medium">
                                <span className="text-zinc-400">Tasks</span>
                                <span className="text-zinc-300">/</span>
                                <span className="text-zinc-900">{task.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <StarIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable Context */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-12 py-10 space-y-12 pb-32">
                            {/* Header */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Badge className={cn(
                                        "h-6 px-2.5 text-[10px] uppercase font-bold tracking-widest border-none shadow-none",
                                        task.status === TaskStatus.COMPLETED ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white"
                                    )}>
                                        {task.status}
                                    </Badge>
                                    <Badge variant="outline" className="h-6 px-2.5 text-[10px] font-bold border-zinc-200 text-zinc-500 uppercase tracking-widest">
                                        {task.priority} Priority
                                    </Badge>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
                                    {task.title}
                                </h1>
                                <div className="flex items-center gap-6 text-[13px] font-medium text-zinc-400">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={creator?.avatar} />
                                            <AvatarFallback className="text-[8px] font-bold">{creator?.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>Created by {creator?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{format(task.createdAt, 'MMM d, h:mm a')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400">Description</h3>
                                <div className="text-[15px] leading-relaxed text-zinc-600 font-medium bg-zinc-50/50 p-6 rounded-2xl border border-dashed border-zinc-200">
                                    {task.description || "No description provided."}
                                </div>
                            </div>

                            {/* Subtasks */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400">Action Items</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-bold text-zinc-400">{task.progress}%</span>
                                        <Progress value={task.progress} className="h-1.5 w-24 bg-zinc-100" />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    {task.subtasks.map(st => (
                                        <div
                                            key={st.id}
                                            className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/40 transition-all cursor-pointer"
                                            onClick={() => toggleSubtask(st.id)}
                                        >
                                            <div className={cn(
                                                "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all",
                                                st.isCompleted ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-200 bg-white group-hover:border-zinc-400"
                                            )}>
                                                {st.isCompleted && <CheckCircle2 className="h-3 w-3.5" />}
                                            </div>
                                            <span className={cn(
                                                "text-[14px] font-semibold transition-all flex-1",
                                                st.isCompleted ? "text-zinc-300 line-through" : "text-zinc-700"
                                            )}>
                                                {st.title}
                                            </span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="h-12 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 rounded-xl justify-start text-zinc-400 gap-2 border-dashed font-bold uppercase text-[11px] tracking-widest">
                                        <Plus className="h-4 w-4" /> Add action item
                                    </Button>
                                </div>
                            </div>

                            {/* Custom Divider */}
                            <div className="py-2">
                                <Separator className="bg-zinc-100" />
                            </div>

                            {/* Discussion / Activity Feed */}
                            <div className="space-y-8">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                                    <MessageSquare className="h-3.5 w-3.5" /> Discussion
                                </h3>

                                <div className="space-y-10">
                                    {task.comments.map(comment => {
                                        const commentUser = users.find(u => u.id === comment.userId);
                                        return (
                                            <div key={comment.id} className="flex gap-4 group">
                                                <Avatar className="h-9 w-9 border border-zinc-200">
                                                    <AvatarImage src={commentUser?.avatar} />
                                                    <AvatarFallback className="text-[10px] font-bold">{commentUser?.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[13px] font-bold text-zinc-900">{commentUser?.name}</span>
                                                        <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-tight">{format(comment.createdAt, 'MMM d, h:mm a')}</span>
                                                    </div>
                                                    <div className="text-[14px] text-zinc-600 font-medium leading-relaxed">
                                                        {comment.content}
                                                    </div>
                                                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-[11px] font-bold text-zinc-400 hover:text-zinc-900">Reply</button>
                                                        <button className="text-[11px] font-bold text-zinc-400 hover:text-zinc-900">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Commentbox */}
                                <div className="relative mt-12 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 text-[14px] min-h-[100px] resize-none placeholder:text-zinc-400 font-medium text-zinc-800"
                                        placeholder="Type a message or press CMD + Enter to send..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                                handleAddComment();
                                            }
                                        }}
                                    />
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                                <Users className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            onClick={handleAddComment}
                                            className="h-9 gap-2 bg-zinc-900 text-white font-bold text-[12px] px-4 rounded-xl shadow-lg shadow-zinc-200"
                                        >
                                            <Send className="h-3.5 w-3.5" /> Send Message
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details Area */}
                <div className="w-80 shrink-0 flex flex-col bg-zinc-50/30 overflow-y-auto border-l border-zinc-100">
                    <div className="p-8 space-y-10">
                        {/* Status Sections */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Properties</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Status</label>
                                    <Button variant="outline" className="w-full justify-between h-10 px-3 bg-white border-zinc-200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-zinc-900" />
                                            <span className="text-[13px] font-bold">{task.status}</span>
                                        </div>
                                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Priority</label>
                                    <Button variant="outline" className="w-full justify-between h-10 px-3 bg-white border-zinc-200">
                                        <div className="flex items-center gap-2">
                                            <Flag className="h-3.5 w-3.5 text-zinc-400" />
                                            <span className="text-[13px] font-bold">{task.priority}</span>
                                        </div>
                                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Assignee</label>
                                    <Button variant="outline" className="w-full justify-start gap-3 h-12 px-3 bg-white border-zinc-200">
                                        <Avatar className="h-6 w-6 border border-zinc-100">
                                            <AvatarImage src={assignee?.avatar} />
                                            <AvatarFallback className="text-[8px] font-bold">{assignee?.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start min-w-0">
                                            <span className="text-[12px] font-bold text-zinc-900 truncate w-full">{assignee?.name}</span>
                                            <span className="text-[10px] text-zinc-400 font-medium">Assigned</span>
                                        </div>
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Project</label>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors cursor-pointer">
                                        <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                            <Layers className="h-4 w-4" />
                                        </div>
                                        <span className="text-[12px] font-bold text-zinc-900 truncate">
                                            {project?.title || "Org Level"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Dates & Timeline */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-3.5 w-3.5 text-zinc-400" />
                                        <span className="text-[12px] font-medium text-zinc-500">Due Date</span>
                                    </div>
                                    <span className="text-[12px] font-bold text-zinc-900">
                                        {task.dueDate ? format(task.dueDate, 'MMM d, yyyy') : 'No date'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <History className="h-3.5 w-3.5 text-zinc-400" />
                                        <span className="text-[12px] font-medium text-zinc-500">Total Time</span>
                                    </div>
                                    <span className="text-[12px] font-bold text-zinc-900">4d 6h</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Tags */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Tags</h3>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400"><Plus className="h-3 w-3" /></Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {task.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-600 border-none hover:bg-zinc-200 cursor-pointer font-bold text-[10px] uppercase tracking-wider px-2.5 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Dangerous Actions */}
                        <div className="pt-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3">
                                <Eye className="h-4 w-4" /> Stop watching
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3">
                                <Archive className="h-4 w-4" /> Archive task
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 px-3">
                                <Trash2 className="h-4 w-4" /> Delete permanently
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StarIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
