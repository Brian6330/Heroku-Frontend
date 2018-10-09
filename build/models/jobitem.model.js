"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const joblist_model_1 = require("./joblist.model");
let JobItem = class JobItem extends sequelize_typescript_1.Model {
    toSimplification() {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'createdAt': this.createdAt,
            'endDate': this.endDate,
            'qualifications': this.qualifications
        };
    }
    fromSimplification(simplification) {
        this.jobListId = simplification['jobListId'];
        this.name = simplification['name'];
        this.description = simplification['description'];
        this.createdAt = simplification['createdAt'];
        this.endDate = simplification['endDate'];
        this.qualifications = simplification['qualifications'];
    }
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], JobItem.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], JobItem.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], JobItem.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], JobItem.prototype, "endDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], JobItem.prototype, "qualifications", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => joblist_model_1.JobList),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], JobItem.prototype, "jobListId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => joblist_model_1.JobList),
    __metadata("design:type", joblist_model_1.JobList)
], JobItem.prototype, "jobList", void 0);
JobItem = __decorate([
    sequelize_typescript_1.Table
], JobItem);
exports.JobItem = JobItem;
//# sourceMappingURL=jobitem.model.js.map