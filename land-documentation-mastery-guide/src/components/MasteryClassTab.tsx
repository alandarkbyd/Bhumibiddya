import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Lightbulb, 
  HelpCircle, 
  Check, 
  X, 
  Award,
  ChevronRight,
  Sparkles,
  Monitor,
  ExternalLink,
  Globe,
  Building2,
  Play,
  Wrench,
  FileText,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CurriculumDay } from '../data/landData';
import { getEnhancedCurriculumDays } from '../utils/enhancedCurriculum';
import { ProgressState } from '../hooks/useProgress';

const ENHANCED_DAYS = getEnhancedCurriculumDays();

interface MasteryClassTabProps {
  progress: ProgressState;
  toggleDayComplete: (day: number) => void;
  markQuizComplete: (day: number) => void;
  setActiveTab: (tab: any) => void;
}

export const MasteryClassTab: React.FC<MasteryClassTabProps> = ({
  progress,
  toggleDayComplete,
  markQuizComplete,
  setActiveTab
}) => {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const currentDay: CurriculumDay = ENHANCED_DAYS.find((d: CurriculumDay) => d.day === selectedDayNum) || ENHANCED_DAYS[0];
  const isCompleted = progress.completedDays.includes(currentDay.day);

  const handleSelectDay = (dayNum: number) => {
    setSelectedDayNum(dayNum);
    setQuizAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOptionSelect = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleVerifyQuiz = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    currentDay.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] !== q.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      markQuizComplete(currentDay.day);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleToggleCompleted = () => {
    const willBeCompleted = !isCompleted;
    toggleDayComplete(currentDay.day);
    if (willBeCompleted) {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-300">
      
      {/* Header & Course Overview */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 mt-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
              <BookOpen className="w-4 h-4" />
              <span>৭ দিনের পূর্ণাঙ্গ গাইডলাইন</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-serif-bn">
              জমি ও দলিলপত্র শেখার মাস্টারক্লাস
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              প্রতিদিন একটি করে অধ্যায় মনোযোগ সহকারে পড়ুন, বাস্তব উদাহরণগুলোর সাথে মিলান এবং কুইজে অংশ নিয়ে নিজের জ্ঞান যাচাই করুন।
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400">আপনার অগ্রগতি</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-white font-serif-bn">
                {progress.completedDays.length} <span className="text-slate-500 text-lg">/ ৭ দিন</span>
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                {Math.round((progress.completedDays.length / 7) * 100)}%
              </span>
            </div>
            <div className="w-full md:w-48 bg-slate-800 rounded-full h-2 mt-1 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(progress.completedDays.length / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Days Horizontal Navigation */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ENHANCED_DAYS.map((d: CurriculumDay) => {
              const isSel = d.day === selectedDayNum;
              const isComp = progress.completedDays.includes(d.day);
              const isQDone = progress.completedQuizzes[d.day];

              return (
                <button
                  key={d.day}
                  onClick={() => handleSelectDay(d.day)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap shrink-0 ${
                    isSel
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/25'
                      : isComp
                      ? 'bg-slate-900 text-emerald-300 border border-emerald-500/30 hover:bg-slate-800/80'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {isComp ? (
                    <CheckCircle2 className={`w-4 h-4 ${isSel ? 'text-slate-950' : 'text-emerald-400'}`} />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                  <span>দিন {d.day}: {d.title.split(' ')[0]}...</span>
                  {isQDone && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 ml-1" title="কুইজ সম্পন্ন" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Selected Day Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Lecture Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold">
                  <span>মাস্টারক্লাস পাঠ - দিন {currentDay.day}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-slate-400 font-normal">
                    <Clock className="w-4 h-4" />
                    <span>{currentDay.duration}</span>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-bn">
                  {currentDay.title}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base font-medium">
                  {currentDay.subtitle}
                </p>
              </div>

              {/* Mark Completed Button */}
              <button
                onClick={handleToggleCompleted}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5" />}
                <span>{isCompleted ? 'পাঠটি সম্পন্ন করেছেন' : 'পড়া শেষ হিসেবে চিহ্নিত করুন'}</span>
              </button>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 leading-relaxed text-sm sm:text-base italic">
              "{currentDay.summary}"
            </div>

            {/* Topics List */}
            <div className="space-y-8 pt-4">
              {currentDay.topics.map((topic, tIdx) => (
                <div key={tIdx} className="space-y-3">
                  <h3 className="text-xl font-bold text-emerald-400 font-serif-bn flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{topic.title}</span>
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line">
                    {topic.content}
                  </p>

                  {topic.bulletPoints && (
                    <ul className="space-y-2 pt-2 pl-4">
                      {topic.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {(topic as any).stepByStep && (
                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900/80 border border-emerald-500/30 space-y-3">
                      <div className="font-bold text-emerald-400 uppercase tracking-wider text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>স্টেপ-বাই-স্টেপ গাইড:</span>
                      </div>
                      <div className="space-y-2">
                        {(topic as any).stepByStep.map((s: any, sIdx: number) => (
                          <div key={sIdx} className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <div className="font-bold text-emerald-300 text-xs">{s.step}</div>
                              <div className="text-sm text-slate-300 leading-relaxed">{s.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {topic.example && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border-l-4 border-teal-400 text-slate-300 text-sm space-y-1">
                      <div className="font-bold text-teal-400 uppercase tracking-wider text-xs">বাস্তব উদাহরণ ও চেনার উপায়:</div>
                      <p className="leading-relaxed">{topic.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Practical Tip Widget */}
          <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 bg-gradient-to-r from-teal-950/20 to-slate-950 shadow-xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/10">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white font-serif-bn">আজকের প্রাকটিক্যাল টিপস</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{currentDay.practicalTip}</p>
            </div>
          </div>

          {/* Online Practice Section */}
          {currentDay.onlinePractice && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">ফ্রি অনলাইন প্র্যাকটিস</span>
                  <h3 className="text-xl font-bold text-white font-serif-bn">{currentDay.onlinePractice.title}</h3>
                </div>
              </div>

              <div className="space-y-6">
                {currentDay.onlinePractice.steps.map((step) => (
                  <div key={step.step} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-sm shrink-0 shadow-lg shadow-cyan-500/20">
                        {step.step}
                      </div>
                      {step.step < currentDay.onlinePractice!.steps.length && (
                        <div className="w-0.5 h-full bg-slate-800 group-hover:bg-cyan-500/30 transition-colors mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6 space-y-3">
                      <h4 className="text-base font-bold text-white font-serif-bn group-hover:text-cyan-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                      
                      {step.tips && step.tips.length > 0 && (
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                          {step.tips.map((tip, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-400">
                              <span className="text-cyan-400 mt-0.5">▸</span>
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.actionUrl && (
                        <a 
                          href={step.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-semibold transition-all hover:gap-3"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{step.actionLabel || 'লিংকে যান'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free Resources Section */}
          {currentDay.freeResources && currentDay.freeResources.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-500/20">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-purple-400 font-bold uppercase tracking-wider block">সম্পূর্ণ ফ্রি</span>
                  <h3 className="text-xl font-bold text-white font-serif-bn">আজকের ফ্রি রিসোর্স ও লিংক</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentDay.freeResources.map((res) => (
                  <a 
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-start gap-3 group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      res.category === 'government' ? 'bg-emerald-500/20 text-emerald-400' :
                      res.category === 'video' ? 'bg-rose-500/20 text-rose-400' :
                      res.category === 'tool' ? 'bg-cyan-500/20 text-cyan-400' :
                      res.category === 'document' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {res.category === 'government' ? <Building2 className="w-4 h-4" /> :
                       res.category === 'video' ? <Play className="w-4 h-4" /> :
                       res.category === 'tool' ? <Wrench className="w-4 h-4" /> :
                       res.category === 'document' ? <FileText className="w-4 h-4" /> :
                       <Users className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{res.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">ফ্রি</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>ক্লিক করুন</span>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Quiz & Next Day Widget */}
        <div className="space-y-6">
          
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 shadow-xl sticky top-24">
            
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg font-serif-bn">জ্ঞান যাচাই কুইজ</h3>
                <span className="text-xs text-slate-400">দিন {currentDay.day} এর প্রশ্নের উত্তর দিন</span>
              </div>
            </div>

            <div className="space-y-6">
              {currentDay.quiz.map((q, qIdx) => {
                const selectedAns = quizAnswers[qIdx];
                const isCorrect = selectedAns === q.answer;

                return (
                  <div key={qIdx} className="space-y-3">
                    <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                      প্রশ্ন {qIdx + 1}: {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80";
                        if (selectedAns === optIdx) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                        }
                        if (quizSubmitted) {
                          if (optIdx === q.answer) {
                            btnStyle = "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg";
                          } else if (selectedAns === optIdx) {
                            btnStyle = "bg-rose-500/20 text-rose-300 border-rose-500/50 line-through";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleOptionSelect(qIdx, optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.answer && (
                              <Check className="w-4 h-4 text-slate-950 shrink-0 font-extrabold" />
                            )}
                            {quizSubmitted && selectedAns === optIdx && optIdx !== q.answer && (
                              <X className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-3 rounded-xl text-xs space-y-1 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
                        <div className="font-bold flex items-center gap-1">
                          {isCorrect ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>সঠিক উত্তর!</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>ভুল হয়েছে!</span>
                            </>
                          )}
                        </div>
                        <p className="text-slate-300 leading-relaxed mt-1">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < currentDay.quiz.length}
                  onClick={handleVerifyQuiz}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
                >
                  উত্তর যাচাই করুন
                </button>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(false)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-all"
                >
                  পুনরায় চেষ্টা করুন
                </button>
              )}
            </div>

            {/* Next Day Navigation */}
            <div className="pt-4 flex items-center justify-between">
              {currentDay.day < 7 ? (
                <button
                  onClick={() => handleSelectDay(currentDay.day + 1)}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>পরবর্তী দিন ({currentDay.day + 1}) শুরু করুন</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('exam')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 animate-pulse-slow"
                >
                  <Award className="w-5 h-5" />
                  <span>চূড়ান্ত পরীক্ষায় অংশ নিন</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
