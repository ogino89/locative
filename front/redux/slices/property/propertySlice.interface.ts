export interface PropertyItem {
  id?: string;
  type?: string;
  rental?: number;
  area?: string;
  postalAddress?: string;
}

export interface PropertyInitialState {
  propertyList: PropertyItem[];
  property: PropertyItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
