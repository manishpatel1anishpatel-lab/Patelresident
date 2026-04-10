import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { BedDouble, Building2, DoorOpen, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { useResidents } from "../hooks/useResidents";
import { useRooms } from "../hooks/useRooms";
import type { Floor, Resident, RoomStatus } from "../types";

// ─── Room detail modal ────────────────────────────────────────────────────────

interface RoomModalProps {
  room: RoomStatus | null;
  onClose: () => void;
}

function RoomModal({ room, onClose }: RoomModalProps) {
  if (!room) return null;

  const resident = room.resident as Resident | null;

  const statusColor: Record<string, string> = {
    paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
    unpaid: "bg-amber-100 text-amber-800 border-amber-200",
    overdue: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <Dialog open={!!room} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm" data-ocid="room-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <BedDouble className="w-5 h-5 text-primary" />
            Room {room.roomNumber}
          </DialogTitle>
        </DialogHeader>

        {resident ? (
          <div className="space-y-4 pt-1">
            {/* Resident header */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-display font-bold text-sm shrink-0">
                {resident.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">
                  {resident.fullName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Floor {room.floorNumber === 0 ? "Ground" : room.floorNumber}
                  {" · "}Room {room.roomNumber}
                </p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 gap-2.5">
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-foreground font-mono">
                  {resident.mobileNumber}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  Check-in:{" "}
                  <span className="text-foreground">
                    {new Date(resident.checkInDate).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span className="w-4 h-4 shrink-0 flex items-center justify-center text-muted-foreground text-xs">
                  ₹
                </span>
                <span className="text-muted-foreground">
                  Rent:{" "}
                  <span className="text-foreground font-medium">
                    ₹{resident.monthlyRent.toLocaleString("en-IN")}
                  </span>
                  <span className="text-muted-foreground"> / month</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Payment: </span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium border",
                    statusColor[resident.paymentStatus] ?? statusColor.unpaid,
                  )}
                >
                  {resident.paymentStatus.charAt(0).toUpperCase() +
                    resident.paymentStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button variant="default" size="sm" className="flex-1" asChild>
                <Link to={`/residents/${resident.id}`} onClick={onClose}>
                  View Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm text-center">
              This room is currently vacant and available for occupancy.
            </p>
            <Button variant="default" size="sm" asChild>
              <Link to="/residents/add" onClick={onClose}>
                Add Resident
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Single room cell ─────────────────────────────────────────────────────────

function RoomCell({
  room,
  onClick,
}: {
  room: RoomStatus;
  onClick: (room: RoomStatus) => void;
}) {
  const isOverdue = room.resident?.paymentStatus === "overdue";
  const isUnpaid = room.resident?.paymentStatus === "unpaid";

  return (
    <button
      type="button"
      onClick={() => onClick(room)}
      data-ocid={`room-cell-${room.roomNumber}`}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg p-2 min-h-[72px] w-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        room.isOccupied
          ? isOverdue
            ? "bg-red-500/15 border border-red-400/40 hover:bg-red-500/25 cursor-pointer text-red-900 dark:text-red-200"
            : isUnpaid
              ? "bg-amber-400/15 border border-amber-400/40 hover:bg-amber-400/25 cursor-pointer text-amber-900 dark:text-amber-200"
              : "bg-primary/15 border border-primary/30 hover:bg-primary/25 cursor-pointer text-primary"
          : "bg-muted/40 border border-dashed border-border/60 hover:bg-muted/60 cursor-pointer text-muted-foreground",
      )}
      aria-label={
        room.isOccupied
          ? `Room ${room.roomNumber} - ${room.resident?.fullName}`
          : `Room ${room.roomNumber} - Vacant`
      }
    >
      <span
        className={cn(
          "font-display font-bold text-sm",
          room.isOccupied ? "" : "opacity-50",
        )}
      >
        {room.roomNumber}
      </span>

      {room.isOccupied ? (
        <>
          <span className="text-[10px] leading-tight mt-1 font-medium truncate w-full text-center px-1 opacity-90">
            {room.resident!.fullName.split(" ")[0]}
          </span>
          {isOverdue && (
            <span className="text-[8px] mt-0.5 font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
              Overdue
            </span>
          )}
        </>
      ) : (
        <span className="text-[9px] mt-1 opacity-40 font-medium">Vacant</span>
      )}
    </button>
  );
}

// ─── Floor section ────────────────────────────────────────────────────────────

function FloorSection({
  floor,
  onRoomClick,
}: {
  floor: Floor;
  onRoomClick: (room: RoomStatus) => void;
}) {
  const occupied = floor.rooms.filter((r) => r.isOccupied).length;
  const overdue = floor.rooms.filter(
    (r) => r.resident?.paymentStatus === "overdue",
  ).length;
  const total = floor.rooms.length;
  const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return (
    <div className="bg-card rounded-xl border border-border shadow-xs overflow-hidden">
      {/* Floor header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border bg-muted/20">
        <div>
          <h3 className="font-display font-semibold text-foreground text-base">
            {floor.label}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Rooms {floor.rooms[0].roomNumber}–
            {floor.rooms[floor.rooms.length - 1].roomNumber}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs font-semibold tabular-nums"
            >
              {occupied}/{total} Occupied
            </Badge>
            {overdue > 0 && (
              <Badge
                variant="destructive"
                className="text-xs font-semibold tabular-nums"
              >
                {overdue} Overdue
              </Badge>
            )}
          </div>

          {/* Progress bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground tabular-nums w-8">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Room grid: 4 cols mobile, 5 sm, 10 md+ */}
      <div className="p-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {floor.rooms.map((room) => (
          <RoomCell key={room.roomNumber} room={room} onClick={onRoomClick} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Rooms() {
  const { residents } = useResidents();
  const { floors, occupiedCount, vacantCount, totalRooms, occupancyRate } =
    useRooms(residents);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [modalRoom, setModalRoom] = useState<RoomStatus | null>(null);

  const visibleFloors =
    selectedFloor !== null
      ? floors.filter((f) => f.floorNumber === selectedFloor)
      : floors;

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Summary KPI bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Occupancy Rate",
            value: `${occupancyRate}%`,
            sub: "of total rooms",
          },
          {
            label: "Occupied Rooms",
            value: occupiedCount,
            sub: `out of ${totalRooms}`,
          },
          { label: "Vacant Rooms", value: vacantCount, sub: "available" },
          { label: "Total Rooms", value: totalRooms, sub: "across 3 floors" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="kpi-card text-center">
            <p className="text-2xl font-display font-bold text-foreground">
              {value}
            </p>
            <p className="text-[11px] text-muted-foreground font-medium">
              {label}
            </p>
            <p className="text-[10px] text-muted-foreground/70">{sub}</p>
          </div>
        ))}
      </div>

      {/* Floor filter tabs */}
      <div
        className="flex items-center gap-2 flex-wrap"
        data-ocid="floor-filter-bar"
      >
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Floor:
        </span>
        {[
          { val: null, label: "All Floors" },
          ...floors.map((f) => ({ val: f.floorNumber, label: f.label })),
        ].map(({ val, label }) => (
          <button
            key={String(val)}
            type="button"
            onClick={() => setSelectedFloor(val)}
            data-ocid={`floor-filter-${val ?? "all"}`}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth border",
              selectedFloor === val
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:bg-muted/60",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-primary/20 border border-primary/30 inline-block" />
          Occupied — paid
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-amber-400/20 border border-amber-400/40 inline-block" />
          Occupied — unpaid
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-red-500/20 border border-red-400/40 inline-block" />
          Occupied — overdue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded bg-muted/40 border border-dashed border-border inline-block" />
          Vacant
        </span>
      </div>

      {/* Floor sections */}
      {visibleFloors.map((floor) => (
        <FloorSection
          key={floor.floorNumber}
          floor={floor}
          onRoomClick={setModalRoom}
        />
      ))}

      {/* Empty state */}
      {residents.length === 0 && (
        <div
          className="flex flex-col items-center py-12 gap-3 bg-card rounded-xl border border-dashed border-border"
          data-ocid="rooms-empty-state"
        >
          <BedDouble className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-muted-foreground text-sm font-medium">
            No residents added yet
          </p>
          <p className="text-muted-foreground/60 text-xs max-w-xs text-center">
            All rooms show as vacant. Add a resident to see occupancy.
          </p>
          <Button variant="default" size="sm" asChild>
            <Link to="/residents/add">Add First Resident</Link>
          </Button>
        </div>
      )}

      {/* Room detail modal */}
      <RoomModal room={modalRoom} onClose={() => setModalRoom(null)} />
    </div>
  );
}
