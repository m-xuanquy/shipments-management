import apiClient from "../lib/api-client";
import type {
  Shipment,
  CreateShipmentData,
  UpdateShipmentData,
} from "../types/shipment.interface";

export const shipmentService = {
  async getShipments(): Promise<Shipment[]> {
    const response = await apiClient.get<Shipment[]>("/shipments");
    return response.data;
  },
  async getShipmentById(id: string): Promise<Shipment> {
    const response = await apiClient.get<Shipment>(`/shipments/${id}`);
    return response.data;
  },
  async createShipment(data: CreateShipmentData): Promise<Shipment> {
    const response = await apiClient.post<Shipment>("/shipments", data);
    return response.data;
  },
  async updateShipment(
    id: string,
    data: UpdateShipmentData
  ): Promise<Shipment> {
    const response = await apiClient.put<Shipment>(`/shipments/${id}`, data);
    return response.data;
  },
  async deleteShipment(id: string): Promise<void> {
    await apiClient.delete(`/shipments/${id}`);
  },
};
