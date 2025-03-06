"use client";
import { useEffect, useState } from "react";

export default function SourceFileTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/sourcefile");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Source File Table</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="border">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border p-2">{String(value)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0] || {}).length} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
