"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export type TPopularItem = {
  name: string;
  totalOrdered: number;
}[];

const chartConfig = {
  totalOrdered: {
    label: "Total Ordered",
  },
  item1: {
    label: "Item 1",
    color: "var(--chart-1)",
  },
  item2: {
    label: "Item 2",
    color: "var(--chart-2)",
  },
  item3: {
    label: "Item 3",
    color: "var(--chart-3)",
  },
  item4: {
    label: "Item 4",
    color: "var(--chart-4)",
  },
  item5: {
    label: "Item 5",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function PopularItem({ data }: { data: TPopularItem }) {
  const sortedData = [...data]
    .sort((a, b) => b.totalOrdered - a.totalOrdered)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      fill: `var(--chart-${index + 1})`,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Items</CardTitle>
        <CardDescription>
          Top 5 most ordered items in your restaurant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150}
            />
            <XAxis dataKey="totalOrdered" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="totalOrdered" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
