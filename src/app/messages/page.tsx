import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const threads = [
    { id: '1', name: 'Priya Sharma', lastMessage: 'We need to discuss the upcoming event', unread: 2, time: '10:30 AM' },
    { id: '2', name: 'Amit Patel', lastMessage: 'Budget report is ready for review', unread: 0, time: 'Yesterday' },
    { id: '3', name: 'Project Team', lastMessage: 'Great progress on the water project!', unread: 5, time: '2 days ago' },
];

export default function MessagesPage() {
    return (
        <AppLayout>
            <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-12rem)]">
                {/* Threads List */}
                <Card>
                    <CardContent className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold">Messages</h3>
                            <Button size="icon" variant="ghost">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {threads.map((thread) => (
                                <div
                                    key={thread.id}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent cursor-pointer"
                                >
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>{thread.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{thread.name}</p>
                                            <span className="text-xs text-muted-foreground">{thread.time}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                                    </div>
                                    {thread.unread > 0 && (
                                        <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                            {thread.unread}
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Message View */}
                <Card className="lg:col-span-2">
                    <CardContent className="p-6">
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            Select a conversation to view messages
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
