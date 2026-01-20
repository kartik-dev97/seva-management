import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Project, ProjectStatus } from '@/lib/types';
import { getUserById } from '@/lib/mock-data';
import { Calendar, IndianRupee, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
}

const statusColors = {
    [ProjectStatus.PLANNING]: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    [ProjectStatus.IN_PROGRESS]: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    [ProjectStatus.ON_HOLD]: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
    [ProjectStatus.COMPLETED]: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    [ProjectStatus.CANCELLED]: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

export function ProjectCard({ project }: ProjectCardProps) {
    const lead = getUserById(project.lead);
    const budgetUsed = (project.spent / project.budget) * 100;

    return (
        <Link href={`/projects/${project.id}`}>
            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 py-0">
                {/* Header with background */}
                <div className="relative h-60 bg-muted overflow-hidden">
                    {/* Background Image or Gradient Fallback */}
                    {project.backgroundImage ? (
                        <>
                            <div className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${project.backgroundImage})` }}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background opacity-50" />
                    )}

                    <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

                    <CardHeader className="relative h-full flex flex-col justify-between p-4">
                        <div className="flex items-start justify-between w-full">
                            <Badge className={cn('border backdrop-blur-sm shadow-sm', statusColors[project.status])}>
                                {project.status}
                            </Badge>
                            <div className="flex -space-x-2">
                                {project.members.slice(0, 3).map((member) => {
                                    const user = getUserById(member.userId);
                                    return (
                                        <Avatar key={member.userId} className="h-7 w-7 border-2 border-background grayscale hover:grayscale-0 transition-all">
                                            <AvatarImage src={user?.avatar} alt={user?.name} className="object-cover" />
                                            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                                                {user?.name.split(' ').map((n) => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                    );
                                })}
                                {project.members.length > 3 && (
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-zinc-800 text-zinc-300 text-[10px] font-medium z-10">
                                        +{project.members.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </div>

                {/* Content */}
                <CardContent className="p-3 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            <div>
                                <p className="text-xs text-muted-foreground">Budget</p>
                                <p className="font-medium text-foreground">
                                    ₹{(project.budget / 100000).toFixed(1)}L
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <div>
                                <p className="text-xs text-muted-foreground">Team</p>
                                <p className="font-medium text-foreground">{project.members.length} members</p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t bg-muted/30 px-6 py-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                            {project.startDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} -{' '}
                            {project.endDate?.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) || 'Ongoing'}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
