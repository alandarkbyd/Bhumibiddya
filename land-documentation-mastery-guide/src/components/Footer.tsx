import React from 'react';
import { ShieldAlert, ExternalLink, Heart } from 'lucide-react';
import { TabType } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="glass-panel border-t border-slate-800 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="ভূমিবিদ্যা" className="w-8 h-8 rounded-lg shadow" />
              <span className="text-xl font-bold tracking-tight text-white font-serif-bn">
                ভূমিবিদ্যা <span className="text-emerald-400 font-sans text-xs">v1.0</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed pr-6">
              বাংলাদেশের সাধারণ মানুষের জন্য জমি, খতিয়ান, পর্চা, দলিল ও ভূমি আইন সম্পর্কে সহজ ভাষায় শেখার ও হিসাব করার পূর্ণাঙ্গ ডিজিটাল প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>আইনগত সতর্কতা: এই ওয়েবসাইটের তথ্য শিক্ষামূলক উদ্দেশ্যে প্রদান করা হয়েছে। যেকোনো আইনি বা দলিল রেজিস্ট্রি সংক্রান্ত বিষয়ে অবশ্যই পেশাদার আইনজীবীর সহায়তা নিন।</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">দ্রুত নেভিগেশন</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => { setActiveTab('overview'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-emerald-400 transition-colors">
                  মূল পাতা (Overview)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('mastery'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-emerald-400 transition-colors">
                  ৭ দিনের মাস্টারক্লাস
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('doclab'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-emerald-400 transition-colors">
                  খতিয়ান ও দলিল ল্যাব
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculators'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-emerald-400 transition-colors">
                  পরিমাপ ও হিস্যা ক্যালকুলেটর
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">সহায়ক লিঙ্ক ও টুলস</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => { setActiveTab('laws'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>জমি ক্রয়ের চেকলিস্ট</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('exam'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span>চূড়ান্ত পরীক্ষা ও সনদ</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('glossary'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <span>ভূমি পরিভাষা ও শব্দকোষ</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">সরকারি ফ্রি পোর্টাল</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://mutation.land.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>ই-নামজারি (mutation.land.gov.bd)</span>
                </a>
              </li>
              <li>
                <a href="https://www.land.gov.bd/e-porcha/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>ই-পর্চা (land.gov.bd/e-porcha)</span>
                </a>
              </li>
              <li>
                <a href="https://ldtax.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>অনলাইন খাজনা (ldtax.gov.bd)</span>
                </a>
              </li>
              <li>
                <a href="https://www.landrecord.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>ভূমি রেকর্ড (landrecord.gov.bd)</span>
                </a>
              </li>
              <li>
                <a href="https://bdlaws.minlaw.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>বাংলাদেশ আইন (bdlaws.minlaw.gov.bd)</span>
                </a>
              </li>
              <li>
                <a href="https://minland.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>ভূমি মন্ত্রণালয় (minland.gov.bd)</span>
                </a>
              </li>
              <li>
                <a href="https://www.dop.gov.bd/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3" />
                  <span>দলিল রেজিস্ট্রেশন (dop.gov.bd)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© ২০২৬ ভূমিবিদ্যা (BhumiBiddya)। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center justify-center gap-1">
            <span>Built with passion & care for Bangladesh</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
