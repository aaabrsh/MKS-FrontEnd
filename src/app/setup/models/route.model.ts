export interface Route {
  id: number | string;
  name: string;
  region_id: number;
  source_id: number;
  destination_id: number; 
}

export const EMPTY_ROUTE : Route = {
    id: null,
    name: "",
    region_id: null,
    source_id: null,
    destination_id: null,
}