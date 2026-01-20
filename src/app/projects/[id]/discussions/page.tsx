import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    Plus,
    MessageSquare,
    Pin,
    ThumbsUp,
    Reply,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

// Discussion threads
const discussions = [
    {
        id: '1',
        title: 'Budget allocation for Q2 activities',
        content: 'We need to discuss how to allocate the remaining budget for Q2. I propose we prioritize the teacher training workshops and materials procurement.',
        author: 'user-1',
        createdAt: new Date('2026-03-08T10:30:00'),
        pinned: true,
        likes: 5,
        replies: [
            {
                id: '1-1',
                content: 'I agree. The training workshops should be our main focus. We can reduce the marketing budget if needed.',
                author: 'user-3',
                createdAt: new Date('2026-03-08T11:15:00'),
                likes: 3,
            },
            {
                id: '1-2',
                content: 'Let\'s schedule a meeting to finalize this. I\'ll prepare a detailed breakdown.',
                author: 'user-2',
                createdAt: new Date('2026-03-08T14:00:00'),
                likes: 2,
            },
        ],
    },
    {
        id: '2',
        title: 'Venue options for the March workshop',
        content: 'I\'ve identified three potential venues for our upcoming workshop. The community center is the most affordable option.',
        author: 'user-2',
        createdAt: new Date('2026-03-05T09:00:00'),
        pinned: false,
        likes: 3,
        replies: [
            {
                id: '2-1',
                content: 'Community center sounds good. It\'s also easily accessible for most attendees.',
                author: 'user-4',
                createdAt: new Date('2026-03-05T10:30:00'),
                likes: 1,
            },
        ],
    },
    {
        id: '3',
        title: 'Transportation logistics update',
        content: 'I\'ve confirmed two tempos for supply transportation. Still working on the bus for team transport.',
        author: 'user-6',
        createdAt: new Date('2026-03-03T16:00:00'),
        pinned: false,
        likes: 2,
        replies: [],
    },
    {
        id: '4',
        title: 'Thank you note to donors',
        content: 'Draft for the thank you letters is ready. Please review and suggest any changes before we send them out.',
        author: 'user-5',
        createdAt: new Date('2026-03-01T11:00:00'),
        pinned: false,
        likes: 4,
        replies: [
            {
                id: '4-1',
                content: 'Looks great! Maybe add a few photos from our previous events?',
                author: 'user-4',
                createdAt: new Date('2026-03-01T12:00:00'),
                likes: 2,
            },
        ],
    },
];

export default async function DiscussionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalDiscussions = discussions.length;
    const pinnedCount = discussions.filter(d => d.pinned).length;

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-6">
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
                            <h1 className="text-2xl font-semibold tracking-tight">Discussions</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Team conversations for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Discussion
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Discussions</p>
                            <p className="text-2xl font-semibold mt-1">{totalDiscussions}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Pinned</p>
                            <p className="text-2xl font-semibold mt-1">{pinnedCount}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">This Week</p>
                            <p className="text-2xl font-semibold mt-1">{discussions.filter(d => {
                                const weekAgo = new Date();
                                weekAgo.setDate(weekAgo.getDate() - 7);
                                return d.createdAt > weekAgo;
                            }).length}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* New Discussion Input */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="text-[11px]">You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                                <Textarea
                                    placeholder="Start a new discussion..."
                                    className="text-[13px] min-h-[80px]"
                                />
                                <div className="flex justify-end">
                                    <Button size="sm">Post Discussion</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Discussion Threads */}
                <div className="space-y-4">
                    {discussions.map((discussion) => {
                        const author = getUserById(discussion.author);

                        return (
                            <Card key={discussion.id} className="border-border/40 bg-card/50">
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        {/* Discussion Header */}
                                        <div className="flex items-start gap-4">
                                            {author && (
                                                <Link href={`/employees/${author.id}`}>
                                                    <Avatar className="h-10 w-10 hover:ring-2 ring-primary transition-all">
                                                        <AvatarImage src={author.avatar} alt={author.name} />
                                                        <AvatarFallback className="text-[11px]">
                                                            {author.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </Link>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-[14px] font-semibold">{discussion.title}</h3>
                                                            {discussion.pinned && (
                                                                <Pin className="h-3.5 w-3.5 text-orange-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                                                            <Link href={`/employees/${author?.id}`} className="hover:text-primary font-medium">
                                                                {author?.name}
                                                            </Link>
                                                            <span>•</span>
                                                            <span>{formatDistanceToNow(discussion.createdAt, { addSuffix: true })}</span>
                                                        </div>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <p className="text-[13px] mt-3 text-muted-foreground leading-relaxed">
                                                    {discussion.content}
                                                </p>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <Button variant="ghost" size="sm" className="text-[12px] h-7 gap-1">
                                                        <ThumbsUp className="h-3.5 w-3.5" />
                                                        {discussion.likes}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-[12px] h-7 gap-1">
                                                        <Reply className="h-3.5 w-3.5" />
                                                        {discussion.replies.length} replies
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Replies */}
                                        {discussion.replies.length > 0 && (
                                            <div className="ml-14 space-y-3 pt-3 border-t border-border/40">
                                                {discussion.replies.map((reply) => {
                                                    const replyAuthor = getUserById(reply.author);
                                                    return (
                                                        <div key={reply.id} className="flex gap-3">
                                                            {replyAuthor && (
                                                                <Link href={`/employees/${replyAuthor.id}`}>
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage src={replyAuthor.avatar} alt={replyAuthor.name} />
                                                                        <AvatarFallback className="text-[10px]">
                                                                            {replyAuthor.name.split(' ').map(n => n[0]).join('')}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                </Link>
                                                            )}
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 text-[11px]">
                                                                    <Link href={`/employees/${replyAuthor?.id}`} className="font-medium hover:text-primary">
                                                                        {replyAuthor?.name}
                                                                    </Link>
                                                                    <span className="text-muted-foreground">
                                                                        {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[12px] mt-1 text-muted-foreground">{reply.content}</p>
                                                                <Button variant="ghost" size="sm" className="text-[11px] h-6 gap-1 mt-1 -ml-2">
                                                                    <ThumbsUp className="h-3 w-3" />
                                                                    {reply.likes}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Reply input */}
                                                <div className="flex gap-3 pt-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="text-[10px]">You</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Write a reply..."
                                                            className="flex-1 h-8 px-3 text-[12px] rounded-lg border border-border/60 bg-background/50"
                                                        />
                                                        <Button size="sm" className="h-8 text-[11px]">Reply</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
