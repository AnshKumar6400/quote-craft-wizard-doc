// pages/index.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndexPage = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/company", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          navigate("/dashboard"); // go fill company profile
        } else {
          setCompany(data);
        }
      } catch (error) {
        console.error("Error fetching company", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        <div className="text-lg">Fetching company info...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome to Quotation Builder
        </h1>
        <p className="text-slate-600 text-lg">
          Generate client quotations in a few clicks.
        </p>

        <div className="border border-dashed border-primary p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">
            👋 Hi, {company?.name || "there"}
          </h2>
          <p className="text-muted-foreground mb-4">
            Ready to create a new quotation?
          </p>
          <Button onClick={() => navigate("/quotation")}>
            ➕ Create Quotation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
