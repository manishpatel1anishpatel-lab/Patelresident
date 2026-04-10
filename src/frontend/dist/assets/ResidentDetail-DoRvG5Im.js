import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, b as useParams, u as useNavigate, L as Link, H as House, C as CreditCard } from "./index-0cf5ij5C.js";
import { S as SquarePen, T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BCn72Kuy.js";
import { B as Button } from "./button-CeRqIOtb.js";
import { P as Primitive, A as ArrowLeft } from "./index-CCReU2F6.js";
import { u as usePayments } from "./usePayments-9-OTwz5V.js";
import { u as useResidents, m as maskAadhar } from "./useResidents-dzA5lnWC.js";
import { U as User } from "./user-C8X5A0op.js";
import { I as IndianRupee, C as Clock } from "./indian-rupee-BYL74lrq.js";
import { C as CircleX } from "./circle-x-y_oWsdvd.js";
import "./index-DOeS2R5s.js";
import "./index-BVL4vJ2W.js";
import "./index-BQZhAMKW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const STATUS_BADGE = {
  paid: "success-badge",
  unpaid: "warning-badge",
  overdue: "warning-badge"
};
const STATUS_ICONS = {
  paid: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-600" }),
  unpaid: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-amber-500" }),
  overdue: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive" })
};
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
function InfoField({
  label,
  value,
  mono
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: `text-sm text-foreground font-medium break-words ${mono ? "font-mono" : ""}`,
        children: value
      }
    )
  ] });
}
function PaymentRow({
  record,
  onMarkPaid,
  onMarkUnpaid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
      "data-ocid": `payment-row-${record.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm font-medium text-foreground", children: [
          MONTH_NAMES[record.month - 1],
          " ",
          record.year
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-sm font-mono text-right text-foreground", children: [
          "₹",
          record.amount.toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: record.paidDate ? new Date(record.paidDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: STATUS_BADGE[record.status], children: record.status.charAt(0).toUpperCase() + record.status.slice(1) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: record.status !== "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-7 text-xs",
            onClick: () => onMarkPaid(record.id),
            "data-ocid": `mark-paid-${record.id}`,
            children: "Mark Paid"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-7 text-xs text-muted-foreground",
            onClick: () => onMarkUnpaid(record.id),
            "data-ocid": `mark-unpaid-${record.id}`,
            children: "Undo"
          }
        ) })
      ]
    }
  );
}
function ResidentDetail() {
  const { residentId } = useParams({ from: "/residents/$residentId" });
  const navigate = useNavigate();
  const { getResident, deleteResident } = useResidents();
  const { getResidentPayments, markAsPaid, markAsUnpaid, addPaymentRecord } = usePayments();
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const resident = getResident(residentId);
  const payments = getResidentPayments(residentId);
  if (!resident) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[50vh] p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-12 h-12 text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground", children: "Resident not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "This resident may have been deleted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        "Back to Residents"
      ] }) })
    ] });
  }
  const handleDelete = () => {
    deleteResident(resident.id);
    navigate({ to: "/residents" });
  };
  const handleTogglePayment = () => {
    const now = /* @__PURE__ */ new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentRecord = payments.find(
      (p) => p.month === month && p.year === year
    );
    if (currentRecord) {
      if (resident.paymentStatus === "paid") {
        markAsUnpaid(currentRecord.id);
      } else {
        markAsPaid(currentRecord.id);
      }
    } else {
      const isPaid = resident.paymentStatus !== "paid";
      addPaymentRecord({
        residentId: resident.id,
        month,
        year,
        amount: resident.monthlyRent,
        paidDate: isPaid ? now.toISOString().split("T")[0] : null,
        status: isPaid ? "paid" : "unpaid"
      });
    }
  };
  const checkInFormatted = new Date(resident.checkInDate).toLocaleDateString(
    "en-IN",
    { day: "2-digit", month: "long", year: "numeric" }
  );
  const dueSuffix = ["th", "st", "nd", "rd"][Math.min(resident.rentDueDate % 10, 3)] ?? "th";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-5 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 h-8 text-muted-foreground hover:text-foreground -ml-2",
          "data-ocid": "back-to-residents",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Residents"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents/$residentId/edit", params: { residentId }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 gap-1.5",
            "data-ocid": "edit-resident-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5" }),
              "Edit"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "h-8 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30",
            onClick: () => setShowDeleteDialog(true),
            "data-ocid": "delete-resident-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              "Delete"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-primary", children: resident.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: resident.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" }),
                "Room ",
                resident.roomNumber,
                " · Floor",
                " ",
                resident.floorNumber + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                "Checked in ",
                checkInFormatted
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            STATUS_ICONS[resident.paymentStatus],
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: STATUS_BADGE[resident.paymentStatus], children: resident.paymentStatus.charAt(0).toUpperCase() + resident.paymentStatus.slice(1) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
            "Monthly Rent:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold font-mono", children: [
              "₹",
              resident.monthlyRent.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "· Due on ",
            resident.rentDueDate,
            dueSuffix,
            " of month"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: resident.paymentStatus === "paid" ? "outline" : "default",
            onClick: handleTogglePayment,
            className: "h-8 gap-1.5",
            "data-ocid": "toggle-payment-btn",
            children: resident.paymentStatus === "paid" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
              "Mark as Unpaid"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
              "Mark as Paid"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
        "Personal Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Full Name", value: resident.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Mobile Number", value: resident.mobileNumber, mono: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoField,
          {
            label: "Aadhar Number",
            value: maskAadhar(resident.aadharNumber),
            mono: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Father's Name", value: resident.fathersName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Mother's Name", value: resident.mothersName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
          "Permanent Address"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: resident.permanentAddress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }),
        "Room & Rent Details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Room Number", value: resident.roomNumber, mono: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoField,
          {
            label: "Floor",
            value: `Floor ${resident.floorNumber + 1}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoField,
          {
            label: "Monthly Rent",
            value: `₹${resident.monthlyRent.toLocaleString("en-IN")}`,
            mono: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoField,
          {
            label: "Due Date",
            value: `${resident.rentDueDate}${dueSuffix} of every month`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Check-in Date", value: checkInFormatted }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InfoField,
          {
            label: "Payment Status",
            value: resident.paymentStatus.charAt(0).toUpperCase() + resident.paymentStatus.slice(1)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Payment History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
          payments.length,
          " records"
        ] })
      ] }),
      payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-10 text-center",
          "data-ocid": "payment-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-8 h-8 text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No payment records yet" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-left",
          "data-ocid": "payment-history-table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Month" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Paid Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: payments.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaymentRow,
              {
                record: p,
                onMarkPaid: markAsPaid,
                onMarkUnpaid: markAsUnpaid
              },
              p.id
            )) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Resident" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: resident.fullName }),
          "? All payment records will also be removed permanently."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "delete-cancel", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            "data-ocid": "delete-confirm",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ResidentDetail as default
};
