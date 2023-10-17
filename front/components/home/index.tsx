import { styled, Typography } from "@mui/material";
import React from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import Link from "next/link";
import { purple, red } from "@mui/material/colors";
import CardModule from "./type";
import HouseIcon from '@mui/icons-material/House';

const SectModules = () => {

  return (
    <DivSectModules>
      <Link href="/biens" passHref>
        <CardModule color="warning">
          <HouseIcon fontSize="medium" />
          <Typography variant="body2">Biens</Typography>
        </CardModule>
      </Link>

      <Link href="/tenant" passHref>
        <CardModule color="success">
          <HouseIcon fontSize="medium" />
          <Typography variant="body2">locataires associés</Typography>
        </CardModule>
      </Link>

      <Link href="/rentCall" passHref>
        <CardModule color="secondary">
          <InventoryIcon fontSize="medium" />
          <Typography variant="body2">Rappel de loyers</Typography>
        </CardModule>
      </Link>
    </DivSectModules>
  );
};

export default SectModules;

const DivSectModules = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(4),
  paddingRight: theme.spacing(16),
  paddingLeft: theme.spacing(16),
}));

const violet = purple["A200"];
