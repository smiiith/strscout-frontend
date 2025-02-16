const Footer = () => {
    return (
        <div className="flex flex-col">
            <div className="flex-grow">
                <div className="container mx-auto p-0 max-w-7xl bg-primary px-4 py-4 text-white">
                    <footer>
                        {/* <div className="flex justify-between"> */}
                        <div className="flex justify-start space-x-12">
                            <div>
                                <ul className="space-y-2">
                                    <li>Get Your Free Listing Feedback Now</li>
                                    <li><a href="/about-us" className="hover:text-slate-300">About Us</a></li>
                                    <li><a href="/faq" className="hover:text-slate-300">FAQ</a></li>
                                    <li><a href="/pricing" className="hover:text-slate-300">Pricing</a></li>
                                    <li><a href="/login" className="hover:text-slate-300">Login</a></li>
                                    <li><a href="/contact-us" className="hover:text-slate-300">Contact Us</a></li>
                                    <li>Guidance by HostPower.tools</li>
                                </ul>
                            </div>

                            <div>
                                <img
                                    src="/home/str-feedback-genius-logo.png"
                                    className="mr-22"
                                />
                            </div>

                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Footer;