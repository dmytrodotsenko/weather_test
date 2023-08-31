import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "../../App.css";
import styles from "./Chart.module.css";

type ChartProps = {
  chartData: [];
};

const convertDataForChart = (array: []) => {
  return array.map((el: any) => {
    return {
      name: new Date(el.dt_txt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
      temperature: el.main.temp,
      humidity: el.main.humidity,
      amt: 2400,
    };
  });
};
function Chart({ chartData }: ChartProps) {
  // console.log(chartData, "charttt");
  const data = convertDataForChart(chartData);

  return (
    <div className={styles.container}>
      <p className="text">Chart changing the weather by next 5 days:</p>
      <div>
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="temperature" stroke="#800000" />
          <Line type="monotone" dataKey="humidity" stroke="#00CED1" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}

export default Chart;
