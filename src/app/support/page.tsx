import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support</h1>
                    <p className="text-muted-foreground">
                        Get help and support for the system
                    </p>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground">Support page coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
