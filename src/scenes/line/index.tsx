import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import React from "react";

const Line: React.FC = (): JSX.Element => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="70vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
