import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { usePayments } from "../hooks/usePayments";

type FilterTab = "all" | "paid" | "unpaid" | "overdue";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isOverdue(resident: {
  paymentStatus: string;
  rentDueDate: number;
}): boolean {
  if (resident.paymentStatus === "paid") return false;
  const today = new Date();
  const dueThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    resident.rentDueDate,
  );
  return today > dueThisMonth;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "paid")
    return (
      <span className="success-badge inline-flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Paid
      </span>
    );
  if (status === "overdue")
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="w-3 h-3" /> Overdue
      </Badge>
    );
  return (
    <Badge variant="secondary" className="gap-1">
      <XCircle className="w-3 h-3" /> Unpaid
    </Badge>
  );
}

export default function Payments() {
  const {
    residents,
    paymentRecords,
    markAsPaid,
    markAsUnpaid,
    addPaymentRecord,
  } = usePayments();
  const [filter, setFilter] = useState<FilterTab>("all");
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Build a resident-centric view: find each resident's current month record (if any)
  const residentRows = useMemo(() => {
    return residents.map((r) => {
      const record = paymentRecords.find(
        (p) =>
          p.residentId === r.id &&
          p.month === currentMonth &&
          p.year === currentYear,
      );
      const overdue = isOverdue(r);
      const effectiveStatus: string =
        record?.status ?? (overdue ? "overdue" : r.paymentStatus);
      return {
        resident: r,
        record,
        effectiveStatus,
        overdue: effectiveStatus === "overdue",
      };
    });
  }, [residents, paymentRecords, currentMonth, currentYear]);

  // Summary calculations
  const totalResidents = residents.length;
  const totalExpected = residents.reduce((s, r) => s + r.monthlyRent, 0);
  const totalCollected = residentRows
    .filter((row) => row.effectiveStatus === "paid")
    .reduce((s, row) => s + row.resident.monthlyRent, 0);
  const totalOutstanding = totalExpected - totalCollected;
  const paidCount = residentRows.filter(
    (row) => row.effectiveStatus === "paid",
  ).length;
  const unpaidCount = residentRows.filter(
    (row) => row.effectiveStatus === "unpaid",
  ).length;
  const overdueCount = residentRows.filter(
    (row) => row.effectiveStatus === "overdue",
  ).length;
  const collectionRate =
    totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

  const filtered = residentRows.filter((row) => {
    if (filter === "all") return true;
    return row.effectiveStatus === filter;
  });

  const FILTER_TABS: { value: FilterTab; label: string; count: number }[] = [
    { value: "all", label: "All", count: totalResidents },
    { value: "paid", label: "Paid", count: paidCount },
    { value: "unpaid", label: "Unpaid", count: unpaidCount },
    { value: "overdue", label: "Overdue", count: overdueCount },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-display font-bold text-foreground">
          Payment Management
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {MONTH_NAMES[currentMonth - 1]} {currentYear} — track and manage rent
          payments
        </p>
      </div>

      {/* Monthly Summary Card */}
      <div className="bg-card rounded-xl border border-border shadow-xs p-5 space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-display font-semibold text-foreground text-sm">
            Monthly Summary
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Total Expected
            </p>
            <p className="text-2xl font-display font-bold text-foreground">
              ₹{totalExpected.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              {totalResidents} residents
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Collected
            </p>
            <p className="text-2xl font-display font-bold text-success">
              ₹{totalCollected.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">{paidCount} paid</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
              Outstanding
            </p>
            <p
              className={cn(
                "text-2xl font-display font-bold",
                totalOutstanding > 0 ? "text-destructive" : "text-foreground",
              )}
            >
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              {unpaidCount + overdueCount} pending
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Collection Rate
            </span>
            <span className="text-xs font-semibold text-foreground">
              {collectionRate}%
            </span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${collectionRate}%` }}
              data-ocid="collection-progress-bar"
            />
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Collected {collectionRate}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" />
              Pending {100 - collectionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* KPI chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className="bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3"
          data-ocid="kpi-total-residents"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-display font-bold text-foreground leading-none">
              {totalResidents}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Total Residents
            </p>
          </div>
        </div>
        <div
          className="bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3"
          data-ocid="kpi-paid"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-display font-bold text-foreground leading-none">
              {paidCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Paid This Month
            </p>
          </div>
        </div>
        <div
          className="bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3"
          data-ocid="kpi-unpaid"
        >
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <XCircle className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-display font-bold text-foreground leading-none">
              {unpaidCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Unpaid</p>
          </div>
        </div>
        <div
          className="bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3"
          data-ocid="kpi-overdue"
        >
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-display font-bold text-destructive leading-none">
              {overdueCount}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Overdue</p>
          </div>
        </div>
      </div>

      {/* Resident Payments Table */}
      <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
        {/* Header with filter tabs */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border flex-wrap">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Resident Payments
            </h2>
          </div>
          <div
            className="flex items-center gap-1 bg-muted/50 rounded-lg p-1"
            data-ocid="payment-filter-tabs"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                data-ocid={`filter-tab-${tab.value}`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  filter === tab.value
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                    filter === tab.value
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-14 text-center" data-ocid="payments-empty">
            <XCircle className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No residents match this filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Resident Name
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Room
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Monthly Rent
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Due Date
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(
                  ({ resident, record, effectiveStatus, overdue }, idx) => (
                    <tr
                      key={resident.id}
                      className={cn(
                        "border-b border-border/50 transition-colors",
                        overdue
                          ? "bg-destructive/5 hover:bg-destructive/8"
                          : idx % 2 === 0
                            ? "bg-card hover:bg-muted/20"
                            : "bg-muted/10 hover:bg-muted/25",
                      )}
                      data-ocid={`payment-row-${resident.id}`}
                    >
                      {/* Resident Name */}
                      <td className="px-5 py-3">
                        <Link
                          to={`/residents/${resident.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                              overdue
                                ? "bg-destructive/15 text-destructive"
                                : "bg-primary/15 text-primary",
                            )}
                          >
                            {resident.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate max-w-[150px]">
                              {resident.fullName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Floor {resident.floorNumber + 1}
                            </p>
                          </div>
                        </Link>
                      </td>
                      {/* Room */}
                      <td className="px-3 py-3">
                        <span className="font-mono text-sm font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded">
                          {resident.roomNumber}
                        </span>
                      </td>
                      {/* Monthly Rent */}
                      <td className="px-3 py-3 text-right font-mono font-semibold text-foreground">
                        ₹{resident.monthlyRent.toLocaleString("en-IN")}
                      </td>
                      {/* Due Date */}
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            "text-sm",
                            overdue
                              ? "text-destructive font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          {resident.rentDueDate}
                          <sup className="text-[10px] ml-0.5">
                            {resident.rentDueDate === 1
                              ? "st"
                              : resident.rentDueDate === 2
                                ? "nd"
                                : resident.rentDueDate === 3
                                  ? "rd"
                                  : "th"}
                          </sup>
                          {" of month"}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-3 py-3">
                        <StatusBadge status={effectiveStatus} />
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3 text-right">
                        {effectiveStatus !== "paid" ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => {
                              if (record) {
                                markAsPaid(record.id);
                              } else {
                                const now = new Date();
                                addPaymentRecord({
                                  residentId: resident.id,
                                  month: currentMonth,
                                  year: currentYear,
                                  amount: resident.monthlyRent,
                                  paidDate: now.toISOString().split("T")[0],
                                  status: "paid",
                                });
                              }
                            }}
                            data-ocid={`mark-paid-${resident.id}`}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Mark Paid
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              if (record) markAsUnpaid(record.id);
                            }}
                            disabled={!record}
                            data-ocid={`mark-unpaid-${resident.id}`}
                          >
                            Mark Unpaid
                          </Button>
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Showing {filtered.length} of {totalResidents} residents
            </span>
            {filter === "all" && (
              <span className="text-xs text-muted-foreground">
                ₹{totalCollected.toLocaleString("en-IN")} collected of ₹
                {totalExpected.toLocaleString("en-IN")} expected
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
