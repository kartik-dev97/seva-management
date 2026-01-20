'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Type, Image, Link2 } from 'lucide-react';

export default function VisionBoardPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Vision Board</h1>
                        <p className="text-muted-foreground">
                            Collaborative space for ideas and planning
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Type className="h-4 w-4" />
                            Text
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Image className="h-4 w-4" />
                            Image
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Link2 className="h-4 w-4" />
                            Link
                        </Button>
                    </div>
                </div>

                {/* Canvas */}
                <Card className="relative h-[calc(100vh-16rem)] overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
                    <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,transparent,black)]" />
                    <div className="relative flex h-full items-center justify-center">
                        <div className="text-center">
                            <Plus className="mx-auto h-16 w-16 text-muted-foreground/50" />
                            <p className="mt-4 text-lg font-medium text-muted-foreground">
                                Start adding cards to your vision board
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Click the buttons above to add text, images, or links
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
