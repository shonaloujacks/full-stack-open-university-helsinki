"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPatientSchema = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const toNewPatientEntry = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    dateOfBirth: zod_1.z.iso.date(),
    gender: zod_1.z.enum(types_1.Gender),
    occupation: zod_1.z.string().min(1),
    ssn: zod_1.z.string().min(1),
    entries: zod_1.z.array(zod_1.z.unknown())
});
