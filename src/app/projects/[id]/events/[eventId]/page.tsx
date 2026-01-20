import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import {
    getProjectById,
    getUserById,
    users as allUsers,
    projects as allProjects,
    getEventById
} from '@/lib/mock-data';
import { getProjectEventById } from '@/lib/project-events-data';
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
    FolderOpen,
    FileText,
    Image as ImageIcon,
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
    Paperclip
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const statusColors: Record<string, string> = {
    'Planning': 'bg-amber-500 text-white',
    'Upcoming': 'bg-blue-500 text-white',
    'In Progress': 'bg-green-500 text-white',
    'Completed': 'bg-zinc-500 text-white',
    'Cancelled': 'bg-red-500 text-white',
};

// Mock event meetings
const eventMeetings = [
    { id: 'm1', title: 'Event Planning Kickoff', date: new Date('2026-03-10T10:00:00'), duration: '1h', attendees: 5, status: 'completed', notes: 'Discussed venue options and budget allocation.' },
    { id: 'm2', title: 'Vendor Coordination Call', date: new Date('2026-03-15T14:00:00'), duration: '45m', attendees: 3, status: 'completed', notes: 'Finalized catering and equipment rental.' },
    { id: 'm3', title: 'Pre-event Briefing', date: new Date('2026-03-20T09:00:00'), duration: '1h 30m', attendees: 8, status: 'upcoming', notes: '' },
    { id: 'm4', title: 'Post-event Review', date: new Date('2026-03-28T11:00:00'), duration: '1h', attendees: 6, status: 'upcoming', notes: '' },
];

// Mock event tasks
const eventTasks = [
    { id: 't1', title: 'Book venue', status: 'Completed', assignee: 'user-1', dueDate: new Date('2026-03-05') },
    { id: 't2', title: 'Confirm catering menu', status: 'Completed', assignee: 'user-2', dueDate: new Date('2026-03-08') },
    { id: 't3', title: 'Send invitations', status: 'In Progress', assignee: 'user-3', dueDate: new Date('2026-03-15') },
    { id: 't4', title: 'Arrange transportation', status: 'Todo', assignee: 'user-4', dueDate: new Date('2026-03-18') },
    { id: 't5', title: 'Prepare presentation materials', status: 'In Progress', assignee: 'user-1', dueDate: new Date('2026-03-20') },
    { id: 't6', title: 'Coordinate volunteers', status: 'Todo', assignee: 'user-5', dueDate: new Date('2026-03-22') },
];

// Mock event files organized in folders
const eventFolders = [
    {
        name: 'Documents',
        icon: FileText,
        color: 'text-blue-500',
        files: [
            { id: 'f1', name: 'Event Proposal.pdf', size: '2.4 MB', uploadedBy: 'Priya Sharma', date: new Date('2026-02-28') },
            { id: 'f2', name: 'Budget Breakdown.xlsx', size: '156 KB', uploadedBy: 'Rahul Singh', date: new Date('2026-03-01') },
            { id: 'f3', name: 'Volunteer Guidelines.docx', size: '89 KB', uploadedBy: 'Anita Patel', date: new Date('2026-03-05') },
        ]
    },
    {
        name: 'Images',
        icon: ImageIcon,
        color: 'text-green-500',
        files: [
            { id: 'f4', name: 'Venue Photo 1.jpg', size: '3.2 MB', uploadedBy: 'Vikram Kumar', date: new Date('2026-03-02') },
            { id: 'f5', name: 'Venue Photo 2.jpg', size: '2.8 MB', uploadedBy: 'Vikram Kumar', date: new Date('2026-03-02') },
            { id: 'f6', name: 'Event Banner.png', size: '1.5 MB', uploadedBy: 'Priya Sharma', date: new Date('2026-03-08') },
        ]
    },
    {
        name: 'Recordings',
        icon: Video,
        color: 'text-purple-500',
        files: [
            { id: 'f7', name: 'Planning Meeting 1.mp4', size: '245 MB', uploadedBy: 'Rahul Singh', date: new Date('2026-03-10') },
            { id: 'f8', name: 'Vendor Call.mp4', size: '180 MB', uploadedBy: 'Rahul Singh', date: new Date('2026-03-15') },
        ]
    },
];

