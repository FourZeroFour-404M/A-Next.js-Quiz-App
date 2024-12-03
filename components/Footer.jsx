import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className='footer'>
                <Image src="/assets/images/Logo_Dark.png" alt="BSG Logo" width={170} height={170} />
                <div className='footer-demarcation'></div>
                <div>
                    <p>ABOUT</p>
                    <p>SERVICES</p>
                    <p>TECHNOLOGY</p>
                    <p>HOW TO</p>
                    <p>HYDRA</p>
                </div>
                <div className='footer-demarcation'></div>
                <div>
                    <p>F.A.Q</p>
                    <p>SITEMAP</p>
                    <p>CONDITIONS</p>
                    <p>LICENSES</p>
                </div>
                <div className='footer-demarcation'></div>
                <div className='socials' style={{ display: 'flex' }}>
                    <p>CONNECT WITH THE BSG</p>
                    <div style={{ display: 'flex' }}>
                        <FaFacebookF className='social-icon' />
                        <FaTwitter className='social-icon' />
                        <FaLinkedin className='social-icon' />
                        <FaYoutube className='social-icon' />
                        <FaInstagram className='social-icon' />
                        <FaPinterest className='social-icon' />
                        {/* <img className='social-icon' src={facebook} alt="" /> */}
                    </div>
                    <button>JOIN US AT THE BSG</button>
                </div>
            </div>
            <div className='last-footer-border'></div>
            <p className='last-footer-p'>2024 &copy; BSG - BY MUHAMMED OPAREMI (404) - ALL RIGHTS RESERVED</p>
            <p className='last-footer-p-small'>2024 &copy; BSG <br />BY MUHAMMED OPAREMI (404) <br /> ALL RIGHTS RESERVED</p>
        </footer>
    )
}

export default Footer;