import React from "react";
import { Grid, IconButton } from '@material-ui/core';

let renderCount = 0;

export default () => {
  renderCount++;

  return (
    <div class= "flex">
    <Grid container justify='center' >
    <img src="https://s3.ap-northeast-1.amazonaws.com/image.png/Header.svg" alt="画像の解説文" />
    </Grid>
    </div>
  );
};
