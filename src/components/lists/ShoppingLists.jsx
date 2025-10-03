import React, { useState } from "react";
import {
  useGetMyShoppingListsQuery,
  useAddMyShoppingListMutation,
  useUpdateMyShoppingListMutation,
} from "../../slices/shoppingSlice";

import ShoppingList from "./ShoppingList";
import "../../css/ShoppingLists.css";

export default function ShoppingLists() {
  const {
    data: shoppingLists = [],
    error,
    isLoading,
    refetch,
  } = useGetMyShoppingListsQuery();

  const [addShoppingList] = useAddMyShoppingListMutation();
  const [updateShoppingList] = useUpdateMyShoppingListMutation();

  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");

  const [addShoppingNote, setAddShoppingNote] = useState(false);
  const [items, setItems] = useState([]);
  const [initialItems, setInitialItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newShoppingNotePosition, setNewShoppingNotePosition] = useState({
    x: 0,
    y: 0,
  });
  const [editingShoppingListId, setEditingShoppingListId] = useState(null);

  const handleAddButtonClick = () => {
    const x = window.innerWidth / 2 - 150;
    const y = window.scrollY + 250;
    setNewShoppingNotePosition({ x, y });

    setAddShoppingNote(true);
    setInitialItems([]);
    setItems([]);
    setNewItemName("");
    setEditingShoppingListId(null);
  };

  const handleSave = async () => {
    const finalItems = [...items];
    if (newItemName.trim()) {
      finalItems.push(newItemName.trim());
    }

    if (!finalItems.length || finalItems.every((t) => t.trim() === "")) {
      alert("Please enter at least one item.");
      return;
    }

    const payload = {
      userId: 1,
      itemName: finalItems.join("\n"),
      quantity: parseInt(price) || 1,
      store,
      price: parseFloat(price) || 0,
    };

    try {
      if (editingShoppingListId === null) {
        await addShoppingList(payload).unwrap();
      } else {
        await updateShoppingList({
          id: editingShoppingListId,
          ...payload,
        }).unwrap();
      }

      // Reset state after successful save
      setAddShoppingNote(false);
      setItems([]);
      setNewItemName("");
      setInitialItems([]);
      setEditingShoppingListId(null);
      refetch();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleCancel = () => {
    setItems(initialItems);
    setNewItemName("");
    setAddShoppingNote(false);
    setEditingShoppingListId(null);
  };

  const handleChange = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index] = e.target.value;
    setItems(updatedItems);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updatedItems = [...items];
      updatedItems.splice(index + 1, 0, "");
      setItems(updatedItems);
    }
  };

  const handleItemInput = (e) => {
    if (e.key === "Enter" && newItemName.trim()) {
      e.preventDefault();
      setItmes([...items, newItemName.trim()]);
      setNewItemName("");
    }
  };

  const handleEdit = (id, itemString) => {
    const splitItems = itemString.split("\n");
    setEditingShoppingListId(id);
    setItems(splitItems);
    setInitialItems(splitItems);
    setNewItemName("");
    setAddShoppingNote(true);
  };

  if (isLoading) return <div>Loading shopping Lists...</div>;
  if (error) return <div>Error loading shopping lists. Please try again.</div>;

  return (
    <div className="shoppinglist-page">
      {addShoppingNote && (
        <div
          className="shopping-note"
          style={{
            position: "absolute",
            left: newShoppingNotePosition.x,
            top: newShoppingNotePosition.y,
            zIndex: 1000,
          }}
        >
          <div className="note-header">
            <button className="note-save-edit" onClick={handleSave}>
              Save
            </button>
            <button className="note-delete" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <div className="note-body">
            {items.map((item, index) => (
              <div key={index} className="item-line">
                <div className="item-line">
                  <input
                    type="text"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    placeholder="Store"
                  />
                </div>
                <div className="item-line">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>

                <span className="item-symbol">○</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="Enter item..."
                />
              </div>
            ))}
            <div className="item-line">
              <span className="item-symbol">○</span>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={handleItemInput}
                placeholder="Enter item..."
              />
            </div>
          </div>
        </div>
      )}

      <div className="shopping-list-container">
        <h1 className="shopping-list-header">Shopping</h1>

        {!addShoppingNote && (
          <button className="shoppingAddButton" onClick={handleAddButtonClick}>
            ➕
          </button>
        )}

        {shoppingLists.map((shoppingList) => (
          <div key={shoppingList.id}>
            <ShoppingList
              shoppingList={shoppingList}
              onUpdate={updateShoppingList}
              onEdit={() => handleEdit(shoppingList.id, shoppingList.itemName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
