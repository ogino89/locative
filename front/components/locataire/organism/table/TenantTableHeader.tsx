import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TenantHeadCell } from "./tenant.interface";
import { tenantHeadCells } from "./tenant.constant";
import HeadCell from "./HeadCell";

const TenantTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {tenantHeadCells.map((headCell: TenantHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TenantTableHeader;
