import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { GradientPurpleRed } from "@visx/gradient";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { ChartItem } from "../../services/slices/statsSlice";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  data: ChartItem[];
};

const PieChart = ({
  width,
  height,
  margin = defaultMargin,
  data,
}: PieProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;

  const pieSortValues = (a: number, b: number): number => b - a;
  const frequency = (d: ChartItem) => d.value;

  const getDataFrequencyColor = scaleOrdinal({
    domain: data.map((item) => item.name),
    range: data.map((item) => item.color),
  });

  // Tooltip state
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<ChartItem>();

  const handleMouseEnter = (
    _event: React.MouseEvent<SVGElement>,
    d: ChartItem,
    centroidX: number,
    _centroidY: number
  ) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: left + centroidX, 
      tooltipTop: top - 300,
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <GradientPurpleRed id="pie" />
        <rect width={width} height={height} fill="url(#pie)" rx={14} />
        <Group top={top} left={left}>
          <Pie
            data={data}
            pieValue={frequency}
            pieSortValues={pieSortValues}
            outerRadius={radius}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { name } = arc.data;
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const arcPath = pie.path(arc);
                const arcFill = getDataFrequencyColor(name);
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 1;

                return (
                  <g
                    key={`arc-${name}-${index}`}
                    onMouseEnter={(event) =>
                      handleMouseEnter(event, arc.data, centroidX, centroidY)
                    }
                    onMouseLeave={hideTooltip}
                  >
                    {arcPath && <path d={arcPath} fill={arcFill} />}
                    {hasSpaceForLabel && (
                    <text
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fill="#ffffff"
                      fontSize={22}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {arc.data.name}
                    </text>
                    )}
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>

      {/* Tooltip */}
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "6px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            width:"100px"
          }}
        >
          <div>
            <strong>{tooltipData.name}</strong>
          </div>
          <div>Value: {tooltipData.value}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default PieChart;
