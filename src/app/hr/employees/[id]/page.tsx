'use client';

import { use } from 'react';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Mail, Phone, MapPin, Calendar, Building, Clock, FileText, Award, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { employees } from '@/lib/hr-data';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export default function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // In a real app, use id to fetch. Mocking for now.
    const employee = Array.isArray(employees) && employees.length > 0
        ? (employees.find(e => e.id === id) || employees[0])
        : null;

    if (!employee) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center h-full py-20">
                    <h2 className="text-xl font-semibold">Employee not found</h2>
                    <Link href="/hr/employees" className="mt-4">
                        <Button variant="outline">Back to Directory</Button>
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Nav */}
                <div className="flex items-center gap-4">
                    <Link href="/hr/employees">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-light tracking-tight">Employee Profile</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar: ID Card Style */}
                    <div className="space-y-6">
                        <Card className="border-border/50 shadow-sm overflow-hidden text-center">
                            <div className="h-24 bg-gradient-to-r from-zinc-200 to-zinc-300 relative" />
                            <div className="px-6 pb-6 -mt-12 relative">
                                <Avatar className="h-24 w-24 border-4 border-background mx-auto shadow-md">
                                    <AvatarFallback className="text-2xl bg-zinc-100">
                                        {employee.firstName[0]}{employee.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="mt-3">
                                    <h2 className="text-xl font-bold">{employee.firstName} {employee.lastName}</h2>
                                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <Button className="w-full gap-2">
                                        <Mail className="h-4 w-4" />
                                        Message
                                    </Button>
                                    <Button variant="outline" className="w-full gap-2">
                                        <Phone className="h-4 w-4" />
                                        Call
                                    </Button>
                                </div>
                            </div>
                            <div className="border-t bg-zinc-50/50 p-4 grid grid-cols-2 divide-x">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Dept</p>
                                    <p className="text-sm font-medium">{employee.department}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                                    <Badge variant="secondary" className="mt-1 font-normal bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{employee.status}</Badge>
                                </div>
                            </div>
                        </Card>

                        <Card className="border-border/50 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Contact Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{employee.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{employee.location}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Joined {employee.joinDate}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content: 360 View */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        {/* Stats / Timeline */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="border-border/50 shadow-sm p-4 flex items-center gap-4">
                                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Tenure</p>
                                    <p className="font-semibold">3.5 Years</p>
                                </div>
                            </Card>
                            <Card className="border-border/50 shadow-sm p-4 flex items-center gap-4">
                                <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                                    <Award className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Rating</p>
                                    <p className="font-semibold">{employee.performanceRating}/5.0</p>
                                </div>
                            </Card>
                            <Card className="border-border/50 shadow-sm p-4 flex items-center gap-4">
                                <div className="h-10 w-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Documents</p>
                                    <p className="font-semibold">12 Files</p>
                                </div>
                            </Card>
                        </div>

                        {/* Tabs / Sections */}
                        <Card className="border-border/50 shadow-sm">
                            <CardHeader className="border-b">
                                <CardTitle className="text-base">Performance & History</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-8">
                                    <div className="relative pl-6 border-l-2 border-zinc-200 space-y-8">
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-zinc-300 bg-white" />
                                            <p className="text-sm text-muted-foreground mb-1">Oct 2023</p>
                                            <h4 className="font-medium">Promoted to Senior Project Manager</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Recognized for outstanding leadership in the Rural Education Initiative.</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-zinc-300 bg-white" />
                                            <p className="text-sm text-muted-foreground mb-1">Jan 2023</p>
                                            <h4 className="font-medium">Annual Performance Review</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Achieved 4.8/5 rating. "Exceptional problem solver."</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-zinc-300 bg-white" />
                                            <p className="text-sm text-muted-foreground mb-1">Mar 2020</p>
                                            <h4 className="font-medium">Joined Seva Organization</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Started as Project Coordinator.</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 shadow-sm">
                            <CardHeader className="border-b flex flex-row items-center justify-between">
                                <CardTitle className="text-base">Current Projects</CardTitle>
                                <Button size="sm" variant="outline">Assign Project</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                        <div>
                                            <p className="font-medium text-sm">Rural Education Initiative</p>
                                            <p className="text-xs text-muted-foreground">Lead • Active</p>
                                        </div>
                                        <Badge variant="outline">High Priority</Badge>
                                    </div>
                                    <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                        <div>
                                            <p className="font-medium text-sm">Clean Water Infrastructure</p>
                                            <p className="text-xs text-muted-foreground">Advisor • Planning</p>
                                        </div>
                                        <Badge variant="outline">Medium Priority</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
