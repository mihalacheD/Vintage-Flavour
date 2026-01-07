import {  Link, Text } from '@radix-ui/themes'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import Register from '../components/Register';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-gray-100 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-3xl font-bold great-vibes-regular orange mb-4">
              Vintage Flavour
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Discover authentic recipes and culinary inspiration from around the world. Join our community of food lovers.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-11 h-11 bg-gradient-to-br from-[#79c141] to-[#5ea330] rounded-lg flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <FaFacebookSquare size='1.4em' color='white' />
              </Link>
              <Link
                href="#"
                className="w-11 h-11 bg-gradient-to-br from-[#79c141] to-[#5ea330] rounded-lg flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <FaInstagram size='1.4em' color='white' />
              </Link>
              <Link
                href="#"
                className="w-11 h-11 bg-gradient-to-br from-[#79c141] to-[#5ea330] rounded-lg flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <ImPinterest2 size='1.4em' color='white' />
              </Link>
              <Link
                href="#"
                className="w-11 h-11 bg-gradient-to-br from-[#79c141] to-[#5ea330] rounded-lg flex items-center justify-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <IoLogoTiktok size='1.4em' color='white' />
              </Link>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors text-sm">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors text-sm">
                  Submit Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get weekly recipes and cooking tips delivered to your inbox.
            </p>
            <Register />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text className="text-gray-600 text-sm">
              © 2025 Mihalache Daniela. All rights reserved.
            </Text>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#79c141] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer