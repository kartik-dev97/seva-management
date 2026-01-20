'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
    const reports = [
        { title: 'Annual Financial Statement', date: 'Dec 31, 2023', type: 'PDF', size: '2.4 MB' },
        { title: 'Q1 2024 Expense Report', date: 'Mar 31, 2024', type: 'PDF', size: '1.8 MB' },
        { title: 'Q2 2024 Expense Report', date: 'Jun 30, 2024', type: 'PDF', size: '1.9 MB' },
        { title: 'July Burn Rate Analysis', date: 'Jul 31, 2024', type: 'XLSX', size: '450 KB' },
        { title: 'Vendor Payment History', date: 'Aug 15, 2024', type: 'CSV', size: '120 KB' },
    ];

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/finance">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-light tracking-tight">Financial Reports</h1>
                            <p className="text-sm text-muted-foreground">Access and download statements</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report, i) => (
                        <Card key={i} className="group hover:border-zinc-400 transition-all cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-10 w-10 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <h3 className="font-medium mb-1 group-hover:underline">{report.title}</h3>
                                <p className="text-xs text-muted-foreground mb-4">Generated on {report.date}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-dashed">
                                    <span className="text-xs font-mono bg-zinc-50 px-2 py-1 rounded border border-zinc-100">{report.type}</span>
                                    <span className="text-xs text-muted-foreground">{report.size}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
