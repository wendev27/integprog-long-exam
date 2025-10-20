"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PRODUCTS = [
  { name: "Pen", price: 10 },
  { name: "Notebook", price: 40 },
  { name: "Stapler", price: 75 },
  { name: "Marker", price: 25 },
  { name: "Paper", price: 5 },
];

interface Sale {
  item: string;
  quantity: number;
  subtotal: number;
  tax: number;
  total: number;
}

export default function Home() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sales, setSales] = useState<Sale[]>([]);

  const handleAddSale = () => {
    const product = PRODUCTS.find((p) => p.name === item);
    if (!product || !quantity)
      return alert("Please select an item and enter quantity");

    const qty = parseInt(quantity);
    const subtotal = product.price * qty;
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    const newSale = { item, quantity: qty, subtotal, tax, total };
    setSales([...sales, newSale]);

    setItem("");
    setQuantity("");
  };

  return (
    <main className="flex flex-col items-center justify-center py-44 bg-gradient-to-br from-blue-50 to-white p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
            🧾 Office Supplies Sales System
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="border rounded-md p-2 flex-1"
            >
              <option value="">Select Item</option>
              {PRODUCTS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} — ₱{p.price.toFixed(2)}
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex-1"
            />

            <Button onClick={handleAddSale}>Add Sale</Button>
          </div>

          {/* 🧮 Table of sales */}
          {sales.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-blue-100 text-blue-700">
                  <tr>
                    <th className="p-2 border">Item</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Subtotal</th>
                    <th className="p-2 border">Tax (12%)</th>
                    <th className="p-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((s, i) => (
                    <tr key={i} className="text-center border-b">
                      <td className="p-2 border">{s.item}</td>
                      <td className="p-2 border">{s.quantity}</td>
                      <td className="p-2 border">₱{s.subtotal.toFixed(2)}</td>
                      <td className="p-2 border">₱{s.tax.toFixed(2)}</td>
                      <td className="p-2 border font-semibold text-green-700">
                        ₱{s.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
