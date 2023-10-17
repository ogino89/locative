import React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RentCallHeadCell } from "./rentCall.interface";
import { rentCallHeadCells } from "./rentCall.constant";
import HeadCell from "./HeadCell";

const RentCallTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {rentCallHeadCells.map((headCell: RentCallHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default RentCallTableHeader;
