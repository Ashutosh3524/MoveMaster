import { Truck, Shield, Clock, Star, Users, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();


    const services = [
        {
            icon: <Truck className="w-12 h-12 text-blue-600" />,
            title: 'Local Moving',
            description: 'Safe and reliable local moving services within the city with professional handling.'
        },
        {
            icon: <Shield className="w-12 h-12 text-blue-600" />,
            title: 'Interstate Moving',
            description: 'Long-distance moving services across states with full insurance coverage.'
        },
        {
            icon: <Clock className="w-12 h-12 text-blue-600" />,
            title: 'Express Moving',
            description: 'Quick and efficient moving services for urgent relocations.'
        },
        {
            icon: <Users className="w-12 h-12 text-blue-600" />,
            title: 'Office Relocation',
            description: 'Professional office moving services with minimal business disruption.'
        },
        {
            icon: <Award className="w-12 h-12 text-blue-600" />,
            title: 'Storage Solutions',
            description: 'Secure storage facilities for short-term and long-term needs.'
        },
        {
            icon: <Target className="w-12 h-12 text-blue-600" />,
            title: 'Specialized Moving',
            description: 'Moving services for pianos, artwork, and other specialty items.'
        }
    ];



    return (
        <div>


            {/* Hero Section */}
            <section className="flex xl:flex-row flex-col-reverse bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 ">
                <div className="max-w-6xl mx-2 my-8 px-4  basis-[50%]">
                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                           
                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 0.8
                        }}
                        className="text-5xl font-bold mb-6 ">Professional Packer & Movers</motion.h1>
                    <motion.p
                    initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            
                            stiffness: 40,
                            damping: 25,
                            delay: 0.8,
                            duration: 1.2
                        }}
                     className="text-xl py-6 mb-8">With years of experience and a dedicated team of professionals, we make home and office relocations smooth, efficient, and completely hassle-free — whether you're moving across the street or across the country.

                    </motion.p>
                    <motion.div 
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                        transition={{
                            
                            stiffness: 40,
                            damping: 25,
                            delay: 1,
                            duration: 1.5
                        }}
                    className="flex flex-col sm:flex-row gap-4 py-4">
                        <button
                            onClick={() => navigate('/contact')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                           Get in Touch

                        </button>
                        <button
                            onClick={() => navigate('/services')}
                            className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Our Services
                        </button>
                    </motion.div>
                </div>
                <div className="basis-[50%]">
                    <motion.img 
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                        transition={{
                            
                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 0.8
                        }}
                    className="px-4" src="/Truck.png" alt="transport" />
                </div>



            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">100% Safe & Secure</h3>
                            <p className="text-gray-600">Your belongings are insured and handled with utmost care by our trained professionals.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">On-Time Delivery</h3>
                            <p className="text-gray-600">We guarantee timely delivery with real-time tracking of your shipment.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <Star className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">5-Star Service</h3>
                            <p className="text-gray-600">Rated as the best moving service with thousands of satisfied customers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.slice(0, 6).map((service, index) => (
                            <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                                <div className="mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/services')}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View All Services
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );


}

export default HomePage
