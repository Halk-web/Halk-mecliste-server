"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_service_1 = require("../services/customer.service");
const customerService = new customer_service_1.CustomerService();
class CustomerController {
    async create(req, res) {
        try {
            const customer = await customerService.create(req.body);
            res.status(201).json(customer);
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    async findAll(req, res) {
        try {
            const customers = await customerService.findAll();
            res.status(200).json(customers);
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    async findById(req, res) {
        try {
            const customer = await customerService.findById(req.params.id);
            if (customer) {
                res.status(200).json(customer);
            }
            else {
                res.status(404).send('Customer not found');
            }
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    async search(req, res) {
        try {
            const { name } = req.params;
            if (typeof name === 'string') {
                const customers = await customerService.search(name);
                res.status(200).json(customers);
            }
            else {
                res.status(400).send('Invalid query parameter');
            }
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    async update(req, res) {
        try {
            const customer = await customerService.update(req.params.id, req.body);
            if (customer) {
                res.status(200).json(customer);
            }
            else {
                res.status(404).send('Customer not found');
            }
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
    async delete(req, res) {
        try {
            await customerService.delete(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).send('Internal server error');
        }
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map