const app = require("./calculate");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Calculator API server is running at http://localhost:${PORT}`);
});
