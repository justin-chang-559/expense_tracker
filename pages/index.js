import Image from "next/image";
import { Inter } from "next/font/google";
import react from "react";
import { useState, useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });
import { db, ref, onValue, push, remove, set } from "../firebase.config";

// Fetch items from the Realtime Database
export const fetchItems = (setItems) => {
  const itemsRef = ref(db, "items");
  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const loadedItems = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setItems(loadedItems);
    } else {
      setItems([]);
    }
  });
};

// Add item to the Realtime Database
export const addItem = async (itemName, itemPrice, setItemName, setItemPrice) => {
  try {
    const itemsRef = ref(db, "items");
    const newItemRef = push(itemsRef);
    await set(newItemRef, {
      name: itemName,
      price: parseFloat(itemPrice),
    });
    setItemName("");
    setItemPrice("");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Delete item from the Realtime Database
export const deleteItem = async (id) => {
  try {
    const itemRef = ref(db, `items/${id}`);
    await remove(itemRef);
    console.log("Document deleted successfully");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};


export default function Home() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [total, setTotal] = useState(0);

  // Load items from Realtime Database on component mount
  useEffect(() => {
    fetchItems(setItems);
  }, []);

  // Calculate total on items change
  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.price);
    });
    setTotal(total);
  }, [items]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm space-y-4">
        <h1 className="text-4xl font-bold text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form
            className="grid grid-cols-6 item-center text-black"
            onSubmit={(e) => {
              e.preventDefault();
              addItem(itemName, itemPrice, setItemName, setItemPrice);
              fetchItems(setItems);
            }}
          >
            <input
              type="text"
              placeholder="Enter Item..."
              className="col-span-3 p-3 mx-3 rounded-lg"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Price..."
              className="col-span-2 p-3 mx-3 rounded-lg"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button
              type="submit"
              className="col-span-1 text-white bg-slate-600 hover:bg-slate-700 p-3 rounded-lg mx-3"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="my-4 w-full flex justify-between">
                <div className="p-4 w-full flex justify-between bg-slate-600 rounded-lg">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button
                  className="ml-6 p-4 hover:bg-gray-600 hover:text-white rounded-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 && (
            <p className="text-center mt-4">No items to display</p>
          )}
        </div>
        <div className="text-center text-2xl font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </main>
  );
}