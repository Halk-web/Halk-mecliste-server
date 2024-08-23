"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer.controller");
const customerRouter = (0, express_1.Router)();
const customerController = new customer_controller_1.CustomerController();
customerRouter.post('/', customerController.create.bind(customerController));
customerRouter.get('/', customerController.findAll.bind(customerController));
customerRouter.get('/:id', customerController.findById.bind(customerController));
customerRouter.put('/:id', customerController.update.bind(customerController));
customerRouter.delete('/:id', customerController.delete.bind(customerController));
customerRouter.get('/search/:name', customerController.search.bind(customerController));
exports.default = customerRouter;
//# sourceMappingURL=customer.router.js.map