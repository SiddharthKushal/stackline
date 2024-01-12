import React from "react";
import "../css/Chart.css"; // Importing CSS styles for the Chart component.
import { ticks } from "../utils/consts"; // Importing predefined tick values for the chart.
import { useSelector } from "react-redux"; // Importing the useSelector hook from react-redux for accessing Redux state.
import { RootState } from "../store/store"; // Importing the RootState type for TypeScript type checking.
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"; // Importing components from the recharts library.

function Chart() {
  // useSelector hook to access chart data from the Redux store.
  const chartData = useSelector(
    (state: RootState) => state.itemSlice.items[0]?.sales
  );

  return (
    <div id="chart-container">
      {/* rendering the chart only if chartData is available */}
      {chartData && (
        <>
          <div id="chart-title">Retail Sales</div>
          {/* ResponsiveContainer to make the chart responsive */}
          <ResponsiveContainer width="100%" height="100%">
            {/* LineChart component with specified dimensions and margin */}
            <LineChart
              id="line-chart"
              width={900}
              height={400}
              data={chartData}
              margin={{ top: 40, right: 40, bottom: 0, left: 40 }}
            >
              {/* Line component for displaying wholesale sales data */}
              <Line
                type="monotone"
                dataKey="wholesaleSales"
                stroke="#9BA6BF"
                strokeWidth={3}
                dot={false}
              />
              {/* Line component for displaying retail sales data */}
              <Line
                type="monotone"
                dataKey="retailSales"
                stroke="#40A5F6"
                strokeWidth={3}
                dot={false}
              />

              <YAxis
                domain={[
                  (dataMin: number) =>
                    dataMin < 0 ? 1 * dataMin : 0.8 * dataMin, // if dataMin is negative, increase the space otherwise decrease
                  (dataMax: number) => 1.5 * dataMax, // add 20% padding at the top
                ]}
                hide
              />

              {/* XAxis component for displaying weeks, hidden */}
              <XAxis dataKey={"weekEnding"} hide />
              {/* Tooltip component for showing data details on hover */}
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <div className="divider" />
          {/* Displaying predefined ticks below the chart */}
          <div id="chart-ticks">
            {ticks.map((tick) => (
              <div key={`chart-tick-${tick}`}>{tick}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Chart;
