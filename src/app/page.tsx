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

  // 🧮 Compute total summary
  const totalSubtotal = sales.reduce((sum, s) => sum + s.subtotal, 0);
  const totalTax = sales.reduce((sum, s) => sum + s.tax, 0);
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <main className="flex flex-col items-center justify-center py-22 bg-gradient-to-br from-blue-50 to-white p-6">
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
            <div className="overflow-x-auto mb-6">
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

          {sales.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  🧮 Total Sales Summary
                </h2>
                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="font-medium">Total Subtotal:</span> ₱
                    {totalSubtotal.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Total Tax (12%):</span> ₱
                    {totalTax.toFixed(2)}
                  </p>
                  <p className="text-green-700 font-semibold text-lg">
                    Total Sales: ₱{totalSales.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
