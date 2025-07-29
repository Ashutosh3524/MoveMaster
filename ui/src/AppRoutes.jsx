
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Service from './Service';
import Blog from './Blog';
import Review from './Review';
import Contact from './Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/reviews" element={<Review />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
