import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { ProjectTasksPageContent } from '@/components/project/project-tasks-page';

export default async function ProjectTasksPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectTasksPageContent projectId={id} projectTitle={project.title} />;
}
