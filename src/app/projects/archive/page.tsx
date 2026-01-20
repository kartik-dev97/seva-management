import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    Search,
    Archive,
    RotateCcw,
    Trash2,
    Eye,
    Calendar,
    IndianRupee
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

// Archived projects
const archivedProjects = [
    {
        id: 'arch-1',
        title: 'Women Empowerment Workshop 2024',
        description: 'Skills training program for rural women in handicrafts and entrepreneurship',
        department: 'Women Empowerment',
        archivedDate: new Date('2024-12-15'),
        completedDate: new Date('2024-12-01'),
        budget: 1500000,
        spent: 1420000,
        progress: 100,
        reason: 'Successfully completed'
    },
    {
        id: 'arch-2',
        title: 'Clean Water Initiative Phase 1',
        description: 'Installation of water purification systems in 10 villages',
        department: 'Healthcare',
        archivedDate: new Date('2024-11-20'),
        completedDate: new Date('2024-11-10'),
        budget: 2500000,
        spent: 2380000,
        progress: 100,
        reason: 'Successfully completed'
    },
    {
        id: 'arch-3',
        title: 'Tree Plantation Drive 2024',
        description: 'Environmental awareness and tree plantation in urban areas',
        department: 'Environment',
        archivedDate: new Date('2024-10-15'),
        completedDate: new Date('2024-10-01'),
        budget: 800000,
        spent: 750000,
        progress: 95,
        reason: 'Season ended - continuing next year'
    },
    {
        id: 'arch-4',
        title: 'Digital Literacy Camp',
        description: 'Basic computer training for senior citizens',
        department: 'Education',
        archivedDate: new Date('2024-09-30'),
        completedDate: new Date('2024-09-25'),
        budget: 500000,
        spent: 480000,
        progress: 100,
        reason: 'Successfully completed'
    },
];

export default function ProjectArchivePage() {
    const totalArchived = archivedProjects.length;
    const totalBudget = archivedProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = archivedProjects.reduce((sum, p) => sum + p.spent, 0);

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="space-y-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Project Archive</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                View and manage archived projects
                            </p>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10">
                                    <Archive className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Archived Projects</p>
                                    <p className="text-[18px] font-semibold">{totalArchived}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <IndianRupee className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Total Budget</p>
                                    <p className="text-[18px] font-semibold">₹{(totalBudget / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <IndianRupee className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Total Spent</p>
                                    <p className="text-[18px] font-semibold">₹{(totalSpent / 100000).toFixed(1)}L</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search archived projects..."
                                className="pl-8 text-[13px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Archived Projects List */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Archived Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {archivedProjects.map((project) => (
                                <div key={project.id} className="p-4 rounded-lg border border-border/40 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-[14px] font-semibold">{project.title}</h4>
                                            <p className="text-[12px] text-muted-foreground mt-1">{project.description}</p>
                                        </div>
                                        <Badge variant="secondary" className="text-[10px]">
                                            <Archive className="h-3 w-3 mr-1" />
                                            Archived
                                        </Badge>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-4 text-[12px]">
                                        <div>
                                            <p className="text-muted-foreground">Department</p>
                                            <p className="font-medium">{project.department}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Completed</p>
                                            <p className="font-medium">{format(project.completedDate, 'MMM dd, yyyy')}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Budget Used</p>
                                            <p className="font-medium">₹{(project.spent / 100000).toFixed(1)}L / ₹{(project.budget / 100000).toFixed(1)}L</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Progress</p>
                                            <p className="font-medium text-green-600">{project.progress}%</p>
                                        </div>
                                    </div>

                                    <div className="p-2 rounded bg-muted/30 text-[11px] text-muted-foreground">
                                        <strong>Archive Reason:</strong> {project.reason}
                                    </div>

                                    <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                        <Button variant="outline" size="sm" className="text-[11px] gap-1">
                                            <Eye className="h-3 w-3" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-[11px] gap-1">
                                            <RotateCcw className="h-3 w-3" />
                                            Restore
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-[11px] gap-1 text-red-600 hover:text-red-600 hover:bg-red-500/10">
                                            <Trash2 className="h-3 w-3" />
                                            Delete Permanently
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
