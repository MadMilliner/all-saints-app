
import type { Metadata } from "next";
import Jobs from "./jobs";

export const generateMetadata = (): Metadata => {
  return{title: 'Jobs',}
}

export default function Page() {
    return (
        <div id="jobsPage">
            <Jobs />
        </div>
);
    };