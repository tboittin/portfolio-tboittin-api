


var slugify = require('slugify')
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const uniqueSlug = require('unique-slug')

exports.getBlogs = async (req, res) => {
    // Setting sort({createdAt: -1}) => Last published appear first
    // Setting sort({createdAt: 1}) => First published appear first
    const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
    return res.json(blogs)
}

exports.getBlogsByUser = async (req, res) => {
    const userId = req.user.sub;
    const blogs = await Blog.find({
        userId,
        status: { $in: ['draft', 'published']}
    });
    return res.json(blogs)
}

exports.getBlogById = async (req, res) => {
    const blogs = await Blog.findById(req.params.id);
    return res.json(blogs)
}

exports.getBlogBySlug = async (req, res) => {
    const blogs = await Blog.findOne({slug: req.params.slug});
    return res.json(blogs)
}

exports.createBlog = async (req, res) => {
    const blogData = req.body;
    blogData.userId = req.user.sub;
    const blog = new Blog(blogData);

    try {
        const createdBlog = await blog.save();
        return res.json(createdBlog);
    } catch(e) {
        return res.status(422).send(e);
    }
}

const _saveBlog = async (blog) => {
  try {
    const createdBlog = await blog.save();
    return createdBlog;
  } catch (e) {
    // in the case we want to publish a blog with an existing slug
    if (e.code === 11000 && e.keyPattern.slug) {
      // 'title' + uniqueSlug generated
      blog.slug += "-" + uniqueSlug();
      return _saveBlog(blog);
    }

    throw e;
  }
};

exports.updateBlog = async (req, res) => {
    const {body, params: {id}} = req;

    Blog.findById(id, async (err, blog) => {
        if (err) {
            return res.status(422).send(err.message);
        }

        if (body.status && body.status === "published" && !blog.slug) {
            blog.slug = slugify(blog.title, {lower: true})
        }

        blog.set(body);
        blog.updateAt = new Date();

        try {
            const updatedBlog = await _saveBlog(blog);
            return res.json(updatedBlog);
        } catch(err) {
            return res.status(422).send(err.message);
        }
    });
}