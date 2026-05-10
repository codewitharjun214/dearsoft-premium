import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Send, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().min(1, 'Budget is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = ({ onBookingClick }: { onBookingClick: () => void }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    const leadId = `lead_${Date.now()}`;
    const leadsCollection = 'leads';
    try {
      await setDoc(doc(db, leadsCollection, leadId), {
        ...data,
        createdAt: serverTimestamp()
      });
      alert('Thank you! Your message has been sent.');
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${leadsCollection}/${leadId}`);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gold rounded-full"></span>
                  Contact Us
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Have a project in mind? Dear Soft is ready to deliver powerful and modern web solutions tailored to your business.
                </p>
                
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Call Us', val: '+91 9529796993 / +91 9309169176' },
                    { icon: Mail, label: 'Email', val: 'dearsoft0205@gmail.com' },
                    { icon: MapPin, label: 'Location', val: 'Pune, India' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="p-3 glass rounded-xl text-gold group-hover:bg-gold group-hover:text-black transition-all">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">{item.label}</div>
                        <div className="text-sm font-medium">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="glass p-4 rounded-xl text-center">
                  <div className="text-gold text-2xl font-bold mb-1">20+</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Projects Done</div>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <div className="text-gold text-2xl font-bold mb-1">92%</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-tighter">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="glass p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gold rounded-full"></span>
                Start Your Project
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">{t('contact.name')}</label>
                  <input
                    {...register('name')}
                    className="input-dark w-full"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">{t('contact.email')}</label>
                  <input
                    {...register('email')}
                    className="input-dark w-full"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">{t('contact.projectType')}</label>
                  <select
                    {...register('projectType')}
                    className="input-dark w-full text-white/80"
                  >
                    <option value="" className="bg-space-black">Select Type</option>
                    <option value="web" className="bg-space-black">Web Application</option>
                    <option value="ecommerce" className="bg-space-black">E-Commerce Solution</option>
                    <option value="design" className="bg-space-black">UI/UX Design</option>
                  </select>
                  {errors.projectType && <p className="text-red-400 text-[10px] mt-1">{errors.projectType.message}</p>}
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">{t('contact.budget')}</label>
                  <input
                    {...register('budget')}
                    className="input-dark w-full"
                    placeholder="e.g. $1000 - $5000"
                  />
                  {errors.budget && <p className="text-red-400 text-[10px] mt-1">{errors.budget.message}</p>}
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">{t('contact.message')}</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    className="input-dark w-full resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-red-400 text-[10px] mt-1">{errors.message.message}</p>}
                </div>

                <div className="col-span-2 mt-4 flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-gold text-black font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 "
                  >
                    {isSubmitting ? 'Sending...' : 'Send Proposal'}
                    <Send size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={onBookingClick}
                    className="flex-1 py-4 border border-gold/50 text-gold rounded-lg hover:bg-gold/10 transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <Calendar size={18} />
                    {t('contact.booking')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
