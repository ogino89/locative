import { TenantItem } from "../../../../redux/slices/tenant/tenantSlice.interface";

export interface RentCallHeadCell {
  id: any;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

export interface RentCallTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TenantItem
  ) => void;
  orderBy: string;
}
