const app = require("./calculate");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Calculator API server is running at http://localhost:${PORT}`);
});

// VD: http://localhost:3000/calculate?number1=1&number2=15&operator=plus