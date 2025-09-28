import React from 'react';
import { Link } from 'react-router-dom';

// --- Icon Components ---

const IconDatabase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lp-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8-4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const IconNetworking = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lp-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconEvents = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lp-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconFundraising = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lp-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 14v1m0-1c-1.11 0-2.08-.402-2.599-1M12 14c.52 0 1.053.114 1.5.317M12 6.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5zM3.375 12a8.625 8.625 0 1017.25 0 8.625 8.625 0 00-17.25 0z" /></svg>;

const LandingHeader = () => (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold font-poppins text-lp-primary">AlumniConnect</div>
            <div className="space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-lp-primary font-medium">Explore as Alumni</Link>
                <Link to="/signup" className="bg-lp-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">Get Started</Link>
            </div>
        </nav>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-12">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold font-poppins">AlumniConnect</h2>
                    <p className="mt-2 text-gray-400">Building Bridges Between Past, Present & Future.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const LandingPage: React.FC = () => {
    return (
        <div className="bg-white text-gray-700">
            <LandingHeader />
            <main>
                {/* Hero Section */}
                <section className="bg-gray-50 overflow-hidden">
                    <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-800 leading-tight">
                                Stay Connected.
                                <br />
                                <span className="text-lp-primary">Empower the Future.</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600">
                                AlumniConnect brings institutions, alumni, and students together on one centralized digital platform for networking, mentorship, and growth.
                            </p>
                            <div className="mt-8 space-x-4">
                                <Link to="/signup" className="bg-lp-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 text-lg">
                                    Get Started
                                </Link>
                                <Link to="/login" className="bg-white hover:bg-gray-200 text-lp-primary font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 text-lg">
                                    Explore as Alumni
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                           <div className="w-full max-w-lg">
                                <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    {/* Background world map */}
                                    <path fill="#F3F4F6" d="M752.5,433.2c-47.4-4.8-95.2-12.8-140-28.8s-86.5-40-128.4-56s-80-24.8-116.8-40.8S294,282.9,258.9,262c-35.1-20.9-69-42.8-91.8-73.8s-34.5-71-28-115.3c6.5-44.3,31-92.8,70.8-124.3C249.7-18.2,305-18.9,359.8-10.3c54.8,8.5,109,26.3,161.3,49.8c52.3,23.5,102.8,52.8,136.8,92.5c34,39.7,51.5,89.8,52.8,141.5C711.9,325.2,799.9,438,752.5,433.2z" />
                                    
                                    {/* Phone */}
                                    <g transform="translate(325, 100)">
                                        <rect x="0" y="0" width="150" height="320" rx="20" fill="#2d3748" />
                                        <rect x="5" y="5" width="140" height="310" rx="15" fill="#FFFFFF" />
                                        <line x1="45" y1="18" x2="105" y2="18" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round" />
                                    </g>

                                    {/* Person 1 (Top Left) */}
                                    <g transform="translate(180, 150)">
                                        <rect x="0" y="0" width="100" height="80" rx="8" fill="#FFF" stroke="#E5E7EB" />
                                        <circle cx="50" cy="30" r="10" fill="#a0aec0"/>
                                        <path d="M40 50 a 10 10 0 0 1 20 0 v 10 h -20 z" fill="#718096" />
                                        <circle cx="20" cy="70" r="3" fill="#0047AB"/>
                                    </g>

                                    {/* Person 2 (Top Right) */}
                                    <g transform="translate(520, 100)">
                                        <rect x="0" y="0" width="100" height="80" rx="8" fill="#FFF" stroke="#E5E7EB" />
                                        <circle cx="50" cy="30" r="10" fill="#f56565"/>
                                        <path d="M40 50 a 10 10 0 0 1 20 0 v 10 h -20 z" fill="#c53030" />
                                    </g>
                                    
                                    {/* Person 3 (Center) */}
                                    <g transform="translate(350, 250)">
                                        <rect x="0" y="0" width="100" height="80" rx="8" fill="#FFF" stroke="#E5E7EB" />
                                        <circle cx="50" cy="30" r="10" fill="#48bb78"/>
                                        <path d="M40 50 a 10 10 0 0 1 20 0 v 10 h -20 z" fill="#2f855a" />
                                        {/* Speech Bubble */}
                                        <path d="M100 30 q 15 0 15 15 v 10 q 0 15 -15 15 h -10 l -5 5 v -5 h -5 q -15 0 -15 -15 v -10 q 0 -15 15 -15 z" fill="#0047AB" transform="translate(15, -45)"/>
                                        <circle cx="123" cy="-5" r="1.5" fill="#fff"/>
                                        <circle cx="129" cy="-5" r="1.5" fill="#fff"/>
                                        <circle cx="135" cy="-5" r="1.5" fill="#fff"/>
                                    </g>
                                    
                                    {/* Person 4 (Bottom Left) */}
                                    <g transform="translate(120, 380)">
                                        <rect x="0" y="0" width="100" height="80" rx="8" fill="#FFF" stroke="#E5E7EB" />
                                        <circle cx="50" cy="30" r="10" fill="#ed8936"/>
                                        <path d="M40 50 a 10 10 0 0 1 20 0 v 10 h -20 z" fill="#c05621" />
                                    </g>
                                    
                                    {/* Person 5 (Bottom Right) */}
                                    <g transform="translate(580, 400)">
                                        <rect x="0" y="0" width="100" height="80" rx="8" fill="#FFF" stroke="#E5E7EB" />
                                        <circle cx="50" cy="30" r="10" fill="#4299e1"/>
                                        <path d="M40 50 a 10 10 0 0 1 20 0 v 10 h -20 z" fill="#2b6cb0" />
                                    </g>
                                    
                                    {/* Connection lines */}
                                    <path d="M280 190 Q 340 220 350 250" stroke="#0047AB" fill="none" stroke-width="2" stroke-dasharray="5 5"/>
                                    <path d="M520 140 Q 460 180 440 250" stroke="#0047AB" fill="none" stroke-width="2" stroke-dasharray="5 5"/>
                                    <path d="M220 380 Q 300 350 360 330" stroke="#0047AB" fill="none" stroke-width="2" stroke-dasharray="5 5"/>
                                    <path d="M580 420 Q 500 380 450 330" stroke="#0047AB" fill="none" stroke-width="2" stroke-dasharray="5 5"/>
                                    <path d="M570,180 C 650,250 550,350 475,300" stroke="#0047AB" fill="none" stroke-width="2" stroke-dasharray="5 5" />
                                    
                                    {/* Icons */}
                                    <g transform="translate(150, 100)">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#0047AB"/>
                                    </g>
                                    <g transform="translate(600, 60)">
                                        <circle cx="12" cy="12" r="10" stroke="#0047AB" stroke-width="2" fill="none"/>
                                        <path d="M12,2 a10,10 0 0,0 0,20" fill="none" stroke="#0047AB" stroke-width="2" />
                                        <path d="M2,12 a10,10 0 0,0 20,0" fill="none" stroke="#0047AB" stroke-width="2" transform="rotate(90 12 12)" />
                                    </g>
                                </svg>
                           </div>
                        </div>
                    </div>
                </section>

                {/* Key Value Propositions */}
                <section className="container mx-auto px-6 py-20">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-800">A Unified Platform for Growth</h2>
                         <p className="mt-4 text-lg text-gray-600">Everything you need to foster a thriving alumni community.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-brand-light rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"><IconDatabase /><h3 className="font-bold text-xl mt-4 mb-2">Alumni Database</h3><p>Secure, centralized storage and easy management of alumni data.</p></div>
                        <div className="text-center p-6 bg-brand-light rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"><IconNetworking /><h3 className="font-bold text-xl mt-4 mb-2">Networking & Mentorship</h3><p>Connect alumni with students and peers for meaningful relationships.</p></div>
                        <div className="text-center p-6 bg-brand-light rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"><IconEvents /><h3 className="font-bold text-xl mt-4 mb-2">Events & Reunions</h3><p>Seamless event creation, promotion, and registration management.</p></div>
                        <div className="text-center p-6 bg-brand-light rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1"><IconFundraising /><h3 className="font-bold text-xl mt-4 mb-2">Fundraising Made Easy</h3><p>Simplify donation campaigns and drive institutional support.</p></div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-gray-50 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-800">Simple Steps to Success</h2>
                        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 hidden md:block"></div>
                            <div className="relative text-center md:w-1/3 p-4">
                                <div className="mx-auto w-16 h-16 bg-white border-2 border-lp-primary text-lp-primary flex items-center justify-center rounded-full text-2xl font-bold z-10 relative">1</div>
                                <h3 className="font-bold text-xl mt-4">Onboard Data</h3>
                                <p className="mt-2 text-gray-600">Institutions securely onboard alumni data to create a comprehensive directory.</p>
                            </div>
                            <div className="relative text-center md:w-1/3 p-4">
                                <div className="mx-auto w-16 h-16 bg-white border-2 border-lp-primary text-lp-primary flex items-center justify-center rounded-full text-2xl font-bold z-10 relative">2</div>
                                <h3 className="font-bold text-xl mt-4">Create Profiles</h3>
                                <p className="mt-2 text-gray-600">Alumni and students create rich profiles to showcase their journey and expertise.</p>
                            </div>
                             <div className="relative text-center md:w-1/3 p-4">
                                <div className="mx-auto w-16 h-16 bg-white border-2 border-lp-primary text-lp-primary flex items-center justify-center rounded-full text-2xl font-bold z-10 relative">3</div>
                                <h3 className="font-bold text-xl mt-4">Engage & Grow</h3>
                                <p className="mt-2 text-gray-600">Engage via networking, mentorship, events, and fundraising activities.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonials */}
                <section className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-800">Trusted by Leading Institutions</h2>
                        <div className="mt-12 grid md:grid-cols-3 gap-8">
                            <div className="bg-lp-accent p-8 rounded-lg shadow-lg">
                                <p className="italic text-gray-800">"AlumniConnect helped us raise funds and re-engage with our alumni community in a way we never thought possible."</p>
                                <div className="mt-6 flex items-center justify-center">
                                    <div className="font-bold text-lp-primary">- Dean of Advancement, XYZ University</div>
                                </div>
                            </div>
                            <div className="bg-lp-accent p-8 rounded-lg shadow-lg">
                                <p className="italic text-gray-800">"As an alumnus, finding a mentor through the platform was a game-changer for my career transition. Highly recommended!"</p>
                                 <div className="mt-6 flex items-center justify-center">
                                    <div className="font-bold text-lp-primary">- Priya Sharma, Class of '15</div>
                                </div>
                            </div>
                            <div className="bg-lp-accent p-8 rounded-lg shadow-lg">
                                <p className="italic text-gray-800">"The event management tools are fantastic. We've seen a 50% increase in attendance at our virtual and in-person events."</p>
                                 <div className="mt-6 flex items-center justify-center">
                                    <div className="font-bold text-lp-primary">- Alumni Relations Director, ABC College</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="bg-lp-primary text-white">
                    <div className="container mx-auto px-6 py-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-poppins font-bold">Join the AlumniConnect network and create lasting impact.</h2>
                        <div className="mt-8">
                            <Link to="/signup" className="bg-lp-accent hover:bg-opacity-90 text-lp-primary font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 text-lg">
                                Sign Up Today
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;