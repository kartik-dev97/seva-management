import { Project, ProjectStatus } from '@/lib/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/lib/mock-data';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProjectListViewProps {
    projects: Project[];
}

const statusColors: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
    [ProjectStatus.IN_PROGRESS]: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
    [ProjectStatus.ON_HOLD]: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
    [ProjectStatus.COMPLETED]: 'bg-green-500/10 text-green-600 border-green-500/30',
    [ProjectStatus.CANCELLED]: 'bg-red-500/10 text-red-600 border-red-500/30',
};

export function ProjectListView({ projects }: ProjectListViewProps) {
    const router = useRouter();

    return (
        <div className="rounded-md border bg-card/50">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30">
                        <TableHead className="w-[30%]">Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Lead</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Progress</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.map((project) => {
                        const lead = getUserById(project.lead);
                        return (
                            <TableRow
                                key={project.id}
                                className="cursor-pointer hover:bg-accent/30 transition-colors"
                                onClick={() => router.push(`/projects/${project.id}`)}
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[14px]">{project.title}</span>
                                        <span className="text-[12px] text-muted-foreground line-clamp-1">{project.description}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn('text-[10px] font-normal', statusColors[project.status])}>
                                        {project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {lead && (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={lead.avatar} />
                                                <AvatarFallback className="text-[9px]">{lead.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-[12px]">{lead.name}</span>
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="text-[12px] text-muted-foreground">
                                        <p>{format(project.startDate, 'MMM d, yyyy')}</p>
                                        {project.endDate && (
                                            <p className="text-[11px] mt-0.5">to {format(project.endDate, 'MMM d, yyyy')}</p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-[12px]">
                                        <span className="font-medium">₹{(project.budget / 100000).toFixed(1)}L</span>
                                        <span className="text-muted-foreground ml-1 text-[11px]">(Allocated)</span>
                                    </div>
                                </TableCell>
                                <TableCell className="w-[15%]">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} className="h-1.5" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
