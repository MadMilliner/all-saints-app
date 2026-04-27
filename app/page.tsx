// 'use client';
import type { Metadata } from "next";
import { layoutTester } from "./LayoutTester";
import InstagramFeed from "./utils/instagramEmbed";
import Slideshow from "./ui/slideshow";

export const generateMetadata = (): Metadata => {
  return{title: 'Home | All Saints LA',}
}

export default async function Page(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
    const searchParams = (await props.searchParams) ?? {};
    await layoutTester(searchParams);
    
    return (
        <div id="page" className="w-full flex justify-center items-center flex-col gap-12 pb-12 pt-20">
            <div className="w-fit max-w-3xl mx-auto p-8 bg-[var(--var-med)] text-white text-2xl leading-[3rem] flex-col align-bottom z-[1]" id="everyoneAlways">
                <p className="w-fit">everyone.</p>
                <p className="w-fit">always.</p>
                <p className="w-fit">no exceptions.</p>
            </div>
            <Slideshow />
            <div className="w-[90%] max-w-[600px] mx-auto text-center font-semibold flex flex-col gap-4">
                <p className="text-xl font-medium">Welcome to All Saints LA!</p>
                <p>Join us for worship on the last Sunday of every month at 5 PM</p>          
                <p>📍<a href="https://maps.app.goo.gl/3or67nQhhoRZRdkn9" target="_blank" className="text-inherit no-underline">1343 Ocean Park Blvd, Santa Monica, CA 90405</a></p>
                <p>In the <a href="https://www.mtolivelutheranchurch.org/" target="_blank" className="text-inherit no-underline">Mount Olive Lutheran</a> Parish Hall</p>
            </div>
            <div className="w-[90%] max-w-[800px] mx-auto flex flex-col gap-4">
                <p><span className="font-semibold">Our Vision:</span> We are a Jesus-centered, queer affirming, inclusive community reclaiming the truth that all are seen, known and loved.</p>
                <p>
                    <span className="font-semibold">Why we&apos;re here:</span> We follow the way of Jesus through creative worship and a commitment to justice for people and the planet. 
                    In worship, we discover God&apos;s unrelenting love and work to build beloved community. 
                    We believe the Bible points us toward liberation and good news, even though it has too often been misused to oppress. 
                    Because scripture is always interpreted by humans, we seek to read it through the life of Jesus and the lens of those who are marginalized and oppressed.
                </p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <p>Stay connected throughout the week:</p>
                <div id="IGfeed" className="h-[fit-content]">
                  {/* <h3>IG Feed coming soon</h3> */}
                  <InstagramFeed/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row bg-black text-white p-8 gap-8 w-[90%] max-w-4xl mx-auto">
                <div className="w-full md:w-2/5 text-lg font-medium self-center flex flex-col gap-2">
                    <p>“I came that they may have life, and have it abundantly”</p>
                    <p>- John 10:10</p>
                </div>
                <div className="w-full md:w-3/5 text-sm font-light self-center">
                    We believe Jesus is good news for all people. We recognize the need to remain connected to the church globally and recall our stories as a faith tradition throughout history.
                    We learn from all the saints who have gone before us and the saints alive today who show us how to love as Jesus loved.
                </div>
            </div>
        </div>
        );
    };