// 'use client';
import type { Metadata } from "next";
import { layoutTester } from "./LayoutTester";
import InstagramFeed from "./utils/instagramEmbed";

export const generateMetadata = (): Metadata => {
  return{title: 'Home | All Saints LA',}
}

export default async function Page(props: {
  searchParams: Record<string, string>;
}) {
    await layoutTester(props.searchParams);
    
    return (
        <div id="page" className="w-full flex justify-center items-center flex-col">
            <div className="w-full max-w-3xl mx-auto p-8 mb-12 bg-[var(--var-med)] text-white text-2xl leading-[3rem]">
                <p>everyone.</p>
                <p>always.</p>
                <p>no exceptions.</p>
            </div>
            <div className="w-[90%] max-w-[600px] mx-auto text-center font-semibold pb-12">
                <p className="text-xl font-medium mb-4">Welcome to All Saints LA!</p>
                <p className="mb-4">Join us for worship on the last Sunday of every month at 5 PM</p>          
                <p className="mb-4">📍<a href="https://maps.app.goo.gl/3or67nQhhoRZRdkn9" target="_blank" className="text-inherit no-underline">1343 Ocean Park Blvd, Santa Monica, CA 90405</a></p>
                <p className="mb-4">In the <a href="https://www.mtolivelutheranchurch.org/" target="_blank" className="text-inherit no-underline">Mount Olive Lutheran</a> Parish Hall</p>
            </div>
            <div className="w-[90%] max-w-[800px] mx-auto mb-6">
                <p className="mb-4"><span className="font-semibold">Our Vision:</span> We are a Jesus-centered, queer affirming, inclusive community reclaiming the truth that all are seen, known and loved.</p>
                <p>
                    <span className="font-semibold">Why we&apos;re here:</span> We follow the way of Jesus through creative worship and a commitment to justice for people and the planet. 
                    In worship, we discover God&apos;s unrelenting love and work to build beloved community. 
                    We believe the Bible points us toward liberation and good news, even though it has too often been misused to oppress. 
                    Because scripture is always interpreted by humans, we seek to read it through the life of Jesus and the lens of those who are marginalized and oppressed.
                </p>
            </div>
            <div className="flex flex-col items-center">
                <p>Stay connected throughout the week:</p>
                <div id="IGfeed" className="h-[20vh] mt-4">
                  {/* <h3>IG Feed coming soon</h3> */}
                  <InstagramFeed/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row bg-black text-white p-8 mb-6 mt-8 gap-8 w-[90%] max-w-4xl mx-auto">
                <div className="w-full md:w-2/5 text-lg font-medium self-center">
                    <p>“I came that they may have life, and have it abundantly”</p>
                    <p className="mt-2">- John 10:10</p>
                </div>
                <div className="w-full md:w-3/5 text-sm font-light self-center">
                    We believe Jesus is good news for all people. We recognize the need to remain connected to the church globally and recall our stories as a faith tradition throughout history.
                    We learn from all the saints who have gone before us and the saints alive today who show us how to love as Jesus loved.
                </div>
            </div>
        </div>
        );
    };