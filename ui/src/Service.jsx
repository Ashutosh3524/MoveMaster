import { Truck, Shield, Clock, Users, Award, Target, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
const Service = () => {
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

        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{

                        stiffness: 40,
                        damping: 25,
                        delay: 0.5,
                        duration: 1,

                    }}
                    className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-gray-600">Comprehensive moving solutions for all your needs</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{

                                stiffness: 40,
                                damping: 25,
                                delay: 0.5 + index * 0.1,
                                duration: 1,

                            }}
                            key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="mb-6">{service.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-600 mb-6">{service.description}</p>
                            <button className="text-blue-600 font-semibold hover:text-blue-800 flex items-center">
                                Learn More <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
                        <p className="text-xl mb-6">We offer tailored services to meet your specific moving requirements.</p>
                        <button
                            onClick={() => navigate('/contact')}
                            className="bg-white cursor-none text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Contact Us Today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Service
