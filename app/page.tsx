'use client';

export default function Page() {
    return (
        <div id="page">
        <div className="title">
                <p>everyone.</p>
                <p>always.</p>
                <p>no exceptions.</p>
            </div>
            <div className="welcome">
                <p className="h2">Welcome to All Saints LA!</p>
                <p>Join us for worship on the last Sunday of every month at 5 PM</p>          
                <p>📍<a href="https://maps.app.goo.gl/3or67nQhhoRZRdkn9" target="_blank">1343 Ocean Park Blvd, Santa Monica, CA 90405</a></p>
                <p>In the <a href="https://www.mtolivelutheranchurch.org/" target="_blank">Mount Olive Lutheran</a> Parish Hall</p>
            </div>
            <div className="description">
                <p><span className="bold">Our Vision:</span> We are a Jesus-centered, queer affirming, inclusive community reclaiming the truth that all are seen, known and loved.</p>
                <p>
                    <span className="bold">Why we&apos;re here:</span> We follow the way of Jesus through creative worship and a commitment to justice for people and the planet. 
                    In worship, we discover God&apos;s unrelenting love and work to build beloved community. 
                    We believe the Bible points us toward liberation and good news, even though it has too often been misused to oppress. 
                    Because scripture is always interpreted by humans, we seek to read it through the life of Jesus and the lens of those who are marginalized and oppressed.
                </p>
            </div>
            <div className="events">
                <p>Stay connected throughout the week:</p>
                <div className="IGfeed">
                  <h3>IG Feed coming soon</h3>
                </div>
            </div>
            <div className="jesus">
                <div className="jesus-left">
                    <p>“I came that they may have life, and have it abundantly”</p>
                    <p>- John 10:10</p>
                </div>
                <div className="jesus-right">
                    We believe Jesus is good news for all people. We recognize the need to remain connected to the church globally and recall our stories as a faith tradition throughout history.
                    We learn from all the saints who have gone before us and the saints alive today who show us how to love as Jesus loved.
                </div>
            </div>
            </div>
        );
    };