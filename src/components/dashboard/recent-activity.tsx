import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { activities, getUserById } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { FileText, FolderKanban, Calendar, CheckSquare } from 'lucide-react';

const iconMap = {
    project: FolderKanban,
    event: Calendar,
    task: CheckSquare,
    file: FileText,
    meeting: Calendar,
};

export function RecentActivity() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => {
                        const user = getUserById(activity.userId);
                        const Icon = iconMap[activity.type];

                        return (
                            <div key={activity.id} className="flex items-start gap-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback>
                                        {user?.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm">
                                        <span className="font-medium">{user?.name}</span>{' '}
                                        <span className="text-muted-foreground">{activity.action}</span>{' '}
                                        <span className="font-medium">{activity.targetName}</span>
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">
                                            <Icon className="mr-1 h-3 w-3" />
                                            {activity.type}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
