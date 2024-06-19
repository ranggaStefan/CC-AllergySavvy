const {
  userRegister,
  userLogin,
  getUserData,
  updateUserData,
  setUserAllergies,
} = require("./handlerUser");

const {
  getFoodRecommendation,
  getFoodDetail,
  getFoodRandom,
  getIngredientAll,
  getIngredientRandom,
} = require("./handlerFood");

const authMiddleware = require("../server/auth");

const routes = [
  {
    method: "POST",
    path: "/api/v1/register",
    handler: userRegister,
  },
  {
    method: "POST",
    path: "/api/v1/login",
    handler: userLogin,
  },
  {
    method: "GET",
    path: "/api/v1/user",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getUserData,
  },
  {
    method: "PATCH",
    path: "/api/v1/user",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
      },
    },
    handler: updateUserData,
  },
  {
    method: "POST",
    path: "/api/v1/user/allergies",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: setUserAllergies,
  },
  {
    method: "POST",
    path: "/api/v1/recommendation",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getFoodRecommendation,
  },
  {
    method: 'GET',
    path: '/api/v1/food/{foodId}',
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getFoodDetail,
  },
  {
    method: 'GET',
    path: '/api/v1/food/random',
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getFoodRandom,
  },
  {
    method: "GET",
    path: "/api/v1/ingredient",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getIngredientAll,
  },
  {
    method: "GET",
    path: "/api/v1/ingredient/random",
    options: {
      pre: [{ method: authMiddleware, assign: "user" }],
    },
    handler: getIngredientRandom,
  },
];

module.exports = routes;
