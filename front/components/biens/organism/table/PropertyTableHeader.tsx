import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PropertyHeadCell } from "./property.interface";
import { propertyHeadCells } from "./property.constant";
import HeadCell from "./HeadCell";

const PropertyTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {propertyHeadCells.map((headCell: PropertyHeadCell) => (
          <HeadCell headCell={headCell} key={headCell.id}></HeadCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default PropertyTableHeader;
