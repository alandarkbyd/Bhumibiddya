import React, { useState } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { OverviewTab } from './components/OverviewTab';
import { MasteryClassTab } from './components/MasteryClassTab';
import { DocumentLabTab } from './components/DocumentLabTab';
import { CalculatorsTab } from './components/CalculatorsTab';
import { LawsSafetyTab } from './components/LawsSafetyTab';
import { ExamTab } from './components/ExamTab';
import { GlossaryTab } from './components/GlossaryTab';
import { FreeResourcesTab } from './components/FreeResourcesTab';
import { Footer } from './components/Footer';
import { useProgress } from './hooks/useProgress';
import { RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const {
    progress,
    toggleDayComplete,
    markQuizComplete,
    toggleChecklist,
    setExamResult,
    resetProgress,
    overallProgressPercentage
  } = useProgress();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progressPercentage={overallProgressPercentage} 
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
        {activeTab === 'overview' && (
          <OverviewTab 
            setActiveTab={setActiveTab} 
            progressPercentage={overallProgressPercentage} 
          />
        )}
        {activeTab === 'mastery' && (
          <MasteryClassTab 
            progress={progress} 
            toggleDayComplete={toggleDayComplete} 
            markQuizComplete={markQuizComplete} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'doclab' && (
          <DocumentLabTab />
        )}
        {activeTab === 'calculators' && (
          <CalculatorsTab />
        )}
        {activeTab === 'laws' && (
          <LawsSafetyTab 
            progress={progress} 
            toggleChecklist={toggleChecklist} 
          />
        )}
        {activeTab === 'exam' && (
          <ExamTab 
            progress={progress} 
            setExamResult={setExamResult} 
          />
        )}
        {activeTab === 'resources' && (
          <FreeResourcesTab />
        )}
        {activeTab === 'glossary' && (
          <GlossaryTab />
        )}
      </main>

      {/* Quick Progress Reset Widget */}
      {overallProgressPercentage > 0 && (
        <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
          <button
            onClick={() => {
              if (window.confirm('আপনি কি আপনার মাস্টারক্লাসের সমস্ত অগ্রগতি ও পরীক্ষার ফলাফল পুনরায় শুরু (Reset) করতে চান?')) {
                resetProgress();
              }
            }}
            className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-rose-500 hover:bg-rose-500/10 shadow-2xl transition-all group flex items-center gap-2"
            title="অগ্রগতি রিসেট করুন"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-semibold pr-1">
              অগ্রগতি রিসেট
            </span>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
