export interface TransportOffer {
  id: number;
  transport_bid_id: number;
  transporter_id: number;
  offer_date: string;
}

export const EMPTY_TRANSPORT_OFFER: TransportOffer = {
  id: null,
  transport_bid_id: null,
  transporter_id: null,
  offer_date: null,
}