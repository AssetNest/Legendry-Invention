import { FaDiscord, FaTwitter, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { Reveal, RevealWrapper } from './Reveal';
import imageBkg from '@/assets/yellowbg.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigator = useNavigate();

  return  (
    <RevealWrapper>
    <footer className="bg-cover text-background relative overflow-hidden">
        <img src={imageBkg} alt="fund" className="absolute object-cover w-full"/>
        <div className='py-12'>
        <Reveal>
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
            {}
            <h5 className="text-xl font-semibold mb-4 mt-4">AssetNest</h5>
            <p className="text-background">
            We are the first decentralized platform that allows investors to invest in a manager's portfolio and managers to manage investors' assets.
            </p>
        </div>

        {/* Quick Links */}
        <div>
            <h5 className="text-xl font-semibold mb-4">Quick Navigation</h5>
            <ul className="text-background">
            <li className="mb-2" onClick={() => navigator("/funds")}>Explore Vaults</li>
            <li className="mb-2" onClick={() => navigator("/create-fund")}>Create Vaults</li>
            <a href="https://github.com/Stellar-VisionX" className="mb-2" target='_blank'>Docs</a>
          
            </ul>
        </div>

        {/* Contact Info */}
        <div>
            <h5 className="text-xl font-semibold mb-4">Contact</h5>
            <ul className="text-background">
            <li className="mb-2">Email: assetnest@stellar.com</li>
            <li className="mb-2">Address: Remote, Stellar Residency India</li>
            </ul>
        </div>
        </div>
        </Reveal>

        {/* Social Media Icons */}
        <Reveal delay={0.6}>
        <div className="flex justify-center mt-8 space-x-4">
          <a href="" target='_blank'><FaDiscord className="text-3xl cursor-pointer" /></a>
          <a href="https://x.com/assetnest_?t=tD3WQ3Jny-9-mDzwU64Pcg&s=08" target='_blank'><FaTwitter className="text-3xl cursor-pointer" /></a>
          <a href="" target='_blank'><FaTelegram className="text-3xl cursor-pointer" /></a>
          <a href="https://github.com/Stellar-VisionX" target='_blank'><FaGithub className="text-3xl cursor-pointer" /></a>
          <a href="" target='_blank'><FaLinkedin className="text-3xl cursor-pointer" /></a>
        </div>

        <div className="text-center text-background mt-8">
        © {new Date().getFullYear()} AssetNest. All rights reserved.
        </div>
        </Reveal>
        </div>
    </footer>
    </RevealWrapper>
  )
}

export default Footer
