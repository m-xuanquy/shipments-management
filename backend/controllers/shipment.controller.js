import shipmentService from "../services/shipment.service.js";

const shipmentController =  {
  async createShipment(req, res) {
    try {
      const shipment = await shipmentService.createShipment(req.userId, req.body);
      res.status(201).json(shipment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAllShipments(req, res) {
    try {
      const shipments = await shipmentService.getAllShipments(req.userId);
      res.status(200).json(shipments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getShipmentById(req, res) {
    try {
      const shipment = await shipmentService.getShipmentById(req.params.id, req.userId);
      res.status(200).json(shipment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async updateShipment(req, res) {
    try {
      const shipment = await shipmentService.updateShipment(
        req.params.id,
        req.userId,
        req.body
      );
      res.status(200).json(shipment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteShipment(req, res) {
    try {
      const result = await shipmentService.deleteShipment(req.params.id, req.userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
}

export default shipmentController;
