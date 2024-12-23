import express from "express";
import multer from 'multer'
import {
  verifyToken,
  verifyAdmin,
  verifyAuthorOrAdmin,
} from "../utils/verifyToken.js";
import * as controller from "../controllers/controllers.js";
import {storage} from '../config/cloudinary.js'
const route = express.Router();

const upload = multer({storage:storage})

// user route

route.get("/get-users", controller.get_users);

route.get("/get-user/:id", controller.get_user);

route.get("/get-authors", controller.get_authors);

route.get("/get-author/:id", controller.get_author);

route.patch("/edit-author/:id", controller.edit_author);

route.delete("/deactivate-author/:id", controller.deactivate_author);

route.post("/register-user", controller.register_user);

route.post("/add-author", verifyAdmin, controller.add_user);

route.post("/login", controller.login);

route.post("/add-category", verifyAdmin, controller.add_category);

route.patch("/edit-category/:category", verifyAdmin, controller.edit_category);

route.get("/get-categories", controller.get_categories);

route.get("/get-category/:slug", controller.get_category);

route.delete("/delete-category/:category", verifyAdmin, controller.delete_category);

route.post(
  "/post-article/:id/:category_slug?",
  verifyAuthorOrAdmin,
  controller.create_post
);

route.post(
  "/author-post-article/:authorId/",
  verifyAuthorOrAdmin,
  controller.author_create_post
);

route.get("/get-posts", controller.get_posts);

route.get("/get-post/:id", controller.get_post);

route.patch("/edit-post/:id", verifyAuthorOrAdmin, controller.edit_post);

route.delete("/delete-post/:id/:categoryId", verifyAdmin, controller.delete_post);

route.post("/add-draft/:id",verifyAuthorOrAdmin,  controller.draft);

route.get("/get-user-drafts/:id",  controller.get_user_drafts);

route.get("/get-draft/:id",  controller.get_draft);

route.post("/publish-draft/:id",  verifyAuthorOrAdmin,controller.publish_draft);

route.patch('/update-draft/:id', verifyAuthorOrAdmin,controller.update_draft)

route.delete("/delete-draft/:id",  verifyAuthorOrAdmin,controller.delete_draft);

export default route;
