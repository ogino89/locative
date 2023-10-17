import { TenantItem } from "../../../../redux/slices/tenant/tenantSlice.interface";

export interface TenantHeadCell {
  id: any;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

export interface TenantTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TenantItem
  ) => void;
  orderBy: string;
}
