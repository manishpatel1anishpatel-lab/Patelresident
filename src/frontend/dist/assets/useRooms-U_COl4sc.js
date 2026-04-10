import { c as createLucideIcon, r as reactExports } from "./index-0cf5ij5C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
];
const BedDouble = createLucideIcon("bed-double", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M11 20H2", key: "nlcfvz" }],
  [
    "path",
    {
      d: "M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
      key: "au4z13"
    }
  ],
  ["path", { d: "M11 4H8a2 2 0 0 0-2 2v14", key: "74r1mk" }],
  ["path", { d: "M14 12h.01", key: "1jfl7z" }],
  ["path", { d: "M22 20h-3", key: "vhrsz" }]
];
const DoorOpen = createLucideIcon("door-open", __iconNode);
const FLOOR_CONFIG = [
  { floorNumber: 0, label: "Ground Floor", roomPrefix: "1", roomCount: 20 },
  { floorNumber: 1, label: "1st Floor", roomPrefix: "2", roomCount: 20 },
  { floorNumber: 2, label: "2nd Floor", roomPrefix: "3", roomCount: 20 }
];
function buildRoomNumber(floorNumber, index) {
  const prefix = (floorNumber + 1) * 100;
  return String(prefix + index);
}
function useRooms(residents) {
  const residentByRoom = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const r of residents) map.set(r.roomNumber, r);
    return map;
  }, [residents]);
  const floors = reactExports.useMemo(() => {
    return FLOOR_CONFIG.map(({ floorNumber, label, roomCount }) => {
      const rooms = Array.from({ length: roomCount }, (_, i) => {
        const roomNumber = buildRoomNumber(floorNumber, i + 1);
        const resident = residentByRoom.get(roomNumber) ?? null;
        return {
          roomNumber,
          floorNumber,
          isOccupied: resident !== null,
          resident
        };
      });
      return { floorNumber, label, rooms };
    });
  }, [residentByRoom]);
  const allRooms = reactExports.useMemo(
    () => floors.flatMap((f) => f.rooms),
    [floors]
  );
  const occupiedCount = reactExports.useMemo(
    () => allRooms.filter((r) => r.isOccupied).length,
    [allRooms]
  );
  const vacantCount = reactExports.useMemo(
    () => allRooms.filter((r) => !r.isOccupied).length,
    [allRooms]
  );
  const totalRooms = allRooms.length;
  const occupancyRate = totalRooms > 0 ? Math.round(occupiedCount / totalRooms * 100) : 0;
  return {
    floors,
    allRooms,
    occupiedCount,
    vacantCount,
    totalRooms,
    occupancyRate
  };
}
export {
  BedDouble as B,
  DoorOpen as D,
  useRooms as u
};
