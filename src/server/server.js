require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const { loadCsvData, loadIngredientsCsvData } = require("../service/loadFood")

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "127.0.0.1",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  console.log("Route loaded")
  const foodData = await loadCsvData(process.env.CLEANED_CSV_URL);
  server.app.foodData = foodData;

  const ingredientData = await loadIngredientsCsvData(process.env.INGREDIENT_CSV_URL);
  server.app.ingredientData = ingredientData;

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
