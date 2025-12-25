import shipments from "../data/shipments.js";

const shipmentService = {
  async createShipment(userId, shipmentData) {
    const { pickupLocation, deliveryLocation, deliveryPerson } = shipmentData;
    const shipmentId = Math.random().toFixed(16).toString();

    const newShipment = {
      id: shipmentId,
      userId,
      pickupLocation,
      deliveryLocation,
      deliveryPerson,
    };

    shipments.push(newShipment);

    return newShipment;
  },

  async getAllShipments(userId) {
    return shipments.filter((shipment) => shipment.userId === userId);
  },

  async getShipmentById(shipmentId, userId) {
    const shipment = shipments.find(
      (shipment) => shipment.id === shipmentId && shipment.userId === userId
    );
    if (!shipment) {
        throw new Error("Shipment not found");
    }
    return shipment;
  },

  async updateShipment(shipmentId, userId, shipmentData) {
    const shipmentIndex = shipments.findIndex(
      (shipment) => shipment.id === shipmentId && shipment.userId === userId
    );
    if (shipmentIndex === -1) {
      throw new Error("Shipment not found");
    }

    shipments[shipmentIndex] = {
      ...shipments[shipmentIndex],
      ...shipmentData,
    };
    return shipments[shipmentIndex];
  },
  async deleteShipment(shipmentId, userId) {
    const shipmentIndex = shipments.findIndex(
      (shipment) => shipment.id === shipmentId && shipment.userId === userId
    );
    if (shipmentIndex === -1) {
      throw new Error("Shipment not found");
    }

    const deletedShipment = shipments.splice(shipmentIndex, 1)[0];
    return deletedShipment;
  },
};

export default shipmentService;