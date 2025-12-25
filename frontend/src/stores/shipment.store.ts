import { create } from "zustand";
import type { Shipment } from "../types/shipment.interface";
import { shipmentService } from "../services/shipment.service";

interface ShipmentState {
  shipments: Shipment[];
  isLoading: boolean;
  error: string | null;

  fetchShipments: () => Promise<void>;
  createShipment: (data: Omit<Shipment, "id">) => Promise<void>;
  updateShipment: (
    id: string,
    shipmentData: Partial<Shipment>
  ) => Promise<void>;
  deleteShipment: (id: string) => Promise<void>;
}

export const useShipmentStore = create<ShipmentState>((set, get) => ({
  shipments: [],
  isLoading: false,
  error: null,

  async fetchShipments() {
    set({ isLoading: true, error: null });
    try {
      const shipments = await shipmentService.getShipments();
      set({ shipments, isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to fetch shipments", isLoading: false });
    }
  },

  async createShipment(data) {
    set({ isLoading: true, error: null });
    try {
      const newShipment = await shipmentService.createShipment(data);
      set({ shipments: [...get().shipments, newShipment], isLoading: false });
    } catch (error: any) {
      set({ error: "Failed to create shipment", isLoading: false });
    }
  },

  async updateShipment(id, data) {
    set({ isLoading: true, error: null });
    try {
      const updatedShipment = await shipmentService.updateShipment(id, data);
      set({
        shipments: get().shipments.map((shipment) =>
          shipment.id === id ? updatedShipment : shipment
        ),
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: "Failed to update shipment", isLoading: false });
    }
  },

  async deleteShipment(id) {
    set({ isLoading: true, error: null });
    try {
      await shipmentService.deleteShipment(id);
      set({
        shipments: get().shipments.filter((shipment) => shipment.id !== id),
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: "Failed to delete shipment", isLoading: false });
    }
  },
}));
