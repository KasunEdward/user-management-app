import {Grid, Typography } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
import Layout from "../../layout";
import { DashboardContainer } from "./styled.component";
import CardStyled from "../../components/CardStyled";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useEffect } from "react";
import { fetchStatsRequest, Metric } from "../../services/slices/statsSlice";

const Dashboard: React.FC = () => {
  const { mode } = useThemeContext();
	const dispatch = useDispatch();
	const { loading, error,data } = useSelector(
    (state: RootState) => state.stats
  );

	useEffect(()=>{
    dispatch(fetchStatsRequest())
	},[]);
  useEffect(()=>{
		console.log(data)
	},[data,loading,error])

  return (
    <Layout>
      <DashboardContainer mode={mode}>
        <Grid container spacing={3}>
          <Grid
            container
            lg={12}
            xs={12}
            spacing={3}
            sx={{ marginTop: "20px", marginLeft: "10px" }}
          >
            {data?.metrics.map(({name,color,value}:Metric)=>(
               <Grid item sm={3} xs={6} key={name}>
               <CardStyled title={name} value={value} color={color} />
             </Grid>
            ))}
           
          </Grid>
          <Grid item xs={12} lg={6} sx={{ height: "300px",marginBottom:"50px" }}>
            <Typography
              variant="h6"
              sx={(theme) => ({ color: theme.palette.primary.text.primary })}
              gutterBottom
            >
              Users by cities
            </Typography>
            <ParentSize>
              {({ width, height }) => (
                <BarChart width={width} height={height} data={data?.usersByCity} />
              )}
            </ParentSize>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ height: "300px",marginBottom:"50px"  }}>
            <Typography
              variant="h6"
              sx={(theme) => ({ color: theme.palette.primary.text.primary })}
              gutterBottom
            >
              Users by age category
            </Typography>
            <ParentSize>
              {({ width, height }) => (
                <PieChart width={width} height={height} data={data?.usersByAgeCategory} />
              )}
            </ParentSize>
          </Grid>
        </Grid>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
