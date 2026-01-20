'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    CheckCircle2,
    XCircle,
    Clock,
    FileText,
    DollarSign,
    User,
    MessageSquare,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Budget Requests
const initialRequests = [
    {
        id: 'REQ-2023-001',
        title: 'Emergency Relief Supplies',
        category: 'Project Funds',
        project: 'Flood Relief - Kerala',
        amount: 450000,
        requester: { name: 'Siva Kumar', role: 'Field Coordinator', avatar: '/avatars/01.png' },
        date: '2023-11-12',
        status: 'pending',
        priority: 'high',
        description: 'Urgent requirement for procuring tarpaulins, food kits, and medical supplies for the displaced families in Wayanad district. Vendor quotes attached.',
        comments: []
    },
    {
        id: 'REQ-2023-002',
        title: 'Annual Tech Summit Venue',
        category: 'Event Costs',
        project: 'Tech primarily',
        amount: 250000,
        requester: { name: 'Priya Sharma', role: 'Event Manager', avatar: '/avatars/02.png' },
        date: '2023-11-10',
        status: 'pending',
        priority: 'medium',
        description: 'Advance payment for the convention center for the upcoming Annual Tech Summit. Includes AV setup and catering.',
        comments: ['Please verify if this includes tax.']
    },
    {
        id: 'REQ-2023-003',
        title: 'New Laptops for Dev Team',
        category: 'Operations',
        project: 'Internal',
        amount: 850000,
        requester: { name: 'Rahul Verma', role: 'CTO', avatar: '/avatars/03.png' },
        date: '2023-11-08',
        status: 'rejected',
        priority: 'medium',
        description: 'Procurement of 10 MacBook Pros for the new mobile app development team.',
        comments: ['Budget constraint for this quarter. Please defer to Q1 2024.']
    },
    {
        id: 'REQ-2023-004',
        title: 'Volunteer Travel Expenses',
        category: 'Logistics',
        project: 'Rural Education Drive',
        amount: 45000,
        requester: { name: 'Anjali Gupta', role: 'Volunteer Lead', avatar: '/avatars/04.png' },
        date: '2023-11-14',
        status: 'approved',
        priority: 'low',
        description: 'Reimbursement for train and bus travel for 15 volunteers traveling to remote sites.',
        comments: ['Approved as per policy.']
    }
];

export default function BudgetApprovalsPage() {
    const [requests, setRequests] = useState(initialRequests);
    const [selectedId, setSelectedId] = useState<string | null>(initialRequests[0].id);
    const [comment, setComment] = useState('');

    const selectedRequest = requests.find(r => r.id === selectedId);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleStatusUpdate = (status: 'approved' | 'rejected') => {
        if (!selectedRequest) return;

        const updatedRequests = requests.map(req => {
            if (req.id === selectedRequest.id) {
                const newComments = comment ? [...req.comments, comment] : req.comments;
                return { ...req, status, comments: newComments };
            }
            return req;
        });

        setRequests(updatedRequests);
        setComment('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Header */}
            <div className="flex items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
                <Link href="/finance">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Budget Approvals</h1>
                    <p className="text-sm text-muted-foreground">Review and manage financial requests</p>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Request List */}
                <div className="w-[400px] border-r bg-muted/10 flex flex-col">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <input
                                placeholder="Search requests..."
                                className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {requests.map(req => (
                            <div
                                key={req.id}
                                onClick={() => setSelectedId(req.id)}
                                className={cn(
                                    "p-3 rounded-lg cursor-pointer transition-all border",
                                    selectedId === req.id
                                        ? "bg-background border-primary/50 shadow-sm"
                                        : "bg-background/50 border-transparent hover:bg-background hover:border-border/50"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] uppercase font-bold tracking-wider px-2 py-0",
                                        req.status === 'pending' ? "bg-zinc-100 text-zinc-600 border-zinc-200" :
                                            req.status === 'approved' ? "bg-zinc-900 text-zinc-100 border-zinc-800" :
                                                "bg-zinc-100 text-zinc-400 border-zinc-200 line-through opacity-70"
                                    )}>
                                        {req.status}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{req.date}</span>
                                </div>
                                <h3 className="font-semibold text-sm leading-tight mb-1">{req.title}</h3>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={req.requester.avatar} />
                                            <AvatarFallback>{req.requester.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>{req.requester.name}</span>
                                    </div>
                                    <span className="font-bold text-sm">{formatCurrency(req.amount)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content: Detail View */}
                <div className="flex-1 overflow-y-auto bg-background p-8">
                    {selectedRequest ? (
                        <div className="max-w-2xl mx-auto space-y-8">
                            {/* Request Header */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-mono text-muted-foreground">{selectedRequest.id}</span>
                                            {selectedRequest.priority === 'high' && (
                                                <Badge className="bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border-zinc-800 text-[10px] uppercase tracking-tighter">High Priority</Badge>
                                            )}
                                        </div>
                                        <h2 className="text-3xl font-bold text-foreground">{selectedRequest.title}</h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Requested Amount</p>
                                        <p className="text-3xl font-bold text-foreground">{formatCurrency(selectedRequest.amount)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-4 border-y">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={selectedRequest.requester.avatar} />
                                            <AvatarFallback>{selectedRequest.requester.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{selectedRequest.requester.name}</p>
                                            <p className="text-xs text-muted-foreground">{selectedRequest.requester.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-8 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Project</p>
                                            <p className="font-medium flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                {selectedRequest.project}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Category</p>
                                            <p className="font-medium">{selectedRequest.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Description & Justification
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-lg border border-border/50">
                                    {selectedRequest.description}
                                </p>
                            </div>

                            {/* Comments & History */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Approval Notes
                                </h3>
                                {selectedRequest.comments.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedRequest.comments.map((c, i) => (
                                            <div key={i} className="flex gap-3 text-sm">
                                                <div className="w-0.5 bg-border my-1" />
                                                <p className="text-muted-foreground py-1">{c}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No comments yet.</p>
                                )}
                            </div>

                            {/* Action Area */}
                            {selectedRequest.status === 'pending' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card border rounded-xl p-6 shadow-sm space-y-4 mt-8"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Add Comment / Reason</label>
                                        <Textarea
                                            placeholder="e.g., Please provide more vendor quotes..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="resize-none"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            className="h-10 px-6 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                            onClick={() => handleStatusUpdate('rejected')}
                                        >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject Request
                                        </Button>
                                        <Button
                                            className="h-10 px-8 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 shadow-lg"
                                            onClick={() => handleStatusUpdate('approved')}
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Approve Budget
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {selectedRequest.status !== 'pending' && (
                                <div className={cn(
                                    "rounded-xl p-6 border text-center space-y-2",
                                    selectedRequest.status === 'approved' ? "bg-zinc-50 border-zinc-200" : "bg-muted/30 border-border"
                                )}>
                                    <div className={cn(
                                        "mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-2",
                                        selectedRequest.status === 'approved' ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-400"
                                    )}>
                                        {selectedRequest.status === 'approved' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                                    </div>
                                    <h3 className={cn("font-bold text-lg capitalize", selectedRequest.status === 'approved' ? "text-zinc-900" : "text-zinc-500")}>
                                        Request {selectedRequest.status}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        This request has been finalized on {new Date().toLocaleDateString()}.
                                    </p>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-12 w-12 mb-4 opacity-20" />
                            <p>Select a request to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
