import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from "../images/loader1.gif"

const BlogPostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                debugger;
                const token = process.env.REACT_APP_TOKEN;
                const response = await axios.get(`https://newsapi.org/v2/everything?q=technology&apiKey=` + token +  `&page=${currentPage}&pageSize=10`);
                setPosts(response.data.articles);
                setTotalPages(Math.ceil(response.data.totalResults / 10));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching the posts', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    if (loading) {
        return <div><img src={Loader} width={90} alt="Loading..." /></div>;
    }

    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.map((post, index) => (
                <div key={index}>
                    <Link to={`/post/${index}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <p>{post.description}</p>
                    <p>{post.publishedAt}</p>
                </div>
            ))}
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default BlogPostList;
