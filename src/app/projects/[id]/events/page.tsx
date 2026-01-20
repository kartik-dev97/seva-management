import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/mock-data';
import { ProjectEventsPageContent } from '@/components/project/project-events-page';

export default async function ProjectEventsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectEventsPageContent projectId={id} projectTitle={project.title} />;
}
