import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const Dashboard = () => {
  const [company, setCompany] = useState({
    name: "",
    address: "",
    gstin: "",
    pan: "",
    contactName: "",
    phone: "",
    email: "",
    logoUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/company", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setCompany(res.data);
      } catch (err) {
        toast({ title: "Error", description: "Could not load company data", variant: "destructive" });
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (field, value) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!emailRegex.test(company.email)) return "Invalid Email";
    if (!phoneRegex.test(company.phone)) return "Invalid Phone Number";
    if (!gstinRegex.test(company.gstin)) return "Invalid GSTIN";
    if (!panRegex.test(company.pan)) return "Invalid PAN";
    if (!company.logoUrl) return "Please upload a logo";

    return null;
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Only images allowed", variant: "destructive" });
      return;
    }

    if (file.size > 1024 * 1024) {
      toast({ title: "File too large", description: "Max size: 1MB", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/upload/logo", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.url) {
        setCompany((prev) => ({ ...prev, logoUrl: `${res.data.url}?t=${Date.now()}` }));
        toast({ title: "Upload Success" });
      }
    } catch (err) {
      toast({ title: "Upload failed", description: "Try again", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    const error = validateFields();
    if (error) {
      toast({ title: "Validation Error", description: error, variant: "destructive" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/company", company, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Company details saved!" });
      navigate("/preview");
    } catch {
      toast({ title: "Error", description: "Could not save", variant: "destructive" });
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>🏢 Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Company Name" value={company.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Contact Person" value={company.contactName} onChange={(e) => handleChange("contactName", e.target.value)} />
          <Input placeholder="Email" value={company.email} onChange={(e) => handleChange("email", e.target.value)} />
          <Input placeholder="Phone" value={company.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          <Input placeholder="GSTIN" value={company.gstin} onChange={(e) => handleChange("gstin", e.target.value)} />
          <Input placeholder="PAN" value={company.pan} onChange={(e) => handleChange("pan", e.target.value)} />
          <Textarea placeholder="Address" value={company.address} onChange={(e) => handleChange("address", e.target.value)} className="col-span-2" />

          {/* Drag-and-Drop Upload */}
          <div className="col-span-2 space-y-2">
            <label>Upload Logo (Max 1MB)</label>
            <div {...getRootProps()} className="border-dashed border-2 p-4 rounded-md text-center cursor-pointer">
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop here...</p> : <p>Drag & drop or click to upload</p>}
            </div>
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
            {company.logoUrl && (
              <img
                src={company.logoUrl}
                alt="Company Logo"
                className="w-24 h-24 mt-2 object-contain border rounded-md"
                onError={(e) => {
                  e.target.src = "/fallback-logo.png";
                }}
              />
            )}
          </div>

          <Button className="col-span-2 mt-4" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Save Details"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
