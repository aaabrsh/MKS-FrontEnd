export interface Location {
  id: number | string;
  code: string;
  name: string;
  location_type:string;
  description:string;
  ancestry:string;
}

export const EMPTY_LOCATION: Location = {
  id: null,
  code:"",
  name: "",
  location_type:"",
  description:"",
  ancestry:"",
}