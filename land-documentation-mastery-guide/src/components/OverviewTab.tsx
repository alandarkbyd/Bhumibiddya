import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Flame, 
  Search,
  Scale,
  ExternalLink,
  Globe,
  Building2,
  Play,
  Wrench,
  Users
} from 'lucide-react';
import { TabType } from './Navbar';
import { LAND_LAWS, FREE_RESOURCES } from '../data/landData';

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
  progressPercentage: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ setActiveTab, progressPercentage }) => {
  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl mt-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.1),transparent_40%)]" />
        
        <div className="relative px-6 py-16 sm:px-12 sm:py-24 max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-emerald-500/30 text-emerald-400 text-sm font-semibold backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>বাংলাদেশের প্রথম পূর্ণাঙ্গ ও ইন্টারেক্টিভ ভূমি শিক্ষা প্ল্যাটফর্ম</span>
          </div>

          <div className="flex items-center gap-4 justify-center mb-4">
            <img src="/images/logo.png" alt="ভূমিবিদ্যা" className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-2xl shadow-emerald-500/30" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.2] font-serif-bn">
            জমি ও খতিয়ানের জটিল হিসাব শিখুন <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              মাত্র ৭ দিনের মাস্টারক্লাসে
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            সিএস, এসএ, আরএস খতিয়ান চেনার উপায়, আনা-গণ্ডার জটিল হিসাব, দলিল পড়ার নিয়ম, জমি মাপজোকের সূত্র এবং ২০২৩ সালের ভূমি অপরাধ প্রতিরোধ আইনের এ-টু-জেড গাইডলাইন।
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveTab('mastery')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <BookOpen className="w-5 h-5" />
              <span>৭ দিনের গাইড শুরু করুন</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('doclab')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card hover:bg-slate-800/80 text-white font-semibold text-lg border border-slate-700 shadow-lg flex items-center justify-center gap-3 transition-all duration-200"
            >
              <FileText className="w-5 h-5 text-teal-400" />
              <span>ইন্টারেক্টিভ খতিয়ান ল্যাব</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-emerald-400 font-serif-bn">৭ দিন</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">স্টেপ-বাই-স্টেপ সিলেবাস</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-teal-300 font-serif-bn">৩টি+</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">লাইভ দলিল ও খতিয়ান সিমুলেটর</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-cyan-400 font-serif-bn">১৫+</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">ভূমি পরিমাপ ও রূপান্তর সূত্র</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <div className="text-3xl font-extrabold text-amber-400 font-serif-bn">২০২৩</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">হালনাগাদ ভূমি আইন ও প্রতিকার</div>
            </div>
          </div>

        </div>
      </div>

      {/* Progress Reminder Widget (If user started) */}
      {progressPercentage > 0 && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-950/50">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-500/30">
              <Flame className="w-8 h-8 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif-bn">আপনার মাস্টারক্লাস যাত্রা চলমান আছে!</h3>
              <p className="text-slate-400 text-sm mt-1">আপনি মোট সিলেবাসের <span className="text-emerald-400 font-bold">{progressPercentage}%</span> সম্পন্ন করেছেন। পরবর্তী পাঠ শুরু করুন।</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('mastery')}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <span>পড়া চালিয়ে যান</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* What You Will Learn Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-white font-serif-bn">এই ওয়েবসাইটে আপনি যা যা শিখতে ও করতে পারবেন</h2>
          <p className="text-slate-400">জমি কেনাবেচা, খতিয়ান যাচাই ও আইনগত সুরক্ষার জন্য প্রয়োজনীয় সকল টুলস এক জায়গায়।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div 
            onClick={() => setActiveTab('mastery')}
            className="glass-card p-6 rounded-2xl hover:border-emerald-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors font-serif-bn">
                ৭ দিনের স্টেপ-বাই-স্টেপ গাইড
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                প্রতিদিন ৪৫-৬০ মিনিটের সহজ পাঠ। খতিয়ানের ইতিহাস থেকে শুরু করে জাল দলিল চেনার পরীক্ষিত উপায়।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-emerald-400 gap-1 group-hover:gap-2 transition-all">
              <span>সিলেবাস দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('doclab')}
            className="glass-card p-6 rounded-2xl hover:border-teal-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors font-serif-bn">
                খতিয়ান ও দলিল ল্যাব
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                হাতে-কলমে সিএস, আরএস খতিয়ান ও সাফ কবলা দলিলের বিভিন্ন কলামে ক্লিক করে বিস্তারিত জানুন।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-teal-400 gap-1 group-hover:gap-2 transition-all">
              <span>ল্যাবে প্রবেশ করুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('calculators')}
            className="glass-card p-6 rounded-2xl hover:border-cyan-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-serif-bn">
                পরিমাপ ও হিস্যা ক্যালকুলেটর
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                কাঠা, বিঘা, শতক, অজুতাংশ রূপান্তর এবং আনা-গণ্ডার জটিল সাংকেতিক হিসাব এক ক্লিকে সমাধান।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-cyan-400 gap-1 group-hover:gap-2 transition-all">
              <span>হিসাব করুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('laws')}
            className="glass-card p-6 rounded-2xl hover:border-amber-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-serif-bn">
                জমি ক্রয়ের চেকলিস্ট ও আইন
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                জমি কেনার আগে, বায়নার সময় ও পরে করণীয় এবং ২০২৩ সালের নতুন ভূমি অপরাধ প্রতিরোধ আইনের ধারা।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-amber-400 gap-1 group-hover:gap-2 transition-all">
              <span>চেকলিস্ট দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('exam')}
            className="glass-card p-6 rounded-2xl hover:border-purple-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors font-serif-bn">
                মাস্টারক্লাস চূড়ান্ত পরীক্ষা
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ১৫টি বাস্তবসম্মত প্রশ্নের উত্তর দিয়ে যাচাই করুন আপনার ভূমি জ্ঞান এবং অর্জন করুন সার্টিফিকেট।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-purple-400 gap-1 group-hover:gap-2 transition-all">
              <span>পরীক্ষায় বসুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('glossary')}
            className="glass-card p-6 rounded-2xl hover:border-rose-500/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors font-serif-bn">
                ভূমি পরিভাষা ও শব্দকোষ
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                বায়া দলিল, তৌজি, জে.এল., চান্দিনা ভিটি, ছুটা দাগ, সিকস্তি, পয়স্তি সহ সকল জটিল শব্দের সহজ ব্যাখ্যা।
              </p>
            </div>
            <div className="pt-6 flex items-center text-sm font-bold text-rose-400 gap-1 group-hover:gap-2 transition-all">
              <span>শব্দার্থ খুঁজুন</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Featured Law Highlight */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-emerald-500/30 p-8 sm:p-12">
        <div className="absolute top-0 right-0 p-8 text-emerald-500/10 pointer-events-none">
          <Scale className="w-48 h-48" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            জরুরি আইন সতর্কতা
          </div>
          
          <h3 className="text-2xl sm:text-4xl font-bold text-white font-serif-bn">
            {LAND_LAWS[0].title} {LAND_LAWS[0].year}
          </h3>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {LAND_LAWS[0].summary}
          </p>

          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">গুরুত্বপূর্ণ বিধানসমূহ:</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {LAND_LAWS[0].keyProvisions.slice(0, 3).map((prov, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{prov}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => setActiveTab('laws')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-2 transition-all"
            >
              <span>সকল আইন ও চেকলিস্ট জানুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7-Day Curriculum Timeline Overview */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-white font-serif-bn">৭ দিনের মাস্টারক্লাস কারিকুলাম একনজরে</h2>
          <p className="text-slate-400">প্রতিদিন ধাপে ধাপে একজন সাধারণ মানুষ থেকে জমির নিখুঁত বিশেষজ্ঞ হয়ে উঠুন।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { day: 1, title: 'জমির ধরন ও পরিচিতি', desc: 'খাস, রায়তি, বাস্তু, কৃষি, ওয়াকফ ও পতিত জমির প্রকারভেদ ও মৌলিক ধারণা।' },
            { day: 2, title: 'জমির কাগজপত্র', desc: 'পর্চা/খতিয়ান, দলিল, নামজারি, DCR, দাখিলা ও তফসিল পড়ার নিয়ম।' },
            { day: 3, title: 'মৌজা ম্যাপ ও জরিপ', desc: 'CS, SA, RS, BS জরিপ, দাগ শনাক্ত, GPS জরিপ ও ই-পর্চা অনলাইন সেবা।' },
            { day: 4, title: 'জমির আইন', desc: 'প্রজাস্বত্ব ১৯৫০, ভূমি সংস্কার ১৯৮৪, রেজিস্ট্রেশন, তামাদি ও খাজনা আইন।' },
            { day: 5, title: 'নামজারি ও মিউটেশন', desc: 'অনলাইন আবেদন ধাপে ধাপে, বায়া দলিল, উত্তরাধিকার ও ১০ পয়েন্ট চেকলিস্ট।' },
            { day: 6, title: 'দলিল রেজিস্ট্রেশন', desc: 'বায়না, সাফ কবলা, হেবা, বন্টননামা, ফি ও জাল দলিল চেনার ৭ কৌশল।' },
            { day: 7, title: 'বিরোধ ও সুরক্ষা', desc: 'দেওয়ানি/রাজস্ব মামলা, নিষেধাজ্ঞা, ভূমি অপরাধ আইন ২০২৩ ও ডিজিটাল সেবা।' }, // REMOVE_NEXT_LINE_TOO_BELOW
            // { day: 6, title: 'ভূমি আইন ও ফারায়েজ', desc: 'অপরাধ প্রতিরোধ আইন ২০২৩ ও মুসলিম/হিন্দু উত্তরাধিকার।' },
            { day: 7, title: 'জাল দলিল ও সতর্কতা', desc: 'জমি কেনার চেকলিস্ট ও ভুয়া দলিল চেনার ১০টি পরীক্ষিত উপায়।' },
          ].map((item) => (
            <div 
              key={item.day}
              onClick={() => setActiveTab('mastery')}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full flex items-start justify-end p-3 text-emerald-400/20 font-black text-2xl group-hover:text-emerald-400/40 transition-colors">
                ০{item.day}
              </div>
              <span className="inline-block text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                দিন {item.day}
              </span>
              <h3 className="text-lg font-bold text-white font-serif-bn group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
          <div 
            onClick={() => setActiveTab('exam')}
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-center items-center text-center space-y-2 group"
          >
            <Award className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white font-serif-bn">চূড়ান্ত পরীক্ষা ও সনদ</h3>
            <p className="text-emerald-300/80 text-xs">৭ দিনের পাঠ শেষে পরীক্ষা দিয়ে অর্জন করুন সার্টিফিকেট</p>
          </div>
        </div>
      </div>

      {/* Free Online Resources Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
            <Globe className="w-4 h-4" />
            <span>সম্পূর্ণ ফ্রি</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-serif-bn">ফ্রি অনলাইন রিসোর্স ও সরকারি পোর্টাল</h2>
          <p className="text-slate-400">জমি ও ভূমি বিষয়ক সকল সরকারি সেবা, আইন ও টুলস - সবই ফ্রি, সবই অনলাইনে।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FREE_RESOURCES.map((res) => (
            <a 
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                res.category === 'government' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                res.category === 'video' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                res.category === 'tool' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                res.category === 'document' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {res.category === 'government' ? <Building2 className="w-5 h-5" /> :
                 res.category === 'video' ? <Play className="w-5 h-5" /> :
                 res.category === 'tool' ? <Wrench className="w-5 h-5" /> :
                 res.category === 'document' ? <FileText className="w-5 h-5" /> :
                 <Users className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="truncate">{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-0.5" />
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{res.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">✓ ফ্রি</span>
                  <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                    {res.category === 'government' ? 'সরকারি' :
                     res.category === 'video' ? 'ভিডিও' :
                     res.category === 'tool' ? 'টুল' :
                     res.category === 'document' ? 'আইন' : 'কমিউনিটি'}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};
