"use client";

import RoomCard from "@/components/RoomCard/room";
import { useEffect, useState } from "react";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from Firestore when component mounts
    const fetchRooms = async () => {
      const roomsData = await getRoomsFromFirestore(); // Function to fetch rooms
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Hotel Room Details</h1>
      <div>
        {rooms.map((room) => (
          <RoomCard />
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
