export type DealType = {
  id: string|number;
  first_name: string;
  last_name: string;
  make: string;
  model: string;
  mileage: string;
  VIN: string;
  status: string;
}

export type DealStatusType = {
  name: string;
  value: string;
  sort: number;
}

export type DealerType = {
  id: number | string;
  name: string;
  status: string;
}
