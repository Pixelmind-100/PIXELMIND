/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Heart, 
  BookOpen, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronDown,
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Search,
  MessageSquare,
  ClipboardCheck,
  Rocket,
  ArrowUp,
  ArrowLeft,
  Home,
  Award,
  Smile,
  Coffee,
  Library,
  Palmtree,
  Star,
} from 'lucide-react';

// Fix for default marker icon in leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- Constants ---
const SCHOOL_COORDS: [number, number] = [31.803995, 35.2169927];
const POINTS_OF_INTEREST: any[] = [];

// --- Global Components ---

const MapComponent = () => {
  return (
    <div className="w-full h-[400px] rounded-[3rem] overflow-hidden shadow-xl border-2 border-[#d85858] relative z-0">
      <MapContainer center={SCHOOL_COORDS} zoom={18} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={SCHOOL_COORDS}>
          <Popup>
            <div className="text-right font-sans">
              <h3 className="font-bold text-natural-primary text-lg">בית עולות</h3>
              <p>מעגלי הרי"ם לוין 29, ירושלים</p>
            </div>
          </Popup>
        </Marker>
        {POINTS_OF_INTEREST.length > 0 && POINTS_OF_INTEREST.map((poi, idx) => (
          <Marker key={idx} position={poi.coords as [number, number]}>
            <Popup>
              <div className="text-right font-sans">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="font-bold">{poi.name}</span>
                  <span className="text-natural-accent">{poi.icon}</span>
                </div>
                <p className="text-sm text-natural-muted">{poi.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// --- Global Components ---

const Logo = ({ className = "", onClick }: { className?: string, onClick?: () => void }) => (
  <div 
    className={`flex flex-col items-center py-2 px-4 ${className} select-none ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className="relative w-40 h-16">
      {/* Grey Roof Line (Left) */}
      <svg className="absolute top-[10px] left-2 w-[110px] h-12 text-[#9da3a7]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 38 L50 5 L95 38" />
      </svg>
      {/* Red Roof Line (Right) with Chimney */}
      <svg className="absolute top-[2px] right-2 w-[110px] h-12 text-[#e21e21]" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 38 L50 5 L95 38" />
        <rect x="71" y="8" width="13" height="22" fill="currentColor" stroke="none" />
      </svg>
    </div>
    <div className="flex flex-col items-center leading-none text-center -mt-1">
      <span className="text-[2.6rem] font-extralight tracking-[-0.04em] text-black mb-1" style={{ fontFamily: '"Heebo", sans-serif' }}>בית עולות</span>
      <span className="text-[10px] text-[#6d6e71] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: '"Heebo", sans-serif' }}>קרית חינוך ופנימייה לבנות</span>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'דף הבית', href: '#' },
    { name: 'החזון שלנו', href: '#vision' },
    { name: 'סדר יום', href: '#routine' },
    { name: 'התיכון', href: '#school' },
    { name: 'הפנימייה', href: '#boarding' },
    { name: 'הצוות', href: '#team' },
    { name: 'צור קשר', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Logo onClick={scrollToTop} className="scale-100 md:scale-110" />
          </motion.div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-12">
          {navLinks.map((link, idx) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              whileHover={{ scale: 1.05, color: "#5a8259" }}
              className={`text-sm font-medium transition-colors ${idx === 0 ? 'text-natural-primary border-b-2 border-natural-primary pb-1' : 'text-natural-muted hover:text-natural-primary'}`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05, backgroundColor: "#4a6b49" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-natural-primary text-white rounded-full text-sm font-semibold hover:bg-[#4a6b49] shadow-sm transition-all"
          >
            הרשמה לפנימיה
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-natural-muted focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-natural-border p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-natural-text hover:text-natural-primary"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-natural-primary text-white rounded-xl text-center font-bold"
            >
              הרשמה
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, badge, inverted = false }: { children: React.ReactNode, badge?: string, inverted?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col mb-16 ${inverted ? 'items-center text-center' : 'items-start'}`}
  >
    {badge && (
      <div className="flex items-center gap-3 mb-4">
        <div className="h-0.5 w-6 bg-natural-accent/40" />
        <span className="text-natural-accent text-xs font-black uppercase tracking-[0.25em]">
          {badge}
        </span>
        <div className="h-0.5 w-6 bg-natural-accent/40" />
      </div>
    )}
    <h2 className={`text-4xl md:text-6xl font-black leading-[1.1] text-black tracking-tight`}>
      {children}
    </h2>
  </motion.div>
);


const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 z-[60] w-14 h-14 bg-natural-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-natural-accent/90 transition-all border-4 border-white"
          title="חזרה למעלה"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      className="border-b border-natural-border/50"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right group"
      >
        <span className="text-xl font-bold text-natural-text group-hover:text-natural-accent transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-natural-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-natural-muted leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen selection:bg-natural-accent/20 bg-natural-bg scroll-smooth" dir="rtl">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden pt-24 md:pt-32 bg-white">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-natural-secondary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-natural-accent/5 rounded-full blur-[150px]" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-natural-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-32 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-natural-accent" />
                <span className="text-natural-accent text-sm font-bold uppercase tracking-[0.2em]">הבית שלך בירושלים</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-6xl md:text-[5.5rem] font-black text-black leading-[0.9] tracking-tight"
              >
                קרית חינוך<br />
                <span className="text-natural-accent/90 italic font-light block mt-4 md:mt-2 text-5xl md:text-7xl">שהיא בית חם.</span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-natural-muted max-w-lg leading-relaxed font-medium"
            >
              ב'בית עולות' אנחנו משלבים בין רמה לימודית גבוהה לבין מעטפת רגשית עוטפת. מקום שבו כל נערה יכולה למצוא את האמון, הקשר והצמיחה שהיא זקוקה להם.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(90, 130, 89, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-natural-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-natural-primary/20 transition-all" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                בואי נכיר מקרוב
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fdfdfb" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-natural-border text-natural-text rounded-2xl font-bold text-lg bg-transparent transition-all"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                קצת עלינו
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center p-8"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-[550px] aspect-[4/5] z-10 transition-transform duration-700">
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.4, delay: 0.4, ease: "circOut" }}
                className="w-full h-full bg-white p-3 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-natural-border relative overflow-hidden"
              >
                <motion.img 
                  initial={{ scale: 1.2, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 2 }}
                  src="https://lh3.googleusercontent.com/d/18iXIgIr7RpV0gtLIh2JKpgoWmR5lCT_t" 
                  alt="בנות שמחות ומחייכות באווירה פתוחה"
                  className="w-full h-full object-cover rounded-[3.2rem]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-natural-accent/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-10"
        >
            {[
            {
              icon: "🏡",
              title: "קרית חינוך שהיא בית",
              desc: "שילוב ייחודי בין תיכון פנימייתי לקמפוס שוקק חיים, המעניק ביטחון ויציבות.",
            },
            {
              icon: "📜",
              title: "חיבור לתורה וערכים",
              desc: "חיזוק הזהות היהודית, יראת שמיים ואחריות אישית כבסיס לכל צמיחה.",
            },
            {
              icon: "🕯️",
              title: "גילוי ה'אור' המיוחד",
              desc: " אנחנו כאן כדי לעזור לכל נערה להאיר את הכישרון הייחודי לה.",
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="bg-white p-10 rounded-[3.5rem] border border-natural-border flex flex-col items-center text-center gap-6 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="w-24 h-24 bg-natural-secondary/30 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-natural-accent group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                <span className="text-4xl">{item.icon}</span>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-natural-text text-2xl leading-tight">{item.title}</h3>
                <p className="text-natural-muted leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 bg-natural-primary/5">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading badge="החזון שלנו" inverted>הסביבה הטובה דיה</SectionHeading>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[4rem] shadow-sm text-center space-y-8"
          >
            <p className="text-2xl text-natural-text font-medium leading-relaxed italic">
              "אנחנו מאמינים בגישת 'הסביבה הטובה דיה' של ויניקוט – יצירת מרחב שבו נערה מרגישה מספיק בטוחה כדי לטעות, לגדול ולבנות מחדש את האמון בעצמה ובעולם."
            </p>
            <div className="h-px bg-natural-border w-1/2 mx-auto" />
            <p className="text-lg text-natural-muted leading-relaxed">
              המוסד, שנוסד בשנת 1988, חרת על דגלו לתת מענה רגשי ומשפחתי עמוק לצד הישגים לימודיים. אצלנו, כל אחת היא עולם מלא של פוטנציאל שמחכה להתגלות.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden bg-natural-primary text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {[
              { label: "בוגרות מרוצות", value: "500+", icon: <Users size={32} /> },
              { label: "שנות ניסיון", value: "38+", icon: <Award size={32} /> },
              { label: "זכאות לבגרות", value: "95%", icon: <GraduationCap size={32} /> },
              { label: "ליווי אישי", value: "24/7", icon: <Smile size={32} /> }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-black">{stat.value}</div>
                <div className="text-white/80 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Routine Section */}
      <section id="routine" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="יום בחיי חניכה" inverted>סדר היום שלנו</SectionHeading>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          >
            {[
              { time: "07:30", title: "השכמה ובוקר עשיר", desc: "ארוחת בוקר מפנקת ומזינה לפתיחת היום", icon: "☕" },
              { time: "08:30", title: "לימודים בתיכון", desc: "למידה אישית ומותאמת לרמה של כל נערה", icon: "📚" },
              { time: "14:30", title: "ארוחת צהריים", desc: "תפריט מגוון, חם וביתי", icon: "🍱" },
              { time: "15:30", title: "מרכז למידה", desc: "עזרה בשיעורי בית והכנה למבחנים עם מורות מקצועיות", icon: "🎯" },
              { time: "17:00", title: "חוגים ופעילות קבוצתית", desc: "זמן לכישרון אישי, כיף ויציאה עם חברות", icon: "🎨" },
              { time: "19:30", title: "ארוחת ערב וזמן אישי", desc: "שיח אישי עם עו\"ס, שעת מסך והתארגנות לשינה", icon: "🌙" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex gap-6 p-10 bg-natural-bg/10 border border-natural-border rounded-[3rem] hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="text-5xl group-hover:scale-125 transition-transform duration-500 shrink-0 select-none">{item.icon}</div>
                <div className="flex flex-col justify-center">
                  <div className="text-natural-accent font-black text-sm mb-1 uppercase tracking-widest">{item.time}</div>
                  <h4 className="text-xl font-bold text-natural-text mb-2 leading-tight">{item.title}</h4>
                  <p className="text-sm text-natural-muted font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Boarding Section */}
      <section id="boarding" className="py-24 bg-natural-secondary/30 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative"
          >
              <div className="absolute -inset-4 bg-natural-accent/5 rounded-[4rem] blur-2xl -z-10" />
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative group p-4 bg-white rounded-[3.5rem] shadow-xl border border-natural-border overflow-hidden"
              >
                <div className="rounded-[2.5rem] overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://lh3.googleusercontent.com/d/1HTZLdYtlnWSAmllvAzc2Bior1M_2X7IV" 
                    alt="חדר פנימייה נעים"
                    className="w-full aspect-[4/3] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
             </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2"
          >
            <SectionHeading badge="הפנימייה">הפינה החמה שלך</SectionHeading>
            <p className="text-lg text-natural-muted mb-8 leading-relaxed font-medium">
              הפנימייה בבית עולות מעוצבת כדי להעניק לכל נערה תחושה של בית וחום. כאן תמצאי חדרים נעימים, אווירה משפחתית וצוות הדרכה שנמצא איתך לכל מה שצריך, ביום ובלילה.
            </p>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-4"
            >
              {[
                "ליווי אישי וצמוד לכל נערה",
                "מרחב אישי ומכבד",
                "ארוחות מזינות וחמות"
              ].map((text, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                  <CheckCircle2 className="text-natural-accent" size={20} />
                  <span className="font-bold text-natural-text text-lg">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* School Section */}
      <section id="school" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading badge="התיכון">מקום שמאמין בך</SectionHeading>
            <p className="text-xl text-natural-muted leading-relaxed mt-8 font-medium">
              התיכון שלנו מכוון לבגרות מלאה תוך מתן דגש על כישורי חיים ומגמות מרתקות המפתחות את עולמה הפנימי של כל תלמידה:
            </p>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-8 grid grid-cols-2 gap-4"
            >
               <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-natural-secondary/20 p-5 rounded-[1.5rem] border border-natural-border/30">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-natural-accent shadow-sm">
                   <CheckCircle2 size={18} />
                 </div>
                 <span className="font-bold text-natural-text text-lg">פסיכולוגיה</span>
               </motion.div>
               <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-natural-secondary/20 p-5 rounded-[1.5rem] border border-natural-border/30">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-natural-accent shadow-sm">
                   <CheckCircle2 size={18} />
                 </div>
                 <span className="font-bold text-natural-text text-lg">ניהול וכלכלה</span>
               </motion.div>
               <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-natural-secondary/20 p-5 rounded-[1.5rem] border border-natural-border/30">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-natural-accent shadow-sm">
                   <CheckCircle2 size={18} />
                 </div>
                 <span className="font-bold text-natural-text text-lg">כישורי חיים</span>
               </motion.div>
               <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-natural-secondary/30 p-5 rounded-[1.5rem] border border-natural-border/30">
                 <div className="w-10 h-10 bg-natural-accent rounded-xl flex items-center justify-center text-white shadow-sm">
                   <CheckCircle2 size={18} />
                 </div>
                 <span className="font-extrabold text-natural-text text-lg">בגרות מלאה</span>
               </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-5 bg-white rounded-[4.5rem] shadow-2xl border border-natural-border overflow-hidden relative"
          >
              <div className="absolute inset-0 bg-gradient-to-tr from-natural-accent/10 to-transparent pointer-events-none z-10" />
              <div className="rounded-[3.5rem] overflow-hidden h-[450px]">
                <motion.img 
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                  src="https://lh3.googleusercontent.com/d/1Xbk-zXM11SMe8JHpi78ievldHt-OVuTu" 
                  alt="כיתה נעימה ומזמינה" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
          </motion.div>
        </div>
      </section>

      {/* Enrichment Section */}
      <section id="enrichment" className="py-24 bg-natural-bg/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="קצת לנשמה" inverted>חוגים, העשרה ואווירה טובה</SectionHeading>
          <p className="text-center text-natural-muted font-medium mt-4 max-w-2xl mx-auto">
            מטיולי שטח חווייתיים ועד לערבי הווי מגבשים - אנחנו דואגים שכל יום יהיה מלא בשמחה, חוויות ורגעים בלתי נשכחים.
          </p>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12"
          >
            {[
              { label: "רכיבת סוסים", img: "1H21LWf8mGGGJ6hBt3llu20cL39VPZLcP" },
              { label: "שחייה", img: "1cRqdsTtXWvEUYLeNlfMWknQMatlf_p8M" },
              { label: "אומנות", img: "10TNtZF6i-b3eyVgzt8PxQHarRDa9GJjh" },
              { label: "מוזיקה", img: "1RlualquQWhnhjlIL0V2uJSB885Bfdo1p" },
              { label: "ריקוד", img: "1lYEw1Jxmq4AVcO1Waa_gRnFwHAVnBdhE" },
              { label: "אפייה", img: "18igtI3aFs4uBa3Nhn4KLaBjCSX5s4SXz" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="bg-white rounded-[3.5rem] border border-natural-border flex flex-col overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all h-full group"
              >
                <div className="h-56 w-full relative overflow-hidden">
                   <motion.img 
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.8 }}
                      src={`https://lh3.googleusercontent.com/d/${item.img}`} 
                      alt={item.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     whileHover={{ opacity: 1, y: 0 }}
                     className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                   >
                     <span className="text-white text-xs font-bold bg-natural-accent/80 backdrop-blur-md px-4 py-1 rounded-full">{item.label}</span>
                   </motion.div>
                </div>
                <div className="p-6 text-center bg-white border-t border-natural-border/20">
                  <span className="font-bold text-natural-text text-xl leading-tight block group-hover:text-natural-accent transition-colors">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-natural-bg rounded-full blur-3xl opacity-50 -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="הצוות שלנו" inverted>האנשים שמאחורי הבית</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            {/* Leadership */}
            <motion.div 
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               variants={containerVariants}
               className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-natural-accent border-b-2 border-natural-secondary pb-2 block w-max">הנהלה וטיפול</h3>
              <div className="space-y-4">
                {[
                  { title: "מרכז טיפול ורווחה", desc: "מענה רגשי וסוציאלי מקיף לכל אחת - לכל נערה מטפלת אישית צמודה", extra: "italic text-sm" },
                  { title: "צוות עובדות סוציאליות", desc: "שרה מרגלית, שרה קירמאייר, שירי פלאם" },
                  { title: "מטפלות ופסיכולוגיות", desc: "אלישבע קאניק, שירה עוזרי, שבי מילר" }
                ].map((member, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ x: -10 }}
                    className="p-4 bg-natural-bg/20 rounded-2xl border border-transparent hover:border-natural-border/50 hover:bg-white hover:shadow-md transition-all cursor-default"
                  >
                    <h5 className="font-bold text-lg">{member.title}</h5>
                    <p className={`text-natural-muted ${member.extra || 'font-medium'}`}>{member.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Field Staff */}
            <motion.div 
               initial="hidden"
               whileInView="show"
               viewport={{ once: true }}
               variants={containerVariants}
               className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-natural-accent border-b-2 border-natural-secondary pb-2 block w-max">חינוך וליווי יומיומי</h3>
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="p-5 bg-natural-bg/30 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-natural-border">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-natural-accent/10 rounded-xl flex items-center justify-center text-natural-accent">
                      <Heart size={20} />
                    </div>
                    <h5 className="font-bold text-lg"> אם הבית</h5>
                  </div>
                  <p className="text-natural-muted font-medium pr-14">חדוה בן משה</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-5 bg-natural-bg/30 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-natural-border">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-natural-accent/10 rounded-xl flex items-center justify-center text-natural-accent">
                      <Heart size={20} />
                    </div>
                    <h5 className="font-bold text-lg">צוות רכזות</h5>
                  </div>
                  <p className="text-natural-muted font-medium pr-14">יהודית חורי, רבקי גורית, מלכי קניג</p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-5 bg-natural-bg/30 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-natural-border">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-natural-accent/10 rounded-xl flex items-center justify-center text-natural-accent">
                      <Heart size={20} />
                    </div>
                    <h5 className="font-bold text-lg">המדריכות שלנו</h5>
                  </div>
                  <p className="text-natural-muted font-medium pr-14 leading-relaxed">מדריכות צעירות ומסורות שעברו הכשרה מלאה, המלוות את הבנות 24/7 בחום ובאהבה.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-natural-bg/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="מי שכבר הייתה כאן" inverted>מילים מהבוגרות שלנו</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              { text: "הגעתי לכאן מפוחדת ולא מאמינה בעצמי. היום אני בוגרת עם בגרות מלאה והרבה ביטחון בזכות הצוות שלא ויתר עליי לרגע.", author: "בוגרת מחזור 2022" },
              { text: "בית עולות הוא לא רק מקום למידה, הוא משפחה אמיתית. כאן מצאתי את המקום שלי ואת הדרך שלי.", author: "בוגרת מחזור 2023" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[3rem] shadow-sm italic relative"
              >
                <div className="text-5xl text-natural-accent opacity-10 absolute top-4 right-4">"</div>
                <p className="text-lg text-natural-muted leading-relaxed mb-6">"{t.text}"</p>
                <p className="font-bold text-natural-text not-italic">— {t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section id="registration" className="py-24 bg-natural-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-natural-accent/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="איך מצטרפים?" inverted>תהליך הרישום שלנו</SectionHeading>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mt-16 relative"
          >
            {/* Connecting Line (Desktop) */}
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-dashed bg-natural-accent/20 -translate-y-1/2 -z-10 origin-right" 
            />
            
            {[
              { 
                icon: <MessageSquare size={32} />, 
                title: "שיחת היכרות", 
                desc: "מתחילים בטלפון או בפנייה באתר כדי להכיר ולקבל פרטים ראשוניים." 
              },
              { 
                icon: <ClipboardCheck size={32} />, 
                title: "ראיון אישי", 
                desc: "מפגש מעמיק וראיון אישי להכרות עם הנערה ובדיקת התאמה הדדית." 
              },
              { 
                icon: <Rocket size={32} />, 
                title: "קליטה ושיבוץ", 
                desc: "ברוכה הבאה! תהליך ליווי אישי עד לכניסה מלאה לפנימייה ולתיכון." 
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-natural-border text-center flex flex-col items-center gap-6 relative group"
              >
                <div className="absolute -top-6 bg-natural-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <div className="w-20 h-20 bg-natural-secondary/30 rounded-3xl flex items-center justify-center text-natural-accent group-hover:rotate-12 transition-transform duration-500">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                  <p className="text-natural-muted font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading badge="מידע נוסף" inverted>שאלות נפוצות</SectionHeading>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-16 space-y-2"
          >
            <FAQItem 
              question="באילו שבתות יש שהייה בפנימייה?" 
              answer="הפנימייה פתוחה אחת לשבועיים בסופי שבוע (שבתות 'פנים'). בשבתות אלו יש תוכנית חברתית עשירה, ארוחות שבת חגיגיות ופעילות מגבשת. חגים ומועדים נחגגים בבית עם המשפחות."
            />
            <FAQItem 
              question="האם יש ליווי לימודי בצהריים?" 
              answer="בהחלט. בשעות הצהריים פועל מרכז למידה עם צוות מיומן המסייע בשיעורי בית, הכנה למבחנים ותגבור לימודי במקצועות השונים."
            />
            <FAQItem 
              question="מה לגבי ליווי רגשי אישי?" 
              answer="כל נערה המצטרפת אלינו זוכה לליווי של מטפלת אישית המעניקה אוזן קשבת, תמיכה רגשית ומענה מותאם לצרכיה הייחודיים."
            />
            <FAQItem 
              question="אילו פעילויות חברתיות יש מעבר לחוגים?" 
              answer="אנחנו מאמינים בשמחה ואווירה טובה! לאורך השנה ישנן פעילויות חווייתיות, ערבי הווי, טיולים ברחבי הארץ ואירועים מיוחדים שממלאים את הלב באור."
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="צרי קשר" inverted>מחכים לשמוע ממך</SectionHeading>
          <div className="grid md:grid-cols-2 gap-16 mt-16 items-start">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.p variants={itemVariants} className="text-2xl font-normal text-natural-text leading-tight">נשמח לענות על כל שאלה, להקשיב ולתת לך את כל המידע שאת צריכה כדי להצטרף למשפחה שלנו.</motion.p>
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                  <div className="p-4 bg-natural-bg rounded-2xl group-hover:bg-natural-accent group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <span className="text-xl font-bold">מעגלי הרי"ם לוין 29, ירושלים</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                  <div className="p-4 bg-natural-bg rounded-2xl group-hover:bg-natural-accent group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <span className="text-xl font-bold text-ltr">02-581-6715</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-4 group">
                  <div className="p-4 bg-natural-bg rounded-2xl group-hover:bg-natural-accent group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <span className="text-xl font-bold">office@bolot.co.il</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-2"
            >
              <div className="absolute inset-0 bg-natural-secondary/30 rounded-[4rem] blur-3xl -z-10" />
              <form 
                className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-natural-border/50 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-4">
                  <div className="relative group">
                    <select className="w-full p-4 pr-12 bg-natural-bg/40 border-none rounded-2xl text-natural-text font-medium appearance-none cursor-pointer focus:ring-2 focus:ring-natural-accent transition-all outline-none">
                      <option value="">במה נוכל לעזור?</option>
                      <option value="registration">פנייה לרישום</option>
                      <option value="social">שיחה עם עובדת סוציאלית</option>
                      <option value="general">בירור כללי</option>
                    </select>
                    <Heart className="absolute right-4 top-1/2 -translate-y-1/2 text-natural-accent/50" size={18} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="שם מלא" className="w-full p-4 bg-natural-bg/40 border-none rounded-2xl text-natural-text font-medium focus:ring-2 focus:ring-natural-accent transition-all outline-none" />
                    <input type="text" placeholder="מספר טלפון" className="w-full p-4 bg-natural-bg/40 border-none rounded-2xl text-natural-text font-medium focus:ring-2 focus:ring-natural-accent transition-all outline-none" />
                  </div>
                  
                  <textarea placeholder="כתבי לנו כאן..." rows={4} className="w-full p-4 bg-natural-bg/40 border-none rounded-2xl text-natural-text font-medium focus:ring-2 focus:ring-natural-accent transition-all outline-none resize-none"></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-natural-accent text-white rounded-full font-bold shadow-lg hover:shadow-2xl transition-all text-lg"
                >
                  שליחת פנייה
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-natural-text mb-4">שאלות נפוצות</h2>
            <p className="text-natural-muted font-bold uppercase tracking-widest text-sm">כל מה שחשוב לדעת על בית עולות</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "מהם תנאי הקבלה לבית עולות?",
                a: "תהליך הקבלה כולל ראיון אישי ובדיקת התאמה למסגרת הלימודית והחברתית שלנו. הקבלה נעשית בתיאום עם גורמי המקצוע במשרד הרווחה."
              },
              {
                q: "האם הלימודים בתיכון מוכרים על ידי משרד החינוך?",
                a: "כן, התיכון שלנו מפוקח ומוכר באופן מלא, והתלמידות ניגשות למבחני בגרות מלאים במסגרת הלימודים."
              },
              {
                q: "איזה סוג של ליווי טיפולי ניתן במוסד?",
                a: "לכל נערה מותאמת תוכנית אישית הכוללת ליווי של עובדת סוציאלית, שיחות אישיות וקבוצתיות, ותמיכה רגשית לאורך כל שעות היום."
              },
              {
                q: "האם יש פעילויות חברתיות מעבר לשעות הלימודים?",
                a: "בוודאי. אחר הצהריים כוללים מגוון חוגי העשרה, פעילויות חברתיות, יציאות משותפות וזמן איכות בקבוצה."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-natural-bg border border-natural-border/30 hover:border-natural-accent/50 transition-colors cursor-default">
                  <h3 className="text-lg font-black text-natural-primary mb-2 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-natural-accent/20 flex items-center justify-center text-xs text-natural-accent">?</span>
                    {faq.q}
                  </h3>
                  <p className="text-natural-text/80 leading-relaxed pr-9">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-2">מיקום הבית שלנו</h3>
              <p className="text-natural-muted font-medium">בוקר של צמיחה מתחיל בסביבה הנכונה</p>
            </div>
            <MapComponent />
          </motion.div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-16 bg-white border-y border-natural-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 text-center">
            <div className="flex flex-col items-center gap-4 group">
              <div className="p-2 transition-transform group-hover:scale-105 duration-500">
                <img 
                  src="https://drive.google.com/thumbnail?id=1qCozIWuy2s-c8cwP64VdUU7By_ItcEiY&sz=w500" 
                  alt="משרד הרווחה והביטחון החברתי" 
                  className="h-24 w-auto transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-natural-text">משרד הרווחה</span>
                <span className="block text-xs text-natural-muted font-bold uppercase tracking-widest">והביטחון החברתי</span>
              </div>
            </div>
            
            <div className="h-px w-12 bg-natural-border hidden md:block" />

            <div className="flex flex-col items-center gap-4 group">
              <div className="flex flex-col items-center justify-center transition-transform group-hover:scale-105 duration-500 min-w-[200px]">
                <div className="text-5xl font-black text-natural-primary tracking-tighter mb-1 select-none">מת"ן</div>
                <div className="text-[10px] bg-natural-accent text-white px-3 py-0.5 rounded-full font-bold shadow-sm">מפעל תורני לנוער</div>
              </div>
              <div className="space-y-1">
                <span className="block text-lg font-black text-natural-text">מת"ן</span>
                <span className="block text-xs text-natural-muted font-bold uppercase tracking-widest">מפעל תורני לנוער</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-natural-bg overflow-hidden relative">
        <div className="absolute top-20 right-0 text-[15rem] font-black text-natural-primary/5 select-none leading-none -translate-y-1/2">"</div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-natural-text mb-4">מה אומרות הבוגרות שלנו?</h2>
            <div className="w-24 h-1.5 bg-natural-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "בית עולות היה עבורי הרבה יותר מתיכון. זה המקום שבו למדתי להאמין בעצמי ולבנות את העתיד שלי.",
                author: "ש. ה.",
                year: "בוגרת מחזור תשפ\"א"
              },
              {
                text: "היחס האישי של המורות והאווירה המשפחתית נתנו לי את הכוח להצליח בבגרויות ולצאת לדרך חדשה.",
                author: "ר. כ.",
                year: "בוגרת מחזור תשפ\"ג"
              },
              {
                text: "היום אני נשואה ואמא לילד, ובכל פעם שאני נתקלת בקושי, אני נזכרת בכלים ובכוחות שקיבלתי כאן בבית עולות.",
                author: "א. פ.",
                year: "בוגרת מחזור תשפ\"ה"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-natural-border/50 relative"
              >
                <div className="text-natural-accent mb-6">
                  <Star size={24} fill="currentColor" />
                </div>
                <p className="text-lg text-natural-text leading-relaxed font-medium mb-8">
                  "{t.text}"
                </p>
                <div className="mt-auto">
                  <div className="font-black text-natural-primary">{t.author}</div>
                  <div className="text-sm text-natural-muted font-bold">{t.year}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Bar style from theme) */}
      <footer className="bg-natural-secondary py-16 px-6 border-t border-natural-border/30 overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-natural-accent/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 font-medium">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo onClick={scrollToTop} className="scale-90 origin-right transition-transform hover:scale-100" />
            <div className="text-xs text-natural-muted/80 max-w-[200px] leading-relaxed text-center md:text-right">
              בית עולות פועל בשיתוף ובפיקוח מלא של משרד הרווחה ושירותי מת"ן.
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center text-natural-muted">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xs uppercase tracking-widest text-natural-accent font-bold">כתובתנו</span>
              <a 
                href="https://maps.google.com/?q=מעגלי+הריים+לוין+29+ירושלים" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-natural-primary transition-colors"
              >
                <MapPin size={16} className="text-natural-accent" /> מעגלי הרי"ם לוין 29, ירושלים
              </a>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xs uppercase tracking-widest text-natural-accent font-bold">צרי קשר</span>
              <a href="tel:02-581-6715" className="flex items-center gap-2 hover:text-natural-primary transition-colors">
                <Phone size={16} className="text-natural-accent" /> 02-581-6715
              </a>
              <a href="mailto:office@bolot.co.il" className="flex items-center gap-2 hover:text-natural-primary transition-colors">
                <Mail size={16} className="text-natural-accent" /> office@bolot.co.il
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-natural-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-natural-muted/60 uppercase tracking-[0.2em]">
          <div>&copy; {new Date().getFullYear()} BEIT OLOT - ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-2">
            DESIGNED BY <span className="text-natural-accent font-bold tracking-normal low-case">pixelmind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
