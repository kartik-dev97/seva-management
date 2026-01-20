import { ShowcaseNav } from '@/components/showcase/showcase-nav';

export const metadata = {
    title: 'Showcase | Seva',
    description: 'Futuristic showcase of our digital entities and design protocols.',
};

export default function ShowcasePage() {
    return (
        <main className="min-h-screen bg-black">
            <ShowcaseNav />
        </main>
    );
}
