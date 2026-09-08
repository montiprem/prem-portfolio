import { Metadata } from "next";
import Container from "@/components/ui/Container";
import { ATS_CONFIG } from "@/lib/config/ats";
import ResumeSubmissionForm from "@/components/ats/ResumeSubmissionForm";
import { CheckCircle2, AlertTriangle, FileText, Target, Award, Search, Layout, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "ATS Resume Optimization | Prem Mandal",
  description: "Get a professionally structured, ATS-friendly resume optimized for your target role and job description.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/ats-resume",
  },
};

const commonProblems = [
  "Poor ATS readability (parsers can't read your info)",
  "Weak resume structure & visual hierarchy",
  "Missing critical role-specific keywords",
  "Generic, copy-pasted job descriptions",
  "Weak, task-based bullet points instead of achievements",
  "Poor alignment with the target Job Description",
  "Excessive graphics or complex tables that break parsers",
  "Inconsistent date and font formatting"
];

const improvements = [
  { icon: Layout, title: "ATS-Friendly Structure", desc: "Clean, parseable formats that pass automated screening." },
  { icon: FileText, title: "Professional Formatting", desc: "Modern, recruiter-friendly visual hierarchy." },
  { icon: Search, title: "Keyword Optimization", desc: "Strategic placement of required skills." },
  { icon: Target, title: "Job Description Alignment", desc: "Tailoring content to match your target role perfectly." },
  { icon: Award, title: "Stronger Bullets", desc: "Transforming tasks into achievement-based metrics." },
  { icon: UserCheck, title: "Human Review", desc: "Manual, expert review of your complete profile." }
];

export default function AtsResumePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <Container className="space-y-24">
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-6">
            <CheckCircle2 size={14} />
            Human Reviewed • ATS Friendly • Job Aligned
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Make Your Resume <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
              ATS-Ready
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Turn your existing resume into a clean, professional, ATS-friendly resume optimized for your target role and guaranteed to get past automated filters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#submit" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-1">
              Optimize My Resume
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold transition-all">
              How It Works
            </a>
          </div>
        </section>

        {/* WHY YOUR RESUME MAY NOT GET SHORTLISTED */}
        <section className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-white/10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-rose-500 font-bold text-sm">
                <AlertTriangle size={16} />
                The Problem
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why isn't your resume getting shortlisted?</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Most companies use Applicant Tracking Systems (ATS) to filter resumes before a human ever sees them. If your resume isn't properly formatted, it gets rejected instantly.
              </p>
            </div>
            <div className="flex-1">
              <ul className="space-y-3">
                {commonProblems.map((prob, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-0.5 text-rose-500 shrink-0"><XCircleIcon /></span>
                    {prob}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT I WILL IMPROVE */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What I Will Improve</h2>
            <p className="text-slate-600 dark:text-slate-400">A complete professional overhaul of your existing resume.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {improvements.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400">A simple, transparent 5-step process.</p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/20 before:to-transparent">
            {[
              { title: "Upload Your Resume", desc: "Share your current resume (PDF or DOCX)." },
              { title: "Share Your Target Role", desc: "Tell me exactly what role you're aiming for." },
              { title: "Add Your Job Description", desc: "Provide a JD to align your resume perfectly." },
              { title: "I Review & Optimize", desc: "I manually review and restructure your resume." },
              { title: "Pay & Securely Download", desc: `Pay ${ATS_CONFIG.currencySymbol}${ATS_CONFIG.price} only when your final resume is ready.` },
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md">
                  0{i + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING & SUBMISSION FORM */}
        <section id="submit" className="max-w-3xl mx-auto">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-blue-500/20 to-transparent">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[22px] p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Submit Your Resume</h2>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mt-4 mb-4">
                  {ATS_CONFIG.currencySymbol}{ATS_CONFIG.price}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pay only when your optimized resume is ready to download.</p>
              </div>

              <ResumeSubmissionForm />

              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-6">
                Your resume is securely stored and only accessible to authorized users. Submitted resumes are never published publicly.
              </p>
            </div>
          </div>
        </section>

      </Container>
    </main>
  );
}

function XCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
}
