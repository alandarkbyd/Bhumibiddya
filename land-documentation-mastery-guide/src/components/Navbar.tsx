import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  Home, 
  Menu, 
  X,
  Globe
} from 'lucide-react';

export type TabType = 
  | 'overview' 
  | 'mastery' 
  | 'doclab' 
  | 'calculators' 
  | 'laws' 
  | 'exam' 
  | 'glossary'
  | 'resources';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  progressPercentage: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, progressPercentage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'মূল পাতা', icon: <Home className="w-4 h-4" /> },
    { id: 'mastery', label: '৭ দিনের মাস্টারক্লাস', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'doclab', label: 'খতিয়ান ও দলিল ল্যাব', icon: <FileText className="w-4 h-4" /> },
    { id: 'calculators', label: 'পরিমাপ ও হিসাব', icon: <Calculator className="w-4 h-4" /> },
    { id: 'laws', label: 'ভূমি আইন ও সতর্কতা', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'resources', label: 'ফ্রি রিসোর্স', icon: <Globe className="w-4 h-4" /> },
    { id: 'exam', label: 'চূড়ান্ত পরীক্ষা', icon: <Award className="w-4 h-4" /> },
    { id: 'glossary', label: 'শব্দকোষ', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleNavClick = (id: TabType) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('overview')}>
            <img src="/images/logo.png" alt="ভূমিবিদ্যা" className="w-10 h-10 rounded-xl shadow-lg shadow-emerald-500/20" />
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-serif-bn">
                ভূমিবিদ্যা
              </span>
              <span className="hidden md:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                মাস্টারক্লাস গাইড
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.id === 'mastery' && progressPercentage > 0 && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-bold rounded-full">
                      {progressPercentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Indicator & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 shadow-sm text-xs">
              <span className="text-slate-400">অগ্রগতি:</span>
              <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="font-bold text-emerald-400">{progressPercentage}%</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'mastery' && progressPercentage > 0 && (
                    <span className="text-xs bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                      {progressPercentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
