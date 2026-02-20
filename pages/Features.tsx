
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenHeader } from '../components/Shared';
import { 
  BookOpen, BrainCircuit, Gavel, 
  Files, Library, Trophy, Star, Box, Download 
} from 'lucide-react';
import html2canvas from 'html2canvas';

const Features: React.FC = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: "Curated Modules",
      desc: "Structured lessons covering the entire Malaysian Legal System syllabus.",
      color: "bg-blue-50"
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
      title: "AI Legal Tutor",
      desc: "Interactive assistant powered by Gemini for instant legal clarifications.",
      color: "bg-purple-50"
    },
    {
      icon: <Files className="w-6 h-6 text-amber-600" />,
      title: "Question Bank",
      desc: "Access past year exam papers and model answer keys.",
      color: "bg-amber-50"
    },
    {
      icon: <Library className="w-6 h-6 text-indigo-600" />,
      title: "Digital Statutes",
      desc: "Full text of Federal Constitution and key Acts of Parliament.",
      color: "bg-indigo-50"
    },
    {
      icon: <Star className="w-6 h-6 text-orange-600" />,
      title: "Smart Binder",
      desc: "Bookmark and organize statutes, cases, and notes into custom folders.",
      color: "bg-orange-50"
    },
    {
      icon: <Trophy className="w-6 h-6 text-pink-600" />,
      title: "Gamified Learning",
      desc: "Test your knowledge with quizzes and interactive games.",
      color: "bg-pink-50"
    },
    {
      icon: <Gavel className="w-6 h-6 text-slate-600" />,
      title: "Virtual Court",
      desc: "Immersive virtual tours of Malaysian court complexes.",
      color: "bg-slate-100"
    }
  ];

  const handleDownload = async () => {
    if (contentRef.current) {
        const element = contentRef.current;
        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#F8FAFC', // Match app background
                scale: 2, // Retine quality
                logging: false,
                useCORS: true
            });
            
            const data = canvas.toDataURL('image/jpeg', 0.9);
            const link = document.createElement('a');
            link.href = data;
            link.download = 'MyLegS-Features.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to generate image", error);
            alert("Could not generate image. Please try again.");
        }
    }
  };

  return (
    <div className="pb-32 bg-background min-h-screen animate-page-enter">
      <ScreenHeader 
        title="Features List" 
        subtitle="App Capabilities"
        onBack={() => navigate('/more')}
        rightElement={
            <button 
                onClick={handleDownload}
                className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 active:scale-90 transition-all"
                title="Download as JPEG"
            >
                <Download className="w-5 h-5" />
            </button>
        }
      />

      {/* Printable Area */}
      <div ref={contentRef} className="px-6 mt-6 pb-12 bg-background">
        <div className="text-center mb-8 pt-4">
           <div className="inline-block p-3 rounded-2xl bg-blue-100 mb-4">
              <Box className="w-8 h-8 text-blue-600" />
           </div>
           <h1 className="font-serif font-bold text-3xl text-slate-900 mb-2">App Features</h1>
           <p className="text-slate-500 text-sm">Explore all the powerful tools included in MyLegS v1.0.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 text-base">{f.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{f.desc}</p>
               </div>
            </div>
          ))}
        </div>
        
        {/* Footer in Image */}
        <div className="mt-8 text-center opacity-40">
            <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">MyLegS • Malaysian Legal System</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
