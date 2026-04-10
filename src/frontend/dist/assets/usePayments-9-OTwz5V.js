import { r as reactExports } from "./index-0cf5ij5C.js";
const STORAGE_KEY = "hostelHub_data";
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { residents: [], paymentRecords: [] };
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function usePayments() {
  const [data, setData] = reactExports.useState(() => loadData());
  const persist = reactExports.useCallback((next) => {
    saveData(next);
    setData(next);
  }, []);
  const addPaymentRecord = reactExports.useCallback(
    (record) => {
      const newRecord = { ...record, id: generateId() };
      const next = {
        ...data,
        paymentRecords: [...data.paymentRecords, newRecord]
      };
      const residents = data.residents.map(
        (r) => r.id === record.residentId ? {
          ...r,
          paymentStatus: record.status,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : r
      );
      persist({ ...next, residents });
      return newRecord;
    },
    [data, persist]
  );
  const updatePaymentStatus = reactExports.useCallback(
    (recordId, status, paidDate) => {
      const paymentRecords = data.paymentRecords.map(
        (p) => p.id === recordId ? { ...p, status, paidDate } : p
      );
      const updated = paymentRecords.find((p) => p.id === recordId);
      const residents = updated ? data.residents.map(
        (r) => r.id === updated.residentId ? {
          ...r,
          paymentStatus: status,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : r
      ) : data.residents;
      persist({ ...data, paymentRecords, residents });
    },
    [data, persist]
  );
  const markAsPaid = reactExports.useCallback(
    (recordId) => {
      updatePaymentStatus(
        recordId,
        "paid",
        (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      );
    },
    [updatePaymentStatus]
  );
  const markAsUnpaid = reactExports.useCallback(
    (recordId) => {
      updatePaymentStatus(recordId, "unpaid", null);
    },
    [updatePaymentStatus]
  );
  const getResidentPayments = reactExports.useCallback(
    (residentId) => data.paymentRecords.filter((p) => p.residentId === residentId).sort((a, b) => b.year - a.year || b.month - a.month),
    [data]
  );
  const getCurrentMonthSummary = reactExports.useCallback(() => {
    const now = /* @__PURE__ */ new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const current = data.paymentRecords.filter(
      (p) => p.month === month && p.year === year
    );
    const totalCollected = current.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
    const totalExpected = current.reduce((sum, p) => sum + p.amount, 0);
    const overdueCount = current.filter((p) => p.status === "overdue").length;
    const unpaidCount = current.filter((p) => p.status === "unpaid").length;
    return {
      totalCollected,
      totalExpected,
      overdueCount,
      unpaidCount,
      month,
      year
    };
  }, [data]);
  const getMonthlyRevenue = reactExports.useCallback(() => {
    return data.residents.filter((r) => r.paymentStatus === "paid").reduce((sum, r) => sum + r.monthlyRent, 0);
  }, [data]);
  return {
    paymentRecords: data.paymentRecords,
    residents: data.residents,
    addPaymentRecord,
    updatePaymentStatus,
    markAsPaid,
    markAsUnpaid,
    getResidentPayments,
    getCurrentMonthSummary,
    getMonthlyRevenue
  };
}
export {
  usePayments as u
};
