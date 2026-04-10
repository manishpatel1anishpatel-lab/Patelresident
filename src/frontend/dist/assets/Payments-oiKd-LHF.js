import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, U as Users, C as CreditCard, L as Link } from "./index-0cf5ij5C.js";
import { B as Badge } from "./badge-1MfU7Q7J.js";
import { B as Button } from "./button-CeRqIOtb.js";
import { u as usePayments } from "./usePayments-9-OTwz5V.js";
import { T as TrendingUp, C as CircleCheck } from "./trending-up-CHHQ2puD.js";
import { C as CircleX } from "./circle-x-y_oWsdvd.js";
import "./index-BVL4vJ2W.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
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
  "Dec"
];
function isOverdue(resident) {
  if (resident.paymentStatus === "paid") return false;
  const today = /* @__PURE__ */ new Date();
  const dueThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    resident.rentDueDate
  );
  return today > dueThisMonth;
}
function StatusBadge({ status }) {
  if (status === "paid")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "success-badge inline-flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " Paid"
    ] });
  if (status === "overdue")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
      " Overdue"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
    " Unpaid"
  ] });
}
function Payments() {
  const {
    residents,
    paymentRecords,
    markAsPaid,
    markAsUnpaid,
    addPaymentRecord
  } = usePayments();
  const [filter, setFilter] = reactExports.useState("all");
  const now = /* @__PURE__ */ new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const residentRows = reactExports.useMemo(() => {
    return residents.map((r) => {
      const record = paymentRecords.find(
        (p) => p.residentId === r.id && p.month === currentMonth && p.year === currentYear
      );
      const overdue = isOverdue(r);
      const effectiveStatus = (record == null ? void 0 : record.status) ?? (overdue ? "overdue" : r.paymentStatus);
      return {
        resident: r,
        record,
        effectiveStatus,
        overdue: effectiveStatus === "overdue"
      };
    });
  }, [residents, paymentRecords, currentMonth, currentYear]);
  const totalResidents = residents.length;
  const totalExpected = residents.reduce((s, r) => s + r.monthlyRent, 0);
  const totalCollected = residentRows.filter((row) => row.effectiveStatus === "paid").reduce((s, row) => s + row.resident.monthlyRent, 0);
  const totalOutstanding = totalExpected - totalCollected;
  const paidCount = residentRows.filter(
    (row) => row.effectiveStatus === "paid"
  ).length;
  const unpaidCount = residentRows.filter(
    (row) => row.effectiveStatus === "unpaid"
  ).length;
  const overdueCount = residentRows.filter(
    (row) => row.effectiveStatus === "overdue"
  ).length;
  const collectionRate = totalExpected > 0 ? Math.round(totalCollected / totalExpected * 100) : 0;
  const filtered = residentRows.filter((row) => {
    if (filter === "all") return true;
    return row.effectiveStatus === filter;
  });
  const FILTER_TABS = [
    { value: "all", label: "All", count: totalResidents },
    { value: "paid", label: "Paid", count: paidCount },
    { value: "unpaid", label: "Unpaid", count: unpaidCount },
    { value: "overdue", label: "Overdue", count: overdueCount }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Payment Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        MONTH_NAMES[currentMonth - 1],
        " ",
        currentYear,
        " — track and manage rent payments"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Monthly Summary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "Total Expected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-foreground", children: [
            "₹",
            totalExpected.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            totalResidents,
            " residents"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "Collected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-display font-bold text-success", children: [
            "₹",
            totalCollected.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            paidCount,
            " paid"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-semibold", children: "Outstanding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: cn(
                "text-2xl font-display font-bold",
                totalOutstanding > 0 ? "text-destructive" : "text-foreground"
              ),
              children: [
                "₹",
                totalOutstanding.toLocaleString("en-IN")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            unpaidCount + overdueCount,
            " pending"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Collection Rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
            collectionRate,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-700",
            style: { width: `${collectionRate}%` },
            "data-ocid": "collection-progress-bar"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs text-muted-foreground pt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" }),
            "Collected ",
            collectionRate,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" }),
            "Pending ",
            100 - collectionRate,
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3",
          "data-ocid": "kpi-total-residents",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground leading-none", children: totalResidents }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Residents" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3",
          "data-ocid": "kpi-paid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground leading-none", children: paidCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Paid This Month" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3",
          "data-ocid": "kpi-unpaid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground leading-none", children: unpaidCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Unpaid" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl border border-border shadow-xs p-4 flex items-center gap-3",
          "data-ocid": "kpi-overdue",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-destructive leading-none", children: overdueCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Overdue" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-5 py-4 border-b border-border flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Resident Payments" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1",
            "data-ocid": "payment-filter-tabs",
            children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setFilter(tab.value),
                "data-ocid": `filter-tab-${tab.value}`,
                className: cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  filter === tab.value ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
                ),
                children: [
                  tab.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                        filter === tab.value ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                      ),
                      children: tab.count
                    }
                  )
                ]
              },
              tab.value
            ))
          }
        )
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-14 text-center", "data-ocid": "payments-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-muted-foreground/40 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No residents match this filter." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Resident Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Room" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Monthly Rent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Due Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map(
          ({ resident, record, effectiveStatus, overdue }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: cn(
                "border-b border-border/50 transition-colors",
                overdue ? "bg-destructive/5 hover:bg-destructive/8" : idx % 2 === 0 ? "bg-card hover:bg-muted/20" : "bg-muted/10 hover:bg-muted/25"
              ),
              "data-ocid": `payment-row-${resident.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: `/residents/${resident.id}`,
                    className: "flex items-center gap-3 group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                            overdue ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"
                          ),
                          children: resident.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground group-hover:text-primary transition-colors truncate max-w-[150px]", children: resident.fullName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          "Floor ",
                          resident.floorNumber + 1
                        ] })
                      ] })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded", children: resident.roomNumber }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-3 text-right font-mono font-semibold text-foreground", children: [
                  "₹",
                  resident.monthlyRent.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "text-sm",
                      overdue ? "text-destructive font-medium" : "text-muted-foreground"
                    ),
                    children: [
                      resident.rentDueDate,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { className: "text-[10px] ml-0.5", children: resident.rentDueDate === 1 ? "st" : resident.rentDueDate === 2 ? "nd" : resident.rentDueDate === 3 ? "rd" : "th" }),
                      " of month"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: effectiveStatus }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: effectiveStatus !== "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "text-xs",
                    onClick: () => {
                      if (record) {
                        markAsPaid(record.id);
                      } else {
                        const now2 = /* @__PURE__ */ new Date();
                        addPaymentRecord({
                          residentId: resident.id,
                          month: currentMonth,
                          year: currentYear,
                          amount: resident.monthlyRent,
                          paidDate: now2.toISOString().split("T")[0],
                          status: "paid"
                        });
                      }
                    },
                    "data-ocid": `mark-paid-${resident.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                      "Mark Paid"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "ghost",
                    className: "text-xs text-muted-foreground hover:text-foreground",
                    onClick: () => {
                      if (record) markAsUnpaid(record.id);
                    },
                    disabled: !record,
                    "data-ocid": `mark-unpaid-${resident.id}`,
                    children: "Mark Unpaid"
                  }
                ) })
              ]
            },
            resident.id
          )
        ) })
      ] }) }),
      filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          filtered.length,
          " of ",
          totalResidents,
          " residents"
        ] }),
        filter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "₹",
          totalCollected.toLocaleString("en-IN"),
          " collected of ₹",
          totalExpected.toLocaleString("en-IN"),
          " expected"
        ] })
      ] })
    ] })
  ] });
}
export {
  Payments as default
};
