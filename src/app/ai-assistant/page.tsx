'use client';

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, TrendingUp, FileText } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const initialMessages: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant for Seva Foundation. I can help you with insights, reports, and analysis. What would you like to know?',
    },
];

export default function AIAssistantPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now().toString(), role: 'user', content: input }]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'I understand. Let me analyze that for you... [This is a demo response]',
                },
            ]);
        }, 1000);
    };

    return (
        <AppLayout>
            <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-12rem)]">
                {/* Chat Panel */}
                <Card className="lg:col-span-2 flex flex-col">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            AI Assistant
                        </CardTitle>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                <Sparkles className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>You</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Ask me anything about Seva Foundation..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <Button onClick={handleSend}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Generate Budget Insights
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            Project Summary Report
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Task Analysis
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            Team Performance Review
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
