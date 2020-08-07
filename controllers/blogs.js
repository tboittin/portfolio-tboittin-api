



const mongoose = require('mongoose');

const Blog = mongoose.model('Blog');

exports.getBlogs = async (req, res) => {
    // Setting sort({createdAt: -1}) => Last published appear first
    // Setting sort({createdAt: 1}) => First published appear first
    const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
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

exports.updateBlog = async (req, res) => {
    const {body, params: {id}} = req;

    Blog.findById(id, async (err, blog) => {
        if (err) {
            return res.status(422).send(err.message);
        }

        // check if user is publishing blog & 
        // if user is publishing then create slug

        blog.set(body);
        blog.updateAt = new Date();

        try {
            const updateBlog = await blog.save();
            return res.json(updateBlog);
        } catch(err) {
            return res.status(422).send(err.message);
        }
    });
}