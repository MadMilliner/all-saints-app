'use client';

import ASHorizontalLogo from '../../public/img/AllSaintsLogo_Pride_KO_Horizontal-01.webp'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () =>
{
    const pathname = usePathname();
    return (
        <>
            
            <nav id="navbar">
                <a href="/" id="headerLogoA">
                    <Image
                        src={ASHorizontalLogo}
                        width={2500}
                        height={817}
                        alt="Home - All Saints Church LA Logo"
                        id='#headerLogoA'
                    />
                </a>
                <a href="about" className={pathname === '/about' ? 'active' : ''}>About</a>
                <a href="webelieve" className={pathname === '/webelieve' ? 'active' : ''}>We Believe</a>
                <a href="events" className={pathname === '/events' ? 'active' : ''}>Events</a>
                <a href="give" className={pathname === '/give' ? 'active' : ''}>Give</a>
                <a href="contact" className={pathname === '/contact' ? 'active' : ''}>Contact</a>
                <a href="jobs" className={pathname === '/jobs' ? 'active' : ''}>Jobs</a>
            </nav>
            <style jsx>{`
                .active {
                    text-decoration: underline; // or any other styling you prefer
                }
            `}</style>
        </>
    );
};

export const Footer: React.FC = () =>
{
    return (
        <div id='footer'>
            <div className="signup">
                <p>Sign up with your email address to receive our monthly newsletter.</p>
                <p><input id="newsletterEmail" type="email" autoComplete="email" placeholder="E-mail address" />
                    {/* <button type="submit">Sign-Up</button> */}
                </p>
            </div>
            <div>All Saints Los Angeles</div>
            <div>
                <a href="https://www.instagram.com/allsaintschurchla/" target="_blank">
                    <img src="img/instagram logo_icon.png" alt="" />
                </a>
            </div>
            <div>
                <a href="https://chat.whatsapp.com/KKgRO6k60Us7ofspO42nbq" target="_blank">
                    <img src="img/whatsapp logo_icon.png" alt="" />
                </a>
            </div>
            <div>
                <a href="https://open.spotify.com/show/73BmDDi6yqUY6CptdBgDLD?si=38b2ba9631ef49b4" target="_blank">
                    <img src="img/icons8-spotify-50.png" alt="" />
                </a>
            </div>
            <div>
                <a href="mailto:admin@allsaintsla.church">admin@allsaintsla.church</a>
            </div>
        </div>
    );
};

