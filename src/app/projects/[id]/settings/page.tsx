import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Trash2, Archive } from 'lucide-react';
import Link from 'next/link';
import { ProjectStatus } from '@/lib/types';
import { format } from 'date-fns';

export default async function ProjectSettingsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <Link
                        href={`/projects/${id}`}
                        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Project
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Project Settings</h1>
                        <p className="text-[13px] text-muted-foreground mt-1">
                            Configure project details, timeline, and metadata
                        </p>
                    </div>
                </div>

                {/* Basic Information */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-[13px]">Project Title</Label>
                            <Input
                                id="title"
                                defaultValue={project.title}
                                className="text-[13px]"
                                placeholder="Enter project title"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[13px]">Description</Label>
                            <Textarea
                                id="description"
                                defaultValue={project.description}
                                className="text-[13px] min-h-[100px]"
                                placeholder="Describe the project goals and objectives"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="department" className="text-[13px]">Department</Label>
                                <Select defaultValue={project.department}>
                                    <SelectTrigger className="text-[13px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Education">Education</SelectItem>
                                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                                        <SelectItem value="Community">Community Development</SelectItem>
                                        <SelectItem value="Environment">Environment</SelectItem>
                                        <SelectItem value="Women Empowerment">Women Empowerment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-[13px]">Status</Label>
                                <Select defaultValue={project.status}>
                                    <SelectTrigger className="text-[13px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={ProjectStatus.PLANNING}>Planning</SelectItem>
                                        <SelectItem value={ProjectStatus.IN_PROGRESS}>In Progress</SelectItem>
                                        <SelectItem value={ProjectStatus.ON_HOLD}>On Hold</SelectItem>
                                        <SelectItem value={ProjectStatus.COMPLETED}>Completed</SelectItem>
                                        <SelectItem value={ProjectStatus.CANCELLED}>Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="startDate" className="text-[13px]">Start Date</Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    defaultValue={format(project.startDate, 'yyyy-MM-dd')}
                                    className="text-[13px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate" className="text-[13px]">End Date</Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    defaultValue={project.endDate ? format(project.endDate, 'yyyy-MM-dd') : ''}
                                    className="text-[13px]"
                                />
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/30">
                            <p className="text-[12px] text-muted-foreground">
                                <strong>Duration:</strong> {project.endDate ?
                                    `${Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24))} days` :
                                    'Ongoing'
                                }
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Budget */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Budget Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="budget" className="text-[13px]">Total Budget (₹)</Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    defaultValue={project.budget}
                                    className="text-[13px]"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[13px]">Spent (₹)</Label>
                                <Input
                                    type="number"
                                    value={project.spent}
                                    disabled
                                    className="text-[13px] bg-muted/50"
                                />
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/30">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-muted-foreground">Remaining:</span>
                                <span className="font-semibold">₹{((project.budget - project.spent) / 100000).toFixed(2)}L</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tags & Metadata */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Tags & Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[13px]">Current Tags</Label>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-[11px]">
                                        {tag}
                                        <button className="ml-1.5 hover:text-destructive">×</button>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newTag" className="text-[13px]">Add New Tag</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="newTag"
                                    placeholder="Type tag name..."
                                    className="text-[13px]"
                                />
                                <Button size="sm" variant="outline">Add</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Visibility & Access */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Visibility & Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="visibility" className="text-[13px]">Project Visibility</Label>
                            <Select defaultValue="team">
                                <SelectTrigger className="text-[13px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public - Everyone can view</SelectItem>
                                    <SelectItem value="team">Team - Only team members</SelectItem>
                                    <SelectItem value="restricted">Restricted - Selected users only</SelectItem>
                                    <SelectItem value="private">Private - Admins only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/30">
                            <p className="text-[12px] text-muted-foreground">
                                Team members can view project details, tasks, and files. Restricted access limits visibility to selected users.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                        <Button variant="default" className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Danger Zone */}
                <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold text-destructive">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-background">
                            <div>
                                <p className="text-[13px] font-medium">Archive Project</p>
                                <p className="text-[12px] text-muted-foreground">Move project to archive (can be restored)</p>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Archive className="h-4 w-4" />
                                Archive
                            </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/40 bg-background">
                            <div>
                                <p className="text-[13px] font-medium text-destructive">Delete Project</p>
                                <p className="text-[12px] text-muted-foreground">Permanently delete project and all data</p>
                            </div>
                            <Button variant="destructive" size="sm" className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
