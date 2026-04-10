import { c as createLucideIcon, j as jsxRuntimeExports, U as Users, B as Building2, L as Link, a as cn } from "./index-0cf5ij5C.js";
import { B as Badge } from "./badge-1MfU7Q7J.js";
import { u as usePayments } from "./usePayments-9-OTwz5V.js";
import { u as useResidents } from "./useResidents-dzA5lnWC.js";
import { u as useRooms, B as BedDouble, D as DoorOpen } from "./useRooms-U_COl4sc.js";
import { I as IndianRupee, C as Clock } from "./indian-rupee-BYL74lrq.js";
import { T as TrendingUp, C as CircleCheck } from "./trending-up-CHHQ2puD.js";
import { C as CircleAlert } from "./circle-alert-DZo1umIl.js";
import "./index-BVL4vJ2W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
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
  "December"
];
function KpiCard({
  label,
  value,
  subtext,
  icon: Icon,
  accent = "primary",
  subtextHighlight
}) {
  const iconBg = {
    primary: "bg-primary/10",
    success: "bg-[oklch(0.55_0.18_150/0.12)]",
    warning: "bg-destructive/10",
    neutral: "bg-muted"
  };
  const iconColor = {
    primary: "text-primary",
    success: "text-[oklch(0.45_0.16_150)]",
    warning: "text-destructive",
    neutral: "text-muted-foreground"
  };
  const borderColor = {
    primary: "border-l-primary",
    success: "border-l-[oklch(0.55_0.18_150)]",
    warning: "border-l-destructive",
    neutral: "border-l-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("kpi-card flex items-start gap-4", borderColor[accent]), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2.5 rounded-lg shrink-0", iconBg[accent]), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-5 h-5", iconColor[accent]) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-0.5 leading-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        subtextHighlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-semibold mr-1", iconColor[accent]), children: subtextHighlight }),
        subtext
      ] })
    ] })
  ] });
}
function StatusBadge({ status }) {
  if (status === "paid")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(0.55_0.18_150/0.12)] text-[oklch(0.38_0.14_150)] border border-[oklch(0.55_0.18_150/0.25)] hover:bg-[oklch(0.55_0.18_150/0.2)] text-[11px]", children: "Paid" });
  if (status === "overdue")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-[11px]", children: "Overdue" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[11px]", children: "Unpaid" });
}
function ResidentAvatar({ name }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-primary", children: initials }) });
}
function OverdueRow({ resident }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: `/residents/${resident.id}`,
      className: "flex items-center gap-3 px-4 py-3 hover:bg-destructive/5 transition-colors border-b border-border/50 last:border-0 group",
      "data-ocid": `overdue-row-${resident.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResidentAvatar, { name: resident.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: resident.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Room ",
            resident.roomNumber,
            " · Floor ",
            resident.floorNumber
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-destructive font-mono", children: [
            "₹",
            resident.monthlyRent.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            "Due day ",
            resident.rentDueDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" })
      ]
    }
  );
}
function Dashboard() {
  const { residents } = useResidents();
  const { occupiedCount, vacantCount, totalRooms, occupancyRate, floors } = useRooms(residents);
  const { getCurrentMonthSummary } = usePayments();
  const now = /* @__PURE__ */ new Date();
  const currentMonth = MONTH_NAMES[now.getMonth()];
  const currentYear = now.getFullYear();
  const totalExpectedRevenue = residents.reduce((s, r) => s + r.monthlyRent, 0);
  const collectedRevenue = residents.filter((r) => r.paymentStatus === "paid").reduce((s, r) => s + r.monthlyRent, 0);
  const paidCount = residents.filter((r) => r.paymentStatus === "paid").length;
  const unpaidCount = residents.filter(
    (r) => r.paymentStatus === "unpaid"
  ).length;
  const overdueResidents = residents.filter(
    (r) => r.paymentStatus === "overdue"
  );
  const monthSummary = getCurrentMonthSummary();
  const groundFloor = floors[0];
  const collectionPct = totalExpectedRevenue > 0 ? Math.round(collectedRevenue / totalExpectedRevenue * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", "data-ocid": "dashboard-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Total Residents",
          value: String(residents.length),
          subtext: `${occupiedCount} rooms occupied`,
          icon: Users,
          accent: "primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Occupied Rooms",
          value: String(occupiedCount),
          subtext: `${occupancyRate}% occupancy rate`,
          icon: BedDouble,
          accent: "success",
          subtextHighlight: `${totalRooms} total ·`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Vacant Rooms",
          value: String(vacantCount),
          subtext: "rooms available to let",
          icon: DoorOpen,
          accent: "neutral",
          subtextHighlight: `${vacantCount} of ${totalRooms}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KpiCard,
        {
          label: "Monthly Revenue",
          value: `₹${collectedRevenue.toLocaleString("en-IN")}`,
          subtext: `total ₹${totalExpectedRevenue.toLocaleString("en-IN")} (${collectionPct}% collected)`,
          icon: IndianRupee,
          accent: "success",
          subtextHighlight: "Collected ·"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-sm", children: [
              "Room Grid — ",
              groundFloor == null ? void 0 : groundFloor.label
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/rooms",
              className: "text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "view-all-rooms",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 grid grid-cols-5 gap-2", children: groundFloor == null ? void 0 : groundFloor.rooms.slice(0, 20).map((room) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/rooms",
            className: cn(
              "flex flex-col items-center justify-center rounded-lg p-2 min-h-[58px] transition-smooth text-center",
              room.isOccupied ? "bg-primary text-primary-foreground hover:bg-primary/85 shadow-xs" : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
            ),
            "data-ocid": `room-cell-${room.roomNumber}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm", children: room.roomNumber }),
              room.resident && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] leading-tight mt-0.5 opacity-80 truncate w-full text-center", children: room.resident.fullName.split(" ")[0] })
            ]
          },
          room.roomNumber
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 px-4 pb-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-primary inline-block" }),
            "Occupied"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded bg-muted inline-block" }),
            "Vacant"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Resident List" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/residents",
              className: "text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "view-all-residents",
              children: [
                "View all ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide", children: "Resident" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide", children: "Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-2.5 font-medium text-muted-foreground text-[11px] uppercase tracking-wide", children: "Rent/mo" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: residents.slice(0, 7).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              "data-ocid": `resident-row-${r.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: `/residents/${r.id}`,
                    className: "flex items-center gap-3 group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ResidentAvatar, { name: r.fullName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground group-hover:text-primary transition-colors truncate max-w-[110px]", children: r.fullName })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground text-sm", children: r.roomNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.paymentStatus }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-right font-mono text-sm text-foreground", children: [
                  "₹",
                  r.monthlyRent.toLocaleString("en-IN")
                ] })
              ]
            },
            r.id
          )) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2 bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-sm", children: [
            "Payment Summary — ",
            currentMonth,
            " ",
            currentYear
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Collection Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                collectionPct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-[oklch(0.55_0.18_150)] rounded-full transition-all duration-500",
                style: { width: `${collectionPct}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-muted-foreground mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Collected ₹",
                collectedRevenue.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Total ₹",
                totalExpectedRevenue.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
            {
              label: "Paid",
              value: monthSummary.totalCollected > 0 ? monthSummary.totalCollected : paidCount,
              isCount: monthSummary.totalCollected === 0,
              icon: CircleCheck,
              color: "text-[oklch(0.45_0.16_150)]",
              bg: "bg-[oklch(0.55_0.18_150/0.08)]",
              border: "border-[oklch(0.55_0.18_150/0.2)]"
            },
            {
              label: "Unpaid",
              value: unpaidCount,
              isCount: true,
              icon: Clock,
              color: "text-muted-foreground",
              bg: "bg-muted/40",
              border: "border-border"
            },
            {
              label: "Overdue",
              value: overdueResidents.length,
              isCount: true,
              icon: CircleAlert,
              color: "text-destructive",
              bg: "bg-destructive/8",
              border: "border-destructive/20"
            },
            {
              label: "Total Residents",
              value: residents.length,
              isCount: true,
              icon: Users,
              color: "text-foreground",
              bg: "bg-muted/30",
              border: "border-border"
            }
          ].map(
            ({ label, value, isCount, icon: Ico, color, bg, border }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "rounded-lg p-3 border flex items-center gap-3",
                  bg,
                  border
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ico, { className: cn("w-4 h-4 shrink-0", color) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: cn(
                          "text-xl font-display font-bold leading-none",
                          color
                        ),
                        children: isCount ? value : `₹${value.toLocaleString("en-IN")}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: label })
                  ] })
                ]
              },
              label
            )
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-3 bg-card rounded-xl border border-destructive/30 shadow-xs overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-destructive/20 bg-destructive/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Overdue Payments" }),
            overdueResidents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold bg-destructive text-destructive-foreground rounded-full px-2 py-0.5 leading-none", children: overdueResidents.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/payments",
              className: "text-xs text-primary hover:underline flex items-center gap-1",
              "data-ocid": "view-all-payments",
              children: [
                "Manage ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ] }),
        overdueResidents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 text-center",
            "data-ocid": "overdue-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-[oklch(0.55_0.18_150)] mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "All payments up to date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "No overdue rent this month" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: overdueResidents.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(OverdueRow, { resident: r }, r.id)) }),
        overdueResidents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-destructive/5 border-t border-destructive/15 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total outstanding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-destructive font-mono", children: [
            "₹",
            overdueResidents.reduce((s, r) => s + r.monthlyRent, 0).toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
