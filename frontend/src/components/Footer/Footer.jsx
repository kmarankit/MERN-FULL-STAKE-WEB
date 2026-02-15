// import React, { useState } from 'react';
// import { FaRegEnvelope } from 'react-icons/fa6';
// import { BiChevronRight } from 'react-icons/bi';
// import { socialIcons } from '../../assets/dummydata';



// const navItems = [
//   { name: 'Home', link: '/' },
//   { name: 'Menu', link: '/menu' },
//   { name: 'About Us', link: '/about' },
//   { name: 'Contact', link: '/contact' },
//   { name: 'Terms & Conditions',link:'/Tnc'},
//   { name: 'Privecy Policy',link:'/privecypolicy'},
//   { name: 'Shipping Policy',link:'/shippingPolicy'}
// ];

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const handleSubmit = e => {
//     e.preventDefault();
//     alert(`Thanks for subscribing! We'll send updates to ${email}`);
//     setEmail('');
//   };

//   return (
//     <footer className="bg-[#2A211C] text-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
//           {/* Left Column */}
//           <div className="space-y-6">
//             <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold font-sacramento text-amber-400 animate-pulse">
//               Annpurna Dhaba
//             </h2>
//             <p className="text-amber-200/90 text-sm font-sacramento italic">
// Dhaba ka asli swaad, ab modern touch ke saath. Fresh aur garam-garam khana, sirf ek click par. Taste asli, delivery super easy.            </p>
          
//           </div>

//           {/* Middle Column */}
// <div className="grid grid-cols-2 gap-6 justify-center">
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold mb-4 border-l-4 border-amber-400 pl-3 font-merriweather italic text-amber-300">
//                 Navigation
//               </h3>
//               <ul className="space-y-3">
//                 {navItems.map(item => (
//                   <li key={item.name}>
//                     <a href={item.link} className="flex items-center hover:text-amber-400 transition-all group font-lora hover:pl-2">
//                       <BiChevronRight className="mr-2 text-amber-400 group-hover:animate-bounce" />
//                       <span className="hover:italic">{item.name}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Column */}
//           {/* <div className="flex justify-center md:justify-end">
//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold mb-4 border-l-4 border-amber-400 pl-3 font-merriweather italic text-amber-300">
//                 Social Connect
//               </h3>
//               <div className="flex space-x-4">
//                 {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
//                   <a
//                     key={idx}
//                     href={link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-2xl bg-amber-400/10 p-3 rounded-full hover:bg-amber-400/20 hover:scale-110 transition-all duration-300 relative group"
//                     style={{ color }}
//                   >
//                     <Icon className="hover:scale-125 transition-transform" />
//                     <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
//                       {label}
//                     </span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div> */}
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-amber-800 pt-8 mt-8 text-center">
//           <p className="text-amber-400 text-lg mb-2 font-playfair">
//             2025 © Annpurna Dhaba. All rights reserved.
//           </p>
//           <div className="group inline-block">
//             <a
//               href="https://hexagondigitalservices.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-lg font-sacramento bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent hover:text-purple-300 transition-all duration-500"
//             >
//               Designed by Ankit Kumar (Prop.)
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Fssai from "../../assets/FssaiLogo.png"

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Menu', link: '/menu' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
  { name: 'Terms & Conditions', link: '/Tnc' },
  { name: 'Privacy Policy', link: '/privacypolicy' },
  { name: 'Shipping Policy', link: '/shippingPolicy' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setSubscriptionMessage("Thanks for subscribing! We'll send updates to " + email);
      setEmail('');
      setTimeout(() => setSubscriptionMessage(''), 5000); // Clear message after 5 seconds
    }
  };

  return (
    <footer className="bg-gray-100  text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex sm:flex-cols-2 md:flex-cols-2 gap-y-12 sm:gap-y-16 lg:gap-90 mb-1">
       

          {/* Middle Column - Navigation */}
          <div className="grid grid-cols-2 gap-y-6 md:col-span-1">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Navigation</h3>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="flex items-center text-m font-bold text-gray-600 hover:text-orange-500 transition-all group hover:pl-2"
                    >
                      <span className="mr-2  text-orange-500 group-hover:animate-pulse">&gt;</span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Column - Address & Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Find Us</h3>
            <div className="space-y-5 text-m text-gray-600">
              <p >
                <h4 className='text-orange-600 text-xl font-bold mb-6'>Annapurna Dhaba Family Restaurant
                <br />
                </h4>
                <div className='font-bold'>  Loenga, Near Loenga Bazar, 
                <br />
                 Gumla- 835227,  Main Road Ranchi
                <br />
                </div>
              </p>
              <p>
              Phone: +91 7903335271
              </p>
                <div className="grid  items-center gap-2  ">
                            <img src={Fssai} alt="FSSAI Logo" className="w-60 h-auto"/>
                            <span className="text-gray-700 text-sm font-bold font-mono ">LIC No: 21124037000007</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            2025 © Annpurna Dhaba. All rights reserved.
          </p>
          <a>
            Designed by Ankit Kumar.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
