import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRightLeft, 
  Users, 
  Coins, 
  CheckCircle, 
  Info,
  Scale
} from 'lucide-react';
import { UNIT_CONVERSIONS, FARAIZ_RULES } from '../data/landData';

export const CalculatorsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'unit' | 'anagonda' | 'faraiz' | 'mutation'>('unit');

  // --- Unit Converter State ---
  const [inputVal, setInputVal] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState<keyof typeof UNIT_CONVERSIONS>('shotok');

  // Convert input value to Shotok first
  const valInShotok = inputVal / UNIT_CONVERSIONS[fromUnit].factor;

  // --- Ana Gonda State ---
  const [ana, setAna] = useState<number>(4);
  const [gonda, setGonda] = useState<number>(10);
  const [kora, setKora] = useState<number>(2);
  const [kranti, setKranti] = useState<number>(1);
  const [til, setTil] = useState<number>(10);
  const [totalLandForShare, setTotalLandForShare] = useState<number>(100); // 100 shotok default

  // Calculation: 16 Ana = 76,800 Til
  const totalTilOfShare = (ana * 4800) + (gonda * 240) + (kora * 60) + (kranti * 20) + til;
  const sharePercentage = (totalTilOfShare / 76800) * 100;
  const shareDecimal = totalTilOfShare / 76800;
  const landGot = totalLandForShare * shareDecimal;

  // --- Faraiz State ---
  const [totalFaraizLand, setTotalFaraizLand] = useState<number>(100);
  const [deceased, setDeceased] = useState<'husband' | 'wife'>('husband');
  const [spouseAlive, setSpouseAlive] = useState<boolean>(true);
  const [sonsCount, setSonsCount] = useState<number>(2);
  const [daughtersCount, setDaughtersCount] = useState<number>(1);
  const [fatherAlive, setFatherAlive] = useState<boolean>(true);
  const [motherAlive, setMotherAlive] = useState<boolean>(true);

  const calculateFaraiz = () => {
    let remaining = 1.0;
    const result: { relation: string; shareStr: string; sharePct: number; landAmt: number }[] = [];

    const hasChildren = sonsCount > 0 || daughtersCount > 0;

    // Spouse share
    if (spouseAlive) {
      let spouseShare = 0;
      if (deceased === 'husband') {
        spouseShare = hasChildren ? 1/8 : 1/4;
        result.push({
          relation: 'স্ত্রী (Wife)',
          shareStr: hasChildren ? '১/৮ অংশ (১২.৫%)' : '১/৪ অংশ (২৫%)',
          sharePct: spouseShare * 100,
          landAmt: totalFaraizLand * spouseShare
        });
      } else {
        spouseShare = hasChildren ? 1/4 : 1/2;
        result.push({
          relation: 'স্বামী (Husband)',
          shareStr: hasChildren ? '১/৪ অংশ (২৫%)' : '১/২ অংশ (৫০%)',
          sharePct: spouseShare * 100,
          landAmt: totalFaraizLand * spouseShare
        });
      }
      remaining -= spouseShare;
    }

    // Parents share
    if (fatherAlive) {
      const fatherShare = hasChildren ? 1/6 : (remaining * 0.333); // simplified
      result.push({
        relation: 'পিতা (Father)',
        shareStr: hasChildren ? '১/৬ অংশ (১৬.৬৭%)' : 'অবশিষ্ট আসাবা',
        sharePct: fatherShare * 100,
        landAmt: totalFaraizLand * fatherShare
      });
      remaining -= fatherShare;
    }

    if (motherAlive) {
      const motherShare = hasChildren ? 1/6 : 1/3;
      result.push({
        relation: 'মাতা (Mother)',
        shareStr: hasChildren ? '১/৬ অংশ (১৬.৬৭%)' : '১/৩ অংশ (৩৩.৩৩%)',
        sharePct: motherShare * 100,
        landAmt: totalFaraizLand * motherShare
      });
      remaining -= motherShare;
    }

    // Children share (Asaba)
    if (hasChildren && remaining > 0) {
      const totalUnits = (sonsCount * 2) + daughtersCount;
      const unitValue = remaining / totalUnits;

      if (sonsCount > 0) {
        const sonTotalShare = unitValue * 2 * sonsCount;
        result.push({
          relation: `পুত্র (${sonsCount} জন)`,
          shareStr: `প্রত্যেকে ২ অনুপাত (মোট ${Math.round(sonTotalShare*100)}%)`,
          sharePct: sonTotalShare * 100,
          landAmt: totalFaraizLand * sonTotalShare
        });
      }
      if (daughtersCount > 0) {
        const daughterTotalShare = unitValue * 1 * daughtersCount;
        result.push({
          relation: `কন্যা (${daughtersCount} জন)`,
          shareStr: `প্রত্যেকে ১ অনুপাত (মোট ${Math.round(daughterTotalShare*100)}%)`,
          sharePct: daughterTotalShare * 100,
          landAmt: totalFaraizLand * daughterTotalShare
        });
      }
    }

    return result;
  };

  const faraizResults = calculateFaraiz();

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 mt-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
          <Calculator className="w-4 h-4" />
          <span>ভূমি পরিমাপ ও হিসাব-নিকাশ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
          ভূমি রূপান্তর ও হিস্যা ক্যালকুলেটর
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          জমির জটিল হিসাব এক ক্লিকে সমাধান করুন। একক রূপান্তর, আনা-গণ্ডা থেকে দশমিক হিস্যা বের করা এবং উত্তরাধিকার সম্পত্তির হিসাব করার টুলস।
        </p>

        {/* Sub-Tabs */}
        <div className="pt-4 flex flex-wrap gap-2 sm:gap-4 border-t border-slate-800">
          {[
            { id: 'unit', label: 'একক রূপান্তর (শতক, কাঠা...)', icon: <ArrowRightLeft className="w-4 h-4" /> },
            { id: 'anagonda', label: 'আনা-গণ্ডা হিসাব', icon: <Scale className="w-4 h-4" /> },
            { id: 'faraiz', label: 'উত্তরাধিকার (ফারায়েজ)', icon: <Users className="w-4 h-4" /> },
            { id: 'mutation', label: 'নামজারি ও রসিদ ফি', icon: <Coins className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeSubTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 hover:bg-slate-800/80 text-slate-300 border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Unit Converter Tab */}
      {activeSubTab === 'unit' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-xl animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="w-full md:w-1/2 space-y-2">
              <label className="text-sm font-bold text-slate-300 block">জমির পরিমাণ লিখুন:</label>
              <input 
                type="number"
                min="0"
                step="any"
                value={inputVal}
                onChange={(e) => setInputVal(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-950 text-white font-bold text-2xl px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              />
            </div>
            
            <div className="w-full md:w-1/2 space-y-2">
              <label className="text-sm font-bold text-slate-300 block">একক নির্বাচন করুন:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as any)}
                className="w-full bg-slate-950 text-cyan-400 font-bold text-xl px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer shadow-inner"
              >
                {Object.entries(UNIT_CONVERSIONS).map(([key, unit]) => (
                  <option key={key} value={key} className="bg-slate-950 text-white">
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-serif-bn">রূপান্তরিত ফলাফল:</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(UNIT_CONVERSIONS).map(([key, unit]) => {
                const convertedVal = valInShotok * unit.factor;
                const isCurrent = key === fromUnit;

                return (
                  <div 
                    key={key} 
                    className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                      isCurrent 
                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-md' 
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-white'
                    }`}
                  >
                    <span className="text-xs text-slate-400 font-medium">{unit.name}</span>
                    <div className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight text-emerald-400">
                      {convertedVal.toLocaleString('bn', { maximumFractionDigits: 4 })}
                    </div>
                    <span className="text-xs text-slate-500 mt-1 font-mono">{unit.symbol}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-slate-300 text-xs sm:text-sm flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>স্ট্যান্ডার্ড সূত্র: ১ শতক (ডেসিমেল) = ৪৩৫.৬ বর্গফুট = ১০০০ বর্গলিংক। ৩৩ শতক = ১ বিঘা। ১.৬৫ শতক = ১ কাঠা।</span>
          </div>
        </div>
      )}

      {/* 2. Ana Gonda Calculator */}
      {activeSubTab === 'anagonda' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-xl animate-in fade-in duration-300">
          
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-bold text-white font-serif-bn">পুরোনো খতিয়ানের আনা-গণ্ডা হিসাব</h3>
            <p className="text-slate-400 text-sm">সিএস, এসএ ও আরএস খতিয়ানে আপনার অংশের সাংকেতিক মান ইনপুট দিয়ে জেনে নিন আপনি মোট সম্পত্তির কতটুকু অংশের মালিক।</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block">আনা (Ana) [০-১৬]:</label>
              <input 
                type="number" min="0" max="16" value={ana} 
                onChange={(e) => setAna(Math.min(16, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-950 text-white font-bold text-xl p-3 rounded-xl border border-slate-700 text-center"
              />
              <span className="text-[10px] text-slate-500 block text-center">১ আনা = ২০ গণ্ডা</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block">গণ্ডা (Gonda) [০-১৯]:</label>
              <input 
                type="number" min="0" max="19" value={gonda} 
                onChange={(e) => setGonda(Math.min(19, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-950 text-white font-bold text-xl p-3 rounded-xl border border-slate-700 text-center"
              />
              <span className="text-[10px] text-slate-500 block text-center">১ গণ্ডা = ৪ কড়া</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block">কড়া (Kora) [০-৩]:</label>
              <input 
                type="number" min="0" max="3" value={kora} 
                onChange={(e) => setKora(Math.min(3, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-950 text-white font-bold text-xl p-3 rounded-xl border border-slate-700 text-center"
              />
              <span className="text-[10px] text-slate-500 block text-center">১ কড়া = ৩ ক্রান্তি</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 block">ক্রান্তি (Kranti) [০-২]:</label>
              <input 
                type="number" min="0" max="2" value={kranti} 
                onChange={(e) => setKranti(Math.min(2, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-950 text-white font-bold text-xl p-3 rounded-xl border border-slate-700 text-center"
              />
              <span className="text-[10px] text-slate-500 block text-center">১ ক্রান্তি = ২০ তিল</span>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-slate-400 block">তিল (Til) [০-১৯]:</label>
              <input 
                type="number" min="0" max="19" value={til} 
                onChange={(e) => setTil(Math.min(19, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full bg-slate-950 text-white font-bold text-xl p-3 rounded-xl border border-slate-700 text-center"
              />
              <span className="text-[10px] text-slate-500 block text-center">ক্ষুদ্রতম একক</span>
            </div>

          </div>

          <div className="space-y-3 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 max-w-xl">
            <label className="text-sm font-bold text-slate-300 block">খতিয়ানে মোট জমির পরিমাণ (শতক এককে):</label>
            <input 
              type="number" min="0" value={totalLandForShare} 
              onChange={(e) => setTotalLandForShare(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-950 text-emerald-400 font-bold text-xl p-3 rounded-xl border border-slate-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 text-center space-y-2">
              <span className="text-xs text-slate-400 block uppercase">আপনার অংশের শতকরা হার</span>
              <div className="text-3xl font-extrabold text-white">
                {sharePercentage.toLocaleString('bn', { maximumFractionDigits: 2 })}%
              </div>
              <span className="text-xs text-slate-500">সম্পূর্ণ সম্পত্তি (১৬ আনা) = ১০০%</span>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-teal-500/30 text-center space-y-2">
              <span className="text-xs text-slate-400 block uppercase">আধুনিক হিস্যা (দশমিক অংশ)</span>
              <div className="text-3xl font-extrabold text-teal-300">
                {shareDecimal.toLocaleString('bn', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </div>
              <span className="text-xs text-slate-500">বি.এস. খতিয়ানের ১.০০০০ এককের হিসেবে</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/50 text-center space-y-2 shadow-lg">
              <span className="text-xs text-emerald-300 block uppercase font-bold">আপনার প্রাপ্য মোট জমি</span>
              <div className="text-3xl font-black text-emerald-400">
                {landGot.toLocaleString('bn', { maximumFractionDigits: 2 })} <span className="text-lg">শতক</span>
              </div>
              <span className="text-xs text-slate-400">বা {(landGot/33).toLocaleString('bn', { maximumFractionDigits: 2 })} বিঘা</span>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-300">হিসাবের মূল সূত্র:</div>
            <div>১৬ আনা = ৩২০ গণ্ডা = ১,২৮০ কড়া = ৩,৮৪০ ক্রান্তি = ৭৬,৮০০ তিল। আমাদের অ্যালগরিদম প্রথমে আপনার ইনপুটকে মোট তিল এককে রূপান্তর করে ৭৬,৮০০ দিয়ে ভাগ করে নিখুঁত হিস্যা বের করে।</div>
          </div>

        </div>
      )}

      {/* 3. Faraiz Calculator */}
      {activeSubTab === 'faraiz' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-xl animate-in fade-in duration-300">
          
          <div className="space-y-2 max-w-3xl">
            <h3 className="text-2xl font-bold text-white font-serif-bn">{FARAIZ_RULES.description}</h3>
            <p className="text-slate-400 text-sm">{FARAIZ_RULES.note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">মৃত ব্যক্তির পরিচয়:</label>
              <select 
                value={deceased} 
                onChange={(e) => setDeceased(e.target.value as any)}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-700"
              >
                <option value="husband">স্বামী (Husband deceased)</option>
                <option value="wife">স্ত্রী (Wife deceased)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">মোট সম্পত্তির পরিমাণ (শতক):</label>
              <input 
                type="number" min="0" value={totalFaraizLand} 
                onChange={(e) => setTotalFaraizLand(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-950 text-emerald-400 font-bold p-3 rounded-xl border border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">জীবিত স্বামী/স্ত্রী আছেন কিনা?</label>
              <div className="flex gap-4 pt-1">
                <button
                  onClick={() => setSpouseAlive(true)}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm ${spouseAlive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  হ্যাঁ (আছেন)
                </button>
                <button
                  onClick={() => setSpouseAlive(false)}
                  className={`flex-1 py-2 rounded-xl font-bold text-sm ${!spouseAlive ? 'bg-rose-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  না (মৃত)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">পুত্রের সংখ্যা (Sons):</label>
              <input 
                type="number" min="0" value={sonsCount} 
                onChange={(e) => setSonsCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">কন্যার সংখ্যা (Daughters):</label>
              <input 
                type="number" min="0" value={daughtersCount} 
                onChange={(e) => setDaughtersCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-slate-950 text-white font-bold p-3 rounded-xl border border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 block">পিতা ও মাতা জীবিত আছেন কিনা?</label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setFatherAlive(!fatherAlive)}
                  className={`py-2 rounded-xl font-semibold text-xs ${fatherAlive ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  পিতা: {fatherAlive ? 'জীবিত' : 'মৃত'}
                </button>
                <button
                  onClick={() => setMotherAlive(!motherAlive)}
                  className={`py-2 rounded-xl font-semibold text-xs ${motherAlive ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}
                >
                  মাতা: {motherAlive ? 'জীবিত' : 'মৃত'}
                </button>
              </div>
            </div>

          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white font-serif-bn">প্রাথমিক বন্টন বিবরণী (ওয়ারিশদের অংশ):</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {faraizResults.map((res, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-sm font-bold text-cyan-400 block">{res.relation}</span>
                  <div className="text-2xl font-extrabold text-white">{res.shareStr}</div>
                  <div className="text-sm font-bold text-emerald-400 pt-2 border-t border-slate-800/80">
                    জমির পরিমাণ: {res.landAmt.toLocaleString('bn', { maximumFractionDigits: 2 })} শতক
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-1">
            <div className="font-bold">আইনগত সতর্কতা:</div>
            <p>এটি একটি প্রারম্ভিক ক্যালকুলেটর। দাদা-দাদী, ভাই-বোন বা অন্যান্য দূরবর্তী ওয়ারিশদের ক্ষেত্রে এবং সুনির্দিষ্ট আইনি বন্টননামা (Deed of Partition) তৈরি করতে অবশ্যই অভিজ্ঞ মুসলিম আইনজ্ঞ বা কাজীর পরামর্শ নিন।</p>
          </div>

        </div>
      )}

      {/* 4. Mutation Fee Tab */}
      {activeSubTab === 'mutation' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-xl animate-in fade-in duration-300">
          <div className="space-y-2 max-w-3xl">
            <h3 className="text-2xl font-bold text-white font-serif-bn">ই-নামজারি (Mutation) সরকারি ফি ব্রেকডাউন</h3>
            <p className="text-slate-400 text-sm">ভূমি মন্ত্রণালয়ের সর্বশেষ প্রজ্ঞাপন অনুযায়ী নামজারি আবেদন থেকে খতিয়ান সরবরাহ পর্যন্ত মোট সরকারি ফি ১,১৭০ টাকা।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '১', title: 'আবেদন কোর্ট ফি', fee: '২০ টাকা', desc: 'অনলাইনে আবেদনের সময় পেমেন্ট করতে হয়।' },
              { step: '২', title: 'নোটিশ জারি ফি', fee: '৫০ টাকা', desc: 'শুনানির নোটিশ পাঠানোর সরকারি খরচ।' },
              { step: '৩', title: 'রেকর্ড সংশোধন ফি', fee: '১,০০০ টাকা', desc: 'খতিয়ানে নাম সংশোধনের মূল ফি।' },
              { step: '৪', title: 'খতিয়ান সরবরাহ ফি', fee: '১০০ টাকা', desc: 'ডিসিআর ও খতিয়ানের প্রিন্ট কপি তোলার ফি।' },
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 relative overflow-hidden space-y-3">
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-400 text-lg">
                  {item.step}
                </div>
                <span className="text-xs text-slate-400 uppercase font-medium">ধাপ {item.step}</span>
                <h4 className="text-lg font-bold text-white font-serif-bn">{item.title}</h4>
                <div className="text-3xl font-black text-emerald-400">{item.fee}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs text-emerald-300 uppercase font-bold tracking-wider">সর্বমোট সরকারি খরচ</div>
              <div className="text-4xl font-extrabold text-white font-serif-bn">১,১৭০/- টাকা <span className="text-base font-normal text-slate-300">(প্রতি খতিয়ানে)</span></div>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-md leading-relaxed">
              <CheckCircle className="w-4 h-4 text-emerald-400 inline mr-1 mb-0.5" />
              বর্তমানে এই ১,১৭০ টাকার পুরোটাই মোবাইল ব্যাংকিং (বিকাশ, নগদ) বা চালানের মাধ্যমে অনলাইনে পেমেন্ট করতে হয়। কোনো প্রকার ক্যাশ টাকা অফিসে দেওয়া সম্পূর্ণ বেআইনি।
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
