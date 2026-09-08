import { redirect } from "next/navigation";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getAllOrders } from "@/lib/google/sheets";
import Link from "next/link";

export const metadata = {
  title: "ATS Admin Dashboard",
  robots: { index: false, follow: false }
};

export default async function AdminDashboard() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const orders = await getAllOrders();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">ATS Orders</h1>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Target Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.name}</td>
                      <td className="px-6 py-4">{order.targetRole}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/resumes/${order.id}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
