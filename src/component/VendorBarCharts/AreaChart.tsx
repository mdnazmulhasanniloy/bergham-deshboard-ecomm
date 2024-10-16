import { Tooltip } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const MonthlySalesChart = ({ data }:any) => (
  <ResponsiveContainer width="100%" height={270}>
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#CB4E01" />
          <stop offset="95%" stopColor="#FFE7D9" />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid
        strokeDasharray="3 3"
        // vertical={false}
        horizontal={false}
      />
      <Tooltip />
      <Legend />
      <Area
        dataKey="sells"
        stroke="#CB4E01"
        fillOpacity={1}
        fill="url(#colorSales)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default MonthlySalesChart;
