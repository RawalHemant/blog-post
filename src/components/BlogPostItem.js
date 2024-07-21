import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostItem = ({ post }) => {
    return (
        <div>
            debugger;
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <p>{post.description}</p>
            <p>{post.publishedAt}</p>
        </div>
    );
};

export default BlogPostItem;
