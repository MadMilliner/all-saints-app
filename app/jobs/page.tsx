// 'use client';
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return{title: 'Jobs',}
}

export default function Page() {
    return (
        <div id="jobsPage">
            <div id="leadPastor">
                <h2>Now Hiring: All Saints LA Lead Pastor</h2>

                {/* <p><span className="bold">Start Date:</span> September 1, 2025 (desired)</p> */}
                <p><span className="bold">Compensation:</span> $1,500/month for 8&#45;20 hours/week (average of 14 hours/week). Scales with church growth and giving.</p>
                <p><span className="bold">Status:</span> Part&#45;time, minimum one&#45;year commitment (6&#45;month probationary period)</p>
                <p><span className="bold">Location:</span> Santa Monica, CA</p>

                <h2>About Us</h2>
                <p>
                    All Saints LA is a Jesus&#45;centered, queer&#45;affirming, and radically inclusive church committed to creative worship, deep community, 
                    and the pursuit of social and environmental justice. Founded in 2023, we are a small but committed community of 15&#45;25 members. 
                    We gather regularly to explore faith through the lens of love, liberation, and solidarity with the marginalized.
                </p>

                <h3>Position Overview:</h3>
                <p>
                    The Lead Pastor will guide the spiritual life of the congregation, plan and lead worship services, provide pastoral care, support 
                    community and justice initiatives, and work with the church board to grow the church both spiritually and sustainably.
                </p>
                <p>
                    This is a clergy position with a minimum one&#45;year commitment and includes a 6&#45;month probationary period.
                </p>

                <h2>Key Responsibilities:</h2>

                <h3>Worship Leadership</h3>
                <ul>
                    <li>Collaborate with the Sunday Coordinator and Worship Director from Well Collective to plan and lead 2&#45;3 monthly services.</li>
                    <li>Preach 1&#45;2 sermons per month, emphasizing justice, inclusion, and the teachings of Jesus.</li>
                    <li>Lead or support special services (e.g., memorials, holiday services).</li>
                    <li>Follow the lectionary and guide thematic worship planning.</li>
                </ul>

                <h3>Pastoral Care</h3>
                <ul>
                    <li>Offer ongoing spiritual care, including 3&#45;4 pastoral meetings per week.</li>
                    <li>Organize an initial community &#34;family meeting&#34; to support transition.</li>
                    <li>Support congregants through life events and provide spiritual guidance as needed.</li>
                </ul>

                <h3>Community Building &amp; Engagement</h3>
                <ul>
                    <li>Support and mentor lay leaders and small group/community life facilitators.</li>
                    <li>Collaborate on outreach efforts and maintain partnerships with groups like LA Voice, Santa Monica and Venice Pride, S.P.Y., and others.</li>
                    <li>Attend local interfaith events (e.g., Santa Monica Interfaith Council meetings).</li>
                </ul>

                <h3>Fundraising &amp; Growth</h3>
                <ul>
                    <li>Partner with the board to increase giving through donor engagement, internal campaigns, and identify, write and submit grant applications.</li>
                    <li>Explore sustainable options for long&#45;term viability (e.g., mergers, partnerships).</li>
                    <li>Support communication and social media strategy with the board marketing lead.</li>
                </ul>

                <h3>Administration &amp; Collaboration</h3>
                <ul>
                    <li>Supervise Sunday Coordinator and service volunteers.</li>
                    <li>Participate in monthly board meetings and regular check&#45;ins with the board warden.</li>
                    <li>Provide input for the weekly newsletter and ensure worship materials (slides, guides) are accurate and current.</li>
                </ul>

                <h2>Qualifications</h2>
                <ul>
                    <li>Ordained or recognized as a pastoral leader by a Christian denomination (a theology degree is a plus but not required).</li>
                    <li>Experience in preaching, pastoral care, and community leadership.</li>
                    <li>Strong communication skills and emotional intelligence.</li>
                    <li>Commitment to inclusive, justice&#45;centered ministry.</li>
                </ul>

                <h2>To Apply</h2>
                <p>Please send:</p>
                <ul>
                    <li>Your resume to <a href="mailto:admin@allsaintsla.church">admin@allsaintsla.church</a> with subject line &#34;First Name &#45; All Saints LA Lead Pastor application&#34;</li>
                    <li>A cover letter describing your pastoral calling and interest in All Saints LA</li>
                    <li>1&#45;2 letters of recommendation from congregants, pastoral colleagues, or spiritual mentors</li>
                    <li>Applications will be accepted through August 15, 2025 or until a candidate is hired</li>
                </ul>
            </div>
        </div>
);
    };