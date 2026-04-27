import type { Metadata } from "next";
import { loadPublicContentJson } from '@/lib/load-public-content';
import Jobs, { type Job } from "./jobs";

export const dynamic = 'force-dynamic';

export const generateMetadata = (): Metadata => {
  return{title: 'Jobs',}
}

export default async function Page() {
    const raw = await loadPublicContentJson('jobs');
    const parsed = JSON.parse(raw) as { jobs?: Job[] };
    const jobs = Array.isArray(parsed.jobs) ? parsed.jobs : [];

    return (
        <div id="jobsPage">
            <Jobs jobs={jobs} />
        </div>
);
    };