import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, LayoutDashboard, Users, Calendar, Briefcase, LogOut, TrendingUp, Filter, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';
import { Skeleton } from './Skeleton';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const AdminDashboard = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_EMAILS = ["arjunlaptop7507@gmail.com", "dearsoft0205@gmail.com"];

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setIsLoading(true);
      
      const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
        const leadsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeads(leadsData);
        setIsLoading(false);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'leads');
      });

      const qBookings = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const unsubscribeBookings = onSnapshot(qBookings, (snapshot) => {
        const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, 'bookings');
      });

      return () => {
        unsubscribeLeads();
        unsubscribeBookings();
      };
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!ADMIN_EMAILS.includes(result.user.email || '')) {
        alert('Access Denied: You are not authorized to view this portal.');
        await signOut(auth);
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar */}
      {isAuthenticated && (
        <div className="w-full md:w-64 glass border-r border-white/10 p-8 flex flex-col gap-10">
          <div className="flex items-center justify-center group cursor-pointer">
            <Logo className="w-24 h-24 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
          </div>
          
          <nav className="flex-1 space-y-2">
            {[
              { icon: LayoutDashboard, label: 'Analytics', active: true },
              { icon: Users, label: 'Client Leads' },
              { icon: Calendar, label: 'Bookings' },
              { icon: Briefcase, label: 'Services' }
            ].map((item, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                  item.active ? "bg-gold/10 text-gold border border-gold/20" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-[#050505]">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-gold transition-all">
          <X size={32} />
        </button>

        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center min-h-screen space-y-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Admin Access</h2>
              <p className="text-white/40 text-sm">Elite Portal for Management</p>
            </div>
            <div className="glass p-8 w-full space-y-6 rounded-2xl border-white/10 shadow-2xl flex flex-col items-center">
              <p className="text-white/60 text-xs text-center mb-4">
                This dashboard is restricted to authorized personnel only. Please sign in with your admin Google account.
              </p>
              <button
                onClick={handleLogin}
                className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gold hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
              >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                Sign in with Google
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <h1 className="text-5xl font-bold tracking-tighter mb-2">Dashboard</h1>
                <p className="text-white/40 text-sm italic">Welcome back to the command center.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 glass px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"><Filter size={14} /> Filter Reports</button>
                <div className="text-[10px] glass px-6 py-2.5 rounded-full text-green-400 font-bold uppercase tracking-widest border-green-500/20">System: Operational</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-32 rounded-2xl" count={4} />
                </>
              ) : (
                [
                  { label: 'Total Leads', val: leads.length, border: 'border-gold', color: 'text-gold' },
                  { label: 'Bookings', val: bookings.length, border: 'border-blue-500', color: 'text-blue-500' },
                  { label: 'Success Rate', val: '98%', border: 'border-green-500', color: 'text-green-500' },
                  { label: 'Active Projects', val: '12', border: 'border-purple-500', color: 'text-purple-500' }
                ].map((stat, i) => (
                  <div key={i} className={cn("glass p-8 rounded-2xl border-l-2 relative overflow-hidden group hover:-translate-y-1 transition-all", stat.border)}>
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutDashboard size={80} />
                     </div>
                     <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">{stat.label}</div>
                     <div className={cn("text-4xl font-bold tracking-tight", stat.color)}>{stat.val}</div>
                  </div>
                ))
              )}
            </div>

            {/* Recent Leads Table */}
            <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
              <div className="p-8 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-3">
                   <div className="w-1 h-6 bg-gold rounded-full"></div>
                   Recent Inquiries
                </h3>
                <span className="text-[10px] text-gold font-bold uppercase tracking-widest cursor-pointer hover:underline underline-offset-4">Download PDF</span>
              </div>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 space-y-4">
                    <Skeleton className="h-12 w-full" count={5} />
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      <tr>
                        <th className="p-6">Client Profile</th>
                        <th className="p-6">Requirement</th>
                        <th className="p-6">Budget Estimate</th>
                        <th className="p-6">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.length > 0 ? leads.slice().reverse().map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-6">
                            <div className="font-bold text-sm text-white/90">{lead.name}</div>
                            <div className="text-xs text-white/30 font-mono tracking-tight">{lead.email}</div>
                          </td>
                          <td className="p-6">
                             <span className="px-3 py-1 glass text-[10px] font-bold uppercase tracking-wider text-gold rounded-full">
                                {lead.projectType}
                             </span>
                          </td>
                          <td className="p-6 text-sm font-mono text-white/80">{lead.budget}</td>
                          <td className="p-6 text-white/20 text-xs font-medium">
                            {lead.createdAt?.seconds 
                              ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString()
                              : 'Pending...'}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="p-16 text-center text-white/20 uppercase tracking-[0.2em] text-[10px] italic">Mission Control: No Data In Feed</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
              <div className="p-8 bg-white/5 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-3">
                   <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                   Scheduled Meetings
                </h3>
              </div>
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 space-y-4">
                    <Skeleton className="h-12 w-full" count={3} />
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      <tr>
                        <th className="p-6">Date</th>
                        <th className="p-6">Time Slot</th>
                        <th className="p-6">Client Email</th>
                        <th className="p-6">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.length > 0 ? bookings.slice().reverse().map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-6 text-sm font-bold text-white/90">{booking.date}</td>
                          <td className="p-6">
                             <span className="px-3 py-1 glass text-[10px] font-bold uppercase tracking-wider text-blue-400 rounded-full">
                                {booking.time}
                             </span>
                          </td>
                          <td className="p-6 text-sm font-mono text-white/50">{booking.userEmail || 'N/A'}</td>
                          <td className="p-6 text-white/20 text-xs font-medium">
                            {booking.createdAt?.seconds 
                              ? new Date(booking.createdAt.seconds * 1000).toLocaleDateString()
                              : 'Pending...'}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="p-16 text-center text-white/20 uppercase tracking-[0.2em] text-[10px] italic">No scheduled meetings found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
