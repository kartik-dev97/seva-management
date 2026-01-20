import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Download,
    Users,
    Target,
    TrendingUp,
    Heart,
    School,
    BookOpen
} from 'lucide-react';
import Link from 'next/link';

// Impact metrics
const impactData = {
    beneficiaries: {
        target: 500,
        reached: 450,
        categories: [
            { name: 'Students', count: 350, icon: Users },
            { name: 'Teachers', count: 50, icon: School },
            { name: 'Families', count: 50, icon: Heart },
        ]
    },
    outcomes: [
        { metric: 'School Enrollment Increase', value: 15, unit: '%', baseline: 0 },
        { metric: 'Student Attendance Rate', value: 85, unit: '%', baseline: 70 },
        { metric: 'Learning Outcome Improvement', value: 20, unit: '%', baseline: 0 },
        { metric: 'Teacher Training Completion', value: 100, unit: '%', baseline: 0 },
    ],
    resources: {
        booksDistributed: 2500,
        stationeryKits: 500,
        teachingAids: 150,
        schoolBags: 350,
    },
    stories: [
        {
            id: 1,
            title: 'Priya\'s Educational Journey',
            content: 'Priya, a 10-year-old from a remote village, received her first set of school supplies through our program. She now attends school regularly and dreams of becoming a teacher.',
            image: null,
        },
        {
            id: 2,
            title: 'Transforming Rural Classrooms',
            content: 'With new teaching aids and trained educators, the local government school has seen a 30% increase in student engagement and participation.',
            image: null,
        },
    ],
};

export default async function ImpactReportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const beneficiaryProgress = (impactData.beneficiaries.reached / impactData.beneficiaries.target) * 100;

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
                            <h1 className="text-2xl font-semibold tracking-tight">Impact Report</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Measuring social impact of {project.title}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                </div>

                {/* Beneficiary Reach */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Beneficiary Reach</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] text-muted-foreground">Overall Progress</span>
                                <span className="text-[13px] font-semibold">
                                    {impactData.beneficiaries.reached} / {impactData.beneficiaries.target}
                                </span>
                            </div>
                            <Progress value={beneficiaryProgress} className="h-3" />
                            <p className="text-[12px] text-green-600">
                                {beneficiaryProgress.toFixed(0)}% of target reached
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {impactData.beneficiaries.categories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                    <div key={cat.name} className="p-4 rounded-lg border border-border/40">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                                                <Icon className="h-5 w-5 text-primary/70" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] text-muted-foreground">{cat.name}</p>
                                                <p className="text-[18px] font-semibold">{cat.count}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Key Outcomes */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Key Outcomes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {impactData.outcomes.map((outcome, i) => (
                                <div key={i} className="p-4 rounded-lg border border-border/40">
                                    <div className="flex items-start justify-between mb-3">
                                        <p className="text-[13px] font-medium">{outcome.metric}</p>
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-bold text-primary">{outcome.value}</span>
                                        <span className="text-[13px] text-muted-foreground mb-1">{outcome.unit}</span>
                                    </div>
                                    {outcome.baseline > 0 && (
                                        <p className="text-[11px] text-muted-foreground mt-2">
                                            Baseline: {outcome.baseline}{outcome.unit}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Resources Distributed */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Resources Distributed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="text-center p-4 rounded-lg bg-muted/30">
                                <BookOpen className="h-8 w-8 mx-auto text-blue-600" />
                                <p className="text-2xl font-bold mt-2">{impactData.resources.booksDistributed.toLocaleString()}</p>
                                <p className="text-[12px] text-muted-foreground">Books</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/30">
                                <Target className="h-8 w-8 mx-auto text-green-600" />
                                <p className="text-2xl font-bold mt-2">{impactData.resources.stationeryKits}</p>
                                <p className="text-[12px] text-muted-foreground">Stationery Kits</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/30">
                                <School className="h-8 w-8 mx-auto text-purple-600" />
                                <p className="text-2xl font-bold mt-2">{impactData.resources.teachingAids}</p>
                                <p className="text-[12px] text-muted-foreground">Teaching Aids</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/30">
                                <Heart className="h-8 w-8 mx-auto text-pink-600" />
                                <p className="text-2xl font-bold mt-2">{impactData.resources.schoolBags}</p>
                                <p className="text-[12px] text-muted-foreground">School Bags</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Success Stories */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Success Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {impactData.stories.map((story) => (
                                <div key={story.id} className="p-4 rounded-lg border border-border/40">
                                    <h4 className="text-[14px] font-semibold mb-2">{story.title}</h4>
                                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                                        {story.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
