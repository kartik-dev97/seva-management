'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Truck, Fuel, Wrench, MapPin, Gauge } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function LogisticsFinancePage() {
    const fleetData = [
        { id: 'FL-001', type: 'Heavy Truck', status: 'Active', route: 'Delhi - Mumbai', fuelCost: 45000, maintenance: 12000, total: 57000 },
        { id: 'FL-002', type: 'Van', status: 'Maintenance', route: 'Local', fuelCost: 15000, maintenance: 8500, total: 23500 },
        { id: 'FL-003', type: 'Heavy Truck', status: 'Active', route: 'Chennai - Bangalore', fuelCost: 38000, maintenance: 5000, total: 43000 },
        { id: 'FL-004', type: 'Pickup', status: 'Active', route: 'Site A - Site B', fuelCost: 12000, maintenance: 2000, total: 14000 },
    ];

    const stats = [
        { title: 'Total Fleet Cost', value: '₹1,37,500', icon: Truck, change: '+12% vs last month' },
        { title: 'Fuel Expenses', value: '₹1,10,000', icon: Fuel, change: '+5% vs last month' },
        { title: 'Maintenance', value: '₹27,500', icon: Wrench, change: '+15% vs last month' },
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
                            <h1 className="text-2xl font-light tracking-tight">Logistics & Transport</h1>
                            <p className="text-sm text-muted-foreground">Fleet management and transportation costs</p>
                        </div>
                    </div>
                    <Button>Add Vehicle Expense</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat, i) => (
                        <Card key={i} className="border-border/50 shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Fleet Expense Ledger</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="bg-zinc-50/50">
                                    <tr className="border-b border-border/50">
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase">Vehicle ID</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase">Type</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase">Route</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase">Status</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase text-right">Fuel</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase text-right">Maint.</th>
                                        <th className="h-10 px-6 align-middle font-medium text-muted-foreground text-xs uppercase text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {fleetData.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="p-6 align-middle font-mono text-xs">{item.id}</td>
                                            <td className="p-6 align-middle">{item.type}</td>
                                            <td className="p-6 align-middle">
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    {item.route}
                                                </div>
                                            </td>
                                            <td className="p-6 align-middle">
                                                <Badge variant="outline" className={item.status === 'Active' ? 'text-emerald-600 border-emerald-200' : 'text-orange-600 border-orange-200'}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="p-6 align-middle text-right">₹{item.fuelCost.toLocaleString('en-IN')}</td>
                                            <td className="p-6 align-middle text-right">₹{item.maintenance.toLocaleString('en-IN')}</td>
                                            <td className="p-6 align-middle text-right font-medium">₹{item.total.toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
