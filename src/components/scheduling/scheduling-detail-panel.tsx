'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Calendar,
    Clock,
    MapPin,
    Video,
    Users,
    Info,
    ExternalLink,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    UserPlus,
    X
} from 'lucide-react';
import { format } from 'date-fns';
import { Event, Meeting, Project, User, EventRole, MeetingParticipant } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

interface SchedulingDetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    item?: Event | Meeting;
    users: User[];
    projects: Project[];
}

export function SchedulingDetailPanel({ isOpen, onClose, item, users, projects }: SchedulingDetailPanelProps) {
    if (!item || !isOpen) return null;

    const isMeeting = 'type' in item;
    const project = projects.find(p => p.id === item.projectId);
    const creator = users.find(u => u.id === item.createdBy);

    // Casting for convenience
    const eventItems = !isMeeting ? (item as Event) : null;
    const meetingItems = isMeeting ? (item as Meeting) : null;

    return (
        <div className="w-full sm:w-[500px] border-l border-border/40 bg-white flex flex-col h-full animate-in slide-in-from-right duration-500 ease-out z-20 shadow-2xl overflow-hidden relative">
            {/* Header / Close Button */}
            <div className="absolute top-4 right-4 z-50">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Banner */}
            <div className="h-32 w-full bg-zinc-900 flex items-end p-6 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />
                <div className="relative z-10 flex items-center justify-between w-full">
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-[10px] uppercase tracking-wider font-bold">
                        {isMeeting ? item.type : 'Event'}
                    </Badge>
                    {meetingItems?.meetingLink && (
                        <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full gap-2 px-4 shadow-lg shadow-blue-900/20" asChild>
                            <a href={meetingItems.meetingLink} target="_blank" rel="noopener noreferrer">
                                <Video className="h-3.5 w-3.5" />
                                Join Now
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-4">
                            <h2 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">
                                {item.title}
                            </h2>
                            <div className="flex gap-1 flex-shrink-0">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 rounded-full">
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-600 rounded-full">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {project && (
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                <span className="text-[12px] font-medium text-zinc-500 uppercase tracking-wide">
                                    Project: {project.title}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Timing Section */}
                    <Card className="border-border/40 bg-zinc-50/50 shadow-none border-none">
                        <CardContent className="p-4 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Date</p>
                                <div className="flex items-center gap-2 text-[13px] font-medium text-zinc-800">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                    {format(new Date(item.startDate), 'MMMM d, yyyy')}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Time</p>
                                <div className="flex items-center gap-2 text-[13px] font-medium text-zinc-800">
                                    <Clock className="h-4 w-4 text-zinc-400" />
                                    {format(new Date(item.startDate), 'h:mm a')}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location / Meeting Hub */}
                    <div className="space-y-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" />
                            Venue & Connectivity
                        </h4>
                        <div className="p-4 rounded-xl border border-border/40 bg-white space-y-4 shadow-sm">
                            {eventItems?.location && (
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 flex-shrink-0">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-zinc-800 mb-0.5">Physical Location</p>
                                        <p className="text-[12px] text-zinc-500 leading-relaxed">{eventItems.location}</p>
                                    </div>
                                </div>
                            )}
                            {meetingItems?.meetingLink && (
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                        <Video className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-semibold text-zinc-800 mb-0.5">Virtual Meeting</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[11px] text-blue-600 truncate max-w-[200px]">{meetingItems.meetingLink}</p>
                                            <Button variant="ghost" size="icon" className="h-5 w-5 hover:text-blue-600" asChild>
                                                <a href={meetingItems.meetingLink} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Participants / Attendees */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <Users className="h-3.5 w-3.5" />
                                Participants ({isMeeting ? meetingItems?.participants.length : eventItems?.attendees.length})
                            </h4>
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-primary">
                                <UserPlus className="h-3 w-3 mr-1" /> Add
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {(isMeeting ? meetingItems?.participants : eventItems?.attendees)?.map((p: any, i: number) => {
                                const user = users.find(u => u.id === p.userId);
                                if (!user) return null;
                                return (
                                    <div key={user.id} className="flex items-center justify-between p-2.5 rounded-lg border border-border/20 hover:bg-zinc-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-border/40">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="text-[10px] font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-semibold text-zinc-800">{user.name}</span>
                                                <span className="text-[10px] text-zinc-400 font-medium uppercase">{p.role || (p.isRequired ? 'Required' : 'Optional')}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {p.status === 'accepted' || p.confirmedAt ? (
                                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] h-5 px-1.5 flex items-center gap-1">
                                                    <CheckCircle2 className="h-2.5 w-2.5" /> Accepted
                                                </Badge>
                                            ) : p.status === 'declined' ? (
                                                <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-100 text-[9px] h-5 px-1.5 flex items-center gap-1">
                                                    <XCircle className="h-2.5 w-2.5" /> Declined
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-[9px] h-5 px-1.5 text-zinc-400 border-zinc-200">Pending</Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description / Agenda */}
                    <div className="space-y-3">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Info className="h-3.5 w-3.5" />
                            {isMeeting ? 'Agenda' : 'Description'}
                        </h4>
                        <div className="p-4 rounded-xl border border-border/40 bg-zinc-50/50 min-h-[100px]">
                            <p className="text-[13px] text-zinc-600 leading-relaxed whitespace-pre-wrap italic opacity-80">
                                {isMeeting ? meetingItems?.agenda : eventItems?.description}
                            </p>
                        </div>
                    </div>

                    {/* Creator Info */}
                    <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-zinc-400">Scheduled by</span>
                            <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-0 h-5 text-[10px]">
                                {creator?.name || 'Seva Admin'}
                            </Badge>
                        </div>
                        <span className="text-[10px] text-zinc-300 font-medium uppercase tracking-wider">
                            Ref: {item.id}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
