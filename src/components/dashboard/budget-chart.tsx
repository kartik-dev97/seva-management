'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { project: 'Rural Education', budget: 5000000, spent: 2750000 },
    { project: 'Clean Water', budget: 8000000, spent: 4200000 },
    { project: 'Women Empower', budget: 3500000, spent: 2100000 },
    { project: 'Healthcare', budget: 6000000, spent: 450000 },
];

export function BudgetChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget vs Actual Spending</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="project" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                            formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`}
                        />
                        <Legend />
                        <Bar dataKey="budget" fill="#3b82f6" name="Budget" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="spent" fill="#10b981" name="Spent" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
