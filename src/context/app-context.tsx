'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Notification } from '@/lib/types';
import { users, notifications as initialNotifications } from '@/lib/mock-data';

interface AppContextType {
    currentUser: User;
    notifications: Notification[];
    unreadCount: number;
    markNotificationAsRead: (id: string) => void;
    markAllAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    // Set admin user as current user for demo
    const [currentUser] = useState<User>(users[0]);
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markNotificationAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
        );
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
    };

    return (
        <AppContext.Provider
            value={{
                currentUser,
                notifications,
                unreadCount,
                markNotificationAsRead,
                markAllAsRead,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
