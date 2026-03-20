'use client';

import type { FC } from 'react';
import jobsData from '@/data/jobs.json';

interface Job {
  id: string;
  title: string;
  startDate: string;
  compensation: string;
  status: string;
  location: string;
  aboutUs: string;
  positionOverview: string[];
  responsibilities: Record<string, string[]>;
  qualifications: string[];
  applicationInstructions: string[];
  applicationEmail: string;
}

interface JobsPageProps {
  jobId?: string; // Optional: render single job or all jobs
}

const Jobs: FC<JobsPageProps> = ({ jobId }) => {
  const jobs = jobsData.jobs as Job[];
  const displayJobs = jobId ? jobs.filter((job) => job.id === jobId) : jobs;

  if (displayJobs.length === 0) {
    return (
      <div id="jobsPage" className="p-6">
        <p className="text-gray-500">No jobs found.</p>
      </div>
    );
  }

  return (
    <div id="jobsPage" className="space-y-12 p-6">
      {displayJobs.map((job) => (
        <div key={job.id} id={job.id} className="space-y-6">
          {/* Title & Quick Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4 overflow-hidden h-full">{job.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p>
                <span className="bold font-semibold">Start Date:</span> {job.startDate}
              </p>
              <p>
                <span className="bold font-semibold">Compensation:</span> {job.compensation}
              </p>
              <p>
                <span className="bold font-semibold">Status:</span> {job.status}
              </p>
              <p>
                <span className="bold font-semibold">Location:</span> {job.location}
              </p>
            </div>
          </div>

          {/* About Us */}
          <section>
            <h2 className="text-2xl font-bold mb-3 overflow-hidden">About Us</h2>
            <p>{job.aboutUs}</p>
          </section>

          {/* Position Overview */}
          <section>
            <h3 className="text-xl font-bold mb-3 overflow-hidden">Position Overview</h3>
            <div className="space-y-2">
              {job.positionOverview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Key Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 overflow-hidden">Key Responsibilities</h2>
            <div className="space-y-6">
              {Object.entries(job.responsibilities).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold mb-2">{category}</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-2xl font-bold mb-3 overflow-hidden">Qualifications</h2>
            <ul className="list-disc list-inside space-y-1 ml-4">
              {job.qualifications.map((qual, idx) => (
                <li key={idx}>{qual}</li>
              ))}
            </ul>
          </section>

          {/* To Apply */}
          <section>
            <h2 className="text-2xl font-bold mb-3 overflow-hidden">To Apply</h2>
            <p className="mb-3">Please send:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {job.applicationInstructions.map((instruction, idx) => (
                <li key={idx}>
                  {instruction.includes('admin@allsaintsla.church') ? (
                    <>
                      {instruction.split('admin@allsaintsla.church')[0]}
                      <a
                        href={`mailto:${job.applicationEmail}`}
                        className="text-blue-600 hover:underline"
                      >
                        {job.applicationEmail}
                      </a>
                      {instruction.split('admin@allsaintsla.church')[1]}
                    </>
                  ) : (
                    instruction
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
