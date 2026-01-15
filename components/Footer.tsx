import { Text } from '@radix-ui/themes'
import NextLink from 'next/link'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import Register from './Register';

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-slate-50 to-gray-100 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1 - Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-bold great-vibes-regular text-brand-orange mb-4">
              Vintage Flavour
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Discover authentic recipes and culinary inspiration from around the world. Join our community of food lovers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookSquare size='1.4em' />, href: "#" },
                { icon: <FaInstagram size='1.4em' />, href: "#" },
                { icon: <ImPinterest2 size='1.4em' />, href: "#" },
                { icon: <IoLogoTiktok size='1.4em' />, href: "#" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-linear-to-br from-brand-green to-[#5ea330] rounded-xl flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1 text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-center md:text-left">
              {[
                { name: 'All Recipes', href: '/recipes/list' },
                { name: 'Categories', href: '/#categories' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/about' },
                { name: 'Submit Recipe', href: '/recipes/new' }
              ].map((link) => (
                <li key={link.name}>
                  <NextLink
                    href={link.href}
                    className="text-gray-600 hover:text-brand-green transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-6">
              Subscribe to get weekly recipes and cooking tips delivered to your inbox.
            </p>
            <div className="w-full max-w-xs">
              <Register />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-gray-500 text-xs">
              © 2026 Mihalache Daniela. All rights reserved.
            </Text>
            <div className="flex gap-6 text-xs">
              <NextLink href="/about" className="text-gray-500 hover:text-brand-green transition-colors">
                Privacy Policy
              </NextLink>
              <NextLink href="/about" className="text-gray-500 hover:text-brand-green transition-colors">
                Terms of Service
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer