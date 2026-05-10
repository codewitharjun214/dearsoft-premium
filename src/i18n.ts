import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        services: 'Services',
        projects: 'Projects',
        contact: 'Contact',
        admin: 'Admin'
      },
      hero: {
        title: 'We Build Complete Web Solutions',
        subtitle: 'Frontend • Backend • Web API • Cloud Deployment',
        cta: 'Get Started'
      },
      about: {
        title: 'About Our Agency',
        subtitle: 'Transforming ideas into powerful digital experiences.',
        p1: 'We are a fast-growing professional IT company powered by a team of 20+ skilled experts including frontend developers, backend engineers, full-stack developers, QA testers, UI/UX designers, and cloud deployment specialists.',
        p2: 'We specialize in building high-performance websites, scalable web applications, and complete digital solutions tailored to startups, small businesses, and enterprises.'
      },
      services: {
        title: 'Our Services',
        web: 'Web Development',
        design: 'UI/UX Design',
        ecommerce: 'E-Commerce Solutions',
        cloud: 'Cloud Deployment',
        api: 'API Development',
        support: 'Maintenance & Support'
      },
      contact: {
        title: 'Let’s Build Something Amazing',
        name: 'Name',
        email: 'Email',
        projectType: 'Project Type',
        budget: 'Budget',
        message: 'Message',
        submit: 'Send Message',
        booking: 'Book an Appointment'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        about: 'हमारे बारे में',
        services: 'सेवाएं',
        projects: 'परियोजनाएं',
        contact: 'संपर्क',
        admin: 'एडमिन'
      },
      hero: {
        title: 'पूर्ण वेब समाधान',
        subtitle: 'फ्रंटएंड • बैकएंड • वेब एपीआई • क्लाउड डिप्लॉयमेंट',
        cta: 'शुरू करें'
      },
      about: {
        title: 'हमारे बारे में',
        subtitle: 'विचारों को शक्तिशाली डिजिटल अनुभवों में बदलना।',
        p1: 'हम एक तेजी से बढ़ती व्यावसायिक आईटी कंपनी हैं जो 20+ कुशल विशेषज्ञों की टीम द्वारा संचालित है।',
        p2: 'हम स्टार्टअप्स, छोटे व्यवसायों और उद्यमों के लिए उच्च प्रदर्शन वाली वेबसाइट बनाने में विशेषज्ञ हैं।'
      },
      services: {
        title: 'हमारी सेवाएं',
        web: 'वेब विकास',
        design: 'यूआई/यूएक्स डिजाइन',
        ecommerce: 'ई-कॉमर्स समाधान',
        cloud: 'क्लाउड डिप्लॉयमेंट',
        api: 'एपीआई विकास',
        support: 'रखरखाव और सहायता'
      },
      contact: {
        title: 'आइए कुछ अद्भुत बनाएं',
        name: 'नाम',
        email: 'ईमेल',
        projectType: 'परियोजना का प्रकार',
        budget: 'बजट',
        message: 'संदेश',
        submit: 'संदेश भेजें',
        booking: 'अपॉइंटमेंट बुक करें'
      }
    }
  },
  mr: {
    translation: {
      nav: {
        about: 'आमच्याबद्दल',
        services: 'सेवा',
        projects: 'प्रकल्प',
        contact: 'संपर्क',
        admin: 'एडमिन'
      },
      hero: {
        title: 'पूर्ण वेब सोल्यूशन्स',
        subtitle: 'फ्रंटएंड • बॅकएंड • वेब एपीआय • क्लाउड डिप्लॉयमेंट',
        cta: 'सुरू करा'
      },
      about: {
        title: 'आमच्याबद्दल',
        subtitle: 'कल्पनांना शक्तिशाली डिजिटल अनुभवांमध्ये रूपांतरित करणे.',
        p1: 'आम्ही एक वेगाने वाढणारी व्यावसायिक आयटी कंपनी आहे जी २०+ तज्ञ टीमद्वारे चालविली जाते.',
        p2: 'आम्ही स्टार्टअप्स, छोटे व्यवसाय आणि उद्योगांसाठी उच्च-कार्यक्षमता वेबसाइट्स बनवण्यात तज्ञ आहोत।'
      },
      services: {
        title: 'आमच्या सेवा',
        web: 'वेब डेव्हलपमेंट',
        design: 'यूआय/यूएक्स डिझाइन',
        ecommerce: 'ई-कॉमर्स सोल्यूशन्स',
        cloud: 'क्लाउड डिप्लॉयमेंट',
        api: 'एपीआय डेव्हलपमेंट',
        support: 'देखभाल आणि समर्थन'
      },
      contact: {
        title: 'चला काहीतरी आश्चर्यकारक बनवूया',
        name: 'नाव',
        email: 'ईमेल',
        projectType: 'प्रकल्पाचा प्रकार',
        budget: 'बजेट',
        message: 'संदेश',
        submit: 'संदेश पाठवा',
        booking: 'अपॉइंटमेंट बुक करा'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
