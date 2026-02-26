// 'use client';
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return{title: 'About',}
}

export default function Page() {
    return (
        <div id="aboutPage">
            <h2>Who we are:</h2>
            <div id="whoWeAre">
                
                <p>We are a Jesus-centered, progressive, LGBTQIA+ affirming church. </p>
                <p>We foster connection to God through contemporary worship, insightful scripture teaching, easy-access liturgy, art, and prayer.</p>
                <p>We are ecumenical, interdenominational,  science friendly and open to the Spirit.</p>
                <p>We are social-justice oriented and seek to learn from and center marginalized voices.</p>
            </div>
            
            <h2>Our Board</h2>
            <div className="board">
                
                <div>
                    <img src="img/board/edited/Brianna.00000000.jpg" />
                    <p>Briana Mandel <span>(she/her)</span></p>
                </div>
                <div>
                    <img src="img/board/edited/Jorge.00000000.jpg" />
                    <p>Jorge Garza <span>(he/him)</span></p>
                </div>
                <div>
                    <img src="img/board/edited/Kimmy.00000000.jpg" />
                    <p>Kimmy Andrews <span>(she/her)</span></p>
                </div>
                <div>
                    <img src="img/board/edited/Monica.00000000.jpg" />
                    <p>Monica Hsu O'Connor <span>(she/her)</span></p>
                </div>
                <div>
                    <img src="img/board/Max.webp" />
                    <p>Max Diamond <span>(he/him)</span></p>
                </div>
                <div>
                    <img src="img/board/edited/Jason.00000000.jpg" />
                    <p>Jason Peterson <span>(he/him)</span></p>
                </div>
            </div>
        </div>
      );
    };