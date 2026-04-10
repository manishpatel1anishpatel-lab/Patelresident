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
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Edit,
  Home,
  IndianRupee,
  MapPin,
  Phone,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { usePayments } from "../hooks/usePayments";
import { maskAadhar, useResidents } from "../hooks/useResidents";
import type { PaymentRecord, PaymentStatus } from "../types";

const STATUS_BADGE: Record<PaymentStatus, string> = {
  paid: "success-badge",
  unpaid: "warning-badge",
  overdue: "warning-badge",
};

const STATUS_ICONS: Record<PaymentStatus, React.ReactNode> = {
  paid: <CheckCircle className="w-4 h-4 text-green-600" />,
  unpaid: <Clock className="w-4 h-4 text-amber-500" />,
  overdue: <XCircle className="w-4 h-4 text-destructive" />,
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
  "Dec",
];

function InfoField({
  label,
  value,
  mono,
}: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={`text-sm text-foreground font-medium break-words ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function PaymentRow({
  record,
  onMarkPaid,
  onMarkUnpaid,
}: {
  record: PaymentRecord;
  onMarkPaid: (id: string) => void;
  onMarkUnpaid: (id: string) => void;
}) {
  return (
    <tr
      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
      data-ocid={`payment-row-${record.id}`}
    >
      <td className="px-4 py-3 text-sm font-medium text-foreground">
        {MONTH_NAMES[record.month - 1]} {record.year}
      </td>
      <td className="px-4 py-3 text-sm font-mono text-right text-foreground">
        ₹{record.amount.toLocaleString("en-IN")}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {record.paidDate
          ? new Date(record.paidDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—"}
      </td>
      <td className="px-4 py-3">
        <span className={STATUS_BADGE[record.status]}>
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        {record.status !== "paid" ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => onMarkPaid(record.id)}
            data-ocid={`mark-paid-${record.id}`}
          >
            Mark Paid
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={() => onMarkUnpaid(record.id)}
            data-ocid={`mark-unpaid-${record.id}`}
          >
            Undo
          </Button>
        )}
      </td>
    </tr>
  );
}

export default function ResidentDetail() {
  const { residentId } = useParams({ from: "/residents/$residentId" });
  const navigate = useNavigate();
  const { getResident, deleteResident } = useResidents();
  const { getResidentPayments, markAsPaid, markAsUnpaid, addPaymentRecord } =
    usePayments();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const resident = getResident(residentId);
  const payments = getResidentPayments(residentId);

  if (!resident) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <User className="w-12 h-12 text-muted-foreground mb-3" />
        <h2 className="text-lg font-semibold text-foreground">
          Resident not found
        </h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          This resident may have been deleted.
        </p>
        <Link to="/residents">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Residents
          </Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteResident(resident.id);
    navigate({ to: "/residents" });
  };

  const handleTogglePayment = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const currentRecord = payments.find(
      (p) => p.month === month && p.year === year,
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
        status: isPaid ? "paid" : "unpaid",
      });
    }
  };

  const checkInFormatted = new Date(resident.checkInDate).toLocaleDateString(
    "en-IN",
    { day: "2-digit", month: "long", year: "numeric" },
  );

  const dueSuffix =
    ["th", "st", "nd", "rd"][Math.min(resident.rentDueDate % 10, 3)] ?? "th";

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-4xl">
      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link to="/residents">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 h-8 text-muted-foreground hover:text-foreground -ml-2"
            data-ocid="back-to-residents"
          >
            <ArrowLeft className="w-4 h-4" />
            Residents
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/residents/$residentId/edit" params={{ residentId }}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5"
              data-ocid="edit-resident-btn"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            onClick={() => setShowDeleteDialog(true)}
            data-ocid="delete-resident-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-primary">
              {resident.fullName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  {resident.fullName}
                </h1>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Home className="w-3.5 h-3.5" />
                    Room {resident.roomNumber} · Floor{" "}
                    {resident.floorNumber + 1}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    Checked in {checkInFormatted}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {STATUS_ICONS[resident.paymentStatus]}
                <span className={STATUS_BADGE[resident.paymentStatus]}>
                  {resident.paymentStatus.charAt(0).toUpperCase() +
                    resident.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rent + Toggle */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">
              Monthly Rent:{" "}
              <span className="font-semibold font-mono">
                ₹{resident.monthlyRent.toLocaleString("en-IN")}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              · Due on {resident.rentDueDate}
              {dueSuffix} of month
            </span>
          </div>
          <Button
            size="sm"
            variant={resident.paymentStatus === "paid" ? "outline" : "default"}
            onClick={handleTogglePayment}
            className="h-8 gap-1.5"
            data-ocid="toggle-payment-btn"
          >
            {resident.paymentStatus === "paid" ? (
              <>
                <XCircle className="w-3.5 h-3.5" />
                Mark as Unpaid
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Mark as Paid
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Personal Details
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoField label="Full Name" value={resident.fullName} />
          <InfoField label="Mobile Number" value={resident.mobileNumber} mono />
          <InfoField
            label="Aadhar Number"
            value={maskAadhar(resident.aadharNumber)}
            mono
          />
          <InfoField label="Father's Name" value={resident.fathersName} />
          <InfoField label="Mother's Name" value={resident.mothersName} />
        </div>
        <Separator />
        <div>
          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Permanent Address
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {resident.permanentAddress}
          </p>
        </div>
      </div>

      {/* Room & Rent */}
      <div className="bg-card border border-border rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Room & Rent Details
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoField label="Room Number" value={resident.roomNumber} mono />
          <InfoField
            label="Floor"
            value={`Floor ${resident.floorNumber + 1}`}
          />
          <InfoField
            label="Monthly Rent"
            value={`₹${resident.monthlyRent.toLocaleString("en-IN")}`}
            mono
          />
          <InfoField
            label="Due Date"
            value={`${resident.rentDueDate}${dueSuffix} of every month`}
          />
          <InfoField label="Check-in Date" value={checkInFormatted} />
          <InfoField
            label="Payment Status"
            value={
              resident.paymentStatus.charAt(0).toUpperCase() +
              resident.paymentStatus.slice(1)
            }
          />
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            Payment History
          </h2>
          <span className="ml-auto text-xs text-muted-foreground">
            {payments.length} records
          </span>
        </div>
        {payments.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 text-center"
            data-ocid="payment-empty-state"
          >
            <CreditCard className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No payment records yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className="w-full text-left"
              data-ocid="payment-history-table"
            >
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Month
                  </th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
                    Amount
                  </th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Paid Date
                  </th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <PaymentRow
                    key={p.id}
                    record={p}
                    onMarkPaid={markAsPaid}
                    onMarkUnpaid={markAsUnpaid}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resident</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{resident.fullName}</span>? All
              payment records will also be removed permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="delete-cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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
