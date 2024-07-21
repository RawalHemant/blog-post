import { render, screen } from '@testing-library/react';
import BlogPostList from '../components/BlogPostList';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders BlogPostList component', async () => {
    render(
        <Router>
            <BlogPostList />
        </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
