"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const customer_model_1 = require("../models/customer.model"); // Güncellenmiş model yolunu kullanın
const database_1 = require("../database/postgresql/database");
class CustomerService {
    constructor() {
        this.customerRepository = database_1.AppDataSource.getRepository(customer_model_1.CustomerEntity);
    }
    toLowerCaseString(str) {
        return str.toLowerCase();
    }
    async create(customer) {
        const customerData = { ...customer, customer_name: this.toLowerCaseString(customer.customer_name) };
        const customerEntity = this.customerRepository.create(customerData);
        await this.customerRepository.save(customerEntity);
        return customerEntity;
    }
    async findAll() {
        return await this.customerRepository.find();
    }
    async findById(id) {
        return await this.customerRepository.findOne({ where: { id: id } }) || null;
    }
    async search(name) {
        const lowerCaseName = this.toLowerCaseString(name);
        return await this.customerRepository
            .createQueryBuilder('customer')
            .where('LOWER(customer.customer_name) LIKE :name', { name: `%${lowerCaseName}%` })
            .getMany();
    }
    async update(id, customer) {
        await this.customerRepository.update(id, {
            ...customer,
            customer_name: customer.customer_name ? this.toLowerCaseString(customer.customer_name) : undefined
        });
        return this.findById(id);
    }
    async delete(id) {
        await this.customerRepository.delete(id);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map