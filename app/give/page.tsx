// 'use client';
import type { Metadata } from "next";
import { GiveOnlineClick, GiveStocksClick, GiveTextClick } from "./giveButtons";

export const generateMetadata = (): Metadata => {
  return{title: 'Give',}
}

export default function Page() {
    
    
    
    return (
        <div id="givePage">
            <div id="giving">
                <div id="whyGive">
                    <h2>Why we Give</h2>
                    <p>We do not take what we have for granted. 
                        And we deeply appreciate you as a supporter of All Saints LA, in whatever way that takes form.</p>
                    <p>In giving, you make it possible for us to cultivate a safe, healing and diverse community 
                        that leans into the goodness of God&#39;s love and inclusivity of the most marginalized. </p>
                    <p>Your giving supports every part of our church family, and it enables us to plan for the future. 
                        Thank you so much for joining us in the work of building up this community. We do not take any of it for granted. </p>
                    <p>We are fully funded by those who participate at All Saints Los Angeles. 
                        Since our congregation is younger in age than many, a much smaller part of our budget (compared to other churches) is sustained by larger givers. 
                        Lots of people giving as they are able is what keeps us going.</p>
                </div>
                <div id="howGive">
                    <div>
                        <h3>Give Online</h3>
                        <p>Give online via Church Center! Put in your information and follow the prompts. 
                            You can set up a recurring gift here.</p>
                        <GiveOnlineClick></GiveOnlineClick>
                    </div>
                    <div>
                        <h3>Text to Give</h3>
                        <p><span className="bold">Text a dollar amount to 84321</span> and follow the link in the message to give on your phone!</p>
                        <GiveTextClick></GiveTextClick>
                    </div>
                    <div>
                        <h3>Donate Stocks</h3>
                        <p>You are now able to donate stocks to All Saints LA! Follow the link below for to get started with your stock donation!.</p>
                        <GiveStocksClick></GiveStocksClick>
                    </div>
                    <div>
                        <h3>Mail</h3>
                        <p>You can mail gifts to All Saints Los Angeles via our address:</p>
                        <p className="bold">All Saints Los Angeles
                            1343 Ocean Park Blvd. 
                            Santa Monica, CA 90405</p>
                    </div>
                    <div>
                        <h3>Give in Service</h3>
                        <p>Every Sunday we meet, we have an offering box next to the stage where you can deposit checks and cash. We also pass a basket during our generosity liturgy.</p>
                    </div>
                </div>
            </div>
        </div>
);
    };