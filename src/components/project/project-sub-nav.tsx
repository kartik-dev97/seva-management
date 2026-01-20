'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Calendar,
    ListTodo,
    Users,
    IndianRupee,
    FolderOpen,
    Flag,
    BarChart3,
    MessageSquare
} from 'lucide-react';

interface ProjectSubNavProps {
    projectId: string;
}

const navItems = [
    { name: 'Overview', href: '', icon: LayoutDashboard, match: 'exact' },
    { name: 'Schedule', href: '/events', icon: Calendar, match: 'prefix' },
    { name: 'Tasks', href: '/tasks', icon: ListTodo, match: 'prefix' },
    { name: 'Team', href: '/team', icon: Users, match: 'prefix' },
    { name: 'Budget', href: '/budget', icon: IndianRupee, match: 'prefix' },
    { name: 'Planning', href: '/planning', icon: Flag, match: 'prefix' },
    { name: 'Files', href: '/files', icon: FolderOpen, match: 'prefix' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, match: 'prefix' },
    { name: 'Discussions', href: '/discussions', icon: MessageSquare, match: 'prefix' },
];

export function ProjectSubNav({ projectId }: ProjectSubNavProps) {
    const pathname = usePathname();
    const basePath = `/projects/${projectId}`;

    const isItemActive = (item: typeof navItems[0]) => {
        const fullPath = item.href ? `${basePath}${item.href}` : basePath;

        if (item.match === 'exact') {
            return pathname === basePath;
        }
        return pathname.startsWith(fullPath);
    };

    return (
        <nav className="flex items-center gap-1 overflow-x-auto border-b border-border/40 mb-6 scrollbar-hide">
            {navItems.map((item) => {
                const fullPath = item.href ? `${basePath}${item.href}` : basePath;
                const isActive = isItemActive(item);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={fullPath}
                        className={cn(
                            "flex items-center gap-2 px-4 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
                            isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}
