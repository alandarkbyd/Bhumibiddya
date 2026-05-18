import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  CheckSquare, 
  AlertCircle
} from 'lucide-react';
import { LAND_LAWS, BUYER_CHECKLIST } from '../data/landData';
import { ProgressState } from '../hooks/useProgress';

interface LawsSafetyTabProps {
  progress: ProgressState;
  toggleChecklist: (id: string) => void;
}

export const LawsSafetyTab: React.FC<LawsSafetyTabProps> = ({ progress, toggleChecklist }) => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [activeLawIdx, setActiveLawIdx] = useState<number | null>(0);

  const filteredChecklist = BUYER_CHECKLIST.filter(item => {
    if (filterCat === 'all') return true;
    return item.category === filterCat;
  });

  const completedCount = BUYER_CHECKLIST.filter(i => progress.completedChecklists.includes(i.id)).length;
  const totalCount = BUYER_CHECKLIST.length;

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 mt-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>আইন ও সুরক্ষা চেকলিস্ট</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
          ভূমি আইন ও জমি ক্রয়ের সতর্কতা গাইড
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          জমি কেনার আগে ও পরে কী কী পদক্ষেপ নিতে হবে তার সম্পূর্ণ চেকলিস্ট এবং জাল দলিল চেনার উপায়। সেই সাথে ২০২৩ সালের ভূমি অপরাধ প্রতিরোধ আইনের বিস্তারিত জানুন।
        </p>
      </div>

      {/* Section 1: Land Laws Breakdown */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <Scale className="w-5 h-5" />
            <span>বাংলাদেশের প্রচলিত ভূমি আইনসমূহ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-bn">
            ভূমি অপরাধ ও অধিকার সুরক্ষার আইন
          </h2>
          <p className="text-slate-400 text-sm">যেকোনো আইনের শিরোনামে ক্লিক করে তার ধারা ও শাস্তির বিধান সম্পর্কে জেনে নিন।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Law List Titles */}
          <div className="space-y-3">
            {LAND_LAWS.map((law, idx) => {
              const isActive = activeLawIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLawIdx(idx === activeLawIdx ? null : idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 font-bold shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <div className="text-sm font-serif-bn leading-tight">{law.title}</div>
                    <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-950 inline-block font-sans font-mono">
                      সন: {law.year}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase shrink-0 ${law.importanceLevel === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                    {law.importanceLevel === 'high' ? 'জরুরি' : 'সাধারণ'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Law Details Display (2 Cols) */}
          <div className="md:col-span-2">
            {activeLawIdx !== null && LAND_LAWS[activeLawIdx] ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl animate-in fade-in duration-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
                <div className="space-y-2 border-b border-slate-800 pb-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">আইন বিশ্লেষণ</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-bn">
                    {LAND_LAWS[activeLawIdx].title} ({LAND_LAWS[activeLawIdx].year})
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                    {LAND_LAWS[activeLawIdx].summary}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">প্রধান ধারা ও বিধানসমূহ:</h4>
                  <ul className="space-y-3">
                    {LAND_LAWS[activeLawIdx].keyProvisions.map((prov, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{prov}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm leading-relaxed">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-xs mb-0.5">শাস্তি ও প্রতিকার:</span>
                    <span>{LAND_LAWS[activeLawIdx].penalty}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-slate-800 text-center text-slate-500 space-y-2">
                <Scale className="w-12 h-12 mx-auto text-slate-700" />
                <p>আইনের বিস্তারিত জানতে বামপাশ থেকে যেকোনো একটি আইন নির্বাচন করুন।</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Section 2: Buyer Checklist */}
      <div className="space-y-6 pt-8 border-t border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-bn flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-emerald-400" />
              <span>জমি ক্রয়ের এ-টু-জেড চেকলিস্ট</span>
            </h2>
            <p className="text-slate-400 text-sm">কেনার আগে প্রতিটি ধাপ নিজে পরীক্ষা করে চেকলিস্টে টিক দিন।</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold">সম্পন্ন:</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">{completedCount} / {totalCount}</span>
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 pb-2">
          {[
            { id: 'all', label: 'সকল ধাপ' },
            { id: 'before_buying', label: 'কেনার আগে করণীয়' },
            { id: 'during_deed', label: 'দলিল ও বায়নার সময়' },
            { id: 'after_buying', label: 'কেনার পরে করণীয়' },
            { id: 'fake_detect', label: 'জাল দলিল চেনার উপায়' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filterCat === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Checklist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChecklist.map((item) => {
            const isDone = progress.completedChecklists.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-300 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isDone 
                    ? 'bg-emerald-500 text-slate-950 shadow' 
                    : 'bg-slate-800 border border-slate-700 text-slate-500'
                }`}>
                  {isDone && <CheckSquare className="w-4 h-4 font-black" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-bold text-base font-serif-bn ${isDone ? 'text-emerald-400 line-through opacity-80' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    {item.crucial && !isDone && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full uppercase font-bold shrink-0">
                        অত্যন্ত জরুরি
                      </span>
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'opacity-70' : 'text-slate-300'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
