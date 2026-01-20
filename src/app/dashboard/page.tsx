import AppLayout from '@/components/layout/app-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { ProjectStatusChart } from '@/components/dashboard/project-status-chart';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { BudgetChart } from '@/components/dashboard/budget-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { kpis } from '@/lib/mock-data';
import * as Icons from 'lucide-react';

export default function DashboardPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-[13px] text-muted-foreground">
                        Overview of your organization's activities and metrics
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {kpis.map((kpi) => {
                        const IconComponent = Icons[kpi.icon as keyof typeof Icons] as any;
                        return (
                            <KPICard
                                key={kpi.id}
                                label={kpi.label}
                                value={kpi.value}
                                change={kpi.change}
                                trend={kpi.trend}
                                icon={IconComponent}
                                suffix={kpi.label === 'Budget Utilization' ? '%' : ''}
                            />
                        );
                    })}
                </div>

                {/* Charts Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <ProjectStatusChart />
                    <ActivityChart />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* <BudgetChart /> */}
                    <RecentActivity />
                </div>
            </div>
        </AppLayout>
    );
}
