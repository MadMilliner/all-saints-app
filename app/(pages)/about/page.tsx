// 'use client';
import type { Metadata } from "next";
import boardmembersData from '../../../data/board.json'
import Image from "next/image";

export const generateMetadata = (): Metadata => {
  return{title: 'About',}
}

const boardmembers = boardmembersData.filter((bm: any) => bm.status === 'active')

export default async function Page() {
    return (
        <div className="flex flex-col w-full px-4 md:px-8 py-8">
            <h2 className="text-2xl font-medium text-left ml-[10%] text-[var(--var-rnbw1)] mb-4">Who we are:</h2>
            <div className="w-[90%] max-w-[800px] mx-auto mb-6 text-sm leading-6">
                
                <p className="mb-2">We are a Jesus-centered, progressive, LGBTQIA+ affirming church. </p>
                <p className="mb-2">We foster connection to God through contemporary worship, insightful scripture teaching, easy-access liturgy, art, and prayer.</p>
                <p className="mb-2">We are ecumenical, interdenominational,  science friendly and open to the Spirit.</p>
                <p className="mb-2">We are social-justice oriented and seek to learn from and center marginalized voices.</p>
            </div>
            
            <h2 className="text-2xl font-medium text-left ml-[10%] text-[var(--var-rnbw1)] mt-8 mb-4">Our Board</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-8 bg-gray-300 w-[90%] max-w-6xl mx-auto my-8 text-center text-sm">
                {boardmembers.length > 0 && (
                    boardmembers.map((bm: any) => (
                        <div key={bm.id} className="flex flex-col items-center">
                            <Image
                                width={1080}
                                height={826}
                                src={bm.image}
                                alt={bm.name}
                                className="object-cover block w-full max-w-[150px] md:max-w-full h-auto"
                            />
                            <p className="mt-2">{bm.name} <span className="text-xs text-gray-700">({bm.pronouns})</span></p>
                        </div>
                    ))
                )}
                {/* // <div>
                //     <img src="img/board/edited/Brianna.00000000.jpg" />
                //     <p>Briana Mandel <span>(she/her)</span></p>
                // </div>
                // <div>
                //     <img src="img/board/edited/Jorge.00000000.jpg" />
                //     <p>Jorge Garza <span>(he/him)</span></p>
                // </div>
                // <div>
                //     <img src="img/board/edited/Kimmy.00000000.jpg" />
                //     <p>Kimmy Andrews <span>(she/her)</span></p>
                // </div>
                // <div>
                //     <img src="img/board/edited/Monica.00000000.jpg" />
                //     <p>Monica Hsu O'Connor <span>(she/her)</span></p>
                // </div>
                // <div>
                //     <img src="img/board/Max.webp" />
                //     <p>Max Diamond <span>(he/him)</span></p>
                // </div>
                // <div>
                //     <img src="img/board/edited/Jason.00000000.jpg" />
                //     <p>Jason Peterson <span>(he/him)</span></p>
                // </div> */}
            </div>
        </div>
      );
    };