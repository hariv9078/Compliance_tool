"use client";
import Filter from "./Filter"



import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/sourcefile");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <Filter />
      <h2 className="text-2xl font-semibold mb-4">Sourcefile Data</h2>
      {data.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border p-2">{value as string}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
