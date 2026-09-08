import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getOrder } from "@/lib/google/sheets";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Order Details | Admin",
  robots: { index: false, follow: false }
};

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const order = await getOrder(params.id);

  if (!order) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Link href="/admin/resumes" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 pt-32">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/admin/resumes"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order {order.id}</h1>
              <p className="text-slate-500 dark:text-slate-400">Placed on {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="text-sm text-slate-500 mr-2">Status:</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {order.status}
                </span>
              </div>
              <div>
                <span className="text-sm text-slate-500 mr-2">Payment:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  order.paymentStatus === 'PAID'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Customer Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex"><dt className="w-24 text-slate-500">Name:</dt><dd className="font-medium text-slate-900 dark:text-white">{order.name}</dd></div>
                  <div className="flex"><dt className="w-24 text-slate-500">Email:</dt><dd className="font-medium text-slate-900 dark:text-white">{order.email}</dd></div>
                  <div className="flex"><dt className="w-24 text-slate-500">Phone:</dt><dd className="font-medium text-slate-900 dark:text-white">{order.phone || "N/A"}</dd></div>
                </dl>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Job Details</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex"><dt className="w-24 text-slate-500">Role:</dt><dd className="font-medium text-slate-900 dark:text-white">{order.targetRole}</dd></div>
                  <div className="flex"><dt className="w-24 text-slate-500">Experience:</dt><dd className="font-medium text-slate-900 dark:text-white">{order.yearsOfExperience || "N/A"}</dd></div>
                </dl>
                {order.jobDescription && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-1">Job Description:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-md line-clamp-4">{order.jobDescription}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Files</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Original Resume</span>
                  <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View in Drive</a>
                </div>
                {order.jobDescriptionFilePath && (
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Job Description</span>
                    <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View in Drive</a>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Upload Optimized Files</h3>
                <div className="p-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Upload the final PDF and/or DOCX to notify the customer.</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Upload & Notify Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
