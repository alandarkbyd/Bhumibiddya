import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Sparkles
} from 'lucide-react';
import { INTERACTIVE_DOCS, InteractiveDoc } from '../data/landData';

export const DocumentLabTab: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>('rs-khatiyan');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('khatiyan-no');

  const currentDoc: InteractiveDoc = INTERACTIVE_DOCS.find(d => d.id === selectedDocId) || INTERACTIVE_DOCS[0];
  const activeHotspot = currentDoc.hotspots.find(h => h.id === activeHotspotId) || currentDoc.hotspots[0];

  const handleDocChange = (docId: string) => {
    setSelectedDocId(docId);
    const newDoc = INTERACTIVE_DOCS.find(d => d.id === docId) || INTERACTIVE_DOCS[0];
    setActiveHotspotId(newDoc.hotspots[0]?.id || null);
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 mt-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
          <FileText className="w-4 h-4" />
          <span>ইন্টারেক্টিভ খতিয়ান ও দলিল ল্যাব</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
          বাস্তব দলিলের নমুনা ও কলাম বিশ্লেষণ
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
          নিচের নমুনা দলিলে বিভিন্ন হাইলাইট করা অংশে ক্লিক করুন। প্রতিটি অংশের আইনগত গুরুত্ব এবং জমি কেনার আগে কী কী যাচাই করতে হবে তা ডানপাশের প্যানেলে দেখতে পাবেন।
        </p>

        {/* Document Type Selector Tabs */}
        <div className="pt-4 flex flex-wrap gap-2 sm:gap-4 border-t border-slate-800">
          {INTERACTIVE_DOCS.map((doc) => {
            const isSel = doc.id === selectedDocId;
            return (
              <button
                key={doc.id}
                onClick={() => handleDocChange(doc.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  isSel
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-slate-950 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900 hover:bg-slate-800/80 text-slate-300 border border-slate-800'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>{doc.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSel ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                  {doc.period}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Lab Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Simulated Document Paper (Left 2 Cols) */}
        <div className="lg:col-span-2 bg-[#faf7f0] text-slate-900 p-6 sm:p-10 rounded-3xl border-4 border-[#e2dcc8] shadow-2xl space-y-8 font-serif-bn relative overflow-hidden">
          
          <div className="absolute top-0 right-0 bg-[#e2dcc8] text-slate-700 text-xs px-4 py-1 rounded-bl-xl font-sans font-bold">
            নমুনা কপি (Simulated Record)
          </div>

          <div className="text-center pb-6 border-b-2 border-dashed border-[#c5beaa] space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2c3e50] tracking-wider">
              {currentDoc.title}
            </h2>
            <p className="text-xs text-[#7f8c8d] font-sans font-medium">
              সরকার কর্তৃক সংরক্ষিত স্বত্বলিপি ও প্রামাণ্য দলিল
            </p>
          </div>

          {/* Conditional Layout based on Document Type */}
          {currentDoc.type === 'khatiyan' && (
            <div className="space-y-6 font-sans">
              
              {/* Header Info Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f1ece1] rounded-xl border border-[#d6cfbc] text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">জেলা:</span>
                  <span className="font-bold">{currentDoc.sampleData.district}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">উপজেলা/থানা:</span>
                  <span className="font-bold">{currentDoc.sampleData.thana}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">তৌজি নম্বর:</span>
                  <span className="font-bold">{currentDoc.sampleData.touziNo}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">রাজস্ব:</span>
                  <span className="font-bold">{currentDoc.sampleData.revenue}</span>
                </div>
              </div>

              {/* Clickable Hotspot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Hotspot 1: Khatiyan No */}
                <div 
                  onClick={() => setActiveHotspotId('khatiyan-no')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'khatiyan-no' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">খতিয়ান নম্বর:</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.khatiyanNo}</div>
                </div>

                {/* Hotspot 2: JL No */}
                <div 
                  onClick={() => setActiveHotspotId('jl-no')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'jl-no' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">জে. এল. নম্বর (J.L. No):</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.jlNo}</div>
                </div>

                {/* Hotspot 3: Mouza */}
                <div 
                  onClick={() => setActiveHotspotId('mouza')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'mouza' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">মৌজা:</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.mouza}</div>
                </div>

                {/* Hotspot 4: Owner Info */}
                <div 
                  onClick={() => setActiveHotspotId('owner-info')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'owner-info' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">মালিকের নাম, পিতার নাম ও অংশ (হিস্যা):</div>
                  <div className="text-base font-bold text-slate-900 mt-1">{currentDoc.sampleData.ownerName}</div>
                  <div className="text-sm font-semibold text-emerald-800 mt-1">অংশ: {currentDoc.sampleData.hissya}</div>
                </div>

                {/* Hotspot 5: Dag No */}
                <div 
                  onClick={() => setActiveHotspotId('dag-no')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'dag-no' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">দাগ নম্বর (প্লট নং):</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.dagNo}</div>
                </div>

                {/* Hotspot 6: Land Type */}
                <div 
                  onClick={() => setActiveHotspotId('land-type')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'land-type' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">জমির রকম (শ্রেণি):</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.landType}</div>
                </div>

              </div>

              {/* Hotspot 7: Total Land */}
              <div 
                onClick={() => setActiveHotspotId('total-land')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${activeHotspotId === 'total-land' ? 'bg-emerald-100 border-emerald-600 shadow-md ring-2 ring-emerald-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
              >
                <span className="absolute -top-3 left-4 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow">
                  ক্লিক করুন
                </span>
                <div className="text-xs text-slate-500">মোট জমির পরিমাণ:</div>
                <div className="text-2xl font-bold text-emerald-900 mt-1">{currentDoc.sampleData.totalLand}</div>
                <div className="text-xs text-slate-600 mt-1">মন্তব্য: {currentDoc.sampleData.comment}</div>
              </div>

            </div>
          )}

          {currentDoc.type === 'dolil' && (
            <div className="space-y-6 font-sans">
              
              {/* Header Box */}
              <div 
                onClick={() => setActiveHotspotId('deed-header')}
                className={`p-4 rounded-xl border-2 text-center cursor-pointer relative transition-all ${activeHotspotId === 'deed-header' ? 'bg-teal-100 border-teal-600 shadow-md ring-2 ring-teal-500/30' : 'bg-[#f1ece1] border-[#d6cfbc] hover:bg-[#ebe5d8]'}`}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs px-3 py-0.5 rounded-full font-bold">
                  ক্লিক করুন
                </span>
                <div className="text-sm font-semibold text-slate-600">{currentDoc.sampleData.subRegOffice}</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">দলিল নং: {currentDoc.sampleData.deedNo}</div>
                <div className="text-xs text-slate-500 mt-1">তারিখ: {currentDoc.sampleData.regDate}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Party Info */}
                <div 
                  onClick={() => setActiveHotspotId('party-info')}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all sm:col-span-2 ${activeHotspotId === 'party-info' ? 'bg-teal-100 border-teal-600 shadow-md ring-2 ring-teal-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs font-bold text-slate-500 uppercase">১ম পক্ষ (দাতা / বিক্রেতা):</div>
                  <div className="text-base font-bold text-slate-900">{currentDoc.sampleData.seller}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase mt-3">২য় পক্ষ (গ্রহীতা / ক্রেতা):</div>
                  <div className="text-base font-bold text-teal-900">{currentDoc.sampleData.buyer}</div>
                </div>

                {/* Deed Value */}
                <div 
                  onClick={() => setActiveHotspotId('deed-value')}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${activeHotspotId === 'deed-value' ? 'bg-teal-100 border-teal-600 shadow-md ring-2 ring-teal-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">পনমূল্য (বিক্রয় মূল্য):</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.deedValue}</div>
                </div>

                {/* Baya History */}
                <div 
                  onClick={() => setActiveHotspotId('baya-history')}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${activeHotspotId === 'baya-history' ? 'bg-teal-100 border-teal-600 shadow-md ring-2 ring-teal-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">বায়া দলিলের ইতিহাস (স্বত্বাগম):</div>
                  <div className="text-xs text-slate-800 mt-1 font-mono italic">{currentDoc.sampleData.bayaDeedHistory}</div>
                </div>

              </div>

              {/* Schedule */}
              <div 
                onClick={() => setActiveHotspotId('schedule')}
                className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${activeHotspotId === 'schedule' ? 'bg-teal-100 border-teal-600 shadow-md ring-2 ring-teal-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
              >
                <span className="absolute -top-3 left-4 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  ক্লিক করুন
                </span>
                <div className="text-xs font-bold text-slate-500 uppercase">সম্পত্তির তফসিল ও চৌহদ্দি:</div>
                <div className="text-sm font-semibold text-slate-900 mt-1 leading-relaxed bg-[#fbf9f4] p-3 rounded border border-[#eadaab]">
                  {currentDoc.sampleData.propertySchedule}
                </div>
                <div className="text-xs text-slate-700 mt-2 font-semibold">
                  চৌহদ্দি: {currentDoc.sampleData.chouhoddi}
                </div>
              </div>

            </div>
          )}

          {currentDoc.type === 'dakhila' && (
            <div className="space-y-6 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div 
                  onClick={() => setActiveHotspotId('holding-no')}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${activeHotspotId === 'holding-no' ? 'bg-amber-100 border-amber-600 shadow-md ring-2 ring-amber-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">হোল্ডিং নম্বর:</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.holdingNo}</div>
                  <div className="text-xs text-slate-500 mt-2">খতিয়ান নং: {currentDoc.sampleData.khatiyanNo} | মৌজা: {currentDoc.sampleData.mouza}</div>
                </div>

                <div 
                  onClick={() => setActiveHotspotId('tax-year')}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${activeHotspotId === 'tax-year' ? 'bg-amber-100 border-amber-600 shadow-md ring-2 ring-amber-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-4 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="text-xs text-slate-500">আদায়ের সাল (কর বছর):</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentDoc.sampleData.taxYear}</div>
                  <div className="text-xs text-amber-800 font-semibold mt-1">মালিক: {currentDoc.sampleData.ownerName} | মোট কর: {currentDoc.sampleData.totalTaxAmount}</div>
                </div>

                <div 
                  onClick={() => setActiveHotspotId('qr-verify')}
                  className={`p-6 rounded-xl border-2 cursor-pointer relative transition-all sm:col-span-2 text-center flex flex-col items-center justify-center ${activeHotspotId === 'qr-verify' ? 'bg-amber-100 border-amber-600 shadow-md ring-2 ring-amber-500/30' : 'bg-white border-[#dcd6c5] hover:bg-[#f8f5ee]'}`}
                >
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs px-3 py-0.5 rounded-full font-bold">
                    ক্লিক করুন
                  </span>
                  <div className="w-16 h-16 bg-slate-900 text-white p-1.5 flex flex-wrap items-center justify-center font-mono text-[8px] leading-tight rounded">
                    [ QR CODE SCAN TO VERIFY ]
                  </div>
                  <div className="text-xs font-bold text-emerald-800 mt-2">{currentDoc.sampleData.qrCodeStatus}</div>
                  <div className="text-[11px] text-slate-500 mt-1">তারিখ: {currentDoc.sampleData.paymentDate}</div>
                </div>

              </div>

            </div>
          )}

          <div className="pt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <Info className="w-4 h-4 text-teal-600" />
            <span>দলিলের যেকোনো হাইলাইট করা বাক্সে ক্লিক করে ডানপাশে বিস্তারিত জেনে নিন।</span>
          </div>

        </div>

        {/* Right Column: Hotspot Details Card */}
        <div className="space-y-6 sticky top-24">
          
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-teal-500/30 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-teal-400 font-bold block uppercase tracking-wider">কলাম বিশ্লেষণ</span>
                <h3 className="text-xl font-bold text-white font-serif-bn">{activeHotspot.title}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ব্যাখ্যা ও কার্যকারিতা:</h4>
                <p className="text-slate-200 text-base leading-relaxed bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  {activeHotspot.explanation}
                </p>
              </div>

              {activeHotspot.tip && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30 space-y-2 text-slate-300">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>জমি ক্রয়ের সতর্কতা ও টিপস:</span>
                  </div>
                  <p className="text-sm leading-relaxed">{activeHotspot.tip}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>ডকুমেন্ট: {currentDoc.title}</span>
              <span className="text-emerald-400 font-bold">{activeHotspot.label}</span>
            </div>

          </div>

          {/* Mini Guide List */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm font-serif-bn">ল্যাব নির্দেশিকা:</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>খতিয়ানের জেএল নম্বর ও দাগ নম্বর সাবধানে মিলিয়ে দেখতে হয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সাফ কবলা দলিলে বায়া দলিলের ২৫ বছরের চেইন থাকা বাধ্যতামূলক।</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>খাজনা বা দাখিলার রসিদে কিউআর কোড স্ক্যান করে ভেরিফাই করুন।</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
