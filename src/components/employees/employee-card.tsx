import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, UserRole, Department } from '@/lib/types';
import { Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface EmployeeCardProps {
    employee: User;
}

const roleColors = {
    [UserRole.ADMIN]: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    [UserRole.HEAD]: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    [UserRole.MANAGER]: 'bg-green-500/10 text-green-700 dark:text-green-400',
    [UserRole.EMPLOYEE]: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    [UserRole.VOLUNTEER]: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <Link href={`/employees/${employee.id}`}>
            <Card className="group overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <Avatar className="h-16 w-16 ring-2 ring-background group-hover:ring-primary/20 transition-all">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback className="text-lg">
                                {employee.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 space-y-3">
                            {/* Name & Role */}
                            <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {employee.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge className={roleColors[employee.role]}>{employee.role}</Badge>
                                    <span className="text-sm text-muted-foreground">{employee.department}</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    {employee.email}
                                </div>
                                {employee.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3.5 w-3.5" />
                                        {employee.phone}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Joined {format(employee.joinDate, 'MMM yyyy')}
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className={`h-2 w-2 rounded-full ${employee.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
