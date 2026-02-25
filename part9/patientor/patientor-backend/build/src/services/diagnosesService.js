"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosesEntries_1 = __importDefault(require("../../data/diagnosesEntries"));
const getDiagnoses = () => {
    return diagnosesEntries_1.default;
};
const addDiagnoses = () => {
    return null;
};
exports.default = {
    getDiagnoses,
    addDiagnoses
};
