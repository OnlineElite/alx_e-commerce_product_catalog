import { Github, Facebook, Twitter, Linkedin } from "lucide-react"

const Footer: React.FC = () => {


    return(
        <div className="bg-footerColor flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mt-8 gap-6 px-4">
                <div className="text-white text-sm">
                    <h3 className="text-lg font-bold mb-1">About Us</h3>
                    <hr className="border border-secondColor w-12 mb-4  "/>
                    <p>ShopSphere is your one-stop destination for all your shopping needs. We offer a wide range of products with fast delivery and excellent customer service.</p>
                </div>
                <div className="text-white text-sm">
                    <h3 className="text-lg font-bold mb-1">Quick Links</h3>
                    <hr className="border border-secondColor w-12 mb-4  "/>
                    <ul className="flex flex-col gap-2">
                        <li>Home</li>
                        <li>Products</li>
                        <li>Categories</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className="text-white text-sm">
                    <h3 className="text-lg font-bold mb-1">Contact Us</h3>
                    <hr className="border border-secondColor w-12 mb-4 "/>
                    <p>Email: jamalboujbari@gmail.com</p>
                    <p>Phone: +212  639 411 280</p>
                    <p>Address: Casablanca, Morocco</p>
                </div>
                <div className="text-white text-sm">
                    <h3 className="text-lg font-bold mb-1">Follow Us</h3>
                    <hr className="border border-secondColor w-12 mb-4  "/>                  
                    <div className="flex flex-row gap-2 mt-4">
                        <span className="bg-gray-300/20 w-8 h-8 rounded-full flex items-center justify-center"><Linkedin className="w-4" /></span>
                        <span className="bg-gray-300/20 w-8 h-8 rounded-full flex items-center justify-center"><Twitter className="w-4" /></span>
                        <span className="bg-gray-300/20 w-8 h-8 rounded-full flex items-center justify-center"><Facebook className="w-4" /></span>
                        <span className="bg-gray-300/20 w-8 h-8 rounded-full flex items-center justify-center"><Github className="w-4" /></span>
                    </div>
                </div>
            </div>
            <div className="text-white text-sm w-full flex flex-col items-center justify-center mb-6">
                <hr className="border-t border-slate-500 w-full max-w-7xl my-8"/>
                <p>© 2025 ShopSphere. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;
