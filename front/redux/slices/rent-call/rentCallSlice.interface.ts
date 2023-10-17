export interface RentCallItem {
  id?: string;
  month?: string;
  status?: string;
  amount?: number;
  tenantId?: string;
  tenant?: any;
}

export interface RentCallInitialState {
  rentCallList: RentCallItem[];
  rentCall: RentCallItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
