'use client';

import { useState, useMemo } from 'react';
import {
    Folder as FolderIcon,
    File as FileIcon,
    Search,
    Upload,
    Grid3x3,
    List as ListIcon,
    MoreVertical,
    Star,
    Clock,
    FileText,
    Image as ImageIcon,
    Video,
    ChevronRight,
    ArrowLeft,
    Download,
    Share2,
    Trash2,
    Plus,
    Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    FileMetadata,
    Folder,
    FileCategory,
    Project,
    Event,
    User
} from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FileHubProps {
    files: FileMetadata[];
    folders: Folder[];
    projects: Project[];
    users: User[];
    initialProjectId?: string;
    initialEventId?: string;
}

export function FileHub({
    files,
    folders,
    projects,
    users,
    initialProjectId,
    initialEventId
}: FileHubProps) {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'starred' | 'projects' | 'events'>('all');

    // Filter projects/events based on active folders
    const currentFolder = folders.find(f => f.id === selectedFolderId);

    // Derived states
    const filteredFiles = useMemo(() => {
        let result = files;

        if (searchQuery) {
            result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (selectedFolderId) {
            result = result.filter(f => f.folderId === selectedFolderId);
        }

        if (activeTab === 'starred') {
            result = result.filter(f => f.isStarred);
        }

        return result;
    }, [files, searchQuery, selectedFolderId, activeTab]);

    const displayFolders = useMemo(() => {
        return folders.filter(f => f.parentId === (selectedFolderId || undefined));
    }, [folders, selectedFolderId]);

    const getFileIcon = (category: FileCategory) => {
        switch (category) {
            case FileCategory.DOCUMENT: return <FileText className="h-5 w-5" />;
            case FileCategory.IMAGE: return <ImageIcon className="h-5 w-5" />;
            case FileCategory.VIDEO: return <Video className="h-5 w-5" />;
            case FileCategory.SPREADSHEET: return <FileText className="h-5 w-5" />;
            default: return <FileIcon className="h-5 w-5" />;
        }
    };

    const getFileColor = (category: FileCategory) => {
        switch (category) {
            case FileCategory.DOCUMENT: return "text-zinc-600 bg-zinc-100";
            case FileCategory.IMAGE: return "text-zinc-600 bg-zinc-100";
            default: return "text-zinc-400 bg-zinc-50";
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const breadcrumbs = useMemo(() => {
        const path = [];
        let cur = currentFolder;
        while (cur) {
            path.unshift(cur);
            cur = folders.find(f => f.id === cur?.parentId);
        }
        return path;
    }, [currentFolder, folders]);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white border-t border-border/40">
            {/* Sidebar */}
            <div className="w-64 border-r border-border/40 bg-zinc-50/30 flex flex-col p-4 space-y-6">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start gap-2 h-9 text-[13px] font-medium", activeTab === 'all' && !selectedFolderId ? "bg-zinc-100 text-zinc-900" : "text-zinc-500")}
                        onClick={() => { setActiveTab('all'); setSelectedFolderId(null); }}
                    >
                        <FolderIcon className="h-4 w-4" /> All Files
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start gap-2 h-9 text-[13px] font-medium", activeTab === 'recent' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500")}
                        onClick={() => setActiveTab('recent')}
                    >
                        <Clock className="h-4 w-4" /> Recent
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start gap-2 h-9 text-[13px] font-medium", activeTab === 'starred' ? "bg-zinc-100 text-zinc-900" : "text-zinc-500")}
                        onClick={() => setActiveTab('starred')}
                    >
                        <Star className="h-4 w-4" /> Starred
                    </Button>
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-4">
                    <div className="px-2 flex items-center justify-between">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Project Folders</h4>
                        <Plus className="h-3 w-3 text-zinc-400 cursor-pointer hover:text-zinc-900" />
                    </div>
                    <div className="space-y-1">
                        {projects.map(project => (
                            <Button
                                key={project.id}
                                variant="ghost"
                                className="w-full justify-start gap-2 h-8 text-[12px] font-medium text-zinc-500 hover:text-zinc-900"
                                onClick={() => {
                                    const projectFolder = folders.find(f => f.projectId === project.id);
                                    if (projectFolder) setSelectedFolderId(projectFolder.id);
                                }}
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                <span className="truncate">{project.title}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="px-2 flex items-center justify-between">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Library</h4>
                        <Plus className="h-3 w-3 text-zinc-400 cursor-pointer hover:text-zinc-900" />
                    </div>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-2 h-8 text-[12px] font-medium text-zinc-500">
                            <FolderIcon className="h-4 w-4" /> Legal
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-8 text-[12px] font-medium text-zinc-500">
                            <FolderIcon className="h-4 w-4" /> Finance
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-8 text-[12px] font-medium text-zinc-500">
                            <FolderIcon className="h-4 w-4" /> Resources
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Toolbar */}
                <div className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-white shrink-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-zinc-900 rounded-lg"
                            disabled={!selectedFolderId}
                            onClick={() => {
                                if (currentFolder?.parentId) {
                                    setSelectedFolderId(currentFolder.parentId);
                                } else {
                                    setSelectedFolderId(null);
                                }
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center text-[13px] font-medium text-zinc-400">
                            <span
                                className="hover:text-zinc-900 cursor-pointer transition-colors"
                                onClick={() => setSelectedFolderId(null)}
                            >
                                All Files
                            </span>
                            {breadcrumbs.map((crumb, idx) => (
                                <div key={crumb.id} className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mx-0.5 opacity-50" />
                                    <span
                                        className={cn(
                                            "hover:text-zinc-900 cursor-pointer transition-colors",
                                            idx === breadcrumbs.length - 1 && "text-zinc-900"
                                        )}
                                        onClick={() => setSelectedFolderId(crumb.id)}
                                    >
                                        {crumb.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                            <Input
                                placeholder="Search files..."
                                className="h-9 w-64 pl-9 text-[12px] bg-zinc-50 border-border/40 focus:bg-white transition-all shadow-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center border border-border/40 rounded-lg p-0.5">
                            <Button
                                variant={view === 'grid' ? "secondary" : "ghost"}
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setView('grid')}
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={view === 'list' ? "secondary" : "ghost"}
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setView('list')}
                            >
                                <ListIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button className="h-9 gap-2 bg-zinc-900 hover:bg-zinc-800 text-[12px] px-4 font-semibold shadow-sm">
                            <Upload className="h-4 w-4" /> Upload
                        </Button>
                    </div>
                </div>

                {/* Browser Area */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    <div className="max-w-7xl mx-auto space-y-10">
                        {/* Folders Section */}
                        {displayFolders.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Folders</h3>
                                    <Button variant="link" className="text-[11px] text-zinc-400 hover:text-zinc-900 uppercase font-bold tracking-wider">View All</Button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {displayFolders.map((folder) => (
                                        <div
                                            key={folder.id}
                                            className="group flex flex-col p-4 rounded-xl border border-border/40 bg-zinc-50/20 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/40 hover:border-zinc-300 transition-all cursor-pointer"
                                            onClick={() => setSelectedFolderId(folder.id)}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform">
                                                    <FolderIcon className="h-5 w-5 fill-current" />
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <h4 className="text-[13px] font-semibold text-zinc-800 truncate leading-tight">{folder.name}</h4>
                                            <div className="flex items-center gap-1.5 mt-2">
                                                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                                                    {files.filter(f => f.folderId === folder.id).length} items
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Files Section */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">
                                    {selectedFolderId ? 'Library Content' : 'Recent Files'}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" className="h-7 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 border border-border/40 gap-1.5">
                                        <Filter className="h-3 w-3" /> Sort: Newest
                                    </Button>
                                </div>
                            </div>

                            {view === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {filteredFiles.map((file) => {
                                        const creator = users.find(u => u.id === file.uploadedBy);
                                        return (
                                            <div
                                                key={file.id}
                                                className="group flex flex-col p-4 rounded-xl border border-border/40 bg-white hover:shadow-xl hover:shadow-zinc-200/40 hover:border-zinc-300 transition-all cursor-pointer"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                                                        getFileColor(file.category)
                                                    )}>
                                                        {getFileIcon(file.category)}
                                                    </div>
                                                    <div className="flex flex-col gap-1 items-end">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:text-amber-500">
                                                            <Star className={cn("h-4 w-4", file.isStarred && "fill-amber-500 text-amber-500")} />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h4 className="text-[13px] font-semibold text-zinc-800 truncate leading-tight">{file.name}</h4>
                                                    <p className="text-[11px] text-zinc-400 font-medium">{formatFileSize(file.size)}</p>
                                                </div>

                                                <Separator className="my-4 bg-border/40" />

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <Avatar className="h-6 w-6 border border-zinc-200">
                                                            <AvatarImage src={creator?.avatar} />
                                                            <AvatarFallback className="text-[8px] font-bold">{creator?.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="text-[11px] text-zinc-500 font-medium truncate">{creator?.name}</span>
                                                    </div>
                                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                                                        {format(new Date(file.uploadedAt), 'MMM d')}
                                                    </span>
                                                </div>

                                                {/* Hover Quick Actions */}
                                                <div className="mt-4 grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="secondary" size="sm" className="h-8 text-[11px] gap-1.5 font-bold uppercase tracking-wider">
                                                        <Download className="h-3 w-3" /> Get
                                                    </Button>
                                                    <Button variant="secondary" size="sm" className="h-8 text-[11px] gap-1.5 font-bold uppercase tracking-wider">
                                                        <Share2 className="h-3 w-3" /> Link
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <Card className="border-border/40 shadow-none overflow-hidden h-fit">
                                    <div className="overflow-x-auto h-fit">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-zinc-50/50 border-b border-border/40 h-fit">
                                                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 h-fit">Name</th>
                                                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 h-fit">Size</th>
                                                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 h-fit">Uploaded By</th>
                                                    <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 h-fit">Date</th>
                                                    <th className="px-4 py-3 text-right h-fit"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/20 h-fit">
                                                {filteredFiles.map((file) => {
                                                    const creator = users.find(u => u.id === file.uploadedBy);
                                                    return (
                                                        <tr key={file.id} className="hover:bg-zinc-50/50 transition-colors group h-fit">
                                                            <td className="px-4 py-3 h-fit">
                                                                <div className="flex items-center gap-3 h-fit">
                                                                    <div className={cn("h-8 w-8 rounded flex items-center justify-center shrink-0", getFileColor(file.category))}>
                                                                        {getFileIcon(file.category)}
                                                                    </div>
                                                                    <span className="text-[13px] font-medium text-zinc-900 truncate max-w-[200px] h-fit">{file.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-[12px] text-zinc-500 h-fit">{formatFileSize(file.size)}</td>
                                                            <td className="px-4 py-3 h-fit">
                                                                <div className="flex items-center gap-2 h-fit">
                                                                    <Avatar className="h-6 w-6 border border-zinc-200">
                                                                        <AvatarImage src={creator?.avatar} />
                                                                        <AvatarFallback className="text-[8px] font-bold">{creator?.name[0]}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span className="text-[12px] text-zinc-500 font-medium h-fit">{creator?.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 text-[12px] text-zinc-500 h-fit">{format(new Date(file.uploadedAt), 'MMM d, yyyy')}</td>
                                                            <td className="px-4 py-3 text-right h-fit">
                                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity h-fit">
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400"><Download className="h-4 w-4" /></Button>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400"><Share2 className="h-4 w-4" /></Button>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400"><Trash2 className="h-4 w-4" /></Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
