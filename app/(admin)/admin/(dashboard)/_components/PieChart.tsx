"use client";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  rooms: { label: "Rooms" },
  occupied: { label: "Occupied", color: "var(--chart-1)" },
  vacant: { label: "Vacant", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ChartPieLabel({
  occupied,
  vacant,
}: {
  occupied: number;
  vacant: number;
}) {
  const chartData = [
    { status: "occupied", rooms: occupied, fill: "var(--color-occupied)" },
    { status: "vacant", rooms: vacant, fill: "var(--color-vacant)" },
  ];

  const total = occupied + vacant;
  const occupancyRate = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Occupancy</CardTitle>
        <CardDescription>Current room status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="rooms" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none font-medium">
          {occupancyRate}% occupied
        </div>
        <div className="leading-none text-muted-foreground">
          {occupied} occupied, {vacant} vacant out of {total} rooms
        </div>
      </CardFooter>
    </Card>
  );
}
