
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Scroll, Gamepad2, Trophy, ArrowRight, CheckCircle2, Circle, Gavel } from 'lucide-react';
import { STATUTES, CASE_SUMMARIES } from '../constants';
import { ScreenHeader, SectionHeader, Card } from '../components/Shared';
import { ResourceItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import { useData } from '../context/DataContext';

interface TopicDetailProps {
  onOpenResource: (res: ResourceItem) => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ onOpenResource }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { topics } = useData();
  const topic = topics.find(t => t.id === id);
  const { isTopicCompleted, toggleTopicCompletion } = useProgress();

  if (!topic) return <div>Topic not found</div>;

  const isCompleted = isTopicCompleted(topic.id);
  const relatedStatutes = STATUTES.filter(s => topic.relatedStatuteIds.includes(s.id));
  const relatedCases = CASE_SUMMARIES.filter(c => topic.relatedCaseSummaryIds?.includes(c.id));

  const handleOpenNotes = () => {
    onOpenResource({
      id: `notes-${topic.id}`,
      title: `${topic.title} Notes`,
      type: 'webview',
      url: topic.notesUrl,
      previewText: "Read the comprehensive notes for this topic."
    });
  };

  const handleOpenQuiz = () => {
    onOpenResource({
      id: `quiz-${topic.id}`,
      title: `${topic.title} Quiz`,
      type: 'webview',
      url: topic.quizUrl,
      previewText: "Test your understanding with a quiz."
    });
  };

  const handleOpenGame = () => {
    onOpenResource({
      id: `game-${topic.id}`,
      title: `${topic.title} Game`,
      type: 'webview',
      url: topic.gameUrl,
      previewText: "Reinforce learning through an interactive game."
    });
  };

  const handleOpenCase = (caseItem: typeof CASE_SUMMARIES[0]) => {
    // Generate a mobile-friendly HTML view for the case summary
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=PP+Editorial+New:ital,wght@0,400;0,700;1,400&display=swap');
          body { 
            font-family: 'DM Sans', sans-serif; 
            padding: 32px 24px; 
            color: #0F172A; 
            line-height: 1.7; 
            background: #ffffff;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 { 
            font-family: 'PP Editorial New', serif; 
            font-size: 28px; 
            color: #1E3A8A; 
            margin-bottom: 24px; 
            line-height: 1.2;
            letter-spacing: -0.02em;
          }
          .tag {
            display: inline-block;
            background: #F1F5F9;
            color: #64748B;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 4px 10px;
            border-radius: 99px;
            margin-bottom: 24px;
          }
          p { 
            margin-bottom: 20px; 
            font-size: 16px; 
            color: #334155;
            text-align: justify;
          }
          .divider {
            height: 1px;
            background: #E2E8F0;
            margin: 32px 0;
            width: 40px;
          }
        </style>
      </head>
      <body>
        <div class="tag">Case Summary</div>
        <h1>${caseItem.title}</h1>
        ${caseItem.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        <div class="divider"></div>
        <p style="font-size: 12px; color: #94A3B8; font-style: italic;">
          This summary is for educational purposes only and should not be cited in court.
        </p>
      </body>
      </html>
    `;

    // Create a data URL (Base64 encoded to avoid URL encoding issues with special chars)
    const dataUrl = `data:text/html;base64,${btoa(unescape(encodeURIComponent(htmlContent)))}`;

    onOpenResource({
      id: `case-${caseItem.id}`,
      title: "Case Summary",
      type: 'webview',
      url: dataUrl,
      previewText: caseItem.title
    });
  };

  return (
    <div className="pb-32 bg-background min-h-screen animate-page-enter">
      <ScreenHeader 
        title={`Topic ${topic.number}`} 
        subtitle={topic.title}
        onBack={() => navigate(-1)}
      />

      <div className="px-6">
        
        {/* COMPLETION TOGGLE */}
        <div 
          onClick={() => toggleTopicCompletion(topic.id)}
          className={`
            mt-6 mb-6 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 border shadow-sm
            ${isCompleted 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-white border-slate-200 text-secondary hover:border-slate-300'
            }
          `}
        >
          <div className={`
             w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300
             ${isCompleted ? 'bg-emerald-200 text-emerald-700 scale-110' : 'bg-slate-100 text-slate-300'}
          `}>
             {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
             <h3 className={`font-bold text-sm ${isCompleted ? 'text-emerald-900' : 'text-primary'}`}>
               {isCompleted ? 'Module Completed' : 'Mark as Complete'}
             </h3>
             <p className={`text-xs ${isCompleted ? 'text-emerald-700/80' : 'text-secondary'}`}>
               {isCompleted ? 'Great job! Progress saved.' : 'Tap when you finished studying this topic.'}
             </p>
          </div>
        </div>
        
        {/* SECTION A: NOTES */}
        <SectionHeader title="Study Material" />
        <Card onClick={handleOpenNotes} className="!bg-[#1E3A8A] border-none group relative overflow-hidden p-6 hover:!bg-blue-900">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <BookOpen className="w-24 h-24 text-white transform rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Essential Reading</span>
            </div>
            <h3 className="font-serif font-bold text-2xl mb-4 tracking-normal text-white">Topic Notes</h3>
            <div className="inline-flex items-center text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-all">
              <span>Read document</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>

        {/* SECTION B: RELATED STATUTES */}
        <SectionHeader title="Legal Basis" />
        <div className="space-y-3">
          {relatedStatutes.length > 0 ? (
            relatedStatutes.map(statute => (
              <Card 
                key={statute.id} 
                onClick={() => onOpenResource({
                  id: statute.id,
                  title: statute.title,
                  url: statute.url,
                  type: 'webview',
                  previewText: 'Read the full text of this statute.'
                })}
                className="flex items-center justify-between group hover:border-blue-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                    <Scroll className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-primary leading-snug line-clamp-2 max-w-[200px]">
                    {statute.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </Card>
            ))
          ) : (
            <div 
              onClick={() => navigate('/library/statutes')}
              className="border border-dashed border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors hover:border-slate-400"
            >
              <h3 className="font-serif font-bold text-base text-primary tracking-normal">Browse Statutes Library</h3>
              <p className="text-xs text-secondary mt-1 font-medium">View complete collection of Acts</p>
            </div>
          )}
        </div>

        {/* SECTION C: CASE SUMMARIES (NEW) */}
        <SectionHeader title="Leading Cases" />
        <div className="space-y-3">
          {relatedCases.length > 0 ? (
            relatedCases.map(caseItem => (
              <Card 
                key={caseItem.id} 
                onClick={() => handleOpenCase(caseItem)}
                className="flex items-center justify-between group hover:border-amber-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:text-amber-700 transition-colors shrink-0">
                    <Gavel className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary leading-tight line-clamp-2">
                      {caseItem.title}
                    </span>
                    <span className="text-[10px] text-secondary font-medium mt-0.5 block group-hover:text-amber-600 transition-colors">
                      View Summary
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
              </Card>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">No case summaries available for this topic.</p>
            </div>
          )}
        </div>

        {/* SECTION D: ASSESSMENT */}
        <SectionHeader title="Assessment" />
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={handleOpenQuiz} 
            className="group bg-surface p-5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-soft hover:border-amber-200 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-primary mb-1">Take Quiz</h3>
            <p className="text-xs text-secondary font-medium">Test knowledge</p>
          </div>
          
          <div 
            onClick={handleOpenGame}
            className="group bg-surface p-5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-soft hover:border-purple-200 transition-all duration-300"
          >
             <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-primary mb-1">Play Game</h3>
            <p className="text-xs text-secondary font-medium">Interactive mode</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopicDetail;
