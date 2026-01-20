'use client';

import AppLayout from '@/components/layout/app-layout';
import { ProjectCard } from '@/components/projects/project-card';
import { projects } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List, Calendar } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ProjectStatus } from '@/lib/types';

import { ProjectListView } from '@/components/projects/project-list-view';
import { ProjectTimelineView } from '@/components/projects/project-timeline-view';

type ViewMode = 'grid' | 'list' | 'timeline';

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredProjects = statusFilter === 'all'
        ? projects
        : projects.filter(p => p.status === statusFilter);

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground">
                            Manage and track all organizational projects
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Project
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-4">
                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Projects</SelectItem>
                                <SelectItem value={ProjectStatus.IN_PROGRESS}>In Progress</SelectItem>
                                <SelectItem value={ProjectStatus.PLANNING}>Planning</SelectItem>
                                <SelectItem value={ProjectStatus.COMPLETED}>Completed</SelectItem>
                                <SelectItem value={ProjectStatus.ON_HOLD}>On Hold</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Results count */}
                        <div className="text-sm text-muted-foreground">
                            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 rounded-lg border p-1 border-muted/20 bg-muted/20">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            className="gap-2 h-8"
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            className="gap-2 h-8"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                            List
                        </Button>
                        <Button
                            variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                            size="sm"
                            className="gap-2 h-8"
                            onClick={() => setViewMode('timeline')}
                        >
                            <Calendar className="h-4 w-4" />
                            Timeline
                        </Button>
                    </div>
                </div>

                {/* Projects Content */}
                {viewMode === 'grid' && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}

                {viewMode === 'list' && (
                    <ProjectListView projects={filteredProjects} />
                )}

                {viewMode === 'timeline' && (
                    <ProjectTimelineView projects={filteredProjects} />
                )}
            </div>
        </AppLayout>
    );
}
