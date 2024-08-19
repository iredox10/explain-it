import express from "express";
import {
  verifyToken,
  verifyAdmin,
  verifyAuthorOrAdmin,
} from "../utils/verifyToken.js";
import * as controller from "../controllers/controllers.js";

const route = express.Router();

// user route

route.get("/get-users", controller.get_users);

route.get("/get-user/:id", controller.get_user);

route.get("/get-authors", controller.get_authors);

route.get("/get-author/:id", controller.get_author);

route.post("/register-user", controller.register_user);

route.post("/add-author", verifyAdmin, controller.add_user);

route.post("/login", controller.login);

route.post("/add-category", verifyAdmin, controller.add_category);

route.patch("/edit-category/:id", verifyAdmin, controller.edit_category);

route.get("/get-categories", controller.get_categories);

route.get("/get-category/:id", controller.get_category);

route.delete("/delete-category/:id", verifyAdmin, controller.delete_category);

route.post(
  "/post-article/:id/:category_id",
  verifyAuthorOrAdmin,
  controller.post
);

route.get("/get-posts", controller.get_posts);

route.get("/get-post/:id", controller.get_post);

route.patch("/edit-post/:id", verifyAuthorOrAdmin, controller.edit_post);

route.delete("/delete-post/:id", verifyAdmin, controller.delete_post);

route.post('/add-draft/:id', verifyAuthorOrAdmin, controller.draft)

export default route;
