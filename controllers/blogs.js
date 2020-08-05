



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

exports.getBlogById = async (req, res) => {
    const blogs = await Blog.findOne({slug: req.params.slug});
    return res.json(blogs)
}