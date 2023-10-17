import { PropertyItem } from "../../../../redux/slices/property/propertySlice.interface";

export interface PropertyHeadCell {
  id: any;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

export interface PropertyTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PropertyItem
  ) => void;
  orderBy: string;
}
