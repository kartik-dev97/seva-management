'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';

interface AppLayoutProps {
    children: React.ReactNode;
    hideSidebarPadding?: boolean;
}

export default function AppLayout({ children, hideSidebarPadding }: AppLayoutProps) {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                router.push('/showcase');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className={cn("flex-1 overflow-auto", !hideSidebarPadding && "p-6")}>
                    {children}
                </main>
            </div>
        </div>
    );
}