export default async function ProjectEventDetailPage({
    params
}: {
    params: Promise<{ id: string; eventId: string }>
}) {
    const { id, eventId } = await params;
    const project = getProjectById(id);
    const event = getProjectEventById(eventId) || getEventById(eventId);

    if (!project || !event) {
        notFound();
    }

    const creator = allUsers.find(u => u.id === event.createdBy);
    const progress = Math.round((eventTasks.filter(t => t.status === 'Completed').length / eventTasks.length) * 100);

    return (
        <AppLayout hideSidebarPadding>
            <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0 border-r border-zinc-100">
                    {/* Top Bar */}
                    <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-50 shrink-0">
                        <div className="flex items-center gap-4">
                            <Link href={`/projects/${id}/events`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Separator orientation="vertical" className="h-4" />
                            <div className="flex items-center gap-2 text-[13px] font-medium">
                                <span className="text-zinc-400">Events</span>
                                <span className="text-zinc-300">/</span>
                                <span className="text-zinc-900">{event.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-12 py-10 space-y-12 pb-32">
                            {/* Header */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Badge className={cn(
                                        "h-6 px-2.5 text-[10px] uppercase font-bold tracking-widest border-none shadow-none",
                                        statusColors[event.status]
                                    )}>
                                        {event.status}
                                    </Badge>
                                    <Badge variant="outline" className="h-6 px-2.5 text-[10px] font-bold border-zinc-200 text-zinc-500 uppercase tracking-widest">
                                        EVENT
                                    </Badge>
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
                                    {event.title}
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
                                        <span>{format(event.createdAt, 'MMM d, h:mm a')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400">Strategic Overview</h3>
                                <div className="text-[15px] leading-relaxed text-zinc-600 font-medium bg-zinc-50/50 p-6 rounded-2xl border border-dashed border-zinc-200">
                                    {event.description || "No description provided."}
                                </div>
                            </div>

                            {/* Event Tabs */}
                            <Tabs defaultValue="meetings" className="space-y-8">
                                <TabsList className="bg-transparent h-auto p-0 gap-8 border-b border-zinc-100 rounded-none w-full justify-start">
                                    <TabsTrigger value="meetings" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 pb-3 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
                                        Meetings
                                    </TabsTrigger>
                                    <TabsTrigger value="tasks" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 pb-3 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
                                        Tasks
                                    </TabsTrigger>
                                    <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 pb-3 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
                                        Resources
                                    </TabsTrigger>
                                    <TabsTrigger value="attendees" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 data-[state=active]:border-b-2 data-[state=active]:border-zinc-900 rounded-none px-0 pb-3 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
                                        Attendees
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="meetings" className="mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {eventMeetings.map(meeting => (
                                        <div key={meeting.id} className="group p-4 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/40 transition-all flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                                                    <Video className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[14px] font-bold text-zinc-900">{meeting.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1 text-[11px] font-medium text-zinc-400">
                                                        <span>{format(meeting.date, 'MMM d, h:mm a')}</span>
                                                        <span>•</span>
                                                        <span>{meeting.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-zinc-200">
                                                {meeting.status}
                                            </Badge>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-zinc-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                                        <Plus className="h-4 w-4 mr-2" /> Schedule New Meeting
                                    </Button>
                                </TabsContent>

                                <TabsContent value="tasks" className="mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{eventTasks.length} Action Items</h4>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[11px] font-bold text-zinc-500">{progress}%</span>
                                            <Progress value={progress} className="h-1.5 w-24 bg-zinc-100" />
                                        </div>
                                    </div>
                                    {eventTasks.map(task => {
                                        const assignee = getUserById(task.assignee);
                                        return (
                                            <div key={task.id} className="group p-4 rounded-xl border border-zinc-100 bg-white hover:border-zinc-300 transition-all flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all",
                                                        task.status === 'Completed' ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-200 bg-white"
                                                    )}>
                                                        {task.status === 'Completed' && <CheckCircle2 className="h-3 w-3.5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className={cn("text-[14px] font-bold", task.status === 'Completed' ? "text-zinc-300 line-through" : "text-zinc-900 text-zinc-700")}>{task.title}</h4>
                                                        <div className="flex items-center gap-3 mt-1 text-[11px] font-medium text-zinc-400">
                                                            <span>Assigned to {assignee?.name}</span>
                                                            <span>•</span>
                                                            <span>Due {format(task.dueDate, 'MMM d')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tight border-zinc-100 text-zinc-400">
                                                    {task.status}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                    <Button variant="ghost" className="w-full h-12 border-2 border-dashed border-zinc-100 rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                                        <Plus className="h-4 w-4 mr-2" /> Add Task
                                    </Button>
                                </TabsContent>

                                <TabsContent value="files" className="mt-0 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    {eventFolders.map(folder => (
                                        <div key={folder.name} className="space-y-4">
                                            <div className="flex items-center gap-3 border-l-2 border-zinc-900 pl-4 py-1">
                                                <h4 className="text-[13px] font-bold text-zinc-900 uppercase tracking-widest">{folder.name}</h4>
                                                <Badge variant="secondary" className="bg-zinc-100 text-zinc-500 font-bold border-none text-[10px]">{folder.files.length}</Badge>
                                            </div>
                                            <div className="grid gap-3">
                                                {folder.files.map(file => (
                                                    <div key={file.id} className="group p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100 hover:bg-white hover:border-zinc-300 transition-all flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-10 w-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm">
                                                                <FileText className="h-5 w-5 text-zinc-400" />
                                                            </div>
                                                            <div>
                                                                <h5 className="text-[13px] font-bold text-zinc-900">{file.name}</h5>
                                                                <p className="text-[11px] text-zinc-400 font-medium">
                                                                    {file.size} • Uploaded by {file.uploadedBy}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full h-14 border-2 border-dashed border-zinc-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                                        <Plus className="h-4 w-4 mr-2" /> Upload New File
                                    </Button>
                                </TabsContent>

                                <TabsContent value="attendees" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        {event.attendees.map((attendee, index) => {
                                            const user = getUserById(attendee.userId);
                                            if (!user) return null;
                                            return (
                                                <Link key={attendee.userId || index} href={`/employees/${user.id}`}>
                                                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 bg-zinc-50/30 hover:bg-white hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/40 transition-all">
                                                        <Avatar className="h-10 w-10 border border-zinc-200 shadow-sm">
                                                            <AvatarImage src={user.avatar} />
                                                            <AvatarFallback className="text-xs font-bold">{user.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col min-w-0">
                                                            <span className="text-[13px] font-bold text-zinc-900 truncate">{user.name}</span>
                                                            <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-tight">{user.department}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                        <Button variant="ghost" className="h-full border-2 border-dashed border-zinc-100 rounded-2xl p-4 min-h-[74px] text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50 transition-all flex flex-col items-center justify-center gap-1">
                                            <Plus className="h-4 w-4" /> Add Attendee
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <Separator className="bg-zinc-100" />

                            {/* Discussion (Reused style) */}
                            <div className="space-y-8">
                                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                                    <MessageSquare className="h-3.5 w-3.5" /> Event Discussion
                                </h3>

                                {/* Mock Discussion Area */}
                                <div className="space-y-10">
                                    <div className="flex gap-4 group">
                                        <Avatar className="h-9 w-9 border border-zinc-200">
                                            <AvatarFallback className="text-[10px] font-bold">PS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] font-bold text-zinc-900">Priya Sharma</span>
                                                <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-tight">Today, 2:45 PM</span>
                                            </div>
                                            <div className="text-[14px] text-zinc-600 font-medium leading-relaxed">
                                                Just updated the catering menu for the event. Please review the choices in the Resources tab.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative bg-zinc-50 rounded-2xl p-4 border border-zinc-200">
                                    <textarea
                                        className="w-full bg-transparent border-none focus:ring-0 text-[14px] min-h-[100px] resize-none placeholder:text-zinc-400 font-medium text-zinc-800"
                                        placeholder="Add a comment to the event discussion..."
                                    />
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                                <Paperclip className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button className="h-9 gap-2 bg-zinc-900 text-white font-bold text-[12px] px-4 rounded-xl shadow-lg shadow-zinc-200">
                                            <Send className="h-3.5 w-3.5" /> Update Team
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
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Event Properties</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Status</label>
                                    <Button variant="outline" className="w-full justify-between h-10 px-3 bg-white border-zinc-200">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full", event.status === 'Completed' ? "bg-zinc-500" : "bg-blue-500")} />
                                            <span className="text-[13px] font-bold">{event.status}</span>
                                        </div>
                                        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Project Context</label>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors cursor-pointer">
                                        <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                            <Layers className="h-4 w-4" />
                                        </div>
                                        <span className="text-[12px] font-bold text-zinc-900 truncate">
                                            {project.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Logistics */}
                        <div className="space-y-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Logistics</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Location</label>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl">
                                        <MapPin className="h-4 w-4 text-zinc-400" />
                                        <span className="text-[12px] font-bold text-zinc-900 truncate">{event.location}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Start Time</label>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xl">
                                        <Calendar className="h-4 w-4 text-zinc-400" />
                                        <span className="text-[12px] font-bold text-zinc-900 truncate">{format(event.startDate, 'MMM d, h:mm a')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100" />

                        {/* Actions */}
                        <div className="pt-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3">
                                <Edit className="h-4 w-4" /> Modify details
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3">
                                <Archive className="h-4 w-4" /> Archive event
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-[12px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 px-3">
                                <Trash2 className="h-4 w-4" /> Cancel event
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
