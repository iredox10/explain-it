import Author from "../models/author.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Post from "../models/post.js";
import Category from "../models/category.js";
import Draft from "../models/draft.js";
import { cloudinaryConfig } from "../config/cloudinary.js";
import cloudinary from "cloudinary";

const signJwt = async ({ user }) => {
  const token = await jwt.sign(
    { id: user._id, admin: user.admin, author: user.isAuthor },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

const authorJwt = async ({ author }) => {
  const token = await jwt.sign(
    {
      id: author._id,
      author: author.isAuthor,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1hr" }
  );
  return token;
};

export const get_users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    res.status(200).json({ user, posts: user.posts });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const get_authors = async (req, res) => {
  try {
    const authors = await Author.find();
    const activeAuthors = [];
    authors.forEach((author) => {
      if (author.active) {
        activeAuthors.push(author);
      }
    });
    res.status(200).json({ authors, activeAuthors });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_author = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const posts = await Author.findById(req.params.id).populate("posts");
    res.status(200).json({ author, posts: posts });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const edit_author = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const register_user = async (req, res) => {
  const { username, admin, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      admin,
      password: hashedPassword,
    });
    const jwtToken = await signJwt({ user });
    res.status(201).json({ user, jwtToken });
  } catch (err) {
    if (err.code == 11000) {
      return res.status(400).json("username already exist");
    }
    res.status(303).json(err.message);
  }
};

export const login = async (req, res) => {
  let jwtToken;
  try {
    const user = await User.findOne({ username: req.body.username });
    const author = await Author.findOne({ username: req.body.username });

    if (!user && !author) return res.status(403).json("username not correct!!");
    if (author) {
      const password = await bcrypt.compare(req.body.password, author.password);
      if (!password) return res.json(403).status("password not correct");
      jwtToken = await authorJwt({ author });
      return res.status(200).json({ author, jwtToken });
    }
    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) return res.status(403).json("not correct password");
      jwtToken = await signJwt({ user });
      return res.status(200).json({ user, jwtToken });
    }
  } catch (err) {
    res.status(403).json(err.stack);
  }
};

export const add_user = async (req, res) => {
  const {
    fullname,
    username,
    about,
    links,
    password,
    position,
    image,
    facebook,
    twitter,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const author = await Author.create({
      fullname,
      username,
      about,
      links,
      password: hashedPassword,
      position,
      facebook,
      twitter,
    });
    res.status(201).json(author);
  } catch (err) {
    console.log(err.stack);
    res.status(403).json(err.message);
  }
};

export const deactivate_author = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    res.status(200).json(author);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const add_category = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(403).json(err.message);
  }
};
export const edit_category = async (req, res) => {
  try {
    const categories = await Category.findOneAndUpdate(
      { slug: req.params.category },
      req.body,
      { new: true }
    );
    res.status(201).json(categories);
  } catch (err) {
    res.status(403).json(err.message);
  }
};
export const get_category = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).populate(
      "posts"
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(403).json(err.message);
  }
};

export const delete_category = async (req, res) => {
  try {
    // const c = await Category.findOne({slug: req.params.category})
    const category = await Category.findOneAndDelete({ slug: req.params.category });
    res.status(200).json(category);
  } catch (err) {
    res.status(403).json(err.message);
  }
};

export const get_categories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(403).json(err.message);
  }
};

export const create_post = async (req, res) => {
  const { title, subTitle, article, author, images, coverImage, priority } =
    req.body;
  try {
    const user = await User.findById(req.params.id);
    const author = await Author.findById(req.params.id);
    const category = await Category.findOne({ slug: req.params.category_slug });

    const posts = await Post.find();
    if (!author) {
      const post = await Post({
        title,
        subTitle,
        article,
        author: user.username,
        priority,
        images,
        category: req.body.category,
      });
      const uploadedImages = [];
      for (const img of images) {
        if (img.startsWith("data:image/")) {
          const uploadResponse = await cloudinary.uploader.upload(img, {
            resource_type: "auto",
          });
          uploadedImages.push(uploadResponse.secure_url);
        }
      }
      const coverImageRes = await cloudinary.uploader.upload(coverImage, {
        resource_type: "auto",
      });

      post.coverImage = coverImageRes.secure_url;
      post.images = uploadedImages;
      post.save();
      category.posts.push(post);
      category.save();
      return res.status(201).json({ post, user, posts });
    } else {
      const post = await Post({
        title,
        subTitle,
        article,
        author: author.fullname,
        priority,
        images,
        category: req.body.category,
      });
      post.save();
      const category = await Category.findOne({ name: post.category });
      category.posts.push(post);
      category.save();
      author.posts.push(post);
      author.save();
      return res.status(201).json({ post, author, category });
    }
  } catch (err) {
    // console.log(err.stack);
    res.json(err.message).status(400);
  }
};

