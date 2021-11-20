import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { resultStats, resultSummary } from "./resultSlice";

type GraphProps = {
  data: resultSummary;
};

const COLORS = [
  "#2965CC",
  "#29A634",
  "#D99E0B",
  "#D13913",
  "#8F398F",
  "#00B3A4",
  "#DB2C6F",
  "#9BBF30",
  "#96622D",
  "#7157D9",
];

const CHAR_COLORS = ["#4472C4", "#ED7D31", "#A5A5A5", "#70AD47"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  percent: any;
  index: any;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type graphData = {
  dmg: { name: string; value: number }[];
  fieldTime: { name: string; value: number }[];
  dmgDetail: { name: string; value: number }[];
  abilUseCount: { name: string; value: number }[];
  particleCount: { name: string; value: number }[];
  reactionCount: { name: string; value: number }[];
};

const summarizeResults = (data: resultSummary, selected: string): graphData => {
  let result: graphData = {
    dmg: [],
    fieldTime: [],
    dmgDetail: [],
    abilUseCount: [],
    particleCount: [],
    reactionCount: [],
  };
  let index = -1;

  data.char_names.forEach((char, i) => {
    let total = 0;
    if (char === selected) {
      index = i;
    }
    //add up dmg per char?
    for (const [key, val] of Object.entries(data.damage_by_char[i])) {
      let v = Math.round(val.mean * 100) / 100;
      if (char === selected) {
        result.dmgDetail.push({
          name: key,
          value: v,
        });
      }
      total += v;
    }
    result.dmg.push({
      name: char,
      value: total,
    });
    //check abil usage
    for (const [key, val] of Object.entries(data.abil_usage_count_by_char[i])) {
      let v = Math.round(val.mean * 100) / 100;
      if (char === selected) {
        result.abilUseCount.push({
          name: key,
          value: v,
        });
      }
    }
    //check field time
    result.fieldTime.push({
      name: char,
      value: Math.round((100 * data.char_active_time[i].mean) / 60) / 100,
    });
  });

  for (const [key, val] of Object.entries(data.reactions_triggered)) {
    result.reactionCount.push({
      name: key,
      value: Math.round(val.mean * 100) / 100,
    });
  }

  for (const [key, val] of Object.entries(data.particle_count)) {
    result.particleCount.push({
      name: key,
      value: Math.round(val.mean * 100) / 100,
    });
  }

  return result;
};

export default function Graph({ data }: GraphProps) {
  const [selected, setSelected] = React.useState("");
  const r = summarizeResults(data, selected);

  const totalReactions = r.reactionCount.reduce((sum, a) => sum + a.value, 0);
  const totalParticles = r.particleCount.reduce((sum, a) => sum + a.value, 0);

  return (
    <div>
      <div className="grid grid-cols-2 p-2 gap-4">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(value: number, name: string) => {
                return [
                  "" +
                    value.toFixed(2) +
                    " (" +
                    ((100 * value) / data.dps.mean).toFixed(2) +
                    "%)",
                  name,
                ];
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Pie
              data={r.dmg}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={(e: any) => setSelected(e.name)}
            >
              {r.dmg.map((entry, index) => (
                <Cell fill={CHAR_COLORS[index % CHAR_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(value: number, name: string) => {
                return [
                  "" +
                    value.toFixed(2) +
                    " (" +
                    ((100 * value) / data.sim_duration.mean).toFixed(2) +
                    "%)",
                  name,
                ];
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Pie
              data={r.fieldTime}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={(e: any) => setSelected(e.name)}
            >
              {r.fieldTime.map((entry, index) => (
                <Cell fill={CHAR_COLORS[index % CHAR_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {selected !== "" ? (
        <div className="grid grid-cols-2 p-2 gap-4">
          <ResponsiveContainer>
            <BarChart data={r.dmgDetail} layout="vertical">
              <Tooltip />
              <XAxis type="number" dataKey="value" hide />
              <YAxis type="category" dataKey="name" width={150} />
              <Bar dataKey="value" cx="50%" cy="50%">
                {r.dmgDetail.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer>
            <PieChart>
              <Legend verticalAlign="top" height={36} />
              <Pie
                data={r.abilUseCount}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
                onClick={(e: any) => setSelected(e.name)}
              >
                {r.abilUseCount.map((entry, index) => (
                  <Cell fill={CHAR_COLORS[index % CHAR_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : null}
      <div className="grid grid-cols-2 p-2 gap-4">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(value: number, name: string) => {
                return [
                  "" +
                    value.toFixed(2) +
                    " (" +
                    ((100 * value) / totalReactions).toFixed(2) +
                    "%)",
                  name,
                ];
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Pie
              data={r.reactionCount}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={(e: any) => setSelected(e.name)}
            >
              {r.reactionCount.map((entry, index) => (
                <Cell fill={CHAR_COLORS[index % CHAR_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              formatter={(value: number, name: string) => {
                return [
                  "" +
                    value.toFixed(2) +
                    " (" +
                    ((100 * value) / totalParticles).toFixed(2) +
                    "%)",
                  name,
                ];
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Pie
              data={r.particleCount}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={renderCustomizedLabel}
              onClick={(e: any) => setSelected(e.name)}
            >
              {r.particleCount.map((entry, index) => (
                <Cell fill={CHAR_COLORS[index % CHAR_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
