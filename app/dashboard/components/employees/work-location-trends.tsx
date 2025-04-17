"use client";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    office: 82,
    wfh: 44,
  },
  {
    name: "Feb",
    office: 80,
    wfh: 40,
  },
  {
    name: "Mar",
    office: 83,
    wfh: 42,
  },
  {
    name: "Apr",
    office: 50,
    wfh: 50,
  },
  {
    name: "May",
    office: 40,
    wfh: 60,
  },
  {
    name: "Jun",
    office: 60,
    wfh: 40,
  },
  {
    name: "Jul",
    office: 55,
    wfh: 55,
  },
  {
    name: "Aug",
    office: 49,
    wfh: 61,
  },
  {
    name: "Sep",
    office: 44,
    wfh: 70,
  },
  {
    name: "Oct",
    office: 40,
    wfh: 40,
  },
  {
    name: "Nov",
    office: 50,
    wfh: 50,
  },
  {
    name: "Dec",
    office: 50,
    wfh: 50,
  },
];

const WorkLocationTrends = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
        >
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip
            separator=": "
            formatter={(val, name) => {
              if (name === "wfh") {
                return [val, "Work from home"];
              } else if (name === "office") {
                return [val, "Work from office"];
              }
            }}
            labelClassName="fon-bold"
            wrapperClassName="!text-sm dark:!bg-black rounded-md dark:!border-border"
          />
          <Legend
            iconType="circle"
            formatter={(val) => {
              if (val === "wfh") {
                return <div className="text-sm">Work from home</div>;
              } else if (val === "office") {
                return <div className="text-sm">Work from office</div>;
              }
            }}
          />
          <Bar dataKey="office" stackId={1} fill="#ec4899" />
          <Bar dataKey="wfh" stackId={1} fill="#6b7280" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkLocationTrends;
