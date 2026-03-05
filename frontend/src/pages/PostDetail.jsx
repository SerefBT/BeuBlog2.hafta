import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../api';
import { User, Clock, ArrowLeft } from 'lucide-react';

const PostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPostBySlug(slug);
                setPost(res.data);
            } catch (err) {
                console.error('Post detay hatası:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;
    if (!post) return <div className="container"><p>Yazı bulunamadı.</p></div>;

    return (
        <div className="container animate-in" style={{ maxWidth: '800px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: 'var(--text-muted)' }}>
                <ArrowLeft size={16} /> Geri Dön
            </Link>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
            <div className="post-author" style={{ marginBottom: '30px' }}>
                <User size={16} /> {post.author}
                <Clock size={16} /> {new Date(post.createdAt).toLocaleDateString()}
                {post.category && <span style={{ backgroundColor: post.category.color, padding: '2px 8px', borderRadius: '12px', color: '#fff', fontSize: '0.8rem' }}>{post.category.name}</span>}
            </div>

            <div className="glass-panel" style={{ padding: '30px' }}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </div>
    );
};

export default PostDetail;
