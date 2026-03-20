import Image from "next/image"
import ASHorizontalLogo from '../public/img/AllSaintsLogo_Pride_KO_Horizontal-01.webp'

const Loading = () => {
return (
    <>
        <Image
            src={ASHorizontalLogo}
            width={2500}
            height={817}
            alt="Home - All Saints Church LA Logo"
            id='headerLogoH'
            className='md:shrink-0 p-2'
        />
        <h2>We will be with you shortly</h2>
    </>)}

export default Loading