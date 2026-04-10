import { useMemo } from "react";
import type { Floor, Resident, RoomStatus } from "../types";

const FLOOR_CONFIG = [
  { floorNumber: 0, label: "Ground Floor", roomPrefix: "1", roomCount: 20 },
  { floorNumber: 1, label: "1st Floor", roomPrefix: "2", roomCount: 20 },
  { floorNumber: 2, label: "2nd Floor", roomPrefix: "3", roomCount: 20 },
];

function buildRoomNumber(floorNumber: number, index: number): string {
  const prefix = (floorNumber + 1) * 100;
  return String(prefix + index);
}

export function useRooms(residents: Resident[]) {
  const residentByRoom = useMemo(() => {
    const map = new Map<string, Resident>();
    for (const r of residents) map.set(r.roomNumber, r);
    return map;
  }, [residents]);

  const floors: Floor[] = useMemo(() => {
    return FLOOR_CONFIG.map(({ floorNumber, label, roomCount }) => {
      const rooms: RoomStatus[] = Array.from({ length: roomCount }, (_, i) => {
        const roomNumber = buildRoomNumber(floorNumber, i + 1);
        const resident = residentByRoom.get(roomNumber) ?? null;
        return {
          roomNumber,
          floorNumber,
          isOccupied: resident !== null,
          resident,
        };
      });
      return { floorNumber, label, rooms };
    });
  }, [residentByRoom]);

  const allRooms: RoomStatus[] = useMemo(
    () => floors.flatMap((f) => f.rooms),
    [floors],
  );

  const occupiedCount = useMemo(
    () => allRooms.filter((r) => r.isOccupied).length,
    [allRooms],
  );

  const vacantCount = useMemo(
    () => allRooms.filter((r) => !r.isOccupied).length,
    [allRooms],
  );

  const totalRooms = allRooms.length;

  const occupancyRate =
    totalRooms > 0 ? Math.round((occupiedCount / totalRooms) * 100) : 0;

  return {
    floors,
    allRooms,
    occupiedCount,
    vacantCount,
    totalRooms,
    occupancyRate,
  };
}
