// "use client";

// import Image from "next/image";
// import {
//   RadialBarChart,
//   RadialBar,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//     {
//         name:"total",
//         Count:100,
//         fill:"white",
//     },
//     {
//     name: "Compliant",
//     Count: 31,
//     fill: "#8884d8",
//   },
//   {
//     name: "Pending",
//     Count: 26,
//     fill: "#83a6ed",
//   },
//   {
//     name: "Over Due",
//     Count: 1,
//     fill: "#8dd1e1",
//   },
//   {
//     name: "Critical Over Due",
//     Count: 8,
//     fill: "#82ca9d",
//   },
// ];
// // const style = {
// //     top: 0,
// //     left: 350,
// //     lineHeight: "24px",
// //   };

// const StatusChart = () => {
//   return (
//     <div className="bg-white rounded-xl w-full h-full p-4">
//       {/* Title */}
//       <div className="flex justify-between items-center">
//         <h2>Compliance Status</h2>
//         <Image src="/moreDark.png" alt="" width={20} height={20}/>
//       </div>
//       {/* Chart */}
//       <div className="w-full h-[75%]">
//         <ResponsiveContainer>
//           <RadialBarChart
//             cx="50%"
//             cy="50%"
//             innerRadius="40%"
//             outerRadius="100%"
//             barSize={30}
//             data={data}
//           >
//             <RadialBar
              
//             //   label={{ position: "insideStart", fill: "#fff" }}
//               background
              
//               dataKey="Count"
//             />
//             {/* <Legend
//               iconSize={10}
//               layout="vertical"
//               verticalAlign=""

//             /> */}
//           </RadialBarChart>
//         </ResponsiveContainer>
//       </div>
//       {/* Bottom */}
//     </div>
//   );
// };
// export default StatusChart;


"use client"

import { TrendingUp } from "lucide-react"
import { RadialBar, RadialBarChart,  } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { CompType: "", compli: 350, fill: "#ffff" },
  { CompType: "Compliant", compli: 275, fill: "#0ea5e9" },
  { CompType: "About_to_Due", compli: 200, fill: "#38bdf8" },
  { CompType: "Over_Due", compli: 187, fill: "#7dd3fc" },
  { CompType: "Critical_Over_due", compli: 173, fill: "#bae6fd" },
]

const chartConfig = {
  visitors: {
    label: "Compliant",
  },
  extra:{
    label:"",
    color:"#ffff"
  },
  Compliant: {
    label: "Compliant",
    color: "#0ea5e9",
  },
  About_to_Due: {
    label: "About to Due",
    color: "#38bdf8",
  },
  Over_Due: {
    label: "Over Due",
    color: "#7dd3fc",
  },
  Critical_Over_due: {
    label: "Critical Over due",
    color: "#bae6fd",
  },

} satisfies ChartConfig

export function StatusChart() {
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0 ">
        <CardTitle>Compliance Status</CardTitle>
        {/* <CardDescription>J</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={5} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="CompType" />}
            />
            <RadialBar dataKey="compli" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
