'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search, Filter, Mail, Phone, MapPin, Building, Star, MoreVertical, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { employees } from '@/lib/hr-data';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';

export default function EmployeeDirectoryPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'staff' | 'volunteer'>('all');

    const filteredEmployees = employees.filter(emp =>
        (typeFilter === 'all' || (typeFilter === 'volunteer' ? emp.role.toLowerCase().includes('volunteer') : !emp.role.toLowerCase().includes('volunteer'))) &&
        (emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
            emp.role.toLowerCase().includes(search.toLowerCase()) ||
            emp.department.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">People Directory</h1>
                        <p className="text-muted-foreground mt-1">
                            Find and connect with staff and volunteers
                        </p>
                    </div>
                    <Link href="/hr">
                        <Button variant="outline" size="sm" className="gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border bg-card p-4">
                    <div className="relative w-full sm:w-[320px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, role, or department..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-1 rounded-lg border p-1 border-muted/20 bg-muted/20">
                            <button
                                onClick={() => setTypeFilter('all')}
                                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all", typeFilter === 'all' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setTypeFilter('staff')}
                                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all", typeFilter === 'staff' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                Staff
                            </button>
                            <button
                                onClick={() => setTypeFilter('volunteer')}
                                className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all", typeFilter === 'volunteer' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                Volunteers
                            </button>
                        </div>
                    </div>
                </div>

                {/* Staff Table */}
                <Card className="border-border/40 bg-card/50 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/30 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Person</th>
                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Department</th>
                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Role</th>
                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Location</th>
                                    <th className="px-6 py-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Status</th>
                                    <th className="px-6 py-3 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-border/50">
                                                    <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                                                        {emp.firstName[0]}{emp.lastName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Link href={`/hr/employees/${emp.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                                                        {emp.firstName} {emp.lastName}
                                                    </Link>
                                                    <div className="text-[11px] text-muted-foreground">ID: {emp.id.slice(0, 8)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-muted-foreground text-xs">{emp.department}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Briefcase className="h-3 w-3 text-muted-foreground" />
                                                {emp.role}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <MapPin className="h-3 w-3" />
                                                {emp.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={cn(
                                                "font-semibold text-[10px] uppercase tracking-wider border-0 px-2 py-0.5",
                                                emp.status === 'Active' ? "bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700" : "bg-muted text-muted-foreground"
                                            )}>
                                                {emp.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                                    <Separator className="my-1" />
                                                    <DropdownMenuItem className="text-red-600">Deactivate Staff</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
