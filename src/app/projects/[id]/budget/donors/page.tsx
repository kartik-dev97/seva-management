import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Plus,
    Heart,
    Building2,
    User,
    Mail,
    Phone,
    IndianRupee,
    CheckCircle2,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Donor data
const donors = [
    {
        id: 'd1',
        name: 'ABC Corporate Foundation',
        type: 'Corporate',
        contact: 'donations@abcfoundation.org',
        phone: '+91 22 1234 5678',
        pledged: 500000,
        received: 500000,
        status: 'completed',
        lastDonation: new Date('2026-02-01'),
        recurring: false,
        notes: 'Annual CSR grant for education initiatives'
    },
    {
        id: 'd2',
        name: 'Dr. Ramesh Gupta',
        type: 'Individual',
        contact: 'ramesh.gupta@email.com',
        phone: '+91 98765 43210',
        pledged: 100000,
        received: 75000,
        status: 'partial',
        lastDonation: new Date('2026-03-01'),
        recurring: true,
        notes: 'Monthly recurring donor - 25K/month'
    },
    {
        id: 'd3',
        name: 'Education First Trust',
        type: 'Foundation',
        contact: 'grants@educationfirst.org',
        phone: '+91 11 2345 6789',
        pledged: 750000,
        received: 375000,
        status: 'partial',
        lastDonation: new Date('2026-02-15'),
        recurring: false,
        notes: 'Grant disbursed in 2 tranches'
    },
    {
        id: 'd4',
        name: 'Priya & Vikram Malhotra',
        type: 'Individual',
        contact: 'malhotra.family@email.com',
        phone: null,
        pledged: 50000,
        received: 50000,
        status: 'completed',
        lastDonation: new Date('2026-01-20'),
        recurring: false,
        notes: 'One-time donation for school supplies'
    },
    {
        id: 'd5',
        name: 'Tech4Good Initiative',
        type: 'Corporate',
        contact: 'csr@tech4good.co',
        phone: '+91 80 4567 8901',
        pledged: 300000,
        received: 0,
        status: 'pending',
        lastDonation: null,
        recurring: false,
        notes: 'Approval pending from board'
    },
];

const typeColors = {
    'Corporate': 'bg-blue-500/10 text-blue-600',
    'Individual': 'bg-green-500/10 text-green-600',
    'Foundation': 'bg-purple-500/10 text-purple-600',
};

const typeIcons = {
    'Corporate': Building2,
    'Individual': User,
    'Foundation': Heart,
};

export default async function DonorContributionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const totalPledged = donors.reduce((sum, d) => sum + d.pledged, 0);
    const totalReceived = donors.reduce((sum, d) => sum + d.received, 0);
    const collectionRate = (totalReceived / totalPledged) * 100;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href={`/projects/${id}/budget`}
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Budget
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Donor Contributions</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Track funding sources for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Donor
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Pledged</p>
                            <p className="text-2xl font-semibold mt-1">₹{(totalPledged / 100000).toFixed(1)}L</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Received</p>
                            <p className="text-2xl font-semibold mt-1 text-green-600">₹{(totalReceived / 100000).toFixed(1)}L</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Collection Rate</p>
                            <p className="text-2xl font-semibold mt-1">{collectionRate.toFixed(0)}%</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Donors</p>
                            <p className="text-2xl font-semibold mt-1">{donors.length}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Funding Progress */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Funding Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[13px]">
                                <span className="text-muted-foreground">Collected</span>
                                <span className="font-medium">₹{(totalReceived / 100000).toFixed(1)}L / ₹{(totalPledged / 100000).toFixed(1)}L</span>
                            </div>
                            <Progress value={collectionRate} className="h-3" />
                        </div>
                    </CardContent>
                </Card>

                {/* Donor List */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Donor Registry</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {donors.map((donor) => {
                                const Icon = typeIcons[donor.type as keyof typeof typeIcons];
                                const progress = (donor.received / donor.pledged) * 100;

                                return (
                                    <div key={donor.id} className="p-4 rounded-lg border border-border/40 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className={cn(
                                                    "flex h-12 w-12 items-center justify-center rounded-lg",
                                                    typeColors[donor.type as keyof typeof typeColors]
                                                )}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[14px] font-semibold">{donor.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={cn('text-[10px]', typeColors[donor.type as keyof typeof typeColors])}>
                                                            {donor.type}
                                                        </Badge>
                                                        {donor.recurring && (
                                                            <Badge variant="outline" className="text-[10px]">Recurring</Badge>
                                                        )}
                                                        <Badge variant={
                                                            donor.status === 'completed' ? 'default' :
                                                                donor.status === 'partial' ? 'secondary' : 'outline'
                                                        } className="text-[10px]">
                                                            {donor.status === 'completed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                                            {donor.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                                            {donor.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[18px] font-semibold">₹{(donor.pledged / 1000).toFixed(0)}K</p>
                                                <p className="text-[11px] text-muted-foreground">Pledged</p>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[11px]">
                                                <span className="text-muted-foreground">Received: ₹{(donor.received / 1000).toFixed(0)}K</span>
                                                <span className="font-medium">{progress.toFixed(0)}%</span>
                                            </div>
                                            <Progress value={progress} className="h-2" />
                                        </div>

                                        {/* Contact & Notes */}
                                        <div className="grid gap-3 md:grid-cols-2 text-[12px]">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    <span>{donor.contact}</span>
                                                </div>
                                                {donor.phone && (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Phone className="h-3.5 w-3.5" />
                                                        <span>{donor.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">{donor.notes}</p>
                                                {donor.lastDonation && (
                                                    <p className="text-[11px] text-muted-foreground mt-1">
                                                        Last donation: {format(donor.lastDonation, 'MMM dd, yyyy')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                            <Button variant="outline" size="sm" className="text-[11px]">Record Payment</Button>
                                            <Button variant="ghost" size="sm" className="text-[11px]">Send Thank You</Button>
                                            <Button variant="ghost" size="sm" className="text-[11px]">Edit</Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
