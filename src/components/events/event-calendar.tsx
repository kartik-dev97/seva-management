'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/types';

interface EventCalendarProps {
    events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const getEventsForDay = (day: Date) => {
        return events.filter((event) => isSameDay(new Date(event.startDate), day));
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentDate(new Date())}
                        >
                            Today
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                    {/* Header */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div
                            key={day}
                            className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground"
                        >
                            {day}
                        </div>
                    ))}

                    {/* Calendar Days */}
                    {calendarDays.map((day, dayIdx) => {
                        const dayEvents = getEventsForDay(day);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div
                                key={day.toString()}
                                className={cn(
                                    'min-h-[100px] bg-background p-2 transition-colors hover:bg-accent/50',
                                    !isCurrentMonth && 'bg-muted/50 text-muted-foreground'
                                )}
                            >
                                <div
                                    className={cn(
                                        'mb-1 text-sm font-medium',
                                        isToday && 'flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground'
                                    )}
                                >
                                    {format(day, 'd')}
                                </div>
                                <div className="space-y-1">
                                    {dayEvents.slice(0, 2).map((event) => (
                                        <div
                                            key={event.id}
                                            className="rounded px-1.5 py-0.5 text-xs font-medium truncate"
                                            style={{ backgroundColor: event.color + '20', color: event.color }}
                                        >
                                            {format(new Date(event.startDate), 'HH:mm')} {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                        <div className="text-xs text-muted-foreground px-1.5">
                                            +{dayEvents.length - 2} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
