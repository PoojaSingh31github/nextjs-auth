"use client";
import InventoryItem from "@/components/InventoryItem/items";
import { useEffect, useState } from "react";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory from Firestore when component mounts
    const fetchInventory = async () => {
      const inventoryData = await getInventoryFromFirestore(); // Function to fetch inventory
      setInventory(inventoryData);
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Hotel Inventory</h1>
      <div>
        {inventory.map((item) => (
          <InventoryItem />
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
