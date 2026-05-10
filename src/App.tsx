import { useState } from 'react';
import { SpaceBackground } from './components/SpaceBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { TechLogos } from './components/TechLogos';
import { Projects } from './components/Projects';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { AIChatbot } from './components/AIChatbot';
import { AdminDashboard } from './components/AdminDashboard';
import './i18n';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="relative min-h-screen selection:bg-gold selection:text-black">
      <SpaceBackground />
      
      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Services />
        <TechLogos />
        <Projects />
        <ContactForm onBookingClick={() => setIsBookingOpen(true)} />
      </main>

      <Footer />

      {/* Floating Elements */}
      <AIChatbot />
      
      {/* Modals/Overlays */}
      <BookingSystem 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
