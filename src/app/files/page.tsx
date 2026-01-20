import AppLayout from '@/components/layout/app-layout';
import { FileHub } from '@/components/files/file-hub';
import { files, folders, projects, users } from '@/lib/mock-data';

export default function FilesPage() {
    return (
        <AppLayout hideSidebarPadding>
            <FileHub
                files={files}
                folders={folders}
                projects={projects}
                users={users}
            />
        </AppLayout>
    );
}
