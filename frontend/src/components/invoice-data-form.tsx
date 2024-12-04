import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  dueDate: string;
  items: Array<{ description: string; amount: number }>;
}

interface InvoiceDataFormProps {
  onSubmit: (data: InvoiceData) => void;
}

export function InvoiceDataForm({ onSubmit }: InvoiceDataFormProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: "",
    customerName: "",
    customerEmail: "",
    dueDate: "",
    items: [{ description: "", amount: 0 }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined && name.startsWith("item")) {
      const newItems = [...invoiceData.items];
      if (name.endsWith("description")) {
        newItems[index].description = value;
      } else if (name.endsWith("amount")) {
        newItems[index].amount = parseFloat(value);
      }
      setInvoiceData({ ...invoiceData, items: newItems });
    } else {
      setInvoiceData({ ...invoiceData, [name]: value });
    }
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: "", amount: 0 }],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="invoiceNumber">Invoice Number</Label>
        <Input
          id="invoiceNumber"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          name="customerName"
          value={invoiceData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="customerEmail">Customer Email</Label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          value={invoiceData.customerEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={invoiceData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label>Items</Label>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              name={`item${index}description`}
              value={item.description}
              onChange={(e) => handleChange(e, index)}
              placeholder="Description"
              required
            />
            <Input
              name={`item${index}amount`}
              type="number"
              value={item.amount}
              onChange={(e) => handleChange(e, index)}
              placeholder="Amount"
              required
            />
          </div>
        ))}
        <Button type="button" onClick={addItem} className="mt-2">
          Add Item
        </Button>
      </div>
      <Button type="submit">Generate Invoice</Button>
    </form>
  );
}
