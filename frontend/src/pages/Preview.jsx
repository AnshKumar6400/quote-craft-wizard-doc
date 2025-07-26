import { useEffect, useState } from "react";
import axios from "axios";

const CompanyPreview = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/company", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompany(res.data);
    };
    fetchCompany();
  }, []);

  if (!company) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-3">
      <h2 className="text-2xl font-bold mb-2">📄 Company Info</h2>
      <p><strong>Name:</strong> {company.name}</p>
      <p><strong>Contact:</strong> {company.contactName}</p>
      <p><strong>Email:</strong> {company.email}</p>
      <p><strong>Phone:</strong> {company.phone}</p>
      <p><strong>GSTIN:</strong> {company.gstin}</p>
      <p><strong>PAN:</strong> {company.pan}</p>
      <p><strong>Address:</strong> {company.address}</p>
      {company.logoUrl && (
        <div>
          <p><strong>Logo:</strong></p>
          <img src={company.logoUrl} alt="Logo" className="w-32 h-32 border rounded" />
        </div>
      )}
    </div>
  );
};

export default CompanyPreview;
