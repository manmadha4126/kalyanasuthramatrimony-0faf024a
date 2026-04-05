import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Upload, IndianRupee, CalendarDays, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Transaction = {
  id: string;
  name: string;
  purpose: string;
  amount: number;
  transaction_date: string;
  transaction_details: string | null;
  screenshot_url: string | null;
  created_at: string;
};

type FilterMode = "this_month" | "previous_month" | "total" | "custom";

export default function RevenueSection() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("this_month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    name: "",
    purpose: "",
    amount: "",
    transaction_date: today,
    transaction_details: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("revenue_transactions" as any)
      .select("*")
      .order("transaction_date", { ascending: false });
    if (!error && data) setTransactions(data as any);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.purpose || !form.amount) {
      toast({ title: "Please fill name, purpose and amount", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let screenshot_url: string | null = null;
      if (screenshotFile) {
        const ext = screenshotFile.name.split(".").pop();
        const path = `revenue/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("profile-photos").upload(path, screenshotFile);
        if (!upErr) {
          const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(path);
          screenshot_url = urlData.publicUrl;
        }
      }
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("revenue_transactions" as any).insert({
        name: form.name,
        purpose: form.purpose,
        amount: parseFloat(form.amount),
        transaction_date: form.transaction_date,
        transaction_details: form.transaction_details || null,
        screenshot_url,
        created_by: user?.id || null,
      } as any);
      if (!error) {
        toast({ title: "Transaction saved!" });
        setForm({ name: "", purpose: "", amount: "", transaction_date: today, transaction_details: "" });
        setScreenshotFile(null);
        setShowForm(false);
        fetchTransactions();
      } else {
        toast({ title: "Error saving", description: error.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const deleteTransaction = async (id: string) => {
    if (!window.confirm("Delete this transaction?")) return;
    const { error } = await supabase.from("revenue_transactions" as any).delete().eq("id", id);
    if (!error) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast({ title: "Transaction deleted" });
    }
  };

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    return transactions.filter(t => {
      const d = new Date(t.transaction_date);
      switch (filterMode) {
        case "this_month":
          return d >= thisMonthStart && d <= now;
        case "previous_month":
          return d >= prevMonthStart && d <= prevMonthEnd;
        case "total":
          return true;
        case "custom":
          if (customFrom && customTo) return d >= new Date(customFrom) && d <= new Date(customTo);
          if (customFrom) return d >= new Date(customFrom);
          if (customTo) return d <= new Date(customTo);
          return true;
        default:
          return true;
      }
    });
  }, [transactions, filterMode, customFrom, customTo]);

  const totalAmount = useMemo(() => filteredTransactions.reduce((s, t) => s + Number(t.amount), 0), [filteredTransactions]);

  const filterLabels: Record<FilterMode, string> = {
    this_month: "This Month",
    previous_month: "Previous Month",
    total: "All Time Total",
    custom: "Custom Date Range",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold" style={{ color: "hsl(260, 50%, 40%)" }}>
          <IndianRupee className="inline mr-2" size={22} /> Revenue Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "hsl(260, 55%, 50%)" }}
        >
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {/* Add Transaction Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Name *</label>
                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Customer / Party Name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Purpose *</label>
                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))} placeholder="e.g. Subscription, Consultation" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Amount (₹) *</label>
                <input type="number" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Date</label>
                <input type="date" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.transaction_date} onChange={e => setForm(p => ({ ...p, transaction_date: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Transaction Details <span className="text-xs text-gray-400">(Optional)</span></label>
                <textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} value={form.transaction_details} onChange={e => setForm(p => ({ ...p, transaction_details: e.target.value }))} placeholder="UPI ID, Bank transfer ref, etc." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1" style={{ color: "hsl(0,0%,35%)" }}>Screenshot <span className="text-xs text-gray-400">(Optional)</span></label>
                <label className="flex items-center gap-2 cursor-pointer border border-dashed rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 transition w-fit">
                  <Upload size={16} /> {screenshotFile ? screenshotFile.name : "Upload screenshot"}
                  <input type="file" accept="image/*" className="hidden" onChange={e => setScreenshotFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "hsl(145, 50%, 40%)" }}>
                  {saving ? "Saving..." : "Save Transaction"}
                </button>
                <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 text-gray-600">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics Bar */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2 items-center">
        {(["this_month", "previous_month", "total", "custom"] as FilterMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setFilterMode(mode)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={filterMode === mode
              ? { background: "hsl(260, 55%, 50%)", color: "white" }
              : { background: "hsl(0,0%,95%)", color: "hsl(0,0%,40%)" }}
          >
            {filterLabels[mode]}
          </button>
        ))}
        {filterMode === "custom" && (
          <div className="flex gap-2 items-center ml-2">
            <input type="date" className="border rounded-lg px-2 py-1 text-xs" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
            <span className="text-xs text-gray-400">to</span>
            <input type="date" className="border rounded-lg px-2 py-1 text-xs" value={customTo} onChange={e => setCustomTo(e.target.value)} />
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="p-4 flex gap-4 flex-wrap">
        <div className="rounded-xl p-4 flex-1 min-w-[180px]" style={{ background: "hsl(260, 45%, 95%)" }}>
          <p className="text-xs font-semibold" style={{ color: "hsl(260, 40%, 50%)" }}>{filterLabels[filterMode]}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: "hsl(260, 50%, 35%)" }}>₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
          <p className="text-xs mt-1" style={{ color: "hsl(0,0%,55%)" }}>{filteredTransactions.length} transaction(s)</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-4">
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-8">Loading...</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-8">No transactions found for this period.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "hsl(260, 40%, 96%)" }}>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Date</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Name</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Purpose</th>
                  <th className="text-right px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Amount</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Details</th>
                  <th className="text-center px-3 py-2 font-semibold" style={{ color: "hsl(260, 40%, 40%)" }}>Screenshot</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-3 py-2.5 whitespace-nowrap">{new Date(t.transaction_date).toLocaleDateString("en-IN")}</td>
                    <td className="px-3 py-2.5 font-medium">{t.name}</td>
                    <td className="px-3 py-2.5">{t.purpose}</td>
                    <td className="px-3 py-2.5 text-right font-semibold" style={{ color: "hsl(145, 50%, 35%)" }}>₹{Number(t.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[150px] truncate">{t.transaction_details || "—"}</td>
                    <td className="px-3 py-2.5 text-center">
                      {t.screenshot_url ? (
                        <a href={t.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color: "hsl(260, 55%, 50%)" }}>View</a>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button onClick={() => deleteTransaction(t.id)} className="text-red-400 hover:text-red-600 transition"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
