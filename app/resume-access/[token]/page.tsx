import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import { getOrderByToken } from "@/lib/google/sheets";
import { ATS_CONFIG } from "@/lib/config/ats";
import { CheckCircle2, Download, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Your ATS-Optimized Resume Is Ready",
  robots: { index: false, follow: false },
};

export default async function ResumeAccessPage({ params }: { params: { token: string } }) {
  const order = await getOrderByToken(params.token);

  if (!order) {
    return (
      <main className="min-h-screen pt-32 pb-16">
        <Container className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Link Expired or Invalid</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sorry, this resume access link is invalid or has expired. Please contact us for a new link.
          </p>
        </Container>
      </main>
    );
  }

  const isPaid = order.paymentStatus === 'PAID';

  return (
    <main className="min-h-screen pt-32 pb-16">
      <Container className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl shadow-blue-900/5">

          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-6">
              {isPaid ? <Download size={32} /> : <CheckCircle2 size={32} />}
            </div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {isPaid ? "Payment Successful 🎉" : "Your Resume is Ready!"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {isPaid
                ? "Thank you for your payment. You can now download your ATS-optimized resume files below."
                : `Hi ${order.name}, your ATS-optimized resume is ready for download.`}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Order Reference</span>
              <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">{order.id}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Target Role</span>
              <span className="font-medium text-slate-900 dark:text-white">{order.targetRole}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Amount</span>
              <span className="font-bold text-lg text-slate-900 dark:text-white">{ATS_CONFIG.currencySymbol}{ATS_CONFIG.price}</span>
            </div>
          </div>

          {!isPaid ? (
            <div className="space-y-4">
              <button
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={20} />
                Pay {ATS_CONFIG.currencySymbol}{ATS_CONFIG.price} & Download
              </button>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                Secure payment processed by Razorpay.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Download Files:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.finalResumePdfPath && (
                  <a
                    href={`/api/ats/download?token=${params.token}&type=pdf`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                  >
                    <Download size={18} /> Download PDF
                  </a>
                )}
                {order.finalResumeDocxPath && (
                  <a
                    href={`/api/ats/download?token=${params.token}&type=docx`}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                  >
                    <Download size={18} /> Download DOCX
                  </a>
                )}
              </div>
            </div>
          )}

        </div>
      </Container>
    </main>
  );
}
