import AppLayout from '@/components/layout/app-layout';
import { FileHub } from '@/components/files/file-hub';
import { files, folders, projects, users, getProjectById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function DocumentLibraryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <AppLayout hideSidebarPadding>
            <FileHub
                files={files}
                folders={folders}
                projects={projects}
                users={users}
                initialProjectId={id}
            />
        </AppLayout>
    );
}
