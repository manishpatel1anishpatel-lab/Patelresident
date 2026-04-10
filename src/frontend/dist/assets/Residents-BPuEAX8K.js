import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, U as Users, S as Search, I as Input, X, L as Link } from "./index-0cf5ij5C.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, S as SquarePen, T as Trash2 } from "./alert-dialog-BCn72Kuy.js";
import { B as Button } from "./button-CeRqIOtb.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DkYCTROf.js";
import { u as useResidents, m as maskAadhar } from "./useResidents-dzA5lnWC.js";
import "./index-DOeS2R5s.js";
import "./index-BVL4vJ2W.js";
import "./index-BQZhAMKW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const STATUS_CONFIG = {
  paid: { label: "Paid", className: "success-badge" },
  unpaid: {
    label: "Unpaid",
    className: "warning-badge"
  },
  overdue: { label: "Overdue", className: "warning-badge" }
};
function PaymentBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cfg.className, children: cfg.label });
}
function ResidentRow({
  resident,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/30 transition-colors group",
      "data-ocid": "resident-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: resident.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate max-w-[160px]", children: resident.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[160px]", children: resident.permanentAddress.split(",")[0] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground font-mono", children: resident.roomNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: [
          "Floor ",
          resident.floorNumber + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground font-mono", children: resident.mobileNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground font-mono", children: maskAadhar(resident.aadharNumber) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm text-right font-mono text-foreground", children: [
          "₹",
          resident.monthlyRent.toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentBadge, { status: resident.paymentStatus }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/residents/$residentId",
              params: { residentId: resident.id },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7",
                  "aria-label": "View resident",
                  "data-ocid": `view-resident-${resident.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/residents/$residentId/edit",
              params: { residentId: resident.id },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7",
                  "aria-label": "Edit resident",
                  "data-ocid": `edit-resident-${resident.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10",
              "aria-label": "Delete resident",
              onClick: () => onDelete(resident.id),
              "data-ocid": `delete-resident-${resident.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] }) })
      ]
    }
  );
}
function ResidentCard({
  resident,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-lg border border-border p-4 space-y-3",
      "data-ocid": "resident-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-primary", children: resident.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: resident.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Room ",
                resident.roomNumber,
                " · Floor ",
                resident.floorNumber + 1
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentBadge, { status: resident.paymentStatus })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Mobile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: resident.mobileNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Aadhar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-foreground", children: maskAadhar(resident.aadharNumber) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/residents/$residentId",
              params: { residentId: resident.id },
              className: "flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full h-7 text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                    " View"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/residents/$residentId/edit",
              params: { residentId: resident.id },
              className: "flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full h-7 text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3" }),
                    " Edit"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(resident.id),
              "aria-label": "Delete",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] })
      ]
    }
  );
}
function Residents() {
  const navigate = useNavigate();
  const { residents, deleteResident } = useResidents();
  const [search, setSearch] = reactExports.useState("");
  const [floorFilter, setFloorFilter] = reactExports.useState("all");
  const [roomFilter, setRoomFilter] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const floors = reactExports.useMemo(() => {
    const nums = [...new Set(residents.map((r) => r.floorNumber))].sort(
      (a, b) => a - b
    );
    return nums;
  }, [residents]);
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase().trim();
    return residents.filter((r) => {
      const matchSearch = !q || r.fullName.toLowerCase().includes(q) || r.roomNumber.toLowerCase().includes(q) || String(r.floorNumber + 1).includes(q);
      const matchFloor = floorFilter === "all" || r.floorNumber === Number(floorFilter);
      const matchRoom = !roomFilter.trim() || r.roomNumber.toLowerCase().includes(roomFilter.toLowerCase().trim());
      const matchStatus = statusFilter === "all" || r.paymentStatus === statusFilter;
      return matchSearch && matchFloor && matchRoom && matchStatus;
    });
  }, [residents, search, floorFilter, roomFilter, statusFilter]);
  const hasFilters = !!search || floorFilter !== "all" || !!roomFilter || statusFilter !== "all";
  const clearFilters = () => {
    setSearch("");
    setFloorFilter("all");
    setRoomFilter("");
    setStatusFilter("all");
  };
  const confirmDelete = () => {
    if (deleteId) {
      deleteResident(deleteId);
      setDeleteId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-semibold text-foreground", children: "All Residents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            residents.length,
            " total · ",
            filtered.length,
            " shown"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/residents/add" }),
          className: "gap-2 h-9",
          "data-ocid": "add-resident-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Resident"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name, room, floor...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 h-9 text-sm",
            "data-ocid": "search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: floorFilter, onValueChange: setFloorFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-9 w-32 text-sm",
            "data-ocid": "floor-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Floor" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Floors" }),
          floors.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(f), children: [
            "Floor ",
            f + 1
          ] }, f))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Room no.",
          value: roomFilter,
          onChange: (e) => setRoomFilter(e.target.value),
          className: "h-9 w-28 text-sm",
          "data-ocid": "room-filter"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "h-9 w-36 text-sm",
            "data-ocid": "status-filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "unpaid", children: "Unpaid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "overdue", children: "Overdue" })
        ] })
      ] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: clearFilters,
          className: "h-9 gap-1.5 text-muted-foreground hover:text-foreground",
          "data-ocid": "clear-filters-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
            "Clear"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block bg-card border border-border rounded-lg overflow-hidden", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No residents found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasFilters ? "Try adjusting your filters" : "Add your first resident to get started" }),
          !hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "mt-4 gap-2",
              onClick: () => navigate({ to: "/residents/add" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Add Resident"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
        "Resident",
        "Room",
        "Floor",
        "Mobile",
        "Aadhar",
        "Rent",
        "Status",
        ""
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide ${h === "Rent" ? "text-right" : "text-left"}`,
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResidentRow, { resident: r, onDelete: setDeleteId }, r.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-border",
        "data-ocid": "empty-state-mobile",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No residents found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hasFilters ? "Try adjusting filters" : "Add your first resident" })
        ]
      }
    ) : filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResidentCard, { resident: r, onDelete: setDeleteId }, r.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteId,
        onOpenChange: (open) => !open && setDeleteId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Resident" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure? This will remove the resident and all their payment records permanently." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "delete-cancel", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: confirmDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "delete-confirm",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Residents as default
};
