'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/context/app-context';
import { formatDistanceToNow } from 'date-fns';

export function Header() {
    const { theme, setTheme } = useTheme();
    const { notifications, unreadCount, markNotificationAsRead, markAllAsRead } = useApp();

    return (
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6">
            {/* Left side - Search */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-8 w-56 rounded-md border border-border/60 bg-background/50 pl-8 pr-3 text-[13px] outline-none transition-colors focus:border-primary/40 focus:bg-background placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-1">
                {/* Dark Mode Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-8 w-8">
                            <Bell className="h-[18px] w-[18px]" />
                            {unreadCount > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full p-0 text-[10px] font-medium flex items-center justify-center"
                                >
                                    {unreadCount}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <div className="flex items-center justify-between px-3 py-2">
                            <DropdownMenuLabel className="p-0 text-[13px]">Notifications</DropdownMenuLabel>
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-[11px] text-muted-foreground hover:text-foreground"
                                    onClick={markAllAsRead}
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>
                        <DropdownMenuSeparator />
                        <ScrollArea className="h-[400px]">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center text-[13px] text-muted-foreground">
                                    No notifications
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className="flex cursor-pointer flex-col items-start gap-1 px-3 py-2.5"
                                        onClick={() => markNotificationAsRead(notification.id)}
                                    >
                                        <div className="flex w-full items-start justify-between gap-2">
                                            <p className="text-[13px] font-medium">{notification.title}</p>
                                            {!notification.isRead && (
                                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <p className="text-[12px] text-muted-foreground">{notification.message}</p>
                                        <p className="text-[11px] text-muted-foreground">
                                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                                        </p>
                                    </DropdownMenuItem>
                                ))
                            )}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
