import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  Clock,
  DoorOpen,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";
import { usePayments } from "../hooks/usePayments";
import { useResidents } from "../hooks/useResidents";
import { useRooms } from "../hooks/useRooms";
import type { Resident } from "../types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* ─── KPI Card ──────────────────────────────────────────────────────────── */
type AccentVariant = "primary" | "success" | "warning" | "neutral";

function KpiCard({
  label,
  value,
  subtext,
  icon: Icon,
  accent = "primary",
  subtextHighlight,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  accent?: AccentVariant;
  subtextHighlight?: string;
}) {
  const iconBg: Record<AccentVariant, string> = {
    primary: "bg-primary/10",
    success: "bg-[oklch(0.55_0.18_150/0.12)]",
    warning: "bg-destructive/10",
    neutral: "bg-muted",
  };
  const iconColor: Record<AccentVariant, string> = {
    primary: "text-primary",
    success: "text-[oklch(0.45_0.16_150)]",
    warning: "text-destructive",
    neutral: "text-muted-foreground",
  };
  const borderColor: Record<AccentVariant, string> = {
    primary: "border-l-primary",
    success: "border-l-[oklch(0.55_0.18_150)]",
    warning: "border-l-destructive",
    neutral: "border-l-muted-foreground",
  };

  return (
    <div className={cn("kpi-card flex items-start gap-4", borderColor[accent])}>
      <div className={cn("p-2.5 rounded-lg shrink-0", iconBg[accent])}>
        <Icon className={cn("w-5 h-5", iconColor[accent])} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-display font-bold text-foreground mt-0.5 leading-tight">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {subtextHighlight && (
            <span className={cn("font-semibold mr-1", iconColor[accent])}>
              {subtextHighlight}
            </span>
          )}
          {subtext}
        </p>
      </div>
    </div>
  );
}

/* ─── Status Badge ──────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  if (status === "paid")
    return (
      <Badge className="bg-[oklch(0.55_0.18_150/0.12)] text-[oklch(0.38_0.14_150)] border border-[oklch(0.55_0.18_150/0.25)] hover:bg-[oklch(0.55_0.18_150/0.2)] text-[11px]">
        Paid
      </Badge>
    );
  if (status === "overdue")
    return (
      <Badge variant="destructive" className="text-[11px]">
        Overdue
      </Badge>
    );
  return (
    <Badge variant="secondary" className="text-[11px]">
      Unpaid
    </Badge>
  );
}

/* ─── Resident Avatar ───────────────────────────────────────────────────── */
function ResidentAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
      <span className="text-[11px] font-bold text-primary">{initials}</span>
    </div>
  );
}

