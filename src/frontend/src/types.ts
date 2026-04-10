export type PaymentStatus = "paid" | "unpaid" | "overdue";

export interface PaymentRecord {
  id: string;
  residentId: string;
  month: number; // 1-12
  year: number;
  amount: number;
  paidDate: string | null;
  status: PaymentStatus;
}

export interface Resident {
  id: string;
  fullName: string;
  roomNumber: string;
  floorNumber: number;
  mobileNumber: string;
  aadharNumber: string; // stored full, displayed masked
  fathersName: string;
  mothersName: string;
  permanentAddress: string;
  checkInDate: string; // ISO date string
  monthlyRent: number;
  rentDueDate: number; // day of month (1-28)
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RoomStatus {
  roomNumber: string;
  floorNumber: number;
  isOccupied: boolean;
  resident: Resident | null;
}

export interface Floor {
  floorNumber: number;
  label: string;
  rooms: RoomStatus[];
}

export interface HostelData {
  residents: Resident[];
  paymentRecords: PaymentRecord[];
}
