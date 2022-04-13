import { IIndexable } from "../../interfaces/indexable"
import { Motorcycle } from "../../interfaces/MotorcycleInterface"

export const mockResolvesCar = {
  _id: '1',
  model: "Ferrari",
  year: 2019,
  color: 'red',
  buyValue: 2000000,
  doorsQty: 2,
  seatsQty: 2,
}

export const mockResolvesMotorcycle: IIndexable = {
  _id: '00a5f66ry9900a5f66ry99oo',
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
}

export const objMotorcycle: Motorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125
}

export const objCar = {
  model: "Ferrari",
  year: 2019,
  color: 'red',
  buyValue: 2000000,
  doorsQty: 2,
  seatsQty: 2,
}

export const errorsZod = {
  "error": {
      "issues": [
          {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                  "doorsQty"
              ],
              "message": "Doors Qty is required"
          },
          {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                  "seatsQty"
              ],
              "message": "Seats Qty is required"
          },
          {
              "code": "invalid_type",
              "expected": "string",
              "received": "undefined",
              "path": [
                  "model"
              ],
              "message": "Model is required"
          },
          {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                  "year"
              ],
              "message": "Year is required"
          },
          {
              "code": "invalid_type",
              "expected": "string",
              "received": "undefined",
              "path": [
                  "color"
              ],
              "message": "Color is required"
          },
          {
              "code": "invalid_type",
              "expected": "number",
              "received": "undefined",
              "path": [
                  "buyValue"
              ],
              "message": "Buy Value is required"
          }
      ],
      "name": "ZodError"
  }
}