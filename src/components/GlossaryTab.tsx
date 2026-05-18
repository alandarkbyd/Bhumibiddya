import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, Volume2 } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/landData';

export const GlossaryTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const query = searchTerm.toLowerCase();
    return (
      item.term.toLowerCase().includes(query) ||
      item.pronunciation.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 mt-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
            <HelpCircle className="w-4 h-4" />
            <span>ভূমি পরিভাষা ও শব্দকোষ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 font-serif-bn">
            জমি সংক্রান্ত জটিল শব্দের সহজ ডিকশনারি
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            ভূমি অফিস ও দলিলপত্রে ব্যবহৃত পুরোনো ফারসি, আরবি ও আইনগত পরিভাষাগুলোর অর্থ এবং বাস্তব উদাহরণ জেনে নিন।
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="শব্দ খুঁজুন (যেমন: পর্চা, মৌজা, বায়া, তৌজি...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 text-white font-semibold border border-slate-700 focus:outline-none focus:border-rose-500 text-sm sm:text-base shadow-inner transition-colors"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
            >
              মুছুন
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filteredTerms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <h3 className="text-xl font-bold text-white font-serif-bn group-hover:text-rose-400 transition-colors">
                    {item.term}
                  </h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 font-mono text-[10px] font-semibold border border-rose-500/20">
                    <Volume2 className="w-3 h-3" />
                    <span>{item.pronunciation}</span>
                  </div>
                </div>
                
                <p className="text-slate-200 text-sm leading-relaxed pt-1">
                  {item.meaning}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 text-xs space-y-1">
                <span className="text-rose-400 font-bold block uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>বাস্তব উদাহরণ:</span>
                </span>
                <p className="text-slate-300 italic leading-relaxed">{item.example}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center text-slate-400 space-y-3">
          <Search className="w-12 h-12 mx-auto text-slate-600" />
          <h3 className="text-xl font-bold text-white font-serif-bn">কোনো শব্দ পাওয়া যায়নি</h3>
          <p className="text-sm">আপনার খোঁজা '{searchTerm}' শব্দটি আমাদের শব্দকোষে নেই। অন্য কোনো বানান চেষ্টা করুন।</p>
        </div>
      )}

    </div>
  );
};
