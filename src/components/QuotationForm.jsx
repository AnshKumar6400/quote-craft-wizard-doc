import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const QuotationForm = ({ quotationData, setQuotationData }) => {
  const updateField = (field, value) => {
    setQuotationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateItem = (index, field, value) => {
    const updatedItems = quotationData.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    });
    
    setQuotationData(prev => {
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const taxAmount = subtotal * (prev.taxRate / 100);
      const total = subtotal + taxAmount;
      
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total
      };
    });
  };

  const addItem = () => {
    setQuotationData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (quotationData.items.length > 1) {
      const updatedItems = quotationData.items.filter((_, i) => i !== index);
      setQuotationData(prev => {
        const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
        const taxAmount = subtotal * (prev.taxRate / 100);
        const total = subtotal + taxAmount;
        
        return {
          ...prev,
          items: updatedItems,
          subtotal,
          taxAmount,
          total
        };
      });
    }
  };

  const updateTaxRate = (rate) => {
    const taxRate = parseFloat(rate) || 0;
    const taxAmount = quotationData.subtotal * (taxRate / 100);
    const total = quotationData.subtotal + taxAmount;
    
    setQuotationData(prev => ({
      ...prev,
      taxRate,
      taxAmount,
      total
    }));
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">🏢 Company Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={quotationData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="Your Company Name"
            />
          </div>
          <div>
            <Label htmlFor="companyPhone">Phone</Label>
            <Input
              id="companyPhone"
              value={quotationData.companyPhone}
              onChange={(e) => updateField('companyPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="companyAddress">Address</Label>
            <Input
              id="companyAddress"
              value={quotationData.companyAddress}
              onChange={(e) => updateField('companyAddress', e.target.value)}
              placeholder="123 Business St, City, State 12345"
            />
          </div>
          <div>
            <Label htmlFor="companyEmail">Email</Label>
            <Input
              id="companyEmail"
              type="email"
              value={quotationData.companyEmail}
              onChange={(e) => updateField('companyEmail', e.target.value)}
              placeholder="contact@company.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">👤 Client Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientName">Client Name *</Label>
            <Input
              id="clientName"
              value={quotationData.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              placeholder="Client Name"
            />
          </div>
          <div>
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              value={quotationData.clientPhone}
              onChange={(e) => updateField('clientPhone', e.target.value)}
              placeholder="+1 (555) 987-6543"
            />
          </div>
          <div>
            <Label htmlFor="clientAddress">Address</Label>
            <Input
              id="clientAddress"
              value={quotationData.clientAddress}
              onChange={(e) => updateField('clientAddress', e.target.value)}
              placeholder="456 Client Ave, City, State 67890"
            />
          </div>
          <div>
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={quotationData.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
              placeholder="client@email.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quote Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">📋 Quote Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="quoteNumber">Quote Number *</Label>
            <Input
              id="quoteNumber"
              value={quotationData.quoteNumber}
              onChange={(e) => updateField('quoteNumber', e.target.value)}
              placeholder="QT-001"
            />
          </div>
          <div>
            <Label htmlFor="quoteDate">Quote Date</Label>
            <Input
              id="quoteDate"
              type="date"
              value={quotationData.quoteDate}
              onChange={(e) => updateField('quoteDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={quotationData.validUntil}
              onChange={(e) => updateField('validUntil', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">🛒 Items & Services</CardTitle>
          <Button
            onClick={addItem}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {quotationData.items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Item {index + 1}</h4>
                {quotationData.items.length > 1 && (
                  <Button
                    onClick={() => removeItem(index)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <Label>Description *</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="Service or product description"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    min="1"
                  />
                </div>
                <div>
                  <Label>Unit Price ($)</Label>
                  <Input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Total: </span>
                <span className="font-semibold">${item.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">💰 Pricing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={quotationData.taxRate}
                onChange={(e) => updateTaxRate(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                placeholder="8.5"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${quotationData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({quotationData.taxRate}%):</span>
              <span className="font-medium">${quotationData.taxAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${quotationData.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">📝 Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={quotationData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Any additional notes or special instructions..."
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={quotationData.terms}
              onChange={(e) => updateField('terms', e.target.value)}
              placeholder="Payment terms, warranty information, etc..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationForm;