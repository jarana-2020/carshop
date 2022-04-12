export const mockResolvesCar = {
  _id: '1',
  model: "Ferrari",
  year: 2019,
  color: 'red',
  buyValue: 2000000,
  doorsQty: 2,
  seatsQty: 2,
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