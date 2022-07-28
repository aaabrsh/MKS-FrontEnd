export interface UnitOfMeasure {
  id: number | string;
  name:string;
  abbreviation:string;
  unit_type:string;

}

export const EMPTY_UNIT_OF_MEASURE: UnitOfMeasure = {
  id: null,
  name: '',
  abbreviation: '',
  unit_type: '',

}
