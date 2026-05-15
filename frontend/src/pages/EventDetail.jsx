import { useState } from "react";
import { motion } from "framer-motion";
import { TimelineItem } from "../components/ui/TimelineItem";
import { RegistrationModal } from "../components/ui/RegistrationModal";
import { NeonButton } from "../components/ui/NeonButton";
import { GlassCard } from "../components/ui/GlassCard";
import { SpeakerCard } from "../components/ui/SpeakerCard";
import { FAQAccordion } from "../components/ui/FAQAccordion";
import { StickyRegister } from "../components/ui/StickyRegister";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronLeft,
  Share2,
  Award,
  Zap,
  Briefcase,
  Users2,
  Info,
  Mic2,
  HelpCircle
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const AGENDA = [
  { time: "09:00 AM", title: "Opening Ceremony", description: "Keynote speech by industry leaders and university deans." },
  { time: "10:30 AM", title: "Hackathon Kickoff", description: "Team formation and release of problem statements." },
  { time: "01:00 PM", title: "Lunch & Networking", description: "Connect with mentors and fellow participants in the lounge." },
  { time: "02:30 PM", title: "Technical Mentorship", description: "One-on-one sessions with domain experts." },
  { time: "06:00 PM", title: "Initial Pitch Deck", description: "Showcase your progress and get early feedback." },
];

const SPEAKERS = [
  { name: "Dr. Sarah Chen", role: "Principal Scientist", company: "OpenAI", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { name: "Alex Rivera", role: "Design Director", company: "Figma", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { name: "James Wilson", role: "Senior Developer", company: "Microsoft", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
];

const FAQS = [
  { question: "Is this event open for all departments?", answer: "Yes! While the focus is on AI and tech, we welcome students from all backgrounds to bring diverse perspectives to team formations." },
  { question: "Do I need to have a team beforehand?", answer: "Not necessarily. We will have a dedicated team formation session during the opening ceremony where you can find like-minded peers." },
  { question: "Will there be any registration fee?", answer: "The event is completely free for all verified university students. Make sure to bring your student ID for on-site verification." },
  { question: "What should I bring for the hackathon?", answer: "Your laptop, charger, and a curious mind! We will provide high-speed internet, meals, and specialized hardware for participants." },
];

export const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const eventData = {
    title: "Global AI Hackathon 2026",
    category: "Technology",
    date: "May 24, 2026",
    time: "48 Hours",
    location: "Main Auditorium & Innovation Lab",
    attendees: "1,240 Registered",
    seatsLeft: 12,
    totalSeats: 1252,
    description: "The Global AI Hackathon is the flagship event for innovators across the campus. This year, we focus on Generative AI and its impact on sustainable development. Whether you are a coder, designer, or strategist, this is your platform to build the future.",
    organizer: "AI Student Society",
  };

  const progress = (eventData.seatsLeft / eventData.totalSeats) * 100;

  return (
    <div className="min-h-screen pb-20">
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        eventTitle={eventData.title}
        eventDate={eventData.date}
        eventTime={eventData.time}
        eventLocation={eventData.location}
      />

      <StickyRegister 
        eventTitle={eventData.title}
        seatsLeft={eventData.seatsLeft}
        onRegister={() => setIsModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-end pb-20 px-6 overflow-hidden">
        {/* Banner Image / Gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary-purple/10 z-0" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-all font-bold uppercase tracking-widest text-xs mb-10"
          >
            <ChevronLeft size={18} /> Back to Hub
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex gap-3 mb-6">
                <span className="glass px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-primary-cyan border-primary-cyan/20">
                  {eventData.category}
                </span>
                <span className="bg-accent-danger/20 text-accent-danger border border-accent-danger/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent-danger rounded-full animate-pulse" /> Trending Now
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                {eventData.title}
              </h1>
              
              <div className="flex flex-wrap gap-8">
                <HeroInfo icon={Calendar} label={eventData.date} />
                <HeroInfo icon={MapPin} label={eventData.location} />
                <HeroInfo icon={Users2} label={eventData.attendees} />
              </div>
            </div>

            <div className="lg:flex flex-col items-end">
              <GlassCard className="p-8 border-white/10 w-full max-w-sm mb-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-text-muted">Registration Pass</p>
                  <p className="text-xs font-black text-accent-warning">Almost Full</p>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - (eventData.seatsLeft / eventData.totalSeats * 100)}%` }}
                    className="h-full bg-neon-gradient shadow-neon-purple"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <NeonButton onClick={() => setIsModalOpen(true)} className="flex-1 py-4">Register Now</NeonButton>
                  <button className="glass p-4 rounded-xl hover:bg-white/10 text-text-muted">
                    <Share2 size={20} />
                  </button>
                </div>
              </GlassCard>
              <p className="text-xs text-text-muted font-bold mr-4 uppercase tracking-widest">Hosted by <span className="text-primary-cyan">{eventData.organizer}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          
          {/* Left Column: Info, Speakers, FAQs */}
          <div className="lg:col-span-2 space-y-32">
            
            {/* About Section */}
            <section>
              <SectionHeader icon={Info} title="About the Event" />
              <div className="glass p-10 rounded-[32px] border-white/5">
                <p className="text-xl text-text-muted leading-relaxed mb-8">
                  {eventData.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <PerkItem icon={Award} label="Certificate" />
                  <PerkItem icon={Zap} label="XP Points" />
                  <PerkItem icon={Briefcase} label="Internships" />
                </div>
              </div>
            </section>

            {/* Speakers Section */}
            <section>
              <SectionHeader icon={Mic2} title="Guest Speakers" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SPEAKERS.map((speaker, index) => (
                  <SpeakerCard key={index} {...speaker} />
                ))}
              </div>
            </section>

            {/* FAQs Section */}
            <section>
              <SectionHeader icon={HelpCircle} title="Frequently Asked" />
              <div>
                {FAQS.map((faq, index) => (
                  <FAQAccordion key={index} {...faq} />
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Timeline */}
          <div className="relative">
            <div className="sticky top-32">
              <SectionHeader icon={Clock} title="Event Timeline" />
              <div className="ml-4">
                {AGENDA.map((item, index) => (
                  <TimelineItem 
                    key={index}
                    {...item}
                    isLast={index === AGENDA.length - 1}
                  />
                ))}
              </div>
              
              {/* Reminder Card */}
              <GlassCard className="mt-12 p-8 border-primary-cyan/20 bg-primary-cyan/5">
                <h4 className="text-lg font-black mb-4">Don't miss a thing!</h4>
                <p className="text-sm text-text-muted mb-6">Receive real-time notifications about session starts and team formation updates.</p>
                <button className="text-xs font-black uppercase tracking-widest text-primary-cyan hover:underline">Enable Alerts</button>
              </GlassCard>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const HeroInfo = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3">
    <Icon size={20} className="text-primary-cyan" />
    <span className="text-sm md:text-base font-bold text-text-light">{label}</span>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-primary-purple shadow-neon-purple/20">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-black tracking-tight">{title}</h2>
  </div>
);

const PerkItem = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center gap-4 text-center group">
    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary-cyan group-hover:bg-primary-cyan/10 transition-colors">
      <Icon size={28} />
    </div>
    <span className="text-sm font-black uppercase tracking-widest text-text-muted">{label}</span>
  </div>
);
