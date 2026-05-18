import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Check, 
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProgressState } from '../hooks/useProgress';

interface ExamTabProps {
  progress: ProgressState;
  setExamResult: (score: number, passed: boolean) => void;
}

const EXAM_QUESTIONS = [
  {
    question: "বাংলাদেশের ইতিহাসে সর্বপ্রথম বিজ্ঞানসম্মত ও নির্ভরযোগ্য ভূমি জরিপ কোনটি?",
    options: ["এস.এ. জরিপ (SA)", "সি.এস. জরিপ (CS)", "আর.এস. জরিপ (RS)", "বি.এস. বা সিটি জরিপ"],
    answer: 1,
    explanation: "১৮৮৮ থেকে ১৯৪০ সাল পর্যন্ত পরিচালিত সি.এস. (Cadastral Survey) হলো প্রথম বিজ্ঞানসম্মত জরিপ।"
  },
  {
    question: "১ শতক (Decimal) জমি সমান কত বর্গফুট?",
    options: ["৩২০ বর্গফুট", "৪৩৫.৬ বর্গফুট", "৭২০ বর্গফুট", "১৪,৪০০ বর্গফুট"],
    answer: 1,
    explanation: "১ শতক = ৪৩৫.৬ বর্গফুট = ১০০০ বর্গলিংক।"
  },
  {
    question: "সরকারি স্ট্যান্ডার্ড হিসাব অনুযায়ী ১ বিঘা জমিতে কত শতক (ডেসিমেল) হয়?",
    options: ["২০ শতক", "২৫ শতক", "৩৩ শতক", "৫০ শতক"],
    answer: 2,
    explanation: "১ বিঘা = ২০ কাঠা = ৩৩ শতক।"
  },
  {
    question: "পুরোনো খতিয়ানের আনা-গণ্ডা হিসাব অনুযায়ী সম্পূর্ণ সম্পত্তি বা ১৬ আনা সমান কত গণ্ডা?",
    options: ["১০০ গণ্ডা", "৩২০ গণ্ডা", "৬৪০ গণ্ডা", "১,২৮০ গণ্ডা"],
    answer: 1,
    explanation: "যেহেতু ১ আনা = ২০ গণ্ডা, তাই ১৬ আনা × ২০ = ৩২০ গণ্ডা।"
  },
  {
    question: "মুসলিম আইনে সুনির্দিষ্ট রক্তের সম্পর্কের আত্মীয়দের (যেমন পিতা-সন্তান, স্বামী-স্ত্রী) মধ্যে বিনা স্বার্থে ও বিনা প্রতিদানে সম্পত্তি হস্তান্তরের দলিলকে কী বলে?",
    options: ["সাফ কবলা", "হেবা দলিল", "বায়নানামা", "আমমোক্তারনামা"],
    answer: 1,
    explanation: "বিনা প্রতিদানে ও স্বেচ্ছায় রক্তের সম্পর্কের আত্মীয়কে সম্পত্তি প্রদান করাকে হেবা (Hiba) বলে।"
  },
  {
    question: "'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩' অনুযায়ী অন্যের জমি নিজের নামে জাল দলিল বা ভুয়া খতিয়ান তৈরি করলে সর্বোচ্চ শাস্তি কী?",
    options: ["২ বছরের কারাদণ্ড", "৫ বছরের কারাদণ্ড", "৭ বছরের সশ্রম কারাদণ্ড ও অর্থদণ্ড", "যাবজ্জীবন কারাদণ্ড"],
    answer: 2,
    explanation: "আইনের ৪ ধারা অনুযায়ী জাল দলিল বা ভুয়া খতিয়ান তৈরির অপরাধ প্রমাণিত হলে সর্বোচ্চ ৭ বছরের সশ্রম কারাদণ্ড ও অর্থদণ্ড হবে।"
  },
  {
    question: "জমি কেনার আগে সাব-রেজিস্ট্রার অফিস থেকে জমিটি অন্য কোথাও বন্ধক বা বিক্রি আছে কিনা তা জানার জন্য কোন সার্টিফিকেট তুলতে হয়?",
    options: ["DCR (ডিসিআর)", "NEC (নির্দায় সনদ বা তল্লাশি)", "CS পর্চা", "উত্তরাধিকার সনদ"],
    answer: 1,
    explanation: "NEC (Non-Encumbrance Certificate) বা নির্দায় সনদপত্র তোলার মাধ্যমে জানা যায় জমিটি বিগত বছরগুলোতে অন্য কারও কাছে বিক্রি বা ব্যাংকে বন্ধক রাখা হয়েছে কিনা।"
  },
  {
    question: "জমি রেজিস্ট্রির পর পূর্বের মালিকের নাম কেটে আপনার নাম সরকারি রেকর্ডে অন্তর্ভুক্ত করার সরকারি অনুমোদনকে কী বলে?",
    options: ["তফসিল", "নামজারি (Mutation) বা জমা খারিজ", "বায়া দলিল", "চৌহদ্দি"],
    answer: 1,
    explanation: "মালিকানা পরিবর্তনের পর সহকারী কমিশনার (ভূমি) অফিসে নামজারি করা বাধ্যতামূলক।"
  },
  {
    question: "বর্তমানে সরকারি নিয়মে একটি ই-নামজারি (Mutation) সম্পন্ন করতে মোট সরকারি ফি কত টাকা?",
    options: ["৫০০ টাকা", "১,১৭0 টাকা", "২,৫০০ টাকা", "৫,০০০ টাকা"],
    answer: 1,
    explanation: "কোর্ট ফি (২০) + নোটিশ (৫০) + রেকর্ড সংশোধন (১০০০) + খতিয়ান (১০০) = সর্বমোট ১,১৭০ টাকা।"
  },
  {
    question: "সাব-রেজিস্ট্রার অফিসে সংরক্ষিত যে বিশাল বাঁধানো মূল বালাম খাতায় রেজিস্ট্রি করা দলিলের হুবহু নকল বা কপি স্থায়ীভাবে সংরক্ষণ করা হয়, তাকে কী বলে?",
    options: ["তৌজি খাতা", "বালাম বই (Balam Book)", "খতিয়ান বই", "দাখিলা খাতা"],
    answer: 1,
    explanation: "বালাম বই (Balam Book) হলো সাব-রেজিস্ট্রার অফিসের মূল রেকর্ড খাতা যেখানে প্রতিটি দলিলের নকল স্থায়ীভাবে সংরক্ষণ করা হয়।"
  }
];

