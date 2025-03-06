"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { compliance: "Critical", deptcount: 275, fill: "#0ea5e9" },
  { compliance: "High", deptcount: 200, fill: "#38bdf8" },
  { compliance: "Medium", deptcount: 187, fill: "#bae6fd" },
  { compliance: "Low", deptcount: 173, fill: "#e0f2fe" },
]

const chartConfig = {
    deptcount: {
    label: "No.of Dept.",
  },
  Critical: {
    label: "Critical",
    color: "#0ea5e9",
  },
  High: {
    label: "High",
    color: "#38bdf8",
  },
  Medium: {
    label: "Medium",
    color: "#bae6fd",
  },
  Low: {
    label: "Low",
    color: "#e0f2fe",
  },
} satisfies ChartConfig

export function DeptChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Department Priority</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="deptcount" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="deptcount"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.deptcount}
                  </text>
                )
              }}
              nameKey="compliance"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
