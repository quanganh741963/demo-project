const express = require("express");
const cors = require("cors"); // Import cors middleware

// JS function for calculation logic
function calculate(number1, number2, operator) {
  const num1 = parseFloat(number1);
  const num2 = parseFloat(number2);

  console.log(num1, num2, operator);

  // Input validation (crucial for API robustness)
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error(
      "Invalid numbers provided. Both inputs must be valid numbers."
    );
  }
  if (operator === "divide" && num2 === 0) {
    throw new Error("Cannot divide by zero.");
  }

  let calculatorResult = 0;
  switch (operator) {
    case "plus":
      calculatorResult = num1 + num2;
      break;
    case "minus":
      calculatorResult = num1 - num2;
      break;
    case "multi":
      calculatorResult = num1 * num2;
      break;
    case "divide":
      calculatorResult = num1 / num2;
      break;
    default:
      throw new Error(
        "Invalid operator. Accepted operators: plus, minus, multi, divide."
      );
  }
  return calculatorResult;
}

const app = express();
const PORT = 3000; // API will run on port 3000

// Add CORS middleware to allow requests from your frontend (even on different ports/domains)
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Endpoint for calculation
// Note: This endpoint is now just '/calculate', as it doesn't serve any HTML
// VD: http://localhost:3000/calculate?number1=1&number2=15&operator=plus
app.get("/calculate", (req, res) => {
  const { number1, number2, operator } = req.query;

  try {
    const result = calculate(number1, number2, operator);
    res.json(result); // Return the calculated result as JSON
  } catch (err) {
    // If there's an error (e.g., invalid input, divide by zero), return 400 Bad Request
    res.status(400).json({ error: err.message });
  }
});

// A simple root endpoint for the API to confirm it's running
app.get("/", (req, res) => {
  res.send("Calculator API is running!");
});

module.exports = app; // Export app for potential testing
