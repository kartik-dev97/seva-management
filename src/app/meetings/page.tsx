'use client';

import AppLayout from '@/components/layout/app-layout';
import { meetings, projects, users } from '@/lib/mock-data';
import { SchedulingHub } from '@/components/scheduling/scheduling-hub';

export default function MeetingsPage() {
    return (
        <AppLayout>
            <div className="h-[calc(100vh-4rem)] overflow-hidden">
                <SchedulingHub
                    type="meeting"
                    items={meetings}
                    projects={projects}
                    users={users}
                    title="Meetings"
                    description="schedule and manage team meetings"
                    onAddItem={() => console.log('Add meeting')}
                />
            </div>
        </AppLayout>
    );
}
