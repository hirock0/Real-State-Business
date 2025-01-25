import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10" data-aos="fade-up">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">RealEstatePro</h3>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect property. Explore a
              wide range of listings and make your dream home a reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                target="_blank"
                to={"https://www.facebook.com/"}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Link>
              <Link
                target="_blank"
                to={"https://x.com/"}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </Link>
              <Link
                target="_blank"
                to={"https://www.instagram.com/"}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
              <Link
                target="_blank"
                to={"https://www.linkedin.com/"}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RealEstatePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
