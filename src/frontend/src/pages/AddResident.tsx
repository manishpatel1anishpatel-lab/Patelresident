import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Home,
  Save,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useResidents } from "../hooks/useResidents";
import type { PaymentStatus } from "../types";

interface FormData {
  fullName: string;
  roomNumber: string;
  floorNumber: string;
  mobileNumber: string;
  aadharNumber: string;
  fathersName: string;
  mothersName: string;
  permanentAddress: string;
  checkInDate: string;
  monthlyRent: string;
  rentDueDate: string;
  paymentStatus: PaymentStatus;
}

interface FormErrors {
  [key: string]: string;
}

const EMPTY_FORM: FormData = {
  fullName: "",
  roomNumber: "",
  floorNumber: "0",
  mobileNumber: "",
  aadharNumber: "",
  fathersName: "",
  mothersName: "",
  permanentAddress: "",
  checkInDate: new Date().toISOString().split("T")[0],
  monthlyRent: "8500",
  rentDueDate: "5",
  paymentStatus: "unpaid",
};

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (!data.fullName.trim()) e.fullName = "Full name is required";
  if (!data.roomNumber.trim()) e.roomNumber = "Room number is required";
  if (!data.mobileNumber.trim()) {
    e.mobileNumber = "Mobile number is required";
  } else if (!/^\d{10}$/.test(data.mobileNumber.trim())) {
    e.mobileNumber = "Must be exactly 10 digits";
  }
  if (!data.aadharNumber.trim()) {
    e.aadharNumber = "Aadhar number is required";
  } else if (!/^\d{12}$/.test(data.aadharNumber.trim())) {
    e.aadharNumber = "Must be exactly 12 digits";
  }
  if (!data.fathersName.trim()) e.fathersName = "Father's name is required";
  if (!data.mothersName.trim()) e.mothersName = "Mother's name is required";
  if (!data.permanentAddress.trim()) e.permanentAddress = "Address is required";
  if (!data.checkInDate) e.checkInDate = "Check-in date is required";
  const rent = Number(data.monthlyRent);
  if (!data.monthlyRent || Number.isNaN(rent) || rent <= 0)
    e.monthlyRent = "Valid rent amount required";
  const due = Number(data.rentDueDate);
  if (Number.isNaN(due) || due < 1 || due > 28)
    e.rentDueDate = "Must be between 1 and 28";
  return e;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-destructive mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

function SectionHeader({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-border mb-4">
      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-primary" />
      </div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
    </div>
  );
}

