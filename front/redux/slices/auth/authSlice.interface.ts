export interface UserItem {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  postalAddress?: string;
  password?: string
}

export interface PropertyInitialState {
  userList: UserItem[];
  user: UserItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
