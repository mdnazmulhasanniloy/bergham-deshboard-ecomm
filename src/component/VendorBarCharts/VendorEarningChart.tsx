import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   { name: "Jan", amt: 5000 },
//   { name: "Feb", amt: 4500 },
//   { name: "Mar", amt: 4000 },
//   { name: "Apr", amt: 3500 },
//   { name: "May", amt: 3000 },
//   { name: "Jun", amt: 2500 },
//   { name: "Jul", amt: 2000 },
//   { name: "Aug", amt: 1500 },
//   { name: "Sep", amt: 1000 },
//   { name: "Oct", amt: 5000 },
//   { name: "Nov", amt: 250 },
//   { name: "Dec", amt: 1000 },
// ];

const VendorEarningBarChart = ({ data }:any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="income"
          fill="#FE6201"
          barSize={20}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VendorEarningBarChart;
