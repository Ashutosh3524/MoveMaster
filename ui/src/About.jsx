import { Truck, Shield, Users, Award, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
const About = () => {
    const navigate = useNavigate();
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
                    <h1 className="text-4xl font-bold mb-6">About MoveMaster</h1>
                    <p className="text-xl text-gray-600">Your trusted moving partner since 2010</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{

                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 1,

                        }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Founded in 2010, MoveMaster has been serving families and businesses with reliable, professional moving services.
                            What started as a small local business has grown into one of the most trusted moving companies in the region.
                        </p>
                        <p className="text-gray-600 mb-6">
                            We understand that moving is more than just transporting belongings – it's about helping people transition to new chapters in their lives.
                            That's why we're committed to making every move as smooth and stress-free as possible.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">15+</div>
                                <div className="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">10,000+</div>
                                <div className="text-sm text-gray-600">Happy Customers</div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{

                            stiffness: 40,
                            damping: 25,
                            delay: 0.5,
                            duration: 1,

                        }}
                        className=" h-96 rounded-lg flex items-center justify-center">
                        <img src="Truck2.png" />
                    </motion.div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                            <p className="text-gray-600">We keep our promises and deliver on time, every time.</p>
                        </div>
                        <div className="text-center p-6">
                            <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                            <p className="text-gray-600">Your satisfaction is our top priority in everything we do.</p>
                        </div>
                        <div className="text-center p-6">
                            <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                            <p className="text-gray-600">We strive for perfection in every aspect of our service.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-8 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Move with Us?</h2>
                    <p className="text-gray-600 mb-6">Join thousands of satisfied customers who chose MoveMaster for their relocation needs.</p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );

}

export default About
