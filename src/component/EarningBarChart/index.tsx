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
  { month: "Jan", income: 0 },
  { month: "Feb", income: 0 },
  { month: "Mar", income: 0 },
  { month: "Apr", income: 0 },
  { month: "May", income: 0 },
  { month: "Jun", income: 0 },
  { month: "Jul", income: 0 },
  { month: "Aug", income: 0 },
  { month: "Sep", income: 0 },
  { month: "Oct", income: 0 },
  { month: "Nov", income: 0 },
  { month: "Dec", income: 0 },
];
const EarningBarChart = ({ monthlyIncome }: any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyIncome || data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="income"
          fill="#EB2926"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EarningBarChart;
