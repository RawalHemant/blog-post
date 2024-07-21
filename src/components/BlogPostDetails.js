import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from "../images/loader1.gif"

const BlogPostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = process.env.REACT_APP_TOKEN;
                const response = await axios.get(`https://newsapi.org/v2/everything?q=technology&apiKey=` + token + `&page=1&pageSize=10`);
                setPost(response.data.articles[id]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the post', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <div><img src={Loader} width={90} alt="Loading..." /></div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <Link to="/">Back to Blog Posts</Link>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.urlToImage && <img src={post.urlToImage} alt={post.title} />}
        </div>
    );
};

export default BlogPostDetails;
