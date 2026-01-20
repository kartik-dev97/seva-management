import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Flag,
    AlertTriangle,
    Users,
    ArrowLeft,
    ChevronRight,
    Target,
    Zap,
    Scale,
    ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { ProjectSubNav } from '@/components/project/project-sub-nav';

export default async function PlanningOverviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <AppLayout>
            <div className="space-y-6">
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
                            <h1 className="text-2xl font-semibold tracking-tight">Project Planning</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Strategic roadmap, risk assessment, and resource management for {project.title}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sub Navigation */}
                <ProjectSubNav projectId={id} />

                {/* Planning Dashboard */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Milestones Summary */}
                    <Card className="border-border/40 bg-card/50 flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                    <Flag className="h-4 w-4 text-primary" />
                                    Roadmap
                                </CardTitle>
                                <Badge variant="secondary" className="text-[10px]">Execution Phase</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px]">
                                    <span className="text-muted-foreground">Overall Progress</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <Progress value={45} className="h-2" />
                            </div>
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-2">
                                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Next Milestone</p>
                                <p className="text-[13px] font-medium">First Workshop Conducted</p>
                                <p className="text-[11px] text-primary/70">Due Mar 25, 2026</p>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-auto w-full justify-between text-[12px]" asChild>
                                <Link href={`/projects/${id}/planning/milestones`}>
                                    View Full Roadmap <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Risks Summary */}
                    <Card className="border-border/40 bg-card/50 flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    Risks
                                </CardTitle>
                                <Badge variant="outline" className="text-[10px] text-orange-600 bg-orange-500/10 border-orange-200">2 High Priority</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-lg border border-border/40 text-center">
                                    <p className="text-[18px] font-semibold text-red-600">3</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</p>
                                </div>
                                <div className="p-3 rounded-lg border border-border/40 text-center">
                                    <p className="text-[18px] font-semibold text-green-600">1</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Resolved</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[11px] text-muted-foreground italic">"Monsoon disruption is currently the highest external risk being monitored."</p>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-auto w-full justify-between text-[12px]" asChild>
                                <Link href={`/projects/${id}/planning/risks`}>
                                    Manage Risks <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Resources Summary */}
                    <Card className="border-border/40 bg-card/50 flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    Resources
                                </CardTitle>
                                <Badge variant="secondary" className="text-[10px]">Optimal</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Target className="h-3.5 w-3.5" /> Personnel
                                    </span>
                                    <span className="font-medium">5 Members</span>
                                </div>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Zap className="h-3.5 w-3.5" /> Equipment
                                    </span>
                                    <span className="font-medium">11 Items</span>
                                </div>
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Scale className="h-3.5 w-3.5" /> Capacity
                                    </span>
                                    <span className="font-medium">85% Utilized</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="mt-auto w-full justify-between text-[12px]" asChild>
                                <Link href={`/projects/${id}/planning/resources`}>
                                    Resource Details <ChevronRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Strategy Section */}
                <div className="grid gap-6 md:grid-cols-2 mt-6">
                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4 text-primary" />
                                Strategic Objectives
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary">1</div>
                                    <p className="text-[13px] text-muted-foreground">Establish community-led monitoring systems for long-term sustainability.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary">2</div>
                                    <p className="text-[13px] text-muted-foreground">Deliver high-quality vocational training to at least 500 beneficiaries.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-primary">3</div>
                                    <p className="text-[13px] text-muted-foreground">Maintain operational costs within 10% of the initial budget projections.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card/50">
                        <CardHeader>
                            <CardTitle className="text-[15px] font-semibold">Project Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10 h-32 overflow-y-auto">
                                <p className="text-[12px] text-amber-900/70 leading-relaxed italic">
                                    "Planning phase focused on stakeholder alignment. Current focus is shifting towards field execution and resource deployment. Need to monitor feedback from initial workshops to adjust the Q3 roadmap if necessary."
                                </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[11px] text-muted-foreground">Last updated: 2 days ago</span>
                                <Button size="sm" variant="outline" className="text-[11px] h-8">Add Note</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
