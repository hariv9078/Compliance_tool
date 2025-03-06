"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
  { CompType: "Critical", compli: 275, fill: "#0ea5e9" },
  { CompType: "High", compli: 200, fill: "#38bdf8" },
  { CompType: "Medium", compli: 187, fill: "#7dd3fc" },
  { CompType: "Low", compli: 173, fill: "#bae6fd" },
]

const chartConfig = {
  Compliance: {
    label: "Compliance",
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
    color: "#7dd3fc",
  },
  Low: {
    label: "Low",
    color: "#bae6fd",
  },
} satisfies ChartConfig

export function PendingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance as per Risk</CardTitle>
        <CardDescription>This week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="CompType"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="compli" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="compli" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
