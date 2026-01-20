import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function SettingsPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account and application preferences
                    </p>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground">Settings page coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
