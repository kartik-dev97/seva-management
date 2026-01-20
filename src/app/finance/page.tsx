'use client';

import AppLayout from '@/components/layout/app-layout';
import { FinanceDashboard } from '@/components/finance/finance-dashboard';

export default function FinancePage() {
    return (
        <AppLayout>
            <FinanceDashboard />
        </AppLayout>
    );
}
