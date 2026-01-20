'use client';

import AppLayout from '@/components/layout/app-layout';
import { HRDashboard } from '@/components/hr/hr-dashboard';

export default function HRPage() {
    return (
        <AppLayout>
            <HRDashboard />
        </AppLayout>
    );
}
