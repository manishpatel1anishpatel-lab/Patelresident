import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import { Edit, Eye, Plus, Search, Trash2, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { maskAadhar, useResidents } from "../hooks/useResidents";
import type { PaymentStatus, Resident } from "../types";

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  paid: { label: "Paid", className: "success-badge" },
  unpaid: {
    label: "Unpaid",
    className: "warning-badge",
  },
  overdue: { label: "Overdue", className: "warning-badge" },
};

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const cfg = STATUS_CONFIG[status];
  return <span className={cfg.className}>{cfg.label}</span>;
}

function ResidentRow({
  resident,
  onDelete,
}: {
  resident: Resident;
  onDelete: (id: string) => void;
}) {
  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors group"
      data-ocid="resident-row"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-primary">
              {resident.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm truncate max-w-[160px]">
              {resident.fullName}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[160px]">
              {resident.permanentAddress.split(",")[0]}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-foreground font-mono">
        {resident.roomNumber}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        Floor {resident.floorNumber + 1}
      </td>
      <td className="px-4 py-3 text-sm text-foreground font-mono">
        {resident.mobileNumber}
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
        {maskAadhar(resident.aadharNumber)}
      </td>
      <td className="px-4 py-3 text-sm text-right font-mono text-foreground">
        ₹{resident.monthlyRent.toLocaleString("en-IN")}
      </td>
      <td className="px-4 py-3">
        <PaymentBadge status={resident.paymentStatus} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <Link
            to="/residents/$residentId"
            params={{ residentId: resident.id }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label="View resident"
              data-ocid={`view-resident-${resident.id}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link
            to="/residents/$residentId/edit"
            params={{ residentId: resident.id }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label="Edit resident"
              data-ocid={`edit-resident-${resident.id}`}
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete resident"
            onClick={() => onDelete(resident.id)}
            data-ocid={`delete-resident-${resident.id}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

function ResidentCard({
  resident,
  onDelete,
}: {
  resident: Resident;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="bg-card rounded-lg border border-border p-4 space-y-3"
      data-ocid="resident-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-primary">
              {resident.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {resident.fullName}
            </p>
            <p className="text-xs text-muted-foreground">
              Room {resident.roomNumber} · Floor {resident.floorNumber + 1}
            </p>
          </div>
        </div>
        <PaymentBadge status={resident.paymentStatus} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Mobile</p>
          <p className="font-mono text-foreground">{resident.mobileNumber}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Aadhar</p>
          <p className="font-mono text-foreground">
            {maskAadhar(resident.aadharNumber)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-1 border-t border-border">
        <Link
          to="/residents/$residentId"
          params={{ residentId: resident.id }}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs gap-1"
          >
            <Eye className="w-3 h-3" /> View
          </Button>
        </Link>
        <Link
          to="/residents/$residentId/edit"
          params={{ residentId: resident.id }}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs gap-1"
          >
            <Edit className="w-3 h-3" /> Edit
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(resident.id)}
          aria-label="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export default function Residents() {
  const navigate = useNavigate();
  const { residents, deleteResident } = useResidents();
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const floors = useMemo(() => {
    const nums = [...new Set(residents.map((r) => r.floorNumber))].sort(
      (a, b) => a - b,
    );
    return nums;
  }, [residents]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return residents.filter((r) => {
      const matchSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.roomNumber.toLowerCase().includes(q) ||
        String(r.floorNumber + 1).includes(q);
      const matchFloor =
        floorFilter === "all" || r.floorNumber === Number(floorFilter);
      const matchRoom =
        !roomFilter.trim() ||
        r.roomNumber.toLowerCase().includes(roomFilter.toLowerCase().trim());
      const matchStatus =
        statusFilter === "all" || r.paymentStatus === statusFilter;
      return matchSearch && matchFloor && matchRoom && matchStatus;
    });
  }, [residents, search, floorFilter, roomFilter, statusFilter]);

  const hasFilters =
    !!search || floorFilter !== "all" || !!roomFilter || statusFilter !== "all";

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

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <h1 className="text-lg font-display font-semibold text-foreground">
              All Residents
            </h1>
            <p className="text-xs text-muted-foreground">
              {residents.length} total · {filtered.length} shown
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate({ to: "/residents/add" })}
          className="gap-2 h-9"
          data-ocid="add-resident-btn"
        >
          <Plus className="w-4 h-4" />
          Add Resident
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by name, room, floor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
              data-ocid="search-input"
            />
          </div>
          <Select value={floorFilter} onValueChange={setFloorFilter}>
            <SelectTrigger
              className="h-9 w-32 text-sm"
              data-ocid="floor-filter"
            >
              <SelectValue placeholder="Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              {floors.map((f) => (
                <SelectItem key={f} value={String(f)}>
                  Floor {f + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Room no."
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="h-9 w-28 text-sm"
            data-ocid="room-filter"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="h-9 w-36 text-sm"
              data-ocid="status-filter"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
              data-ocid="clear-filters-btn"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="empty-state"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">No residents found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasFilters
                ? "Try adjusting your filters"
                : "Add your first resident to get started"}
            </p>
            {!hasFilters && (
              <Button
                className="mt-4 gap-2"
                onClick={() => navigate({ to: "/residents/add" })}
              >
                <Plus className="w-4 h-4" />
                Add Resident
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {[
                    "Resident",
                    "Room",
                    "Floor",
                    "Mobile",
                    "Aadhar",
                    "Rent",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide ${h === "Rent" ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <ResidentRow key={r.id} resident={r} onDelete={setDeleteId} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-lg border border-border"
            data-ocid="empty-state-mobile"
          >
            <Users className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="font-medium text-foreground">No residents found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasFilters ? "Try adjusting filters" : "Add your first resident"}
            </p>
          </div>
        ) : (
          filtered.map((r) => (
            <ResidentCard key={r.id} resident={r} onDelete={setDeleteId} />
          ))
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resident</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This will remove the resident and all their payment
              records permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="delete-cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="delete-confirm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
