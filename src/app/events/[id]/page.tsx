import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { events, getUserById, getProjectById } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    MapPin,
    Users,
    Clock,
    Link as LinkIcon,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    HelpCircle,
    Package,
    Truck,
    ClipboardList,
    Target,
    TrendingUp,
    Camera,
    FileText,
    DollarSign,
    UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { EventStatus } from '@/lib/types';
import { format, differenceInDays } from 'date-fns';

const statusColors = {
    [EventStatus.UPCOMING]: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    [EventStatus.ONGOING]: 'bg-green-500/10 text-green-600 dark:text-green-400',
    [EventStatus.COMPLETED]: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    [EventStatus.CANCELLED]: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

// Planning phases for event organization
const planningPhases = [
    { id: '1', title: 'Pre-Event Planning', progress: 85, tasks: 17, completed: 14 },
    { id: '2', title: 'Event Execution', progress: 0, tasks: 12, completed: 0 },
    { id: '3', title: 'Post-Event', progress: 0, tasks: 8, completed: 0 },
];

// Detailed checklist
const eventChecklist = [
    {
        phase: 'Pre-Event Planning',
        items: [
            { id: '1', task: 'Identify target schools and beneficiaries', done: true, assignee: 'Priya Sharma', dueDate: '2026-02-20' },
            { id: '2', task: 'Create donation collection drive plan', done: true, assignee: 'Amit Patel', dueDate: '2026-02-22' },
            { id: '3', task: 'Design promotional materials (posters, social media)', done: true, assignee: 'Meera Iyer', dueDate: '2026-02-25' },
            { id: '4', task: 'Secure venue for distribution event', done: true, assignee: 'Rajesh Kumar', dueDate: '2026-02-28' },
            { id: '5', task: 'Recruit and train volunteers', done: true, assignee: 'Kavya Menon', dueDate: '2026-03-01' },
            { id: '6', task: 'Set up donation tracking system', done: true, assignee: 'Arjun Reddy', dueDate: '2026-03-05' },
            { id: '7', task: 'Coordinate with corporate donors', done: true, assignee: 'Anita Desai', dueDate: '2026-03-08' },
            { id: '8', task: 'Arrange transportation for supplies', done: false, assignee: 'Vikram Singh', dueDate: '2026-03-10' },
            { id: '9', task: 'Create beneficiary registration forms', done: true, assignee: 'Priya Sharma', dueDate: '2026-03-10' },
            { id: '10', task: 'Prepare stationery kits & packaging', done: false, assignee: 'Suresh Nair', dueDate: '2026-03-12' },
            { id: '11', task: 'Send confirmation to schools', done: false, assignee: 'Meera Iyer', dueDate: '2026-03-13' },
        ]
    },
    {
        phase: 'Event Execution',
        items: [
            { id: '12', task: 'Set up registration desk', done: false, assignee: 'Priya Sharma', dueDate: '2026-03-15' },
            { id: '13', task: 'Organize volunteer stations', done: false, assignee: 'Kavya Menon', dueDate: '2026-03-15' },
            { id: '14', task: 'Distribution of stationery kits', done: false, assignee: 'All Volunteers', dueDate: '2026-03-15' },
            { id: '15', task: 'Photo & video documentation', done: false, assignee: 'Arjun Reddy', dueDate: '2026-03-15' },
            { id: '16', task: 'Collect feedback from beneficiaries', done: false, assignee: 'Anita Desai', dueDate: '2026-03-15' },
        ]
    },
    {
        phase: 'Post-Event',
        items: [
            { id: '17', task: 'Compile distribution data & statistics', done: false, assignee: 'Amit Patel', dueDate: '2026-03-16' },
            { id: '18', task: 'Create impact report with photos', done: false, assignee: 'Meera Iyer', dueDate: '2026-03-18' },
            { id: '19', task: 'Send thank you notes to donors', done: false, assignee: 'Anita Desai', dueDate: '2026-03-20' },
            { id: '20', task: 'Update project impact metrics', done: false, assignee: 'Rajesh Kumar', dueDate: '2026-03-22' },
            { id: '21', task: 'Social media posts with results', done: false, assignee: 'Meera Iyer', dueDate: '2026-03-25' },
        ]
    }
];

// Volunteer roster
const volunteers = [
    { id: 'user-2', name: 'Priya Sharma', role: 'Team Lead', tasks: 'Registration & Coordination', shift: '8:00 AM - 2:00 PM' },
    { id: 'user-3', name: 'Amit Patel', role: 'Logistics Manager', tasks: 'Supply Distribution', shift: '8:00 AM - 2:00 PM' },
    { id: 'user-4', name: 'Meera Iyer', role: 'Communications', tasks: 'Photography & Social Media', shift: '9:00 AM - 1:00 PM' },
    { id: 'user-5', name: 'Anita Desai', role: 'Donor Relations', tasks: 'Donor Coordination', shift: '8:00 AM - 12:00 PM' },
    { id: 'user-6', name: 'Rajesh Kumar', role: 'Venue Manager', tasks: 'Setup & Cleanup', shift: '7:00 AM - 3:00 PM' },
    { id: 'user-7', name: 'Kavya Menon', role: 'Volunteer Coordinator', tasks: 'Team Management', shift: '8:00 AM - 2:00 PM' },
    { id: 'user-8', name: 'Arjun Reddy', role: 'Documentation', tasks: 'Photo/Video Recording', shift: '9:00 AM - 1:00 PM' },
    { id: 'user-9', name: 'Vikram Singh', role: 'Transport', tasks: 'Delivery & Logistics', shift: '6:00 AM - 2:00 PM' },
];

// Donation tracking
const donations = [
    { id: '1', donor: 'ABC Corporation', type: 'Notebooks', quantity: 500, value: 25000, status: 'Received', date: '2026-02-28' },
    { id: '2', donor: 'XYZ Foundation', type: 'Pencils & Pens', quantity: 1000, value: 15000, status: 'Received', date: '2026-03-02' },
    { id: '3', donor: 'Local Business Group', type: 'School Bags', quantity: 200, value: 40000, status: 'In Transit', date: '2026-03-08' },
    { id: '4', donor: 'Community Members', type: 'Erasers & Sharpeners', quantity: 800, value: 8000, status: 'Received', date: '2026-03-05' },
    { id: '5', donor: 'Tech Solutions Ltd', type: 'Drawing Books', quantity: 300, value: 18000, status: 'Pledged', date: '2026-03-10' },
    { id: '6', donor: 'Parent Association', type: 'Geometry Sets', quantity: 250, value: 12500, status: 'Received', date: '2026-03-07' },
];

// Budget breakdown
const budget = {
    totalBudget: 150000,
    spent: 45000,
    categories: [
        { name: 'Venue Rental', allocated: 15000, spent: 15000 },
        { name: 'Transportation', allocated: 20000, spent: 12000 },
        { name: 'Promotional Materials', allocated: 10000, spent: 8000 },
        { name: 'Packaging Supplies', allocated: 15000, spent: 10000 },
        { name: 'Volunteer Refreshments', allocated: 8000, spent: 0 },
        { name: 'Documentation (Photo/Video)', allocated: 12000, spent: 0 },
        { name: 'Miscellaneous', allocated: 20000, spent: 0 },
    ]
};

// Impact metrics
const impactMetrics = {
    targetBeneficiaries: 500,
    registeredBeneficiaries: 450,
    schools: 5,
    itemsCollected: 3050,
    estimatedValue: 118500,
    volunteersInvolved: 25,
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = events.find(e => e.id === id);

    if (!event) {
        notFound();
    }

    const project = event.projectId ? getProjectById(event.projectId) : null;
    const daysUntil = differenceInDays(new Date(event.startDate), new Date());
    const totalDonationValue = donations.reduce((sum, d) => sum + d.value, 0);
    const budgetUsed = (budget.spent / budget.totalBudget) * 100;

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Link>
                </div>

                {/* Event Header */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-semibold tracking-tight">School Stationary Donation Drive</h1>
                                    <Badge className={cn('text-[11px]', statusColors[event.status])}>
                                        {event.status}
                                    </Badge>
                                </div>
                                <p className="text-[13px] text-muted-foreground">
                                    Organizing a comprehensive donation drive to provide essential stationery supplies to 500 underprivileged students across 5 rural schools.
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="grid gap-4 md:grid-cols-5 mt-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                    <CalendarIcon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Event Date</p>
                                    <p className="text-[13px] font-medium mt-1">March 15, 2026</p>
                                    {daysUntil > 0 && (
                                        <p className="text-[11px] text-blue-600">In {daysUntil} days</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <Target className="h-5 w-5 text-green-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Target Students</p>
                                    <p className="text-[13px] font-medium mt-1">{impactMetrics.targetBeneficiaries}</p>
                                    <p className="text-[11px] text-muted-foreground">{impactMetrics.schools} schools</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <Package className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Items Collected</p>
                                    <p className="text-[13px] font-medium mt-1">{impactMetrics.itemsCollected}</p>
                                    <p className="text-[11px] text-green-600">₹{(totalDonationValue / 1000).toFixed(1)}K value</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <UserCheck className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Volunteers</p>
                                    <p className="text-[13px] font-medium mt-1">{volunteers.length}/{impactMetrics.volunteersInvolved}</p>
                                    <p className="text-[11px] text-muted-foreground">Confirmed</p>
                                </div>
                            </div>

                            {project && (
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                        <LinkIcon className="h-5 w-5 text-purple-600" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-muted-foreground">Project</p>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="text-[13px] font-medium mt-1 text-primary hover:underline block"
                                        >
                                            {project.title}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Planning Progress Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    {planningPhases.map((phase) => (
                        <Card key={phase.id} className="border-border/40 bg-card/50">
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[13px] font-semibold">{phase.title}</h4>
                                        <span className="text-[13px] font-medium text-muted-foreground">
                                            {phase.completed}/{phase.tasks}
                                        </span>
                                    </div>
                                    <Progress value={phase.progress} className="h-2" />
                                    <p className="text-[11px] text-muted-foreground">{phase.progress}% Complete</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs */}
                <Tabs defaultValue="checklist" className="space-y-6">
                    <TabsList className="bg-card/50 border border-border/40">
                        <TabsTrigger value="checklist" className="text-[13px]">Planning Checklist</TabsTrigger>
                        <TabsTrigger value="volunteers" className="text-[13px]">Volunteers ({volunteers.length})</TabsTrigger>
                        <TabsTrigger value="donations" className="text-[13px]">Donations</TabsTrigger>
                        <TabsTrigger value="logistics" className="text-[13px]">Logistics</TabsTrigger>
                        <TabsTrigger value="budget" className="text-[13px]">Budget</TabsTrigger>
                        <TabsTrigger value="impact" className="text-[13px]">Impact</TabsTrigger>
                    </TabsList>

                    {/* Planning Checklist Tab */}
                    <TabsContent value="checklist">
                        <div className="space-y-6">
                            {eventChecklist.map((phase, phaseIndex) => (
                                <Card key={phaseIndex} className="border-border/40 bg-card/50">
                                    <CardHeader>
                                        <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                            <ClipboardList className="h-4 w-4" />
                                            {phase.phase}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {phase.items.map((item) => {
                                                const assignee = getUserById(item.assignee.toLowerCase().replace(' ', '-'));
                                                return (
                                                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/40">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.done}
                                                                readOnly
                                                                className="h-4 w-4 rounded border-gray-300"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={cn(
                                                                "text-[13px] font-medium",
                                                                item.done && "line-through text-muted-foreground"
                                                            )}>
                                                                {item.task}
                                                            </p>
                                                            <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                                                                <span className="flex items-center gap-1.5">
                                                                    <UserCheck className="h-3 w-3" />
                                                                    {item.assignee}
                                                                </span>
                                                                <span className="flex items-center gap-1.5">
                                                                    <CalendarIcon className="h-3 w-3" />
                                                                    Due: {format(new Date(item.dueDate), 'MMM dd')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {item.done ? (
                                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                        ) : (
                                                            <div className="h-5 w-5 rounded-full border-2 border-border" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Volunteers Tab */}
                    <TabsContent value="volunteers">
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold">Volunteer Roster</CardTitle>
                                <Button size="sm" variant="outline">Invite More</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {volunteers.map((volunteer) => {
                                        const user = getUserById(volunteer.id);
                                        if (!user) return null;

                                        return (
                                            <div key={volunteer.id} className="flex items-start justify-between p-4 rounded-lg border border-border/40">
                                                <div className="flex items-start gap-4">
                                                    <Link href={`/employees/${user.id}`}>
                                                        <Avatar className="h-12 w-12 hover:ring-2 ring-primary transition-all">
                                                            <AvatarImage src={user.avatar} alt={user.name} />
                                                            <AvatarFallback className="text-[11px]">
                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </Link>
                                                    <div>
                                                        <Link href={`/employees/${user.id}`} className="text-[14px] font-semibold hover:text-primary">
                                                            {volunteer.name}
                                                        </Link>
                                                        <p className="text-[12px] text-muted-foreground mt-0.5">{volunteer.role}</p>
                                                        <div className="flex items-center gap-4 mt-2 text-[11px]">
                                                            <span className="flex items-center gap-1 text-muted-foreground">
                                                                <ClipboardList className="h-3 w-3" />
                                                                {volunteer.tasks}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-muted-foreground">
                                                                <Clock className="h-3 w-3" />
                                                                {volunteer.shift}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="default" className="text-[11px]">Confirmed</Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Donations Tab */}
                    <TabsContent value="donations">
                        <div className="space-y-6">
                            {/* Summary Cards */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Total Donations</p>
                                        <p className="text-2xl font-semibold mt-1">₹{(totalDonationValue / 1000).toFixed(1)}K</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Items Collected</p>
                                        <p className="text-2xl font-semibold mt-1">{donations.reduce((sum, d) => sum + d.quantity, 0)}</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Donors</p>
                                        <p className="text-2xl font-semibold mt-1">{donations.length}</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Donations List */}
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold">Donation Tracker</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {donations.map((donation) => (
                                            <div key={donation.id} className="flex items-center justify-between p-4 rounded-lg border border-border/40">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                                        <Package className="h-5 w-5 text-primary/70" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-medium">{donation.donor}</p>
                                                        <p className="text-[12px] text-muted-foreground mt-0.5">
                                                            {donation.type} • {donation.quantity} units • ₹{(donation.value / 1000).toFixed(1)}K
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground mt-1">
                                                            Received: {format(new Date(donation.date), 'MMM dd, yyyy')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={donation.status === 'Received' ? 'default' : donation.status === 'In Transit' ? 'secondary' : 'outline'}
                                                    className="text-[11px]"
                                                >
                                                    {donation.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Logistics Tab */}
                    <TabsContent value="logistics">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Venue Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-[11px] text-muted-foreground mb-1">Location</p>
                                        <p className="text-[13px] font-medium">Community Center, Village Panchayat</p>
                                        <p className="text-[12px] text-muted-foreground">Sector 12, Rural District</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground mb-1">Capacity</p>
                                        <p className="text-[13px] font-medium">600 people</p>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground mb-1">Facilities</p>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            <Badge variant="outline" className="text-[10px]">Tables & Chairs</Badge>
                                            <Badge variant="outline" className="text-[10px]">Sound System</Badge>
                                            <Badge variant="outline" className="text-[10px]">Parking</Badge>
                                            <Badge variant="outline" className="text-[10px]">Water</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                        <Truck className="h-4 w-4" />
                                        Transportation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-[11px] text-muted-foreground mb-2">Vehicles Arranged</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between p-2 rounded border border-border/40">
                                                <span className="text-[13px]">2x Tempo (Supplies)</span>
                                                <Badge variant="secondary" className="text-[10px]">Confirmed</Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-2 rounded border border-border/40">
                                                <span className="text-[13px]">1x Bus (Team transport)</span>
                                                <Badge variant="secondary" className="text-[10px]">Confirmed</Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <p className="text-[11px] text-muted-foreground mb-1">Route</p>
                                        <p className="text-[12px]">Warehouse → Venue → School 1 → School 2 → School 3 → School 4 → School 5</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Budget Tab */}
                    <TabsContent value="budget">
                        <div className="space-y-6">
                            {/* Budget Overview */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Total Budget</p>
                                        <p className="text-2xl font-semibold mt-1">₹{(budget.totalBudget / 1000).toFixed(0)}K</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Spent</p>
                                        <p className="text-2xl font-semibold mt-1">₹{(budget.spent / 1000).toFixed(0)}K</p>
                                        <p className="text-[11px] text-green-600">{budgetUsed.toFixed(1)}% utilized</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <p className="text-[11px] text-muted-foreground">Remaining</p>
                                        <p className="text-2xl font-semibold mt-1">₹{((budget.totalBudget - budget.spent) / 1000).toFixed(0)}K</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Budget Categories */}
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold">Budget Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {budget.categories.map((category, index) => {
                                            const percentage = (category.spent / category.allocated) * 100;
                                            return (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[13px] font-medium">{category.name}</span>
                                                        <span className="text-[13px] text-muted-foreground">
                                                            ₹{(category.spent / 1000).toFixed(0)}K / ₹{(category.allocated / 1000).toFixed(0)}K
                                                        </span>
                                                    </div>
                                                    <Progress value={percentage} className="h-2" />
                                                    <p className="text-[11px] text-muted-foreground">{percentage.toFixed(0)}% utilized</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Impact Tab */}
                    <TabsContent value="impact">
                        <div className="space-y-6">
                            {/* Impact Numbers */}
                            <div className="grid gap-4 md:grid-cols-4">
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                                <Target className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground">Students Reached</p>
                                                <p className="text-[18px] font-semibold">{impactMetrics.registeredBeneficiaries}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                                <Package className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground">Items Distributed</p>
                                                <p className="text-[18px] font-semibold">{impactMetrics.itemsCollected}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                                                <TrendingUp className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground">Total Value</p>
                                                <p className="text-[18px] font-semibold">₹{(impactMetrics.estimatedValue / 1000).toFixed(0)}K</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-border/40 bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                                <Users className="h-5 w-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground">Schools</p>
                                                <p className="text-[18px] font-semibold">{impactMetrics.schools}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Expected Outcomes */}
                            <Card className="border-border/40 bg-card/50">
                                <CardHeader>
                                    <CardTitle className="text-[15px] font-semibold">Expected Outcomes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-[13px]">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span>Provide complete stationery kits to 500 underprivileged students</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span>Reduce financial burden on families for school supplies</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span>Improve school attendance and participation</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span>Build stronger community partnerships with corporate donors</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span>Create awareness about educational support programs</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
