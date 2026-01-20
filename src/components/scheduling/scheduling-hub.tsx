'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Search,
    LayoutGrid,
    List,
    Calendar as CalendarIcon,
    MapPin,
    Clock,
    Filter,
    ChevronRight,
    Video,
    Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, isFuture, isToday } from 'date-fns';
import { Event, Meeting, Project, User } from '@/lib/types';
import { EventCalendar } from '@/components/events/event-calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SchedulingDetailPanel } from './scheduling-detail-panel';

interface SchedulingHubProps {
    type: 'event' | 'meeting';
    items: (Event | Meeting)[];
    projects: Project[];
    users: User[];
    title: string;
    description: string;
    onAddItem?: () => void;
}

const statusColors: Record<string, string> = {
    'Upcoming': 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    'In Progress': 'bg-green-500/10 text-green-600 border-green-500/30',
    'Completed': 'bg-gray-500/10 text-gray-600 border-gray-500/30',
    'Cancelled': 'bg-red-500/10 text-red-600 border-red-500/30',
};

export function SchedulingHub({ type, items, projects, users, title, description, onAddItem }: SchedulingHubProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterProject, setFilterProject] = useState<string>('all');
    const router = useRouter();

    const handleItemClick = (itemId: string) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return;

        if (type === 'event') {
            if (item.projectId) {
                router.push(`/projects/${item.projectId}/events/${item.id}`);
            } else {
                router.push(`/events/${item.id}`);
            }
        } else {
            // Meeting logic - assuming /meetings/[id]
            router.push(`/meetings/${itemId}`);
        }
    };

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item as Event).description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item as Event).location?.toLowerCase().includes(searchQuery.toLowerCase());

            const status = (item as Event).status || 'Upcoming';
            const matchesStatus = filterStatus === 'all' || status === filterStatus;
            const matchesProject = filterProject === 'all' || item.projectId === filterProject;

            return matchesSearch && matchesStatus && matchesProject;
        });
    }, [items, searchQuery, filterStatus, filterProject]);

    const stats = {
        total: items.length,
        upcoming: items.filter(e => isFuture(new Date(e.startDate)) || isToday(new Date(e.startDate))).length,
        thisMonth: items.filter(e => {
            const now = new Date();
            const date = new Date(e.startDate);
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length,
    };

    return (
        <div className="flex h-full overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden space-y-6">
                {/* Header */}
                <div className="flex items-end justify-between border-b border-border/40 pb-5 px-6 pt-6 flex-shrink-0">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
                        <p className="text-[13px] text-muted-foreground mt-1 lowercase font-medium tracking-wide">
                            {description}
                        </p>
                    </div>
                    <Button
                        onClick={onAddItem}
                        className="gap-2 bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-900/10 transition-all rounded-full px-5 h-9"
                    >
                        <Plus className="h-4 w-4" />
                        New {type === 'event' ? 'Event' : 'Meeting'}
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3 flex-shrink-0 px-6">
                    <Card className="bg-card/50 border-border/40 shadow-sm relative overflow-hidden group border-none bg-zinc-50/50">
                        <CardContent className="p-4 flex items-center justify-between relative">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Total</p>
                                <p className="text-2xl font-bold tracking-tight">{stats.total}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                                <CalendarIcon className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/40 shadow-sm relative overflow-hidden group border-none bg-zinc-50/50">
                        <CardContent className="p-4 flex items-center justify-between relative">
                            <div>
                                <p className="text-[10px] font-bold text-blue-600/80 uppercase tracking-wider mb-0.5">Upcoming</p>
                                <p className="text-2xl font-bold tracking-tight text-blue-600">{stats.upcoming}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <Clock className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/40 shadow-sm relative overflow-hidden group border-none bg-zinc-50/50">
                        <CardContent className="p-4 flex items-center justify-between relative">
                            <div>
                                <p className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider mb-0.5">This Month</p>
                                <p className="text-2xl font-bold tracking-tight text-emerald-600">{stats.thisMonth}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <CalendarIcon className="h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1 flex-shrink-0 px-6">
                    <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                        <div className="relative w-full max-w-xs group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <Input
                                placeholder={`Search ${type}s...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9 text-[13px] bg-background border-border/40 focus-visible:ring-zinc-200 transition-all rounded-lg"
                            />
                        </div>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="h-9 w-[130px] text-[13px] bg-background border-border/40 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                                    <SelectValue placeholder="Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="text-[13px]">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Upcoming">Upcoming</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterProject} onValueChange={setFilterProject}>
                            <SelectTrigger className="h-9 w-[160px] text-[13px] bg-background border-border/40 rounded-lg">
                                <SelectValue placeholder="Project" />
                            </SelectTrigger>
                            <SelectContent className="text-[13px]">
                                <SelectItem value="all">All Projects</SelectItem>
                                {projects.map(p => (
                                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-1 bg-zinc-100/80 p-1 rounded-lg border border-zinc-200">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className={cn("h-7 px-3 text-[11px] rounded-md transition-all", viewMode === 'grid' ? "bg-white text-zinc-900 shadow-sm font-medium" : "text-zinc-500 hover:text-zinc-900")}
                        >
                            <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
                            Grid
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className={cn("h-7 px-3 text-[11px] rounded-md transition-all", viewMode === 'list' ? "bg-white text-zinc-900 shadow-sm font-medium" : "text-zinc-500 hover:text-zinc-900")}
                        >
                            <List className="h-3.5 w-3.5 mr-1.5" />
                            List
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('calendar')}
                            className={cn("h-7 px-3 text-[11px] rounded-md transition-all", viewMode === 'calendar' ? "bg-white text-zinc-900 shadow-sm font-medium" : "text-zinc-500 hover:text-zinc-900")}
                        >
                            <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                            Calendar
                        </Button>
                    </div>
                </div>

                {/* Content View */}
                <div className="flex-1 overflow-auto min-h-0 min-w-0 pr-1 px-6 pb-6">
                    {viewMode === 'grid' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredItems.map((item) => {
                                const project = projects.find(p => p.id === item.projectId);
                                const status = (item as Event).status || 'Upcoming';
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleItemClick(item.id)}
                                        className="cursor-pointer group"
                                    >
                                        <Card className="h-full border border-border/40 bg-zinc-50/30 hover:bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-200 overflow-hidden">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <Badge className={cn('text-[10px] font-medium px-2 py-0 border-0 rounded-full', statusColors[status])}>
                                                        {status}
                                                    </Badge>
                                                    {project && (
                                                        <span className="text-[10px] font-medium tracking-wide text-zinc-500 uppercase bg-zinc-100/50 px-1.5 py-0.5 rounded-sm">
                                                            {project.title.substring(0, 15)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mb-4">
                                                    <h3 className="font-semibold text-[14px] mb-1 group-hover:text-primary transition-colors line-clamp-1 text-zinc-800">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed h-8">
                                                        {(item as Event).description || (item as Meeting).agenda}
                                                    </p>
                                                </div>

                                                <div className="space-y-2 pt-3 border-t border-border/20">
                                                    <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                                                        <CalendarIcon className="h-3.5 w-3.5 text-zinc-400" />
                                                        <span className="font-medium">{format(new Date(item.startDate), 'MMM d, yyyy')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                                                        <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                                        <span>{format(new Date(item.startDate), 'h:mm a')}</span>
                                                    </div>
                                                    {((item as Event).location || (item as Meeting).meetingLink) && (
                                                        <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                                                            {(item as Meeting).meetingLink ? <Video className="h-3.5 w-3.5 text-blue-400" /> : <MapPin className="h-3.5 w-3.5 text-zinc-400" />}
                                                            <span className="truncate">{(item as Event).location || 'Virtual Meeting'}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {viewMode === 'list' && (
                        <Card className="border border-border/40 bg-zinc-50/20 overflow-hidden rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-zinc-50/50 border-b border-border/40">
                                        <tr>
                                            <th className="h-10 px-4 align-middle font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">Details</th>
                                            <th className="h-10 px-4 align-middle font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">Status</th>
                                            <th className="h-10 px-4 align-middle font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">Timing</th>
                                            <th className="h-10 px-4 align-middle font-semibold text-zinc-500 text-[10px] uppercase tracking-wider">Location/Link</th>
                                            <th className="h-10 px-4 align-middle font-semibold text-zinc-500 text-[10px] uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20">
                                        {filteredItems.map((item) => {
                                            const status = (item as Event).status || 'Upcoming';
                                            return (
                                                <tr key={item.id} className="transition-colors hover:bg-accent/30 group cursor-pointer" onClick={() => handleItemClick(item.id)}>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-[13px] text-zinc-800">{item.title}</span>
                                                            <span className="text-[11px] text-muted-foreground line-clamp-1">{(item as Event).description || (item as Meeting).agenda}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <Badge className={cn('text-[9px] font-medium border-0 px-2 py-0', statusColors[status])}>
                                                            {status}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex flex-col text-[11px]">
                                                            <span className="font-medium text-zinc-700">{format(new Date(item.startDate), 'MMM d, yyyy')}</span>
                                                            <span className="text-zinc-500">{format(new Date(item.startDate), 'h:mm a')}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                                                            {(item as Meeting).meetingLink ? <Video className="h-3.5 w-3.5 text-blue-500" /> : <MapPin className="h-3.5 w-3.5 text-zinc-400" />}
                                                            <span className="truncate max-w-[150px]">{(item as Event).location || 'Virtual'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle text-right text-zinc-600">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    )}

                    {viewMode === 'calendar' && (
                        <EventCalendar events={filteredItems as Event[]} />
                    )}
                </div>
            </div>
        </div>
    );
}
