import AppLayout from '@/components/layout/app-layout';
import { notFound } from 'next/navigation';
import { getProjectById, getUserById } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    ArrowLeft,
    Plus,
    Search,
    Mail,
    Phone,
    Settings,
    UserMinus,
    Shield
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const roleColors = {
    'Project Lead': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    'Manager': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Team Member': 'bg-green-500/10 text-green-600 dark:text-green-400',
    'Volunteer': 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

const rolePermissions = {
    'Project Lead': ['Full Access', 'Edit Settings', 'Manage Team', 'Approve Budget'],
    'Manager': ['Edit Content', 'Manage Tasks', 'View Reports'],
    'Team Member': ['View Content', 'Edit Tasks', 'Upload Files'],
    'Volunteer': ['View Content', 'Add Comments'],
};

export default async function TeamRosterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const teamMembers = project.members.map((member) => {
        const user = getUserById(member.userId);
        return user ? { ...user, projectRole: member.role } : null;
    }).filter(Boolean);

    const roleCount = project.members.reduce((acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

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
                            <h1 className="text-2xl font-semibold tracking-tight">Team Roster</h1>
                            <p className="text-[13px] text-muted-foreground mt-1">
                                Manage team members for {project.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${id}/team/workload`}>View Workload</Link>
                        </Button>
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Member
                        </Button>
                    </div>
                </div>

                {/* Team Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card className="border-border/40 bg-card/50">
                        <CardContent className="p-4">
                            <p className="text-[11px] text-muted-foreground">Total Members</p>
                            <p className="text-2xl font-semibold mt-1">{teamMembers.length}</p>
                        </CardContent>
                    </Card>
                    {Object.entries(roleCount).map(([role, count]) => (
                        <Card key={role} className="border-border/40 bg-card/50">
                            <CardContent className="p-4">
                                <p className="text-[11px] text-muted-foreground">{role}s</p>
                                <p className="text-2xl font-semibold mt-1">{count}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filters */}
                <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search team members..."
                                        className="pl-8 text-[13px]"
                                    />
                                </div>
                            </div>
                            <Select defaultValue="all-roles">
                                <SelectTrigger className="w-[180px] text-[13px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-roles">All Roles</SelectItem>
                                    <SelectItem value="lead">Project Lead</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="member">Team Member</SelectItem>
                                    <SelectItem value="volunteer">Volunteer</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all-status">
                                <SelectTrigger className="w-[150px] text-[13px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all-status">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Members */}
                <div className="grid gap-4 md:grid-cols-2">
                    {teamMembers.map((member) => {
                        if (!member) return null;
                        const permissions = rolePermissions[member.projectRole as keyof typeof rolePermissions] || [];

                        return (
                            <Card key={member.id} className="border-border/40 bg-card/50 hover:bg-card/80 transition-colors">
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <Link href={`/employees/${member.id}`}>
                                                    <Avatar className="h-16 w-16 hover:ring-2 ring-primary transition-all">
                                                        <AvatarImage src={member.avatar} alt={member.name} />
                                                        <AvatarFallback className="text-[14px]">
                                                            {member.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </Link>
                                                <div>
                                                    <Link href={`/employees/${member.id}`} className="text-[15px] font-semibold hover:text-primary">
                                                        {member.name}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge className={cn('text-[10px]', roleColors[member.projectRole as keyof typeof roleColors])}>
                                                            {member.projectRole}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-[10px]">{member.department}</Badge>
                                                    </div>
                                                    <p className="text-[12px] text-muted-foreground mt-1.5">{member.role}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Contact */}
                                        <div className="space-y-2 text-[12px]">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail className="h-3.5 w-3.5" />
                                                <a href={`mailto:${member.email}`} className="hover:text-primary">{member.email}</a>
                                            </div>
                                            {member.phone && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    <a href={`tel:${member.phone}`} className="hover:text-primary">{member.phone}</a>
                                                </div>
                                            )}
                                        </div>

                                        {/* Permissions */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                <Shield className="h-3.5 w-3.5" />
                                                <span>Permissions:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {permissions.map((permission) => (
                                                    <Badge key={permission} variant="secondary" className="text-[10px]">
                                                        {permission}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="flex items-center justify-between pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                                            <span>Joined: {format(member.joinDate, 'MMM yyyy')}</span>
                                            <div className={`h-2 w-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="flex-1 text-[12px]" asChild>
                                                <Link href={`/employees/${member.id}`}>View Profile</Link>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-[12px] text-red-600 hover:text-red-600 hover:bg-red-500/10">
                                                <UserMinus className="h-3.5 w-3.5 mr-1" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Role Definitions */}
                <Card className="border-border/40 bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-[15px] font-semibold">Role Definitions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {Object.entries(rolePermissions).map(([role, permissions]) => (
                                <div key={role} className="p-3 rounded-lg border border-border/40">
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge className={cn('text-[11px]', roleColors[role as keyof typeof roleColors])}>
                                            {role}
                                        </Badge>
                                        <span className="text-[11px] text-muted-foreground">
                                            {roleCount[role] || 0} member{(roleCount[role] || 0) !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {permissions.map((permission) => (
                                            <Badge key={permission} variant="outline" className="text-[10px]">
                                                {permission}
                                            </Badge>
                                        ))}
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
