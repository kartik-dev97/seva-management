'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Search,
    Filter,
    HeartHandshake,
    MapPin,
    Clock,
    Calendar,
    ChevronRight,
    UserPlus,
    CheckCircle2,
    XCircle,
    Mail,
    Phone,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const volunteerRequests = [
    {
        id: 'VOL-001',
        name: 'Aisha Razak',
        role: 'Field Support',
        skills: ['First Aid', 'Translation'],
        location: 'Mumbai, MH',
        status: 'applied',
        appliedDate: '2023-11-15',
        description: 'Previously worked with Red Cross for 2 years. Looking to support education initiatives.',
        email: 'aisha.r@example.com',
        phone: '+91 98765 43210'
    },
    {
        id: 'VOL-002',
        name: 'David Miller',
        role: 'Tech Mentor',
        skills: ['Python', 'Web Dev'],
        location: 'Remote',
        status: 'interviewing',
        appliedDate: '2023-11-12',
        description: 'Full stack developer willing to spend 5 hours/week teaching students.',
        email: 'david.m@example.com',
        phone: '+1 555-0102'
    },
    {
        id: 'VOL-003',
        name: 'Lakshmi Devi',
        role: 'Community Lead',
        skills: ['Organizing', 'Advocacy'],
        location: 'Hyderabad, TS',
        status: 'onboarding',
        appliedDate: '2023-11-10',
        description: 'Retired teacher with extensive local networks in the Telangana rural region.',
        email: 'lakshmi.d@example.com',
        phone: '+91 99887 76655'
    }
];

export default function VolunteerCenterPage() {
    const [selectedId, setSelectedId] = useState(volunteerRequests[0].id);
    const selectedVol = volunteerRequests.find(v => v.id === selectedId);

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)]">
                {/* Internal Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Volunteer Center</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Recruit and deploy field volunteers ('valetier').</p>
                    </div>
                    <Button className="gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800">
                        <UserPlus className="h-4 w-4" />
                        List Opportunity
                    </Button>
                </div>

                <div className="flex flex-1 overflow-hidden border rounded-xl bg-card/50">
                    {/* List View */}
                    <div className="w-[350px] border-r flex flex-col bg-muted/5">
                        <div className="p-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    placeholder="Search volunteers..."
                                    className="w-full bg-background border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {volunteerRequests.map(vol => (
                                <div
                                    key={vol.id}
                                    onClick={() => setSelectedId(vol.id)}
                                    className={cn(
                                        "p-3 rounded-lg cursor-pointer transition-all border",
                                        selectedId === vol.id
                                            ? "bg-background border-zinc-300 shadow-sm"
                                            : "bg-transparent border-transparent hover:bg-background/80 hover:border-zinc-200"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-zinc-200">
                                            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                                                {vol.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium text-sm truncate">{vol.name}</h3>
                                                <span className="text-[10px] text-muted-foreground">{vol.appliedDate}</span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground truncate">{vol.role}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] uppercase font-bold tracking-tight px-1.5 py-0 border-0",
                                            vol.status === 'applied' ? "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200" :
                                                vol.status === 'interviewing' ? "bg-zinc-100 text-zinc-900 ring-1 ring-zinc-300" :
                                                    "bg-zinc-900 text-zinc-100"
                                        )}>
                                            {vol.status}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
                                            <MapPin className="h-3 w-3" />
                                            {vol.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detail View */}
                    <div className="flex-1 overflow-y-auto bg-background p-8">
                        {selectedVol ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedVol.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="max-w-xl mx-auto space-y-8"
                                >
                                    {/* Header Section */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-16 w-16 border-2 border-zinc-100 shadow-sm">
                                                <AvatarFallback className="text-xl bg-zinc-50">{selectedVol.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedVol.name}</h2>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {selectedVol.location}</span>
                                                    <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> ID: {selectedVol.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 border-zinc-200 dark:border-zinc-700 capitalize px-3 py-1 text-xs">
                                                {selectedVol.status}
                                            </Badge>
                                            <p className="text-[10px] text-muted-foreground mt-2">Applied on {selectedVol.appliedDate}</p>
                                        </div>
                                    </div>

                                    {/* Skills & Quick Actions */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {selectedVol.skills.map((skill, i) => (
                                            <Badge key={i} variant="secondary" className="font-normal bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                            <HeartHandshake className="h-4 w-4" />
                                            Motivation & background
                                        </h3>
                                        <div className="p-4 rounded-xl border bg-muted/20 text-sm leading-relaxed text-muted-foreground">
                                            {selectedVol.description}
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border bg-background flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-500">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase">Email Address</p>
                                                <p className="text-xs font-medium">{selectedVol.email}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-background flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-500">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase">Phone Number</p>
                                                <p className="text-xs font-medium">{selectedVol.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footers */}
                                    <div className="pt-8 border-t flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button variant="ghost" className="h-10 text-zinc-500 hover:text-zinc-900 border border-transparent hover:border-zinc-200">
                                                Archive
                                            </Button>
                                            <Button variant="ghost" className="h-10 text-red-600 hover:bg-red-50">
                                                Reject
                                            </Button>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="outline" className="h-10 px-6 border-zinc-200">
                                                Schedule Interview
                                            </Button>
                                            <Button className="h-10 px-8 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 shadow-lg">
                                                Approve Application
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-30">
                                <HeartHandshake className="h-16 w-16 mb-4" />
                                <p>Select an application to view</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
