import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Type,
  Printer,
  ArrowLeft,
  Settings,
} from "lucide-react";

const CustomizableQuotationDocument = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const quotationData = state?.quotationData;

  const [colorScheme, setColorScheme] = useState("blue");
  const [fontFamily, setFontFamily] = useState("inter");
  const [fontSize, setFontSize] = useState("sm");
  const [showCustomization, setShowCustomization] = useState(false);
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [printMode, setPrintMode] = useState("color"); // "color" or "bw"
  const printAreaRef = useRef(null);

  if (!quotationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground">
        <p className="text-lg mb-4">No quotation data found.</p>
        <Button onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const colorSchemes = {
    blue: {
      primary: "bg-blue-700 text-white",
      secondary: "bg-blue-50 -blue-200",
      accent: "text-blue-800",
      header: "bg-blue-100 -blue-300",
      headerText: "text-blue-900",
    },
    green: {
      primary: "bg-green-700 text-white",
      secondary: "bg-green-50 -green-200",
      accent: "text-green-800",
      header: "bg-green-100 -green-300",
      headerText: "text-green-900",
    },
    purple: {
      primary: "bg-purple-700 text-white",
      secondary: "bg-purple-50 -purple-200",
      accent: "text-purple-800",
      header: "bg-purple-100 -purple-300",
      headerText: "text-purple-900",
    },
    gray: {
      primary: "bg-gray-800 text-white",
      secondary: "bg-gray-50 -gray-200",
      accent: "text-gray-800",
      header: "bg-gray-100 -gray-300",
      headerText: "text-gray-900",
    },
  };

  const fontFamilies = {
    inter: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  const fontSizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const currentColors = colorSchemes[colorScheme];
  const currentFont = fontFamilies[fontFamily];
  const currentFontSize = fontSizes[fontSize];

  // Add a class for B&W print
  const printAreaClass =
    printMode === "bw"
      ? "print-bw"
      : "";

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Controls */}
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm ">
        <div className="flex gap-2">
          {/* Print Button */}
          <Button
            onClick={() => window.print()}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          {/* Back Button */}
          <Button variant="outline" onClick={() => navigate("/quotation-form")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        {/* Show/Hide Customization Button */}
        <Button variant="outline" onClick={() => setShowCustomization(!showCustomization)} className="gap-2">
          <Settings className="h-4 w-4" />
          {showCustomization ? "Hide" : "Show"} Customization
        </Button>
      </div>

      {/* Print Options Modal */}
      {showPrintOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Print Options</h3>
            <div className="mb-4">
              <label className="block font-medium mb-2">Color Mode</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="printMode"
                    value="color"
                    checked={printMode === "color"}
                    onChange={() => setPrintMode("color")}
                  />{" "}
                  Color
                </label>
                <label>
                  <input
                    type="radio"
                    name="printMode"
                    value="bw"
                    checked={printMode === "bw"}
                    onChange={() => setPrintMode("bw")}
                  />{" "}
                  Black & White
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPrintOptions(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowPrintOptions(false);
                  setTimeout(() => window.print(), 100); // allow class to apply
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Customization Panel */}
      {showCustomization && (
        <div className="print:hidden mb-6 shadow-lg bg-white rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Document Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Palette className="h-4 w-4" />
                  Color Scheme
                </label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Type className="h-4 w-4" />
                  Font Family
                </label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Sans Serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Font Size</label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document */}
      <div
        ref={printAreaRef}
        className={`print-area classic-print ${currentFont} ${currentFontSize} ${printAreaClass} shadow-xl print:shadow-none !-0 rounded-lg ${currentColors.primary}`}
        style={{ backgroundColor: undefined }}
      >
        {/* Header */}
        <div className={`px-8 py-4 ${currentColors.header} ${currentColors.headerText}`}>
            <div className="flex items-center gap-4">
              {quotationData.companyLogoUrl && (
                <img src={quotationData.companyLogoUrl} alt="Logo" className="company-logo" />
              )}
              <div className="flex-1 company-header">
                <h1 className={`text-2xl font-bold ${currentColors.accent}`}>{quotationData.companyName}</h1>
                <div>{quotationData.companyAddress}</div>
                <div>GSTIN: {quotationData.companyGSTIN} &nbsp; PAN: {quotationData.companyPAN}</div>
                <div>Contact Details: {quotationData.companyContactName}, {quotationData.companyPhone}</div>
                <div>e-mail ID: {quotationData.companyEmail}</div>
              </div>
            </div>
            <div className="header-row mt-2">
              <div>QUOTATION NO: {quotationData.quoteNumber}</div>
              <div>Date: {formatDate(quotationData.quoteDate)}</div>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="px-8 pt-8 pb-6">
            <h2 className={`text-lg font-semibold uppercase mb-4 ${currentColors.accent}`}>Bill To</h2>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {quotationData.clientName}</p>
              <p><strong>Address:</strong> {quotationData.clientAddress}</p>
              <p><strong>Email:</strong> {quotationData.clientEmail}</p>
              <p><strong>Phone:</strong> {quotationData.clientPhone || "N/A"}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="px-8 py-6">
            <table className={`w-full border border-gray-200 classic-print-table ${currentFont} ${currentFontSize}`}>
              <thead>
                <tr className={currentColors.header}>
                  <th className={`font-bold uppercase border-b border-gray-200 p-3 text-left ${currentColors.accent}`}>#</th>
                  <th className={`font-bold uppercase border-b border-gray-200 p-3 text-left ${currentColors.accent}`}>Description</th>
                  <th className={`font-bold uppercase border-b border-gray-200 p-3 text-left ${currentColors.accent}`}>Qty</th>
                  <th className={`font-bold uppercase border-b border-gray-200 p-3 text-left ${currentColors.accent}`}>Unit Price</th>
                  <th className={`font-bold uppercase border-b border-gray-200 p-3 text-left ${currentColors.accent}`}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {quotationData.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">₹{item.unitPrice.toFixed(2)}</td>
                    <td className="p-3">₹{item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="px-8 pb-6">
            <div className="w-full max-w-full space-y-2">
              <div className="flex justify-between w-full">
                <span className={currentColors.accent}>Subtotal:</span>
                <span className="text-right">₹{quotationData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full">
                <span className={currentColors.accent}>Tax ({quotationData.taxRate}%):</span>
                <span className="text-right">₹{quotationData.taxAmount.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between w-full font-bold text-lg border-t border-gray-200 pt-2 mt-2 ${currentColors.accent}`}>
                <span>Total:</span>
                <span className="text-right">₹{quotationData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="px-8 pb-10 grid md:grid-cols-2 gap-12">
            {quotationData.notes && (
              <div>
                <h4 className={`font-semibold mb-3 ${currentColors.accent}`}>Notes</h4>
                <p className="text-sm leading-relaxed">{quotationData.notes}</p>
              </div>
            )}
            {quotationData.terms && (
              <div className="md:pl-8 border-l-2 border-gray-200">
                <h4 className={`font-semibold mb-3 ${currentColors.accent}`}>Terms & Conditions</h4>
                <p className="text-sm leading-relaxed">{quotationData.terms}</p>
              </div>
            )}
          </div>
        </div>

      {/* Print Styles */}
      <style>
        {`
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
              width: 100vw;
              background: white;
              box-shadow: none !important;
            }
            .print-bw, .print-bw * {
              filter: grayscale(1) !important;
              color: #000 !important;
              background: #fff !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomizableQuotationDocument;
