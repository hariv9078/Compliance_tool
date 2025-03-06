"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define Compliance type
export type Compliance = {
  compliance_id: string;
  status: "pending" | "processing" | "success" | "failed";
  fpr: string;
  description: string;
  duedate: string;
  Criticality: string;
  approver: string;
  hod: string;
  act:string
};

// Compliance Details Modal Component
const ComplianceDetailsModal = ({ compliance, updateStatus }: { compliance: Compliance | null; updateStatus: (id: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!compliance) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (!["application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(uploadedFile.type)) {
        setError("Only PDF or Excel files are allowed.");
        setFile(null);
      } else {
        setError(null);
        setFile(uploadedFile);
      }
    }
  };

  const handleSubmit = () => {
    if (!file) {
      setError("You must upload a PDF or Excel file to proceed.");
      return;
    }

    // Simulating an update in status
    updateStatus(compliance.compliance_id);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Compliance Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <p><strong>ID:</strong> {compliance.compliance_id}</p>
        <p><strong>Status:</strong> {compliance.status}</p>
        <p><strong>Description:</strong> {compliance.description}</p>
        <p><strong>Due Date:</strong> {compliance.duedate}</p>
        <p><strong>Criticality:</strong> {compliance.Criticality}</p>
        <p><strong>FPR:</strong> {compliance.fpr}</p>
        <p><strong>Approver:</strong> {compliance.approver}</p>
        <p><strong>HOD:</strong> {compliance.hod}</p>
        <p><strong>Act:</strong>{compliance.act}</p>

        {/* File Upload */}
        <div>
          <Label htmlFor="file-upload">Upload Document (PDF/Excel) *</Label>
          <Input type="file" id="file-upload" accept=".pdf,.xls,.xlsx" onChange={handleFileChange} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white mt-3" disabled={!file}>
          Submit
        </Button>
      </div>
    </DialogContent>
  );
};

// Define Table Columns
export const columns: ColumnDef<Compliance>[] = [
  {
    accessorKey: "compliance_id",
    header: "Compliance ID",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [selectedCompliance, setSelectedCompliance] = useState<Compliance | null>(null);
      const [status, setStatus] = useState(row.original.status);

      const handleOpen = () => {
        setSelectedCompliance(row.original);
        setOpen(true);
      };

      const updateStatus = (id: string) => {
        if (selectedCompliance?.compliance_id === id) {
          setStatus("processing");
          setSelectedCompliance({ ...selectedCompliance, status: "processing" });
        }
        setOpen(false);
      };

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button onClick={handleOpen} className="text-blue-600 hover:underline">
                {row.original.compliance_id}
              </button>
            </DialogTrigger>
            <ComplianceDetailsModal compliance={{ ...row.original, status }} updateStatus={updateStatus} />
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className={`px-2 py-1 rounded ${row.original.status === "pending" ? "bg-yellow-300" : "bg-blue-300"}`}>
      {row.original.status}
    </span>,
  },
  {
    accessorKey: "description",
    header: "Compliance Description",
  },
  {
    accessorKey: "act",
    header: "Act",
  },
  {
    accessorKey: "duedate",
    header: "Due Date",
  },
  {
    accessorKey: "Criticality",
    header: "Criticality",
  },
  {
    accessorKey: "fpr",
    header: "FPR",
  },
  {
    accessorKey: "approver",
    header: "Approver",
  },
  {
    accessorKey: "hod",
    header: "HOD",
  },
];
