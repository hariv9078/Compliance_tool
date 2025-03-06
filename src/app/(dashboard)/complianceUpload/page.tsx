import { Compliance, columns } from "./columns"
import { DataTable } from "@/app/(dashboard)/complianceUpload/data-table"

async function getData(): Promise<Compliance[]> {
  // Fetch data from your API here.
  return [
    {
      compliance_id: "728ed52f",
      status: "pending",
      fpr: "m@example.com",
      description:"All companies who get supplies of goods or services from micro and small enterprises and whose payments to micro and small enterprise suppliers exceed forty five days from the date of acceptance or the date of deemed acceptance of the goods or services, shall submit a half yearly return (For the half year period of April to September)",
      act:"Companies Act, 2013 and amendment thereto and rules notified there under - For Private Companies",
      approver:"k@sourceMapsEnabled.com",
      hod:"h@kkjakjd.com",
      duedate:"2-12-2025",
      Criticality:"High"

    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="">
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}