export default function AddResident() {
  const navigate = useNavigate();
  const { addResident } = useResidents();

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const set = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...form, [field]: value };
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
    }
  };

  const blur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    const allTouched: Record<string, boolean> = {};
    for (const k of Object.keys(form)) {
      allTouched[k] = true;
    }
    setTouched(allTouched);
    if (Object.values(allErrors).some(Boolean)) return;

    const newResident = addResident({
      fullName: form.fullName.trim(),
      roomNumber: form.roomNumber.trim(),
      floorNumber: Number(form.floorNumber),
      mobileNumber: form.mobileNumber.trim(),
      aadharNumber: form.aadharNumber.trim(),
      fathersName: form.fathersName.trim(),
      mothersName: form.mothersName.trim(),
      permanentAddress: form.permanentAddress.trim(),
      checkInDate: form.checkInDate,
      monthlyRent: Number(form.monthlyRent),
      rentDueDate: Number(form.rentDueDate),
      paymentStatus: form.paymentStatus,
    });
    navigate({
      to: "/residents/$residentId",
      params: { residentId: newResident.id },
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link to="/residents">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 h-8 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Residents
          </Button>
        </Link>
        <div className="flex items-center gap-2 ml-auto sm:ml-0 sm:flex-1">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-display font-bold text-foreground leading-tight">
              Add New Resident
            </h1>
            <p className="text-xs text-muted-foreground">
              Fill in all required fields marked with *
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Personal Information */}
        <div className="bg-card border border-border rounded-lg p-5">
          <SectionHeader title="Personal Information" icon={User} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-xs font-medium">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                onBlur={() => blur("fullName")}
                placeholder="e.g. Arjun Sharma"
                className="h-9 text-sm"
                data-ocid="add-field-fullName"
              />
              <FieldError message={errors.fullName} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="mobileNumber" className="text-xs font-medium">
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobileNumber"
                type="tel"
                inputMode="numeric"
                value={form.mobileNumber}
                onChange={(e) =>
                  set("mobileNumber", e.target.value.replace(/\D/g, ""))
                }
                onBlur={() => blur("mobileNumber")}
                placeholder="10-digit number"
                maxLength={10}
                className="h-9 text-sm font-mono"
                data-ocid="add-field-mobileNumber"
              />
              <FieldError message={errors.mobileNumber} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="aadharNumber" className="text-xs font-medium">
                Aadhar Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="aadharNumber"
                inputMode="numeric"
                value={form.aadharNumber}
                onChange={(e) =>
                  set("aadharNumber", e.target.value.replace(/\D/g, ""))
                }
                onBlur={() => blur("aadharNumber")}
                placeholder="12-digit Aadhar"
                maxLength={12}
                className="h-9 text-sm font-mono"
                data-ocid="add-field-aadharNumber"
              />
              <FieldError message={errors.aadharNumber} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="fathersName" className="text-xs font-medium">
                Father's Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fathersName"
                value={form.fathersName}
                onChange={(e) => set("fathersName", e.target.value)}
                onBlur={() => blur("fathersName")}
                placeholder="Father's full name"
                className="h-9 text-sm"
                data-ocid="add-field-fathersName"
              />
              <FieldError message={errors.fathersName} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="mothersName" className="text-xs font-medium">
                Mother's Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mothersName"
                value={form.mothersName}
                onChange={(e) => set("mothersName", e.target.value)}
                onBlur={() => blur("mothersName")}
                placeholder="Mother's full name"
                className="h-9 text-sm"
                data-ocid="add-field-mothersName"
              />
              <FieldError message={errors.mothersName} />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="permanentAddress" className="text-xs font-medium">
                Permanent Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="permanentAddress"
                value={form.permanentAddress}
                onChange={(e) => set("permanentAddress", e.target.value)}
                onBlur={() => blur("permanentAddress")}
                placeholder="Full address with city, state, PIN"
                rows={2}
                className="text-sm resize-none"
                data-ocid="add-field-permanentAddress"
              />
              <FieldError message={errors.permanentAddress} />
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="bg-card border border-border rounded-lg p-5">
          <SectionHeader title="Room Details" icon={Home} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="roomNumber" className="text-xs font-medium">
                Room Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="roomNumber"
                value={form.roomNumber}
                onChange={(e) => set("roomNumber", e.target.value)}
                onBlur={() => blur("roomNumber")}
                placeholder="e.g. 101"
                className="h-9 text-sm font-mono"
                data-ocid="add-field-roomNumber"
              />
              <FieldError message={errors.roomNumber} />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Floor</Label>
              <Select
                value={form.floorNumber}
                onValueChange={(v) => set("floorNumber", v)}
              >
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="add-field-floorNumber"
                >
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((f) => (
                    <SelectItem key={f} value={String(f)}>
                      Floor {f + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="checkInDate" className="text-xs font-medium">
                Check-in Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="checkInDate"
                type="date"
                value={form.checkInDate}
                onChange={(e) => set("checkInDate", e.target.value)}
                onBlur={() => blur("checkInDate")}
                className="h-9 text-sm"
                data-ocid="add-field-checkInDate"
              />
              <FieldError message={errors.checkInDate} />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-card border border-border rounded-lg p-5">
          <SectionHeader title="Payment Details" icon={CreditCard} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="monthlyRent" className="text-xs font-medium">
                Monthly Rent (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="monthlyRent"
                type="number"
                min={0}
                value={form.monthlyRent}
                onChange={(e) => set("monthlyRent", e.target.value)}
                onBlur={() => blur("monthlyRent")}
                placeholder="e.g. 8500"
                className="h-9 text-sm font-mono"
                data-ocid="add-field-monthlyRent"
              />
              <FieldError message={errors.monthlyRent} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="rentDueDate" className="text-xs font-medium">
                Due Day (1–28) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rentDueDate"
                type="number"
                min={1}
                max={28}
                value={form.rentDueDate}
                onChange={(e) => set("rentDueDate", e.target.value)}
                onBlur={() => blur("rentDueDate")}
                className="h-9 text-sm font-mono"
                data-ocid="add-field-rentDueDate"
              />
              <FieldError message={errors.rentDueDate} />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Payment Status</Label>
              <Select
                value={form.paymentStatus}
                onValueChange={(v) => set("paymentStatus", v as PaymentStatus)}
              >
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="add-field-paymentStatus"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link to="/residents">
            <Button type="button" variant="outline" className="h-9">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="h-9 gap-2 min-w-[130px]"
            data-ocid="submit-add-resident"
          >
            <Save className="w-4 h-4" />
            Add Resident
          </Button>
        </div>
      </form>
    </div>
  );
}
