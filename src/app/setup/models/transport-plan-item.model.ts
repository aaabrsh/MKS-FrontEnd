export interface TransportPlanItem {
  id: number | string;
  route_id:number;
  transport_plan_id:number;
  quantity:number;
  unit_id:number;
  planned:boolean;
}

export const EMPTY_TRANSPORT_PLAN_ITEM : TransportPlanItem= {
  id: null,
  route_id: null,
  transport_plan_id: null,
  quantity: null,
  unit_id: null,
  planned: false
}