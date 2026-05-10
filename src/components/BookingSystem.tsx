import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';

export const BookingSystem = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
  const dates = [...Array(7)].map((_, i) => addDays(startOfToday(), i + 1));

  const handleBooking = async () => {
    const bookingId = `book_${Date.now()}`;
    const bookingsCollection = 'bookings';
    try {
      await setDoc(doc(db, bookingsCollection, bookingId), {
        date: format(selectedDate!, 'yyyy-MM-dd'),
        time: selectedTime,
        createdAt: serverTimestamp(),
        userEmail: auth.currentUser?.email || null
      });
      setStep(3);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${bookingsCollection}/${bookingId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative glass w-full max-w-md overflow-hidden rounded-2xl p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Book a Meeting</h2>
              <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">{format(startOfToday(), 'MMMM yyyy')}</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-white/10 rounded cursor-not-allowed opacity-50">←</button>
                    <button className="p-1 hover:bg-white/10 rounded cursor-not-allowed opacity-50">→</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/40 mb-2 uppercase tracking-widest">
                  <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {dates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => { setSelectedDate(date); setStep(2); }}
                      className="py-3 px-4 bg-white/5 border border-white/10 rounded-lg hover:border-gold hover:bg-gold/5 transition-all text-sm group"
                    >
                      <div className="text-[10px] text-white/40 uppercase tracking-tighter group-hover:text-gold">{format(date, 'eee')}</div>
                      <div className="font-bold">{format(date, 'MMM d')}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <button 
                onClick={() => setStep(1)}
                className="text-gold text-xs hover:underline uppercase tracking-widest"
              >
                ← Back to dates
              </button>
              <h2 className="text-2xl font-semibold">Select Time</h2>
              <div className="text-xs text-white/40 mb-4 uppercase tracking-widest leading-relaxed">
                Available slots for <span className="text-white">{format(selectedDate!, 'MMMM d')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 text-xs border transition-all text-center rounded ${
                      selectedTime === time 
                      ? 'bg-gold/20 border-gold text-gold' 
                      : 'border-white/10 hover:border-white/40 text-white/70'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedTime}
                onClick={handleBooking}
                className="w-full bg-gold text-black py-4 rounded-lg font-bold mt-6 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:brightness-110 disabled:opacity-50 transition-all uppercase tracking-widest text-xs"
              >
                Confirm Time
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 bg-gold/20 border border-gold text-gold rounded-full flex items-center justify-center">
                  <CheckCircle size={48} />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold">Meeting Booked!</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-[250px] mx-auto">
                Confirmed for {format(selectedDate!, 'MMMM d')} at {selectedTime}.
                We've sent a confirmation email.
              </p>
              <button
                onClick={onClose}
                className="bg-gold text-black px-10 py-3 rounded-lg font-bold hover:brightness-110 transition-all uppercase tracking-widest text-xs"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
