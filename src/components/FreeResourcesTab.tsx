import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  Building2, 
  Play, 
  Wrench, 
  FileText, 
  Users, 
  Search,
  CheckCircle,
  Filter
} from 'lucide-react';
import { FREE_RESOURCES } from '../data/landData';

export const FreeResourcesTab: React.FC = () => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredResources = FREE_RESOURCES.filter(res => {
    const matchesCategory = filterCat === 'all' || res.category === filterCat;
    const matchesSearch = searchTerm === '' || 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'সব রিসোর্স', count: FREE_RESOURCES.length },
    { id: 'government', label: 'সরকারি পোর্টাল', count: FREE_RESOURCES.filter(r => r.category === 'government').length },
    { id: 'document', label: 'আইন ও ডকুমেন্ট', count: FREE_RESOURCES.filter(r => r.category === 'document').length },
    { id: 'video', label: 'ভিডিও টিউটোরিয়াল', count: FREE_RESOURCES.filter(r => r.category === 'video').length },
    { id: 'tool', label: 'টুল ও ক্যালকুলেটর', count: FREE_RESOURCES.filter(r => r.category === 'tool').length },
    { id: 'practice', label: 'কমিউনিটি', count: FREE_RESOURCES.filter(r => r.category === 'practice').length },
  ];

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'government': return <Building2 className="w-5 h-5" />;
      case 'video': return <Play className="w-5 h-5" />;
      case 'tool': return <Wrench className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'practice': return <Users className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'government': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'video': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'tool': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'document': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'practice': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'government': return 'সরকারি';
      case 'video': return 'ভিডিও';
      case 'tool': return 'টুল';
      case 'document': return 'আইন';
      case 'practice': return 'কমিউনিটি';
      default: return 'অন্যান্য';
    }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 mt-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <Globe className="w-4 h-4" />
          <span>সম্পূর্ণ ফ্রি রিসোর্স সংকলন</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
          জমি ও ভূমি বিষয়ক ফ্রি অনলাইন রিসোর্স
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          বাংলাদেশের সকল সরকারি ভূমি পোর্টাল, আইন, টুলস ও শিক্ষামূলক রিসোর্স এক জায়গায়। প্রতিটি লিংক ক্লিকেবল - সরাসরি ওয়েবসাইটে যান।
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="রিসোর্স খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900 text-white font-semibold border border-slate-700 focus:outline-none focus:border-cyan-500 text-sm shadow-inner"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCat(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filterCat === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                filterCat === cat.id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <a 
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noreferrer"
            className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getCategoryColor(res.category)}`}>
                  {getCategoryIcon(res.category)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>ফ্রি</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-serif-bn flex items-center gap-2">
                  <span>{res.title}</span>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{res.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase border ${getCategoryColor(res.category)}`}>
                {getCategoryLabel(res.category)}
              </span>
              <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>ভিজিট করুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center text-slate-400 space-y-3">
          <Search className="w-12 h-12 mx-auto text-slate-600" />
          <h3 className="text-xl font-bold text-white font-serif-bn">কোনো রিসোর্স পাওয়া যায়নি</h3>
          <p className="text-sm">আপনার সার্চ টার্ম বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </div>
      )}

      {/* How to Use Guide */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-teal-500/30 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-teal-400 font-bold uppercase tracking-wider block">গাইডলাইন</span>
            <h3 className="text-xl font-bold text-white font-serif-bn">কীভাবে এই রিসোর্সগুলো ব্যবহার করবেন</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '১', title: 'সরকারি পোর্টাল', desc: 'ই-পর্চা, ই-নামজারি, অনলাইন খাজনা - এই পোর্টালগুলোতে গিয়ে সরাসরি সেবা নিন। NID নম্বর দিয়ে রেজিস্ট্রেশন করুন।', color: 'emerald' },
            { step: '২', title: 'আইন পড়ুন', desc: 'bdlaws.minlaw.gov.bd এ গিয়ে ভূমি সংক্রান্ত আইনগুলো বাংলায় পড়ুন। প্রতিটি ধারা মনোযোগ সহকারে বুঝুন।', color: 'amber' },
            { step: '৩', title: 'ভিডিও দেখুন', desc: 'YouTube এ ভূমি বিষয়ক টিউটোরিয়াল দেখুন। বাস্তব উদাহরণসহ শিখুন। স্ক্রিন রেকর্ডিং দেখে নিজে প্র্যাকটিস করুন।', color: 'rose' },
            { step: '৪', title: 'টুল ব্যবহার করুন', desc: 'মোবাইল অ্যাপ ও অনলাইন ক্যালকুলেটর দিয়ে জমির হিসাব করুন। GPS দিয়ে জমি মাপুন।', color: 'cyan' },
          ].map((item) => (
            <div key={item.step} className={`p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3`}>
              <div className={`w-8 h-8 rounded-full bg-${item.color}-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow-lg`}>
                {item.step}
              </div>
              <h4 className="font-bold text-white font-serif-bn">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
