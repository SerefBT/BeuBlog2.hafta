import { useState, useEffect, useContext } from 'react';
import { getPosts, deletePost, updatePostStatus } from '../api';
import { Trash2, User, Clock, EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await getPosts();
            setPosts(data);
        } catch (err) {
            console.error('Failed to grab posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
        try {
            await deletePost(id);
            setPosts(posts.filter(post => post._id !== id));
        } catch (err) {
            alert('Silme başarısız veya yetkiniz yok.');
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'suspended' ? 'published' : 'suspended';
            await updatePostStatus(id, newStatus);
            setPosts(posts.map(post => post._id === id ? { ...post, status: newStatus } : post));
        } catch (err) {
            alert('Durum güncellenemedi veya yetkiniz yok.');
        }
    };

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    return (
        <div className="container animate-in">
            <h1 className="page-title">Blog Yazıları</h1>
            {posts.length === 0 ? (
                <p>Henüz yazı yok.</p>
            ) : (
                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post._id} className="post-card glass-panel" style={{ opacity: post.status === 'suspended' ? 0.6 : 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h2 style={{ margin: 0 }}>
                                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                </h2>
                                {post.status === 'suspended' && (
                                    <span style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Askıda</span>
                                )}
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }}></p>
                            <div className="post-author">
                                <User size={16} /> {post.author}
                                <Clock size={14} /> {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                {user && user.role === 'admin' && (
                                    <button
                                        onClick={() => handleStatusToggle(post._id, post.status)}
                                        className="btn-icon"
                                        title={post.status === 'suspended' ? 'Yayına Al' : 'Askıya Al'}
                                        style={{ color: post.status === 'suspended' ? 'var(--primary)' : 'var(--text-muted)' }}
                                    >
                                        {post.status === 'suspended' ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                )}
                                {user && (user.role === 'admin' || user.name === post.author) && (
                                    <button onClick={() => handleDelete(post._id)} className="delete-btn" title="Sil">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
