import { PropertyItem } from "../property/propertySlice.interface";

export interface TenantItem {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  postalAddress?: string;
  phone?:string;
  propertyId?: string
  property?: any;
}

export interface TenantInitialState {
  tenantList: TenantItem[];
  tenant: TenantItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
