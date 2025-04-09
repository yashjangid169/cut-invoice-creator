
import React, { useState, useEffect } from 'react';
import InvoiceHeader from '../components/InvoiceHeader';
import WorkDescription from '../components/WorkDescription';
import InvoiceItemsTable, { InvoiceItem } from '../components/InvoiceItemsTable';
import PrintButton from '../components/PrintButton';

const InvoiceGenerator: React.FC = () => {
  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // State for invoice header information
  const [companyName, setCompanyName] = useState('Nandi Enterprises');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [date, setDate] = useState(today);
  const [customerName, setCustomerName] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  
  // State for invoice items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: '', quantity: 0, rate: 0, amount: 0 }
  ]);
  
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  
  // Update item in the items array
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...items];
    
    if (field === 'description') {
      updatedItems[index][field] = value as string;
    } else if (field === 'quantity' || field === 'rate') {
      updatedItems[index][field] = value as number;
      // Recalculate amount
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }
    
    setItems(updatedItems);
  };
  
  // Add a new item to the invoice
  const handleAddItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    setItems([...items, { id: newId, description: '', quantity: 0, rate: 0, amount: 0 }]);
  };
  
  // Remove an item from the invoice
  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };
  
  return (
    <div className="invoice-container">
      <div className="invoice">
        <div className="invoice-title">
          <h1>INVOICE</h1>
        </div>
        
        <InvoiceHeader
          companyName={companyName}
          invoiceNumber={invoiceNumber}
          date={date}
          customerName={customerName}
          onCompanyNameChange={setCompanyName}
          onInvoiceNumberChange={setInvoiceNumber}
          onDateChange={setDate}
          onCustomerNameChange={setCustomerName}
        />
        
        <WorkDescription
          description={workDescription}
          onDescriptionChange={setWorkDescription}
        />
        
        <InvoiceItemsTable
          items={items}
          onItemChange={handleItemChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          subtotal={subtotal}
        />
        
        <PrintButton />
      </div>
    </div>
  );
};

export default InvoiceGenerator;
