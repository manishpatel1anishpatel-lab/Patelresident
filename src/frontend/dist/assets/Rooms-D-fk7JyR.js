import { c as createLucideIcon, j as jsxRuntimeExports, X, a as cn, r as reactExports, L as Link, B as Building2 } from "./index-0cf5ij5C.js";
import { B as Badge } from "./badge-1MfU7Q7J.js";
import { B as Button } from "./button-CeRqIOtb.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-BQZhAMKW.js";
import { u as useResidents } from "./useResidents-dzA5lnWC.js";
import { u as useRooms, B as BedDouble, D as DoorOpen } from "./useRooms-U_COl4sc.js";
import { U as User } from "./user-C8X5A0op.js";
import "./index-BVL4vJ2W.js";
import "./index-DOeS2R5s.js";
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function RoomModal({ room, onClose }) {
  if (!room) return null;
  const resident = room.resident;
  const statusColor = {
    paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
    unpaid: "bg-amber-100 text-amber-800 border-amber-200",
    overdue: "bg-red-100 text-red-800 border-red-200"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!room, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "room-modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-5 h-5 text-primary" }),
      "Room ",
      room.roomNumber
    ] }) }),
    resident ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-bold text-sm shrink-0", children: resident.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: resident.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Floor ",
            room.floorNumber === 0 ? "Ground" : room.floorNumber,
            " · ",
            "Room ",
            room.roomNumber
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: resident.mobileNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Check-in:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: new Date(resident.checkInDate).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 shrink-0 flex items-center justify-center text-muted-foreground text-xs", children: "₹" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Rent:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              "₹",
              resident.monthlyRent.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " / month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "px-2 py-0.5 rounded-full text-xs font-medium border",
                statusColor[resident.paymentStatus] ?? statusColor.unpaid
              ),
              children: resident.paymentStatus.charAt(0).toUpperCase() + resident.paymentStatus.slice(1)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", className: "flex-1", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/residents/${resident.id}`, onClick: onClose, children: "View Profile" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-6 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoorOpen, { className: "w-6 h-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center", children: "This room is currently vacant and available for occupancy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents/add", onClick: onClose, children: "Add Resident" }) })
    ] })
  ] }) });
}
function RoomCell({
  room,
  onClick
}) {
  var _a, _b, _c;
  const isOverdue = ((_a = room.resident) == null ? void 0 : _a.paymentStatus) === "overdue";
  const isUnpaid = ((_b = room.resident) == null ? void 0 : _b.paymentStatus) === "unpaid";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onClick(room),
      "data-ocid": `room-cell-${room.roomNumber}`,
      className: cn(
        "flex flex-col items-center justify-center rounded-lg p-2 min-h-[72px] w-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        room.isOccupied ? isOverdue ? "bg-red-500/15 border border-red-400/40 hover:bg-red-500/25 cursor-pointer text-red-900 dark:text-red-200" : isUnpaid ? "bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25 cursor-pointer text-amber-900 dark:text-amber-200" : "bg-primary/15 border border-primary/30 hover:bg-primary/25 cursor-pointer text-primary" : "bg-muted/40 border border-dashed border-border/60 hover:bg-muted/60 cursor-pointer text-muted-foreground"
      ),
      "aria-label": room.isOccupied ? `Room ${room.roomNumber} - ${(_c = room.resident) == null ? void 0 : _c.fullName}` : `Room ${room.roomNumber} - Vacant`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "font-display font-bold text-sm",
              room.isOccupied ? "" : "opacity-50"
            ),
            children: room.roomNumber
          }
        ),
        room.isOccupied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] leading-tight mt-1 font-medium truncate w-full text-center px-1 opacity-90", children: room.resident.fullName.split(" ")[0] }),
          isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] mt-0.5 font-semibold uppercase tracking-wide text-red-600 dark:text-red-400", children: "Overdue" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] mt-1 opacity-40 font-medium", children: "Vacant" })
      ]
    }
  );
}
function FloorSection({
  floor,
  onRoomClick
}) {
  const occupied = floor.rooms.filter((r) => r.isOccupied).length;
  const overdue = floor.rooms.filter(
    (r) => {
      var _a;
      return ((_a = r.resident) == null ? void 0 : _a.paymentStatus) === "overdue";
    }
  ).length;
  const total = floor.rooms.length;
  const pct = total > 0 ? Math.round(occupied / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-xs overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base", children: floor.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          "Rooms ",
          floor.rooms[0].roomNumber,
          "–",
          floor.rooms[floor.rooms.length - 1].roomNumber
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "text-xs font-semibold tabular-nums",
              children: [
                occupied,
                "/",
                total,
                " Occupied"
              ]
            }
          ),
          overdue > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "destructive",
              className: "text-xs font-semibold tabular-nums",
              children: [
                overdue,
                " Overdue"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-500",
              style: { width: `${pct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground tabular-nums w-8", children: [
            pct,
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2", children: floor.rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoomCell, { room, onClick: onRoomClick }, room.roomNumber)) })
  ] });
}
function Rooms() {
  const { residents } = useResidents();
  const { floors, occupiedCount, vacantCount, totalRooms, occupancyRate } = useRooms(residents);
  const [selectedFloor, setSelectedFloor] = reactExports.useState(null);
  const [modalRoom, setModalRoom] = reactExports.useState(null);
  const visibleFloors = selectedFloor !== null ? floors.filter((f) => f.floorNumber === selectedFloor) : floors;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Occupancy Rate",
        value: `${occupancyRate}%`,
        sub: "of total rooms"
      },
      {
        label: "Occupied Rooms",
        value: occupiedCount,
        sub: `out of ${totalRooms}`
      },
      { label: "Vacant Rooms", value: vacantCount, sub: "available" },
      { label: "Total Rooms", value: totalRooms, sub: "across 3 floors" }
    ].map(({ label, value, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi-card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/70", children: sub })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 flex-wrap",
        "data-ocid": "floor-filter-bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Floor:" }),
          [
            { val: null, label: "All Floors" },
            ...floors.map((f) => ({ val: f.floorNumber, label: f.label }))
          ].map(({ val, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedFloor(val),
              "data-ocid": `floor-filter-${val ?? "all"}`,
              className: cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border",
                selectedFloor === val ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-muted/60"
              ),
              children: label
            },
            String(val)
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded bg-primary/20 border border-primary/30 inline-block" }),
        "Occupied — paid"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded bg-amber-400/20 border border-amber-400/40 inline-block" }),
        "Occupied — unpaid"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded bg-red-500/20 border border-red-400/40 inline-block" }),
        "Occupied — overdue"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded bg-muted/40 border border-dashed border-border inline-block" }),
        "Vacant"
      ] })
    ] }),
    visibleFloors.map((floor) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      FloorSection,
      {
        floor,
        onRoomClick: setModalRoom
      },
      floor.floorNumber
    )),
    residents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-12 gap-3 bg-card rounded-xl border border-dashed border-border",
        "data-ocid": "rooms-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No residents added yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-xs max-w-xs text-center", children: "All rooms show as vacant. Add a resident to see occupancy." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents/add", children: "Add First Resident" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoomModal, { room: modalRoom, onClose: () => setModalRoom(null) })
  ] });
}
export {
  Rooms as default
};
