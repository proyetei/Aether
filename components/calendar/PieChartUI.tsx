"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", excited: 10, happy: 6, neutral: 10, sad: 5, angry: 0 }, // 31 days
  { month: "February", excited: 8, happy: 5, neutral: 8, sad: 7, angry: 1 },  // 29 days (Leap Year)
  { month: "March", excited: 12, happy: 9, neutral: 6, sad: 3, angry: 1 },    // 31 days
  { month: "April", excited: 10, happy: 7, neutral: 6, sad: 5, angry: 2 },    // 30 days
  { month: "May", excited: 11, happy: 8, neutral: 5, sad: 4, angry: 3 },      // 31 days
  { month: "June", excited: 9, happy: 8, neutral: 7, sad: 4, angry: 2 },      // 30 days
  { month: "July", excited: 12, happy: 10, neutral: 5, sad: 3, angry: 1 },    // 31 days
  { month: "August", excited: 11, happy: 9, neutral: 6, sad: 3, angry: 2 },   // 31 days
  { month: "September", excited: 10, happy: 8, neutral: 7, sad: 4, angry: 1 },// 30 days
  { month: "October", excited: 11, happy: 9, neutral: 6, sad: 3, angry: 2 },  // 31 days
  { month: "November", excited: 9, happy: 7, neutral: 6, sad: 5, angry: 3 },  // 30 days
  { month: "December", excited: 10, happy: 8, neutral: 6, sad: 4, angry: 3 }, // 31 days
];


const chartConfig = {
  excited: {
    label: "Excited",
    color: "#2563eb",
  },
  happy: {
    label: "Happy",
    color: "#60a5fa",
  },
  neutral: {
    label: "Neutral",
    color: "#60a5fa",
  },
  sad: {
    label: "Sad",
    color: "#60a5fa",
  },
  angry: {
    label: "Angry",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function PieChartUI() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="excited" fill="var(--color-desktop)" radius={8} />
        <Bar dataKey="happy" fill="var(--color-mobile)" radius={8} />
        <Bar dataKey="neutral" fill="var(--color-mobile)" radius={8} />
        <Bar dataKey="sad" fill="var(--color-mobile)" radius={8} />
        <Bar dataKey="angry" fill="var(--color-mobile)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
