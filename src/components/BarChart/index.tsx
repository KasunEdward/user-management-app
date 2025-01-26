import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GradientTealBlue } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ChartItem } from "../../services/slices/statsSlice";

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  data: ChartItem[];
};

const BarChart = ({
  width,
  height,
  events = false,
  data,
}: BarsProps) => {
  const verticalMargin = 120;


  // accessors
  const getX_Data = (d: ChartItem) => d.name;
  const getY_Data = (d: ChartItem) => d.value;
  // bounds
  const xMax = width-15;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getX_Data),
        padding: 0.6,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        // round: true,
        domain: [0, Math.max(...data.map(getY_Data))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height} >
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2} left={30}>
			<AxisLeft
            scale={yScale}
            numTicks={5}
            top={0}
						tickStroke="white"
						stroke="white"
            tickLabelProps={(e) => ({
              fill: "white",
              fontSize: "11px",
              textAnchor: "end",
              x: -10,
              y: yScale(e) ?? 0
            })}
          />
        {data.map((d) => {
          const letter = getX_Data(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getY_Data(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
        <AxisBottom
          scale={xScale}
          top={yMax}
          numTicks={data.length}
          stroke={"white"}
          labelProps={{ fill: "white" }}
          tickStroke={"white"}
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            textAnchor: "middle",
						verticalAnchor:"middle",
            angle: 320
          })}
        />
      </Group>
    </svg>
  );
};

export default BarChart;
