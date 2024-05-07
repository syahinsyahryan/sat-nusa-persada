interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // address: Address;
  phone: string;
  // website: string;
  // company: Company;
}

export interface Notification {
  msg: string;
  color: string;
}

export interface Header {
  text: string;
  value: string | ((row: any, rowNumber: number) => any);
  sort?: string;
}

export interface ActionOptions {
  show: boolean;
  text: string;
  render: (row: any, rowNumber: number) => React.ReactNode;
}

export interface NumberOptions {
  show: boolean;
  text: string;
  render: (row: any, rowNumber: number) => React.ReactNode;
}

export interface CheckboxOptions {
  show: boolean;
  selected: string[];
  clickHandler: (uuid: string) => void;
  clickAllHandler: (uuids: string[]) => void;
}

export interface TableContentProps {
  checkboxes: CheckboxOptions;
  identityKey: string;
  data: any[];
  actionOptions: ActionOptions;
  numberOptions: NumberOptions;
  headers: Header[];
  showNoDataImage: boolean;
  caption: string;
  icon: string;
  color?: string;
}
export interface ErrorType {
  message: string;
}
export interface UseUsersResult {
  users: User[];
  loading: boolean;
  error: string | null;
}
export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
