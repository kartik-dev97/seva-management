'use client';

import { use, useState, useMemo } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { notFound, useRouter } from 'next/navigation';
import {
    getMeetingById,
    getProjectById,
    getUserById,
    users as allUsers
} from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowLeft,
    Plus,
    Calendar,
    MapPin,
    Users,
    Video,
    ListTodo,
    FileText,
    Download,
    CheckCircle2,
    Edit,
    Clock,
    Share2,
    MoreVertical,
    ChevronDown,
    Flag,
    History,
    Archive,
    Trash2,
    Eye,
    Star,
    Layers,
    MessageSquare,
    Send,
    Paperclip,
    ExternalLink,
    Play
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

export default function MeetingDetailPage({
    params
}: {
    params: Promise<{ meetingId: string }>
}) {
    const { meetingId } = use(params);
    const router = useRouter();
    const meeting = getMeetingById(meetingId);

    const [commentText, setCommentText] = useState('');

    if (!meeting) {
        notFound();
    }

    const project = meeting.projectId ? getProjectById(meeting.projectId) : null;
    const creator = getUserById(meeting.createdBy);

    // Mock comments since meeting object doesn't have them in mock-data.ts yet
    const [comments, setComments] = useState([
        {
            id: 'c-1',
            userId: 'user-2',
            content: 'I have updated the financial slides for today.',
            createdAt: new Date('2026-01-21T09:00:00'),
        },
        {
            id: 'c-2',
            userId: 'user-3',
            content: 'Will join remotely via the link provided.',
            createdAt: new Date('2026-01-21T10:30:00'),
        }
    ]);

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        const newComment = {
            id: `c-${Date.now()}`,
            userId: 'user-1',
            content: commentText,
            createdAt: new Date(),
        };
        setComments([...comments, newComment]);
        setCommentText('');
    };

    return (
        <AppLayout hideSidebarPadding>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0 border-r border-zinc-100">
                    {/* Top Bar */}
                    <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-50 shrink-0">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900" onClick={() => router.back()}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-2 text-[13px] font-medium">
                                <span className="text-zinc-400">Meetings</span>
                                <span className="text-zinc-300">/</span>
                                <span className="text-zinc-900">{meeting.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-zinc-500 hover:text-zinc-900">
                                <Share2 className="h-3.5 w-3.5" />
                                <span className="text-[12px] font-bold uppercase tracking-wider">Share</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-4 mx-1" />
                            <Button className="h-8 gap-2 bg-zinc-900 text-white font-bold text-[11px] uppercase tracking-wider px-4 rounded-lg shadow-lg shadow-zinc-200">
                                <Play className="h-3 w-3 fill-current" />
                                Start Meeting
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-12 py-12 space-y-12 pb-32">
                            {/* Header */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Badge className="h-6 px-2.5 text-[10px] uppercase font-bold tracking-widest bg-zinc-900 text-white border-none shadow-none">
                                            {meeting.type}
                                        </Badge>
                                        <Badge variant="outline" className="h-6 px-2.5 text-[10px] font-bold border-zinc-200 text-zinc-500 uppercase tracking-widest">
                                            {format(meeting.startDate, 'EEEE, MMM d')}
                                        </Badge>
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
                                    {meeting.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-[13px] font-medium text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-zinc-400" />
                                        <span>{format(meeting.startDate, 'h:mm a')} – {format(meeting.endDate, 'h:mm a')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-zinc-400" />
                                        <span>{meeting.location}</span>
                                    </div>
                                    {meeting.meetingLink && (
                                        <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                                            <Video className="h-4 w-4" />
                                            <span>Join Virtually</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <Avatar className="h-6 w-6 border border-zinc-100">
                                        <AvatarImage src={creator?.avatar} />
                                        <AvatarFallback className="text-[8px] font-bold">{creator?.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-[13px] font-medium text-zinc-400">
                                        Organized by <span className="text-zinc-900">{creator?.name}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Agenda */}
                            <div className="space-y-4">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400">Agenda</h3>
                                <div className="text-[15px] leading-relaxed text-zinc-600 font-medium whitespace-pre-wrap bg-zinc-50/50 p-8 rounded-2xl border border-dashed border-zinc-200">
                                    {meeting.agenda || "No agenda provided."}
                                </div>
                            </div>

                            {/* Notes */}
                            {meeting.notes && (
                                <div className="space-y-4 text-zinc-400">
                                    <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                                        <FileText className="h-3.5 w-3.5" /> Preliminary Notes
                                    </h3>
                                    <div className="text-[15px] leading-relaxed text-zinc-600 font-medium whitespace-pre-wrap bg-white p-6 rounded-xl border border-zinc-100">
                                        {meeting.notes}
                                    </div>
                                </div>
                            )}

                            {/* Discussion */}
                            <div className="space-y-8">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                                    <MessageSquare className="h-3.5 w-3.5" /> Discussion
                                </h3>

                                <div className="space-y-10">
                                    {comments.map(comment => {
                                        const commentUser = getUserById(comment.userId);
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
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Commentbox */}
                                <div className="relative mt-12 bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 text-[14px] min-h-[100px] resize-none placeholder:text-zinc-400 font-medium text-zinc-800"
                                        placeholder="Add a comment or share an update..."
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
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
                                            <Send className="h-3.5 w-3.5" /> Post Comment
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 shrink-0 flex flex-col bg-zinc-50/30 overflow-y-auto border-l border-zinc-100">
                    <div className="p-8 space-y-10">
                        {/* Attendance Stats */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Participants</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                                    <p className="text-[20px] font-bold text-zinc-900">{meeting.participants.filter(p => p.status === 'accepted').length}</p>
                                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Accepted</p>
                                </div>
                                <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                                    <p className="text-[20px] font-bold text-zinc-900">{meeting.participants.length}</p>
                                    <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Total</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {meeting.participants.map(participant => {
                                    const user = getUserById(participant.userId);
                                    return (
                                        <div key={participant.userId} className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-7 w-7 border border-zinc-100">
                                                    <AvatarImage src={user?.avatar} />
                                                    <AvatarFallback className="text-[8px] font-bold">{user?.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-bold text-zinc-900">{user?.name}</span>
                                                    <span className="text-[10px] text-zinc-400 font-medium">{participant.isRequired ? 'Required' : 'Optional'}</span>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className={cn(
                                                "text-[9px] font-bold border-none",
                                                participant.status === 'accepted' ? "text-emerald-500 bg-emerald-50" : "text-amber-500 bg-amber-50"
                                            )}>
                                                {participant.status}
                                            </Badge>
                                        </div>
                                    );
                                })}
                                <Button variant="ghost" className="w-full h-10 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 rounded-xl justify-start text-zinc-400 gap-2 border-dashed font-bold uppercase text-[10px] tracking-widest mt-2">
                                    <Plus className="h-3.5 w-3.5" /> Invite Person
                                </Button>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Details */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Details</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Context</label>
                                    {project ? (
                                        <Link href={`/projects/${project.id}`} className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors">
                                            <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                                <Layers className="h-4 w-4" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[12px] font-bold text-zinc-900 truncate">{project.title}</span>
                                                <span className="text-[10px] text-zinc-400 font-medium">Project</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="p-3 bg-zinc-100/50 rounded-xl border border-dashed border-zinc-200">
                                            <span className="text-[12px] font-bold text-zinc-400">Standalone Meeting</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Actions */}
                        <div className="pt-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3 transition-colors">
                                <Edit className="h-4 w-4" /> Edit meeting details
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3 transition-colors">
                                <Plus className="h-4 w-4" /> Create follow-up
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 px-3 transition-colors">
                                <Trash2 className="h-4 w-4" /> Cancel meeting
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
