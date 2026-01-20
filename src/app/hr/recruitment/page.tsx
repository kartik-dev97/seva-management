'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Search,
    UserPlus,
    MoreVertical,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    ChevronRight,
    Filter,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const columns = [
    { id: 'applied', title: 'Applied' },
    { id: 'screening', title: 'Screening' },
    { id: 'interview', title: 'Interview' },
    { id: 'offer', title: 'Offer' },
    { id: 'onboarding', title: 'Onboarding' }
];

const candidates = [
    {
        id: 'CAN-001',
        name: 'Rohan Mehta',
        role: 'Data Analyst',
        experience: '4 years',
        status: 'applied',
        source: 'LinkedIn',
        appliedDate: '2023-11-18'
    },
    {
        id: 'CAN-002',
        name: 'Saira Banu',
        role: 'Field Supervisor',
        experience: '6 years',
        status: 'screening',
        source: 'Referral',
        appliedDate: '2023-11-15'
    },
    {
        id: 'CAN-003',
        name: 'James Wilson',
        role: 'Logistics Manager',
        experience: '8 years',
        status: 'interview',
        source: 'Indeed',
        appliedDate: '2023-11-12'
    },
    {
        id: 'CAN-004',
        name: 'Meera Nair',
        role: 'HR Executive',
        experience: '2 years',
        status: 'offer',
        source: 'Direct',
        appliedDate: '2023-11-10'
    },
    {
        id: 'CAN-005',
        name: 'Vikram Singh',
        role: 'Security Lead',
        experience: '12 years',
        status: 'onboarding',
        source: 'LinkedIn',
        appliedDate: '2023-11-05'
    }
];

export default function RecruitmentPortalPage() {
    const [search, setSearch] = useState('');

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-8rem)]">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Recruitment Portal</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Manage the hiring pipeline and staff onboarding.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search candidates..."
                                className="w-full bg-background border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button className="gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800">
                            <UserPlus className="h-4 w-4" />
                            New Candidate
                        </Button>
                    </div>
                </div>

                {/* Kanban Board */}
                <div className="flex-1 overflow-x-auto pb-4">
                    <div className="flex gap-4 h-full min-w-max">
                        {columns.map(column => (
                            <div key={column.id} className="w-[280px] flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
                                        <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-none font-bold text-[10px] px-1.5 py-0">
                                            {candidates.filter(c => c.status === column.id).length}
                                        </Badge>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </div>

                                <div className="flex-1 bg-muted/20 border border-dashed rounded-xl p-2 space-y-3">
                                    {candidates
                                        .filter(c => c.status === column.id)
                                        .map(candidate => (
                                            <motion.div
                                                key={candidate.id}
                                                layoutId={candidate.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-card border rounded-lg p-3 shadow-sm hover:border-zinc-300 transition-all cursor-pointer group"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-7 w-7 border-border/50">
                                                            <AvatarFallback className="text-[10px] bg-zinc-50 font-bold">
                                                                {candidate.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                                                            {candidate.name}
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-[9px] uppercase font-normal text-muted-foreground border-border/50">
                                                        {candidate.source}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1.5 mb-3">
                                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                        <Briefcase className="h-3 w-3" />
                                                        {candidate.role}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        {candidate.appliedDate}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-dashed">
                                                    <div className="text-[10px] text-muted-foreground font-medium">
                                                        Exp: {candidate.experience}
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}

                                    <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground hover:bg-zinc-50 border border-transparent hover:border-dashed hover:border-zinc-200">
                                        <Plus className="h-3 w-3 mr-2" />
                                        Drop Candidate
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Plus({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
