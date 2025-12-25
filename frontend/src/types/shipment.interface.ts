export interface Shipment {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryPerson: string;
}

export interface CreateShipmentData {
  pickupLocation: string;
  deliveryLocation: string;
  deliveryPerson: string;
}

export interface UpdateShipmentData {
  pickupLocation?: string;
  deliveryLocation?: string;
  deliveryPerson?: string;
}
