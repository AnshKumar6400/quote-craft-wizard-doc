import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuotationForm from "@/components/QuotationForm";
import QuotationDocument from "@/components/QuotationDocument";

const Index = () => {
  const [quotationData, setQuotationData] = useState({
    // Company Details
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    
    // Client Details
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    
    // Quote Details
    quoteNumber: "",
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: "",
    
    // Items
    items: [
      { description: "", quantity: 1, unitPrice: 0, total: 0 }
    ],
    
    // Totals
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    
    // Additional
    notes: "",
    terms: ""
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Automatic Quotation Maker
          </h1>
          <p className="text-slate-600">
            Create professional quotations instantly
          </p>
        </header>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="form" className="text-lg py-3">
              📝 Quote Form
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-lg py-3">
              📄 Document Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-0">
            <QuotationForm 
              quotationData={quotationData}
              setQuotationData={setQuotationData}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-0">
            <QuotationDocument quotationData={quotationData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;