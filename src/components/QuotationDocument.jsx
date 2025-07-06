import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const QuotationDocument = ({ quotationData }) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Print Button */}
      <div className="mb-4 print:hidden">
        <Button onClick={handlePrint} className="w-full">
          🖨️ Print Quotation
        </Button>
      </div>

      {/* Document */}
      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-8 print:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  {quotationData.companyName || "Your Company Name"}
                </h1>
                <div className="text-muted-foreground space-y-1">
                  {quotationData.companyAddress && <p>{quotationData.companyAddress}</p>}
                  {quotationData.companyPhone && <p>Phone: {quotationData.companyPhone}</p>}
                  {quotationData.companyEmail && <p>Email: {quotationData.companyEmail}</p>}
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-primary mb-2">QUOTATION</h2>
                <div className="text-muted-foreground space-y-1">
                  <p><strong>Quote #:</strong> {quotationData.quoteNumber || "QT-001"}</p>
                  <p><strong>Date:</strong> {formatDate(quotationData.quoteDate)}</p>
                  {quotationData.validUntil && (
                    <p><strong>Valid Until:</strong> {formatDate(quotationData.validUntil)}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
          </div>

          {/* Client Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Bill To:</h3>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="font-medium">{quotationData.clientName || "Client Name"}</p>
              {quotationData.clientAddress && <p>{quotationData.clientAddress}</p>}
              {quotationData.clientPhone && <p>Phone: {quotationData.clientPhone}</p>}
              {quotationData.clientEmail && <p>Email: {quotationData.clientEmail}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Items & Services:</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold">#</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                    <th className="text-center p-3 font-semibold">Qty</th>
                    <th className="text-right p-3 font-semibold">Unit Price</th>
                    <th className="text-right p-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotationData.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.description || "Service description"}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="mb-8">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${quotationData.subtotal.toFixed(2)}</span>
              </div>
              {quotationData.taxRate > 0 && (
                <div className="flex justify-between">
                  <span>Tax ({quotationData.taxRate}%):</span>
                  <span className="font-medium">${quotationData.taxAmount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${quotationData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {quotationData.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Notes:</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{quotationData.notes}</p>
              </div>
            </div>
          )}

          {/* Terms & Conditions */}
          {quotationData.terms && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Terms & Conditions:</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{quotationData.terms}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t text-center text-muted-foreground">
            <p>Thank you for your business!</p>
            <p className="text-sm mt-2">
              This quotation is valid until {quotationData.validUntil ? formatDate(quotationData.validUntil) : "stated date"}.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
};

export default QuotationDocument;