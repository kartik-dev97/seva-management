'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jul', activities: 45 },
    { month: 'Aug', activities: 52 },
    { month: 'Sep', activities: 48 },
    { month: 'Oct', activities: 61 },
    { month: 'Nov', activities: 55 },
    { month: 'Dec', activities: 67 },
    { month: 'Jan', activities: 73 },
];

export function ActivityChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Activity Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="activities"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorActivities)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