export const ExamTab: React.FC<ExamTabProps> = ({ progress, setExamResult }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [certIssued, setCertIssued] = useState<boolean>(false);

  const totalQ = EXAM_QUESTIONS.length;
  const passingScore = 8; // 8 out of 10 (80%)

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeExam = () => {
    let currentScore = 0;
    EXAM_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
    setSubmitted(true);

    const isPassed = currentScore >= passingScore;
    setExamResult(currentScore, isPassed);

    if (isPassed) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 500);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setCertIssued(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 mt-6 shadow-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider border border-purple-500/20">
          <Award className="w-4 h-4" />
          <span>মাস্টারক্লাস মূল্যায়ন পরীক্ষা</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
          ভূমিবিদ্যা চূড়ান্ত পরীক্ষা ও সনদপত্র
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          ৭ দিনের কোর্সে যা শিখেছেন তার ওপর ভিত্তি করে ১০টি প্রশ্নের উত্তর দিন। ৮০% নম্বর (৮টি সঠিক উত্তর) পেলে আপনি অর্জন করবেন আমাদের ডিজিটাল মাস্টারক্লাস সার্টিফিকেট।
        </p>

        {progress.examPassed && !submitted && (
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-400">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <div className="text-left">
                <span className="font-bold block font-serif-bn">আপনি ইতোমধ্যে পরীক্ষায় উত্তীর্ণ হয়েছেন!</span>
                <span className="text-xs text-slate-400">সর্বশেষ প্রাপ্ত নম্বর: {progress.examScore} / {totalQ} (৮০%+)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exam Result Display */}
      {submitted && (
        <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-500 ${
          score >= passingScore 
            ? 'bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-500/50' 
            : 'bg-gradient-to-b from-rose-950/80 via-slate-900 to-slate-950 border-rose-500/50'
        }`}>
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center font-bold text-4xl shadow-lg">
            {score >= passingScore ? (
              <div className="w-full h-full rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-rose-500 text-slate-950 flex items-center justify-center">
                <XCircle className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif-bn">
              {score >= passingScore ? 'অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন!' : 'দুঃখিত, আপনি কৃতকার্য হতে পারেননি!'}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              আপনার প্রাপ্ত নম্বর: <span className={`font-black text-2xl ${score >= passingScore ? 'text-emerald-400' : 'text-rose-400'}`}>{score}</span> / {totalQ} ({Math.round((score/totalQ)*100)}%)
            </p>
            <p className="text-xs text-slate-400">
              পাস করার জন্য ন্যূনতম {passingScore}টি প্রশ্নের (৮০%) সঠিক উত্তর দেওয়া প্রয়োজন।
            </p>
          </div>

          {score >= passingScore && !certIssued && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/40 max-w-lg mx-auto space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 font-serif-bn">সনদপত্র তৈরি করতে আপনার নাম লিখুন</h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="আপনার পূর্ণ নাম (বাংলায় বা ইংরেজিতে)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 text-white font-bold border border-slate-700 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <button
                  disabled={!userName.trim()}
                  onClick={() => setCertIssued(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold disabled:opacity-50 transition-all shrink-0"
                >
                  সনদ তৈরি করুন
                </button>
              </div>
            </div>
          )}

          {certIssued && (
            <div id="certificate" className="bg-[#faf7f0] text-slate-900 p-8 sm:p-16 rounded-3xl border-8 border-[#2c3e50] max-w-3xl mx-auto space-y-8 font-serif-bn shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-[#d6cfbc] pointer-events-none" />
              
              <div className="text-center space-y-2">
                <div className="inline-block px-4 py-1 rounded bg-[#2c3e50] text-[#faf7f0] text-xs uppercase tracking-widest font-sans font-bold">
                  Certificate of Mastery
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-[#1e293b] pt-2">
                  ভূমিবিদ্যা মাস্টারক্লাস সনদপত্র
                </h2>
                <div className="w-32 h-1 bg-[#10b981] mx-auto my-4" />
              </div>

              <div className="text-center space-y-6 max-w-2xl mx-auto font-sans">
                <p className="text-sm uppercase tracking-wider text-slate-600 font-semibold">
                  এতদ্বারা প্রত্যয়ন করা যাচ্ছে যে,
                </p>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#10b981] pb-2 border-b-2 border-slate-300 inline-block px-8 font-serif-bn">
                  {userName}
                </div>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-serif-bn font-medium">
                  ভূমিবিদ্যা প্ল্যাটফর্মের <strong>"৭ দিনের বাংলাদেশের জমি ও ভূমির দলিলপত্র শেখার মাস্টারক্লাস"</strong> সাফল্যের সাথে সম্পন্ন করেছেন এবং মূল্যায়ন পরীক্ষায় <strong>{Math.round((score/totalQ)*100)}%</strong> নম্বর পেয়ে কৃতিত্বের সাথে উত্তীর্ণ হয়েছেন।
                </p>
              </div>

              <div className="pt-8 flex items-center justify-between font-sans text-xs text-slate-600 border-t border-[#d6cfbc]">
                <div className="text-left space-y-1">
                  <span className="font-bold text-slate-900 block">সনদ নম্বর:</span>
                  <span className="font-mono">BBM-2026-{(Math.random()*100000).toFixed(0)}</span>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-[#10b981] text-[#10b981] flex flex-col items-center justify-center font-bold text-[9px] uppercase tracking-tighter leading-tight rotate-12 shadow">
                  <span>Verified</span>
                  <span>Master</span>
                </div>
                <div className="text-right space-y-1">
                  <span className="font-bold text-slate-900 block">ইস্যুর তারিখ:</span>
                  <span>{new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

            </div>
          )}

          <div className="pt-6">
            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-xl glass-card hover:bg-slate-800 text-slate-300 font-semibold flex items-center gap-2 mx-auto transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় পরীক্ষায় বসুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Exam Questions Form */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white font-serif-bn">প্রশ্নমালা ({totalQ}টি প্রশ্ন):</h2>

        <div className="space-y-6">
          {EXAM_QUESTIONS.map((q, qIdx) => {
            const selectedOpt = answers[qIdx];
            const isCorrect = selectedOpt === q.answer;

            return (
              <div key={qIdx} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 font-bold text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {q.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-11">
                  {q.options.map((opt, optIdx) => {
                    let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80";
                    if (selectedOpt === optIdx) {
                      btnStyle = "bg-purple-500/20 border-purple-500 text-purple-300 font-semibold shadow";
                    }
                    if (submitted) {
                      if (optIdx === q.answer) {
                        btnStyle = "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-lg";
                      } else if (selectedOpt === optIdx) {
                        btnStyle = "bg-rose-500/20 text-rose-300 border-rose-500/50 line-through";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="leading-relaxed">{opt}</span>
                        {submitted && optIdx === q.answer && (
                          <Check className="w-5 h-5 text-slate-950 shrink-0 font-extrabold ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 pl-0 sm:pl-11 p-4 rounded-2xl text-xs sm:text-sm space-y-1 ${
                    isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  }`}>
                    <div className="font-bold flex items-center gap-1">
                      {isCorrect ? '✓ সঠিক উত্তর!' : '✗ ভুল উত্তর!'}
                    </div>
                    <p className="leading-relaxed mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 text-center space-y-4 shadow-xl">
            <p className="text-sm text-slate-300">
              আপনি {Object.keys(answers).length}টি প্রশ্নের উত্তর দিয়েছেন। সব প্রশ্নের উত্তর নিশ্চিত করে জমা দিন।
            </p>
            <button
              disabled={Object.keys(answers).length < totalQ}
              onClick={handleGradeExam}
              className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-slate-950 font-extrabold text-lg shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              পরীক্ষা জমা দিন ও ফলাফল জানুন
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
