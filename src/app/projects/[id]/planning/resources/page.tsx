import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Plus,
    Users,
    Truck,
    Building,
    Calendar,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Resource data
const humanResources = [
    { id: 'hr1', userId: 'user-1', role: 'Project Lead', allocation: 100, startDate: new Date('2026-01-15'), endDate: new Date('2026-06-30') },
    { id: 'hr2', userId: 'user-2', role: 'Manager', allocation: 80, startDate: new Date('2026-02-01'), endDate: new Date('2026-06-30') },
    { id: 'hr3', userId: 'user-3', role: 'Field Coordinator', allocation: 100, startDate: new Date('2026-02-15'), endDate: new Date('2026-05-31') },
    { id: 'hr4', userId: 'user-4', role: 'Trainer', allocation: 50, startDate: new Date('2026-03-01'), endDate: new Date('2026-04-30') },
    { id: 'hr5', userId: 'user-5', role: 'Volunteer Coordinator', allocation: 60, startDate: new Date('2026-03-01'), endDate: new Date('2026-05-31') },
];

const equipment = [
    { id: 'eq1', name: 'Projector', quantity: 2, status: 'available', location: 'Office' },
    { id: 'eq2', name: 'Laptop', quantity: 5, status: 'in-use', location: 'Field' },
    { id: 'eq3', name: 'PA System', quantity: 1, status: 'available', location: 'Office' },
    { id: 'eq4', name: 'Camera', quantity: 2, status: 'in-use', location: 'Field' },
];

const vehicles = [
    { id: 'v1', type: 'Tempo (Goods)', status: 'booked', from: new Date('2026-03-20'), to: new Date('2026-03-22') },
    { id: 'v2', type: 'Mini Bus (15-seater)', status: 'available', from: null, to: null },
];

const facilities = [
    { id: 'f1', name: 'Community Center Hall', status: 'booked', date: new Date('2026-03-25'), duration: '9 AM - 5 PM' },
    { id: 'f2', name: 'Training Room A', status: 'available', date: null, duration: null },
];

export default async function ResourceAllocationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
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
                            <h1 className="text-2xl font-semibold tracking-tight">Resource Allocation</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Plan and manage resources for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Allocate Resource
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Team Members</p>
                                    <p className="text-[18px] font-semibold">{humanResources.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <Clock className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Equipment</p>
                                    <p className="text-[18px] font-semibold">{equipment.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <Truck className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Vehicles</p>
                                    <p className="text-[18px] font-semibold">{vehicles.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                    <Building className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Facilities</p>
                                    <p className="text-[18px] font-semibold">{facilities.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Human Resources */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Human Resources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {humanResources.map((hr) => {
                                const user = getUserById(hr.userId);
                                if (!user) return null;

                                return (
                                    <div key={hr.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                                        <div className="flex items-center gap-3">
                                            <Link href={`/employees/${user.id}`}>
                                                <Avatar className="h-10 w-10 hover:ring-2 ring-primary transition-all">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback className="text-[11px]">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Link>
                                            <div>
                                                <Link href={`/employees/${user.id}`} className="text-[13px] font-medium hover:text-primary">
                                                    {user.name}
                                                </Link>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Badge variant="secondary" className="text-[10px]">{hr.role}</Badge>
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {format(hr.startDate, 'MMM dd')} - {format(hr.endDate, 'MMM dd')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-24">
                                                <div className="flex justify-between text-[11px] mb-1">
                                                    <span className="text-muted-foreground">Allocation</span>
                                                    <span className="font-medium">{hr.allocation}%</span>
                                                </div>
                                                <Progress value={hr.allocation} className="h-2" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Equipment & Vehicles */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold">Equipment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {equipment.map((eq) => (
                                    <div key={eq.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                                        <div>
                                            <p className="text-[13px] font-medium">{eq.name}</p>
                                            <p className="text-[11px] text-muted-foreground">Qty: {eq.quantity} • {eq.location}</p>
                                        </div>
                                        <Badge variant={eq.status === 'available' ? 'default' : 'secondary'} className="text-[10px]">
                                            {eq.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold">Vehicles & Facilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {vehicles.map((v) => (
                                    <div key={v.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-[13px] font-medium">{v.type}</p>
                                                {v.from && <p className="text-[11px] text-muted-foreground">{format(v.from, 'MMM dd')} - {format(v.to!, 'MMM dd')}</p>}
                                            </div>
                                        </div>
                                        <Badge variant={v.status === 'available' ? 'default' : 'secondary'} className="text-[10px]">
                                            {v.status}
                                        </Badge>
                                    </div>
                                ))}
                                {facilities.map((f) => (
                                    <div key={f.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40">
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-[13px] font-medium">{f.name}</p>
                                                {f.date && <p className="text-[11px] text-muted-foreground">{format(f.date, 'MMM dd')} • {f.duration}</p>}
                                            </div>
                                        </div>
                                        <Badge variant={f.status === 'available' ? 'default' : 'secondary'} className="text-[10px]">
                                            {f.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
