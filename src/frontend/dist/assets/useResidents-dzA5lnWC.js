import { r as reactExports } from "./index-0cf5ij5C.js";
const STORAGE_KEY = "hostelHub_data";
const SAMPLE_RESIDENTS = [
  {
    id: "r1",
    fullName: "Arjun Sharma",
    roomNumber: "101",
    floorNumber: 0,
    mobileNumber: "9876543210",
    aadharNumber: "234567891234",
    fathersName: "Ramesh Sharma",
    mothersName: "Sunita Sharma",
    permanentAddress: "12, MG Road, Jaipur, Rajasthan - 302001",
    checkInDate: "2024-01-15",
    monthlyRent: 8500,
    rentDueDate: 5,
    paymentStatus: "paid",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "r2",
    fullName: "Priya Nair",
    roomNumber: "102",
    floorNumber: 0,
    mobileNumber: "9823456712",
    aadharNumber: "567891234567",
    fathersName: "Suresh Nair",
    mothersName: "Lakshmi Nair",
    permanentAddress: "45, Beach Road, Trivandrum, Kerala - 695001",
    checkInDate: "2024-02-01",
    monthlyRent: 9e3,
    rentDueDate: 1,
    paymentStatus: "overdue",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z"
  },
  {
    id: "r3",
    fullName: "Rahul Mehta",
    roomNumber: "105",
    floorNumber: 0,
    mobileNumber: "9988776655",
    aadharNumber: "891234567890",
    fathersName: "Vijay Mehta",
    mothersName: "Geeta Mehta",
    permanentAddress: "78, Linking Road, Mumbai, Maharashtra - 400050",
    checkInDate: "2024-03-10",
    monthlyRent: 8500,
    rentDueDate: 10,
    paymentStatus: "paid",
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z"
  },
  {
    id: "r4",
    fullName: "Sneha Reddy",
    roomNumber: "201",
    floorNumber: 1,
    mobileNumber: "9765432109",
    aadharNumber: "345678912345",
    fathersName: "Krishna Reddy",
    mothersName: "Padma Reddy",
    permanentAddress: "23, Banjara Hills, Hyderabad, Telangana - 500034",
    checkInDate: "2024-01-20",
    monthlyRent: 1e4,
    rentDueDate: 20,
    paymentStatus: "unpaid",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z"
  },
  {
    id: "r5",
    fullName: "Kiran Patel",
    roomNumber: "202",
    floorNumber: 1,
    mobileNumber: "9654321098",
    aadharNumber: "678912345678",
    fathersName: "Sunil Patel",
    mothersName: "Hina Patel",
    permanentAddress: "56, CG Road, Ahmedabad, Gujarat - 380009",
    checkInDate: "2024-02-14",
    monthlyRent: 9500,
    rentDueDate: 14,
    paymentStatus: "paid",
    createdAt: "2024-02-14T10:00:00Z",
    updatedAt: "2024-02-14T10:00:00Z"
  },
  {
    id: "r6",
    fullName: "Anjali Singh",
    roomNumber: "205",
    floorNumber: 1,
    mobileNumber: "9543210987",
    aadharNumber: "912345678901",
    fathersName: "Mohan Singh",
    mothersName: "Rani Singh",
    permanentAddress: "89, Civil Lines, Allahabad, UP - 211001",
    checkInDate: "2024-03-01",
    monthlyRent: 9500,
    rentDueDate: 1,
    paymentStatus: "overdue",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z"
  },
  {
    id: "r7",
    fullName: "Vikram Kumar",
    roomNumber: "301",
    floorNumber: 2,
    mobileNumber: "9432109876",
    aadharNumber: "123456789012",
    fathersName: "Ashok Kumar",
    mothersName: "Savita Kumar",
    permanentAddress: "34, Sector 17, Chandigarh - 160017",
    checkInDate: "2024-01-05",
    monthlyRent: 11e3,
    rentDueDate: 5,
    paymentStatus: "paid",
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z"
  },
  {
    id: "r8",
    fullName: "Meera Joshi",
    roomNumber: "305",
    floorNumber: 2,
    mobileNumber: "9321098765",
    aadharNumber: "456789123456",
    fathersName: "Prakash Joshi",
    mothersName: "Usha Joshi",
    permanentAddress: "67, Shivaji Nagar, Pune, Maharashtra - 411005",
    checkInDate: "2024-02-20",
    monthlyRent: 11e3,
    rentDueDate: 20,
    paymentStatus: "paid",
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z"
  },
  {
    id: "r9",
    fullName: "Deepak Chauhan",
    roomNumber: "310",
    floorNumber: 2,
    mobileNumber: "9210987654",
    aadharNumber: "789123456789",
    fathersName: "Naresh Chauhan",
    mothersName: "Kamla Chauhan",
    permanentAddress: "90, Rajpur Road, Dehradun, Uttarakhand - 248001",
    checkInDate: "2024-04-01",
    monthlyRent: 10500,
    rentDueDate: 1,
    paymentStatus: "unpaid",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z"
  }
];
const SAMPLE_PAYMENT_RECORDS = [
  {
    id: "p1",
    residentId: "r1",
    month: 3,
    year: 2026,
    amount: 8500,
    paidDate: "2026-03-05",
    status: "paid"
  },
  {
    id: "p2",
    residentId: "r1",
    month: 2,
    year: 2026,
    amount: 8500,
    paidDate: "2026-02-04",
    status: "paid"
  },
  {
    id: "p3",
    residentId: "r2",
    month: 3,
    year: 2026,
    amount: 9e3,
    paidDate: null,
    status: "overdue"
  },
  {
    id: "p4",
    residentId: "r2",
    month: 2,
    year: 2026,
    amount: 9e3,
    paidDate: "2026-02-01",
    status: "paid"
  },
  {
    id: "p5",
    residentId: "r3",
    month: 3,
    year: 2026,
    amount: 8500,
    paidDate: "2026-03-10",
    status: "paid"
  },
  {
    id: "p6",
    residentId: "r4",
    month: 3,
    year: 2026,
    amount: 1e4,
    paidDate: null,
    status: "unpaid"
  },
  {
    id: "p7",
    residentId: "r5",
    month: 3,
    year: 2026,
    amount: 9500,
    paidDate: "2026-03-14",
    status: "paid"
  },
  {
    id: "p8",
    residentId: "r6",
    month: 3,
    year: 2026,
    amount: 9500,
    paidDate: null,
    status: "overdue"
  },
  {
    id: "p9",
    residentId: "r7",
    month: 3,
    year: 2026,
    amount: 11e3,
    paidDate: "2026-03-05",
    status: "paid"
  },
  {
    id: "p10",
    residentId: "r8",
    month: 3,
    year: 2026,
    amount: 11e3,
    paidDate: "2026-03-20",
    status: "paid"
  },
  {
    id: "p11",
    residentId: "r9",
    month: 3,
    year: 2026,
    amount: 10500,
    paidDate: null,
    status: "unpaid"
  }
];
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  const initialData = {
    residents: SAMPLE_RESIDENTS,
    paymentRecords: SAMPLE_PAYMENT_RECORDS
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
}
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function useResidents() {
  const [data, setData] = reactExports.useState(() => loadData());
  const persist = reactExports.useCallback((next) => {
    saveData(next);
    setData(next);
  }, []);
  const addResident = reactExports.useCallback(
    (resident) => {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const newResident = {
        ...resident,
        id: generateId(),
        createdAt: now,
        updatedAt: now
      };
      persist({ ...data, residents: [...data.residents, newResident] });
      return newResident;
    },
    [data, persist]
  );
  const updateResident = reactExports.useCallback(
    (id, updates) => {
      const residents = data.residents.map(
        (r) => r.id === id ? { ...r, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : r
      );
      persist({ ...data, residents });
    },
    [data, persist]
  );
  const deleteResident = reactExports.useCallback(
    (id) => {
      const residents = data.residents.filter((r) => r.id !== id);
      const paymentRecords = data.paymentRecords.filter(
        (p) => p.residentId !== id
      );
      persist({ ...data, residents, paymentRecords });
    },
    [data, persist]
  );
  const getResident = reactExports.useCallback(
    (id) => data.residents.find((r) => r.id === id) ?? null,
    [data]
  );
  return {
    residents: data.residents,
    paymentRecords: data.paymentRecords,
    addResident,
    updateResident,
    deleteResident,
    getResident
  };
}
function maskAadhar(aadhar) {
  if (aadhar.length < 4) return `XXXX-XXXX-${aadhar}`;
  const last4 = aadhar.slice(-4);
  return `XXXX-XXXX-${last4}`;
}
export {
  maskAadhar as m,
  useResidents as u
};
