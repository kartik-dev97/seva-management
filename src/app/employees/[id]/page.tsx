import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getUserById, tasks } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Building,
    MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserRole } from '@/lib/types';
import { format } from 'date-fns';

const roleColors = {
    [UserRole.ADMIN]: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    [UserRole.HEAD]: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    [UserRole.MANAGER]: 'bg-green-500/10 text-green-600 dark:text-green-400',
    [UserRole.EMPLOYEE]: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    [UserRole.VOLUNTEER]: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const employee = getUserById(id);

    if (!employee) {
        notFound();
    }

    const employeeTasks = tasks.filter(t => t.assigneeId === employee.id);
    const completedTasks = employeeTasks.filter(t => t.status === 'Completed').length;

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="space-y-3">
                    <Link
                        href="/employees"
                        className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Employees
                    </Link>
                </div>

                {/* Profile Header */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-6">
                                <Avatar className="h-20 w-20 ring-2 ring-background">
                                    <AvatarImage src={employee.avatar} alt={employee.name} />
                                    <AvatarFallback className="text-2xl">
                                        {employee.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-3">
                                    <div>
                                        <h1 className="text-2xl font-semibold tracking-tight">{employee.name}</h1>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge className={cn('text-[11px]', roleColors[employee.role])}>
                                                {employee.role}
                                            </Badge>
                                            <span className="text-[13px] text-muted-foreground">•</span>
                                            <Badge variant="outline" className="text-[11px]">{employee.department}</Badge>
                                            <span className="text-[13px] text-muted-foreground">•</span>
                                            <div className={`h-2 w-2 rounded-full ${employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            <span className="text-[13px] text-muted-foreground capitalize">{employee.status}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 text-[13px]">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            {employee.email}
                                        </div>
                                        {employee.phone && (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="h-4 w-4" />
                                                {employee.phone}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Join Date</p>
                            <p className="text-[15px] font-semibold mt-1">{format(employee.joinDate, 'MMM yyyy')}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Tasks</p>
                            <p className="text-[15px] font-semibold mt-1">{employeeTasks.length}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Completed</p>
                            <p className="text-[15px] font-semibold mt-1">{completedTasks}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Completion Rate</p>
                            <p className="text-[15px] font-semibold mt-1">
                                {employeeTasks.length > 0 ? Math.round((completedTasks / employeeTasks.length) * 100) : 0}%
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="tasks" className="space-y-6">
                    <TabsList className="bg-card/50 border border-border/40">
                        <TabsTrigger value="tasks" className="text-[13px]">Tasks ({employeeTasks.length})</TabsTrigger>
                        <TabsTrigger value="attendance" className="text-[13px]">Attendance</TabsTrigger>
                        <TabsTrigger value="documents" className="text-[13px]">Documents</TabsTrigger>
                        <TabsTrigger value="performance" className="text-[13px]">Performance</TabsTrigger>
                    </TabsList>

                    {/* Tasks Tab */}
                    <TabsContent value="tasks">
                        <Card className="border-border/40 bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-[15px] font-semibold">Assigned Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {employeeTasks.map((task) => (
                                        <Link
                                            key={task.id}
                                            href={`/tasks/${task.id}`}
                                            className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    task.status === 'Completed' ? 'bg-green-500' :
                                                        task.status === 'In Progress' ? 'bg-blue-500' :
                                                            task.status === 'In Review' ? 'bg-orange-500' : 'bg-gray-400'
                                                )} />
                                                <div>
                                                    <p className="text-[13px] font-medium">{task.title}</p>
                                                    {task.dueDate && (
                                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                                            Due {format(task.dueDate, 'PPP')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="text-[11px]">{task.status}</Badge>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Other Tabs */}
                    <TabsContent value="attendance">
                        <Card className="border-border/40 bg-card/50">
                            <CardContent className="p-12 text-center">
                                <p className="text-[13px] text-muted-foreground">Attendance tracking coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="documents">
                        <Card className="border-border/40 bg-card/50">
                            <CardContent className="p-12 text-center">
                                <p className="text-[13px] text-muted-foreground">Documents management coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="performance">
                        <Card className="border-border/40 bg-card/50">
                            <CardContent className="p-12 text-center">
                                <p className="text-[13px] text-muted-foreground">Performance metrics coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
