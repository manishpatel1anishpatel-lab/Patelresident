import { b as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, I as Input, H as House, C as CreditCard } from "./index-0cf5ij5C.js";
import { B as Button } from "./button-CeRqIOtb.js";
import { L as Label, T as Textarea, S as Save } from "./textarea-D1vh7zTT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DkYCTROf.js";
import { u as useResidents } from "./useResidents-dzA5lnWC.js";
import { A as ArrowLeft } from "./index-CCReU2F6.js";
import { U as User } from "./user-C8X5A0op.js";
import { C as CircleAlert } from "./circle-alert-DZo1umIl.js";
import "./index-BVL4vJ2W.js";
import "./index-DOeS2R5s.js";
function validate(data) {
  const e = {};
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
function FieldError({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-destructive mt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 flex-shrink-0" }),
    message
  ] });
}
function SectionHeader({
  title,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-3 border-b border-border mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: title })
  ] });
}
function EditResident() {
  const { residentId } = useParams({ from: "/residents/$residentId/edit" });
  const navigate = useNavigate();
  const { getResident, updateResident } = useResidents();
  const resident = getResident(residentId);
  const [form, setForm] = reactExports.useState(() => {
    if (!resident) {
      return {
        fullName: "",
        roomNumber: "",
        floorNumber: "0",
        mobileNumber: "",
        aadharNumber: "",
        fathersName: "",
        mothersName: "",
        permanentAddress: "",
        checkInDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        monthlyRent: "8500",
        rentDueDate: "5",
        paymentStatus: "unpaid"
      };
    }
    return {
      fullName: resident.fullName,
      roomNumber: resident.roomNumber,
      floorNumber: String(resident.floorNumber),
      mobileNumber: resident.mobileNumber,
      aadharNumber: resident.aadharNumber,
      fathersName: resident.fathersName,
      mothersName: resident.mothersName,
      permanentAddress: resident.permanentAddress,
      checkInDate: resident.checkInDate,
      monthlyRent: String(resident.monthlyRent),
      rentDueDate: String(resident.rentDueDate),
      paymentStatus: resident.paymentStatus
    };
  });
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!resident) {
      navigate({ to: "/residents" });
    }
  }, [resident, navigate]);
  if (!resident) return null;
  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updated = { ...form, [field]: value };
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
    }
  };
  const blur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    const allTouched = {};
    for (const k of Object.keys(form)) {
      allTouched[k] = true;
    }
    setTouched(allTouched);
    if (Object.values(allErrors).some(Boolean)) return;
    updateResident(residentId, {
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
      paymentStatus: form.paymentStatus
    });
    navigate({
      to: "/residents/$residentId",
      params: { residentId }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-5 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents/$residentId", params: { residentId }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 h-8 text-muted-foreground hover:text-foreground -ml-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Profile"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto sm:ml-0 sm:flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-display font-bold text-foreground leading-tight", children: "Edit Resident" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[200px]", children: resident.fullName })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Personal Information", icon: User }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fullName", className: "text-xs font-medium", children: [
              "Full Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fullName",
                value: form.fullName,
                onChange: (e) => set("fullName", e.target.value),
                onBlur: () => blur("fullName"),
                placeholder: "e.g. Arjun Sharma",
                className: "h-9 text-sm",
                "data-ocid": "edit-field-fullName"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.fullName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mobileNumber", className: "text-xs font-medium", children: [
              "Mobile Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mobileNumber",
                type: "tel",
                inputMode: "numeric",
                value: form.mobileNumber,
                onChange: (e) => set("mobileNumber", e.target.value.replace(/\D/g, "")),
                onBlur: () => blur("mobileNumber"),
                placeholder: "10-digit number",
                maxLength: 10,
                className: "h-9 text-sm font-mono",
                "data-ocid": "edit-field-mobileNumber"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.mobileNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "aadharNumber", className: "text-xs font-medium", children: [
              "Aadhar Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "aadharNumber",
                inputMode: "numeric",
                value: form.aadharNumber,
                onChange: (e) => set("aadharNumber", e.target.value.replace(/\D/g, "")),
                onBlur: () => blur("aadharNumber"),
                placeholder: "12-digit Aadhar",
                maxLength: 12,
                className: "h-9 text-sm font-mono",
                "data-ocid": "edit-field-aadharNumber"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.aadharNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fathersName", className: "text-xs font-medium", children: [
              "Father's Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fathersName",
                value: form.fathersName,
                onChange: (e) => set("fathersName", e.target.value),
                onBlur: () => blur("fathersName"),
                placeholder: "Father's full name",
                className: "h-9 text-sm",
                "data-ocid": "edit-field-fathersName"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.fathersName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "mothersName", className: "text-xs font-medium", children: [
              "Mother's Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "mothersName",
                value: form.mothersName,
                onChange: (e) => set("mothersName", e.target.value),
                onBlur: () => blur("mothersName"),
                placeholder: "Mother's full name",
                className: "h-9 text-sm",
                "data-ocid": "edit-field-mothersName"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.mothersName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "permanentAddress", className: "text-xs font-medium", children: [
              "Permanent Address ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "permanentAddress",
                value: form.permanentAddress,
                onChange: (e) => set("permanentAddress", e.target.value),
                onBlur: () => blur("permanentAddress"),
                placeholder: "Full address with city, state, PIN",
                rows: 2,
                className: "text-sm resize-none",
                "data-ocid": "edit-field-permanentAddress"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.permanentAddress })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Room Details", icon: House }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "roomNumber", className: "text-xs font-medium", children: [
              "Room Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "roomNumber",
                value: form.roomNumber,
                onChange: (e) => set("roomNumber", e.target.value),
                onBlur: () => blur("roomNumber"),
                placeholder: "e.g. 101",
                className: "h-9 text-sm font-mono",
                "data-ocid": "edit-field-roomNumber"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.roomNumber })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Floor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.floorNumber,
                onValueChange: (v) => set("floorNumber", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-9 text-sm",
                      "data-ocid": "edit-field-floorNumber",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Floor" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [0, 1, 2, 3, 4, 5].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(f), children: [
                    "Floor ",
                    f + 1
                  ] }, f)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "checkInDate", className: "text-xs font-medium", children: [
              "Check-in Date ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "checkInDate",
                type: "date",
                value: form.checkInDate,
                onChange: (e) => set("checkInDate", e.target.value),
                onBlur: () => blur("checkInDate"),
                className: "h-9 text-sm",
                "data-ocid": "edit-field-checkInDate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.checkInDate })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Payment Details", icon: CreditCard }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "monthlyRent", className: "text-xs font-medium", children: [
              "Monthly Rent (₹) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "monthlyRent",
                type: "number",
                min: 0,
                value: form.monthlyRent,
                onChange: (e) => set("monthlyRent", e.target.value),
                onBlur: () => blur("monthlyRent"),
                placeholder: "e.g. 8500",
                className: "h-9 text-sm font-mono",
                "data-ocid": "edit-field-monthlyRent"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.monthlyRent })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rentDueDate", className: "text-xs font-medium", children: [
              "Due Day (1–28) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "rentDueDate",
                type: "number",
                min: 1,
                max: 28,
                value: form.rentDueDate,
                onChange: (e) => set("rentDueDate", e.target.value),
                onBlur: () => blur("rentDueDate"),
                className: "h-9 text-sm font-mono",
                "data-ocid": "edit-field-rentDueDate"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.rentDueDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: "Payment Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.paymentStatus,
                onValueChange: (v) => set("paymentStatus", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-9 text-sm",
                      "data-ocid": "edit-field-paymentStatus",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "unpaid", children: "Unpaid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "overdue", children: "Overdue" })
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/residents/$residentId", params: { residentId }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "h-9", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "h-9 gap-2 min-w-[140px]",
            "data-ocid": "submit-edit-resident",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              "Save Changes"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  EditResident as default
};