export const author_create_post = async (req, res) => {
  const { title, subTitle, article, author, images, coverImage, priority } =
    req.body;
  try {
    const uploadedImages = [];
    for (const img of images) {
      if (img.startsWith("data:image/")) {
        const uploadResponse = await cloudinary.uploader.upload(img, {
          resource_type: "auto",
        });
        uploadedImages.push(uploadResponse.secure_url);
      }
    }
    const coverImageRes = await cloudinary.uploader.upload(coverImage, {
      resource_type: "auto",
    });
    const author = await Author.findById(req.params.authorId);
    const post = await Post({
      title,
      subTitle,
      article,
      author: author.fullname,
      priority,
      images,
      category: req.body.category,
    });
    post.coverImage = coverImageRes.secure_url;
    post.images = uploadedImages;
    post.save();
    const category = await Category.findOne({ name: post.category });
    category.posts.push(post);
    category.save();
    author.posts.push(post);
    author.save();
    return res.status(201).json({ post, author, category });
  } catch (err) {
    res.status(400).json(err.stack);
  }
};

export const get_posts = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $group: {
          _id: "$priority",
        },
      },
    ]);
    const categoriesWithPosts = await Category.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "name",
          foreignField: "category", // Assuming the "category" field in the "post" model references the category
          as: "posts",
        },
      },
      {
        $sort: { priority: 1 }, // Sort by priority in ascending order
      },
      {
        $project: {
          name: 1,
          about: 1,
          posts: 1,
          priority: 1,
        },
      },
    ]);
    res.status(200).json(categoriesWithPosts);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const get_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const edit_post = async (req, res) => {
  const { coverImage, images } = req.body;
  try {
    let coverImageRes;
    let uploadedImages;
    uploadedImages = [];
    for (const img of images) {
      if (img.startsWith("data:image/")) {
        const uploadResponse = await cloudinary.uploader.upload(img, {
          resource_type: "auto",
        });
        uploadedImages.push(uploadResponse.secure_url);
      }
    }
    if (coverImage) {
      coverImageRes = await cloudinary.uploader.upload(coverImage, {
        resource_type: "auto",
      });
    }
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (coverImageRes) {
      post.coverImage = coverImageRes.secure_url;
      post.images = uploadedImages;
    }
    post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(403).json(err.stack);
  }
};

// export const delete_post = async (req,res ) =>{
//   try{
//     const post = await Post.findById(req.params.id)
//     res.json(post)
//   }catch(err){
//     res.json(err.message)
//   }
// }

export const delete_post = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { $pull: { post: req.params.id } },
      { new: true }
    );
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const draft = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const author = await Author.findById(req.params.id);
    const draft = await Draft.findOne({ title: req.body.title });
    if (draft) {
      const updatedDraft = await Draft.findOneAndUpdate(
        { title: req.body.title },
        req.body,
        { new: true }
      );
      return res.status(201).json(updatedDraft);
    }
    if (!user && !author) return res.status(404).json("user not found");

    if (user) {
      const draft = await Draft.create({
        userId: user._id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        article: req.body.article,
        category: req.body.category,
        image: req.body.image,
        priority: req.body.priority,
      });
      user.drafts.push(draft);
      await user.save();
      return res.status(201).json({ draft, user });
    } else {
      const draft = await Draft.create({
        userId: author._id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        article: req.body.article,
        category: req.body.category,
        image: req.body.image,
        priority: req.body.priority,
        author: [req.body.author],
      });
      author.drafts.push(draft);
      await author.save();
      return res.status(201).json({ draft, author });
    }
  } catch (err) {
    if (err.code == 11000) {
      return res.status(404).json("article already exist");
    }
    res.status(400).json(err.message);
  }
};

export const get_user_drafts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const userDrafts = await User.findById(req.params.id).populate("drafts");
      return res.status(200).json(userDrafts);
    } else {
      const authorDrafts = await Author.findById(req.params.id).populate(
        "drafts"
      );
      return res.status(200).json(authorDrafts);
    }
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
};

export const get_draft = async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id);
    res.status(200).json(draft);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const update_draft = async (req, res) => {
  try {
    const draft = await Draft.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(draft);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const publish_draft = async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id);
    const user = await User.findOne({ _id: draft.userId });
    const author = await Author.findOne({ _id: draft.userId });
    const category = await Category.findOne({ name: draft.category });
    if (user) {
      const post = await Post.create({
        title: draft.title,
        subTitle: draft.subTitle,
        article: draft.article,
        author: draft.author,
        priority: draft.priority,
        image: draft.image,
        category: draft.category,
      });
      category.posts.push(post);
      category.save();
      user.drafts.pop(draft._id);
      user.save();
      await Draft.findByIdAndUpdate(
        req.params.id,
        { deleted: true },
        { new: true }
      );
      return res.json({ post, user });
    } else {
      const post = await Post.create({
        title: draft.title,
        subTitle: draft.subTitle,
        article: draft.article,
        author: draft.author,
        priority: draft.priority,
        image: draft.image,
        category: draft.category,
      });
      category.posts.push(post);
      category.save();
      author.posts.push(post);
      author.save();
      author.drafts.pop(draft._id);
      author.save();
      await Draft.findByIdAndUpdate(
        req.params.id,
        { deleted: true },
        { new: true }
      );
      return res.json({ post, user });
    }
  } catch (err) {
    res.json(err.message);
  }
};

export const user_delete_draft = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("drafts");
    const draft = await Draft.findOne({ _id: req.body.draftId });
    user.drafts.pop(draft._id);
    await Draft.findByIdAndUpdate(draft._id, { deleted: true }, { new: true });
    res.status(200).json({ user, draft });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const delete_draft = async (req, res) => {
  try {
    const draft = await Draft.findByIdAndDelete(req.params.id);
    res.status(200).json(draft);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
