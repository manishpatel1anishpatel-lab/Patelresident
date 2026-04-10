import { useCallback, useState } from "react";
import type { HostelData, PaymentRecord, PaymentStatus } from "../types";

const STORAGE_KEY = "hostelHub_data";

function loadData(): HostelData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as HostelData;
  } catch {
    // ignore
  }
  return { residents: [], paymentRecords: [] };
}

function saveData(data: HostelData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function usePayments() {
  const [data, setData] = useState<HostelData>(() => loadData());

  const persist = useCallback((next: HostelData) => {
    saveData(next);
    setData(next);
  }, []);

  const addPaymentRecord = useCallback(
    (record: Omit<PaymentRecord, "id">) => {
      const newRecord: PaymentRecord = { ...record, id: generateId() };
      const next: HostelData = {
        ...data,
        paymentRecords: [...data.paymentRecords, newRecord],
      };
      // Update resident's payment status
      const residents = data.residents.map((r) =>
        r.id === record.residentId
          ? {
              ...r,
              paymentStatus: record.status,
              updatedAt: new Date().toISOString(),
            }
          : r,
      );
      persist({ ...next, residents });
      return newRecord;
    },
    [data, persist],
  );

  const updatePaymentStatus = useCallback(
    (recordId: string, status: PaymentStatus, paidDate: string | null) => {
      const paymentRecords = data.paymentRecords.map((p) =>
        p.id === recordId ? { ...p, status, paidDate } : p,
      );
      // Update resident's current payment status
      const updated = paymentRecords.find((p) => p.id === recordId);
      const residents = updated
        ? data.residents.map((r) =>
            r.id === updated.residentId
              ? {
                  ...r,
                  paymentStatus: status,
                  updatedAt: new Date().toISOString(),
                }
              : r,
          )
        : data.residents;
      persist({ ...data, paymentRecords, residents });
    },
    [data, persist],
  );

  const markAsPaid = useCallback(
    (recordId: string) => {
      updatePaymentStatus(
        recordId,
        "paid",
        new Date().toISOString().split("T")[0],
      );
    },
    [updatePaymentStatus],
  );

  const markAsUnpaid = useCallback(
    (recordId: string) => {
      updatePaymentStatus(recordId, "unpaid", null);
    },
    [updatePaymentStatus],
  );

  const getResidentPayments = useCallback(
    (residentId: string) =>
      data.paymentRecords
        .filter((p) => p.residentId === residentId)
        .sort((a, b) => b.year - a.year || b.month - a.month),
    [data],
  );

  const getCurrentMonthSummary = useCallback(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const current = data.paymentRecords.filter(
      (p) => p.month === month && p.year === year,
    );
    const totalCollected = current
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalExpected = current.reduce((sum, p) => sum + p.amount, 0);
    const overdueCount = current.filter((p) => p.status === "overdue").length;
    const unpaidCount = current.filter((p) => p.status === "unpaid").length;
    return {
      totalCollected,
      totalExpected,
      overdueCount,
      unpaidCount,
      month,
      year,
    };
  }, [data]);

  const getMonthlyRevenue = useCallback(() => {
    return data.residents
      .filter((r) => r.paymentStatus === "paid")
      .reduce((sum, r) => sum + r.monthlyRent, 0);
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
    getMonthlyRevenue,
  };
}
