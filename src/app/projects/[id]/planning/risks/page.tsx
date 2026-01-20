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
    AlertTriangle,
    Shield,
    TrendingDown,
    TrendingUp,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Risk data
const risks = [
    {
        id: '1',
        title: 'Budget Overrun',
        description: 'Risk of exceeding allocated budget due to increased material costs',
        category: 'Financial',
        likelihood: 3,
        impact: 4,
        score: 12,
        status: 'active',
        owner: 'Amit Patel',
        mitigation: 'Regular budget reviews, vendor negotiations, contingency fund allocation',
        identifiedDate: new Date('2026-02-15'),
    },
    {
        id: '2',
        title: 'Resource Availability',
        description: 'Key team members may not be available during critical phases',
        category: 'Operational',
        likelihood: 2,
        impact: 4,
        score: 8,
        status: 'monitoring',
        owner: 'Priya Sharma',
        mitigation: 'Cross-training team members, maintaining backup resource list',
        identifiedDate: new Date('2026-02-20'),
    },
    {
        id: '3',
        title: 'Weather Disruption',
        description: 'Monsoon season may affect field activities and outdoor events',
        category: 'External',
        likelihood: 4,
        impact: 3,
        score: 12,
        status: 'active',
        owner: 'Rajesh Kumar',
        mitigation: 'Flexible scheduling, indoor backup venues, weather monitoring',
        identifiedDate: new Date('2026-03-01'),
    },
    {
        id: '4',
        title: 'Stakeholder Alignment',
        description: 'Community leaders may have different expectations',
        category: 'Stakeholder',
        likelihood: 2,
        impact: 3,
        score: 6,
        status: 'resolved',
        owner: 'Anita Desai',
        mitigation: 'Regular community meetings, documented agreements, feedback loops',
        identifiedDate: new Date('2026-02-10'),
    },
    {
        id: '5',
        title: 'Technology Failure',
        description: 'Digital tools and platforms may experience downtime',
        category: 'Technical',
        likelihood: 1,
        impact: 2,
        score: 2,
        status: 'monitoring',
        owner: 'Arjun Reddy',
        mitigation: 'Offline backup systems, regular data backups, IT support contract',
        identifiedDate: new Date('2026-02-25'),
    },
];

const getRiskLevel = (score: number) => {
    if (score >= 12) return { label: 'High', color: 'text-red-600 bg-red-500/10' };
    if (score >= 6) return { label: 'Medium', color: 'text-orange-600 bg-orange-500/10' };
    return { label: 'Low', color: 'text-green-600 bg-green-500/10' };
};

const categoryColors: Record<string, string> = {
    'Financial': 'bg-blue-500/10 text-blue-600',
    'Operational': 'bg-purple-500/10 text-purple-600',
    'External': 'bg-orange-500/10 text-orange-600',
    'Stakeholder': 'bg-green-500/10 text-green-600',
    'Technical': 'bg-gray-500/10 text-gray-600',
};

export default async function RiskManagementPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const activeRisks = risks.filter(r => r.status === 'active').length;
    const highRisks = risks.filter(r => r.score >= 12).length;
    const avgRiskScore = risks.reduce((sum, r) => sum + r.score, 0) / risks.length;

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
                            <h1 className="text-2xl font-semibold tracking-tight">Risk Management</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Identify and mitigate risks for {project.title}
                            </p>
                        </div>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Risk
                    </Button>
                </div>

                {/* Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">High Risks</p>
                                    <p className="text-[18px] font-semibold text-red-600">{highRisks}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                                    <Shield className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Active Risks</p>
                                    <p className="text-[18px] font-semibold">{activeRisks}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                                    <TrendingDown className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Avg Risk Score</p>
                                    <p className="text-[18px] font-semibold">{avgRiskScore.toFixed(1)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground">Resolved</p>
                                    <p className="text-[18px] font-semibold text-green-600">
                                        {risks.filter(r => r.status === 'resolved').length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Risk Matrix */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Risk Matrix (Likelihood × Impact)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-6 gap-1">
                            {/* Header row */}
                            <div className="text-[11px] text-muted-foreground"></div>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="text-center text-[11px] text-muted-foreground p-2">
                                    Impact {i}
                                </div>
                            ))}

                            {/* Matrix rows */}
                            {[5, 4, 3, 2, 1].map(likelihood => (
                                <>
                                    <div className="text-[11px] text-muted-foreground p-2 flex items-center">
                                        L{likelihood}
                                    </div>
                                    {[1, 2, 3, 4, 5].map(impact => {
                                        const score = likelihood * impact;
                                        const risksInCell = risks.filter(r => r.likelihood === likelihood && r.impact === impact);
                                        const bgColor = score >= 15 ? 'bg-red-500/30' : score >= 8 ? 'bg-orange-500/30' : score >= 4 ? 'bg-yellow-500/30' : 'bg-green-500/30';

                                        return (
                                            <div key={`${likelihood}-${impact}`} className={cn("h-16 rounded flex items-center justify-center relative", bgColor)}>
                                                <span className="text-[10px] text-muted-foreground absolute top-1 right-1">{score}</span>
                                                {risksInCell.map(r => (
                                                    <div key={r.id} className="h-3 w-3 rounded-full bg-foreground/80 mx-0.5" title={r.title} />
                                                ))}
                                            </div>
                                        );
                                    })}
                                </>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Risk Register */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Risk Register</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {risks.map((risk) => {
                                const riskLevel = getRiskLevel(risk.score);

                                return (
                                    <div key={risk.id} className="p-4 rounded-lg border border-border/40 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-[14px] font-semibold">{risk.title}</h4>
                                                    <Badge className={cn('text-[10px]', categoryColors[risk.category])}>
                                                        {risk.category}
                                                    </Badge>
                                                    <Badge className={cn('text-[10px]', riskLevel.color)}>
                                                        {riskLevel.label} ({risk.score})
                                                    </Badge>
                                                    <Badge variant={risk.status === 'resolved' ? 'default' : 'secondary'} className="text-[10px]">
                                                        {risk.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-[12px] text-muted-foreground">{risk.description}</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 md:grid-cols-2 text-[12px]">
                                            <div>
                                                <p className="text-muted-foreground mb-1">Mitigation Strategy:</p>
                                                <p>{risk.mitigation}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground mb-1">Risk Owner:</p>
                                                <p>{risk.owner}</p>
                                                <p className="text-[11px] text-muted-foreground mt-1">
                                                    Identified: {format(risk.identifiedDate, 'MMM dd, yyyy')}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                                            <Button variant="outline" size="sm" className="text-[11px]">Update Status</Button>
                                            <Button variant="ghost" size="sm" className="text-[11px]">Add Note</Button>
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
