const { 
  getAllIngredient, 
  userRegister,
  userLogin,
  getAllDataHandler } = require("../server/handler");

const routes = [
  {
    method: "POST",
    path: "/api/v1/register",
    handler: userRegister
  },
  {
    method: 'POST',
    path: '/api/v1/login',
    handler: userLogin
  },
  {
    method: "GET",
    path: "/api/v1/ingredient",
    handler: getAllIngredient,
  },
];

module.exports = routes;
