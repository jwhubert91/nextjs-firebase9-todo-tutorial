import React from "react"
import ReactLoading from "react-loading"
import { Grid } from "@mui/material"

const Loading = ({ type, color }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
    </Grid>
  )
}

export default Loading
