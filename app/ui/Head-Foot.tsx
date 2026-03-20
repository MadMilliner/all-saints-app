'use client';

import ASHorizontalLogo from '../../public/img/AllSaintsLogo_Pride_KO_Horizontal-01.webp'
import IGlogo from '../../public/img/instagram logo_icon.png'
import WAlogo from '../../public/img/whatsapp logo_icon.png'
import SPlogo from '../../public/img/icons8-spotify-50.png'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import jobsData from '../../data/jobs.json'
import MailchimpSignupForm from './MailchimpSignUp';

const jobs = jobsData.jobs;

export const Navbar: React.FC = () =>
{
    const pathname = usePathname();
    const [navIsOpen, setNavIsOpen] = useState(false);
    return (
        <div id='header' className='sticky top-0 navbg flex flex-wrap items-center justify-between w-full px-4'>
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                    <Image
                        src={ASHorizontalLogo}
                        width={2500}
                        height={817}
                        alt="Home - All Saints Church LA Logo"
                        id='headerLogoH'
                        className='md:shrink-0 p-2'
                    />
                </Link>

                <button
                    onClick={() => setNavIsOpen(!navIsOpen)}
                    id='navButtonPortrait'
                    className="flex items-center justify-center text-var(--var-light) focus:outline-none md:hidden w-10 h-10">
                    {navIsOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>
            </div>
            <nav id="navbar" className={`${navIsOpen ? 'flex' : 'hidden'} w-full flex-col p-1 space-y-2 md:flex md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-4 md:mb-20 ml-auto`}>
                <Link href="about" className={`${pathname === '/about' ? 'underline decoration-[var(--var-rnbw1)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>About</Link>
                <Link href="webelieve" className={`${pathname === '/webelieve' ? 'underline decoration-[var(--var-rnbw2)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>We Believe</Link>
                <Link href="events" className={`${pathname === '/events' ? 'underline decoration-[var(--var-rnbw3)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>Events</Link>
                <Link href="give" className={`${pathname === '/give' ? 'underline decoration-[var(--var-rnbw4)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>Give</Link>
                <Link href="contact" className={`${pathname === '/contact' ? 'underline decoration-[var(--var-rnbw5)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>Contact</Link>
                {jobs.length > 0 && (<Link href="jobs" className={`${pathname === '/jobs' ? 'underline decoration-[var(--var-rnbw6)] decoration-2 underline-offset-4' : ''}`} onClick={() => setNavIsOpen(false)}>Jobs</Link>)}
            </nav>
        </div>
    );
};

export const Footer: React.FC = () =>
{
    return (
        <>
            <div id="signup" className='bg-black text-white p-2 pr-5 pl-5'>
                <MailchimpSignupForm />
                
                {/* <p>Sign up with your email address to receive our monthly newsletter.</p>
                <p><input id="newsletterEmail" type="email" autoComplete="email" placeholder="E-mail address" />
                    <button type="submit">Sign-Up</button>
                </p> */}
            </div>
            <div id='footer' className='w-full'>

                <span>All Saints Los Angeles</span>
                <div>
                    <a href="https://www.instagram.com/allsaintschurchla/" target="_blank">
                        <Image
                            src={IGlogo}
                            width={512}
                            height={512}
                            alt='Instagram'
                        />
                    </a>
                </div>
                <div>
                    <a href="https://chat.whatsapp.com/KKgRO6k60Us7ofspO42nbq" target="_blank">
                        <Image
                            src={WAlogo}
                            width={512}
                            height={512}
                            alt='Whatsapp'
                        />
                    </a>
                </div>
                <div>
                    <a href="https://open.spotify.com/show/73BmDDi6yqUY6CptdBgDLD?si=38b2ba9631ef49b4" target="_blank">
                        <Image
                            src={SPlogo}
                            width={50}
                            height={50}
                            alt='Spotify'
                        />
                    </a>
                </div>
                <div>
                    <a href="mailto:admin@allsaintsla.church">admin@allsaintsla.church</a>
                </div>
            </div>
        </>
    );
};

