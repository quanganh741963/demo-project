const request = require("supertest");
const app = require("./calculate");

describe("Calculator API Tests", () => {
  describe("Error Cases", () => {
    test("division by zero should return 400", async () => {
      const res = await request(app).get(
        "/calculate?number1=10&number2=0&operator=divide"
      );
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Cannot divide by zero.");
    });

    test("invalid number1 should return 400", async () => {
      const res = await request(app).get(
        "/calculate?number1=q12as2&number2=1&operator=plus"
      );
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe(
        "Invalid numbers provided. Both inputs must be valid numbers."
      );
    });

    test("invalid number2 should return 400", async () => {
      const res = await request(app).get(
        "/calculate?number1=1&number2=q12as2&oxperator=plus"
      );
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe(
        "Invalid numbers provided. Both inputs must be valid numbers."
      );
    });
  });

  describe("Success Cases", () => {
    test("addition should work correctly", async () => {
      const res = await request(app).get(
        "/calculate?number1=1&number2=2&operator=plus"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe(3);
    });

    test("subtraction should work correctly", async () => {
      const res = await request(app).get(
        "/calculate?number1=1&number2=2&operator=minus"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe(-1);
    });

    test("multiplication should work correctly", async () => {
      const res = await request(app).get(
        "/calculate?number1=1&number2=2&operator=multi"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe(2);
    });

    test("division should work correctly", async () => {
      const res = await request(app).get(
        "/calculate?number1=4&number2=2&operator=divide"
      );
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe(2);
    });
  });

  describe("Edge Cases", () => {
    test("missing parameter should return 400", async () => {
      const res = await request(app).get(
        "/calculate?number4=1&number2=2&operator=divide"
      );
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toMatch(
        /Invalid numbers provided|Missing required parameters/
      );
    });

    test("invalid operator should return 400", async () => {
      const res = await request(app).get(
        "/calculate?number1=1&number2=2&operator=invalid"
      );
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe(
        "Invalid operator. Accepted operators: plus, minus, multi, divide."
      );
    });
  });
});
