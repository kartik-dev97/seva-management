'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    FolderKanban,
    Calendar,
    CheckSquare,
    Users,
    Video,
    FileText,
    UserCog,
    TrendingUp,
    Lightbulb,
    MessageSquare,
    Bot,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/context/app-context';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderKanban },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'HR & People', href: '/hr', icon: Users },
    { name: 'Meetings', href: '/meetings', icon: Video },
    { name: 'Files', href: '/files', icon: FileText },
    { name: 'Finance', href: '/finance', icon: TrendingUp },
    { name: 'Vision Board', href: '/vision-board', icon: Lightbulb },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { currentUser } = useApp();

    return (
        <div className="flex h-full w-56 flex-col border-r border-border/40 bg-card/30 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex h-14 items-center gap-2.5 px-4 border-b border-border/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
                    <span className="text-sm font-bold">S</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight">Seva</span>
                </div>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-2 py-3">
                <nav className="space-y-0.5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors',
                                    isActive
                                        ? 'bg-secondary text-foreground'
                                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                                )}
                            >
                                <item.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>

            {/* User Section */}
            <div className="border-t border-border/40 p-3">
                <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback className="text-[10px]">
                            {currentUser.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium truncate">{currentUser.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
