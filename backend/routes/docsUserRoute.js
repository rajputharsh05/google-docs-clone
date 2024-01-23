const express = require("express");
const HashPassword = require("../middlewares/MakePassWordSecure");
const signUpRouteController = require("../controllers/signUpRouteController");
const VerifyUserPassword = require("../middlewares/VerifyPassword");
const signInController = require("../controllers/signInRouteController");
const { ProtectedRoute } = require("../utils/jwt");
const userDashboardController = require("../controllers/userDashboardController");
const createDocsController = require("../controllers/createDocsController");
const DocsUserRoutes = express.Router();


DocsUserRoutes.post('/signin', VerifyUserPassword ,signInController );
DocsUserRoutes.post('/signup' , HashPassword , signUpRouteController);
DocsUserRoutes.get('/dashboard',ProtectedRoute , userDashboardController);
DocsUserRoutes.post('/createdocs',ProtectedRoute , createDocsController);
DocsUserRoutes.get('/',ProtectedRoute);


module.exports = DocsUserRoutes;