/* ─── Overdue Row ───────────────────────────────────────────────────────── */
function OverdueRow({ resident }: { resident: Resident }) {
  return (
    <Link
      to={`/residents/${resident.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-destructive/5 transition-colors border-b border-border/50 last:border-0 group"
      data-ocid={`overdue-row-${resident.id}`}
    >
      <ResidentAvatar name={resident.fullName} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {resident.fullName}
        </p>
        <p className="text-xs text-muted-foreground">
          Room {resident.roomNumber} · Floor {resident.floorNumber}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-destructive font-mono">
          ₹{resident.monthlyRent.toLocaleString("en-IN")}
        </p>
        <p className="text-[11px] text-muted-foreground">
          Due day {resident.rentDueDate}
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { residents } = useResidents();
  const { occupiedCount, vacantCount, totalRooms, occupancyRate, floors } =
    useRooms(residents);
  const { getCurrentMonthSummary } = usePayments();

  const now = new Date();
  const currentMonth = MONTH_NAMES[now.getMonth()];
  const currentYear = now.getFullYear();

  // Revenue calculations
  const totalExpectedRevenue = residents.reduce((s, r) => s + r.monthlyRent, 0);
  const collectedRevenue = residents
    .filter((r) => r.paymentStatus === "paid")
    .reduce((s, r) => s + r.monthlyRent, 0);

  // Payment status counts from residents
  const paidCount = residents.filter((r) => r.paymentStatus === "paid").length;
  const unpaidCount = residents.filter(
    (r) => r.paymentStatus === "unpaid",
  ).length;
  const overdueResidents = residents.filter(
    (r) => r.paymentStatus === "overdue",
  );

  // Monthly payment summary from payment records
  const monthSummary = getCurrentMonthSummary();

  const groundFloor = floors[0];
  const collectionPct =
    totalExpectedRevenue > 0
      ? Math.round((collectedRevenue / totalExpectedRevenue) * 100)
      : 0;

  return (
    <div className="p-4 md:p-6 space-y-6" data-ocid="dashboard-page">
      {/* ── KPI Row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Total Residents"
          value={String(residents.length)}
          subtext={`${occupiedCount} rooms occupied`}
          icon={Users}
          accent="primary"
        />
        <KpiCard
          label="Occupied Rooms"
          value={String(occupiedCount)}
          subtext={`${occupancyRate}% occupancy rate`}
          icon={BedDouble}
          accent="success"
          subtextHighlight={`${totalRooms} total ·`}
        />
        <KpiCard
          label="Vacant Rooms"
          value={String(vacantCount)}
          subtext="rooms available to let"
          icon={DoorOpen}
          accent="neutral"
          subtextHighlight={`${vacantCount} of ${totalRooms}`}
        />
        <KpiCard
          label="Monthly Revenue"
          value={`₹${collectedRevenue.toLocaleString("en-IN")}`}
          subtext={`total ₹${totalExpectedRevenue.toLocaleString("en-IN")} (${collectionPct}% collected)`}
          icon={IndianRupee}
          accent="success"
          subtextHighlight="Collected ·"
        />
      </div>

      {/* ── Middle Row: Room Grid + Resident Table ────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Room Grid */}
        <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-foreground text-sm">
                Room Grid — {groundFloor?.label}
              </h2>
            </div>
            <Link
              to="/rooms"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="view-all-rooms"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-4 grid grid-cols-5 gap-2">
            {groundFloor?.rooms.slice(0, 20).map((room) => (
              <Link
                key={room.roomNumber}
                to="/rooms"
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg p-2 min-h-[58px] transition-smooth text-center",
                  room.isOccupied
                    ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-xs"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80",
                )}
                data-ocid={`room-cell-${room.roomNumber}`}
              >
                <span className="font-display font-bold text-sm">
                  {room.roomNumber}
                </span>
                {room.resident && (
                  <span className="text-[10px] leading-tight mt-0.5 opacity-80 truncate w-full text-center">
                    {room.resident.fullName.split(" ")[0]}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 px-4 pb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-primary inline-block" />
              Occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-muted inline-block" />
              Vacant
            </span>
          </div>
        </div>

        {/* Resident list */}
        <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-foreground text-sm">
                Resident List
              </h2>
            </div>
            <Link
              to="/residents"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="view-all-residents"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide">
                    Resident
                  </th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide">
                    Room
                  </th>
                  <th className="text-left px-3 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-5 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide">
                    Rent/mo
                  </th>
                </tr>
              </thead>
              <tbody>
                {residents.slice(0, 7).map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    data-ocid={`resident-row-${r.id}`}
                  >
                    <td className="px-5 py-3">
                      <Link
                        to={`/residents/${r.id}`}
                        className="flex items-center gap-3 group"
                      >
                        <ResidentAvatar name={r.fullName} />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors truncate max-w-[110px]">
                          {r.fullName}
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground text-sm">
                      {r.roomNumber}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={r.paymentStatus} />
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-sm text-foreground">
                      ₹{r.monthlyRent.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Payment Summary + Overdue ─────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Monthly Payment Summary */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border shadow-xs overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground text-sm">
              Payment Summary — {currentMonth} {currentYear}
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {/* Revenue progress bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground font-medium">
                  Collection Progress
                </span>
                <span className="font-semibold text-foreground">
                  {collectionPct}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[oklch(0.55_0.18_150)] rounded-full transition-all duration-500"
                  style={{ width: `${collectionPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                <span>
                  Collected ₹{collectedRevenue.toLocaleString("en-IN")}
                </span>
                <span>
                  Total ₹{totalExpectedRevenue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                {
                  label: "Paid",
                  value:
                    monthSummary.totalCollected > 0
                      ? monthSummary.totalCollected
                      : paidCount,
                  isCount: monthSummary.totalCollected === 0,
                  icon: CheckCircle2,
                  color: "text-[oklch(0.45_0.16_150)]",
                  bg: "bg-[oklch(0.55_0.18_150/0.08)]",
                  border: "border-[oklch(0.55_0.18_150/0.2)]",
                },
                {
                  label: "Unpaid",
                  value: unpaidCount,
                  isCount: true,
                  icon: Clock,
                  color: "text-muted-foreground",
                  bg: "bg-muted/40",
                  border: "border-border",
                },
                {
                  label: "Overdue",
                  value: overdueResidents.length,
                  isCount: true,
                  icon: AlertCircle,
                  color: "text-destructive",
                  bg: "bg-destructive/8",
                  border: "border-destructive/20",
                },
                {
                  label: "Total Residents",
                  value: residents.length,
                  isCount: true,
                  icon: Users,
                  color: "text-foreground",
                  bg: "bg-muted/30",
                  border: "border-border",
                },
              ].map(
                ({ label, value, isCount, icon: Ico, color, bg, border }) => (
                  <div
                    key={label}
                    className={cn(
                      "rounded-lg p-3 border flex items-center gap-3",
                      bg,
                      border,
                    )}
                  >
                    <Ico className={cn("w-4 h-4 shrink-0", color)} />
                    <div>
                      <p
                        className={cn(
                          "text-xl font-display font-bold leading-none",
                          color,
                        )}
                      >
                        {isCount
                          ? value
                          : `₹${(value as number).toLocaleString("en-IN")}`}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {label}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Overdue Payments */}
        <div className="xl:col-span-3 bg-card rounded-xl border border-destructive/30 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <h2 className="font-display font-semibold text-foreground text-sm">
                Overdue Payments
              </h2>
              {overdueResidents.length > 0 && (
                <span className="text-[11px] font-semibold bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 leading-none">
                  {overdueResidents.length}
                </span>
              )}
            </div>
            <Link
              to="/payments"
              className="text-xs text-primary hover:underline flex items-center gap-1"
              data-ocid="view-all-payments"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {overdueResidents.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 text-center"
              data-ocid="overdue-empty-state"
            >
              <CheckCircle2 className="w-9 h-9 text-[oklch(0.55_0.18_150)] mb-2" />
              <p className="text-sm font-medium text-foreground">
                All payments up to date
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                No overdue rent this month
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {overdueResidents.map((r) => (
                <OverdueRow key={r.id} resident={r} />
              ))}
            </div>
          )}

          {overdueResidents.length > 0 && (
            <div className="px-5 py-3 bg-destructive/5 border-t border-destructive/15 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Total outstanding
              </span>
              <span className="text-sm font-bold text-destructive font-mono">
                ₹
                {overdueResidents
                  .reduce((s, r) => s + r.monthlyRent, 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
