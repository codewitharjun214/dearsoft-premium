import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (i18n.language) {
      // Keep html lang attribute in sync with localization
      document.documentElement.lang = i18n.language;

      // Define localized titles and descriptions to boost SEO search presence across index regions
      let title = "DearSoft IT Solutions | Digital Engineering & Software Agency";
      let desc = "Premium IT solutions specializing in Web Development, UI/UX Design, E-Commerce, and Cloud/AI integrations. We transform ideas into scalable, high-performance digital products.";

      if (i18n.language === 'hi') {
        title = "डिअरसॉफ्ट आईटी सॉल्यूशंस | डिजिटल इंजीनियरिंग और सॉफ्टवेयर एजेंसी";
        desc = "वेब विकास, यूआई / यूएक्स डिजाइन, ई-कॉमर्स और क्लाउड / एआई एकीकरण में विशेषज्ञता वाले प्रीमियम आईटी समाधान।";
      } else if (i18n.language === 'mr') {
        title = "डिअरसॉफ्ट आयटी सोल्युशन्स | डिजिटल इंजिनिअरिंग आणि सॉफ्टवेअर एजन्सी";
        desc = "वेब डेव्हलपमेंट, यूआय / यूएक्स डिझाइन, ई-कॉमर्स आणि क्लाउड / एआई इंटिग्रेशनमध्ये तज्ञ असलेले प्रीमियम आयटी सोल्यूशन्स।";
      }

      document.title = title;

      // Update page description meta tag
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', desc);
      }

      // Update Open Graph tags for rich dynamic social shares
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
    }
  }, [i18n.language]);

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
