import { useState, useEffect, useContext } from 'react';
import { getCategories, createCategory, deleteCategory } from '../api';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus } from 'lucide-react';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3b82f6');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (err) {
            console.error('Kategoriler çekilemedi', err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await createCategory({ name, color });
            setCategories([res.data, ...categories]);
            setName('');
            setColor('#3b82f6');
        } catch (err) {
            alert('Kategori oluşturulamadı: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
        try {
            await deleteCategory(id);
            setCategories(categories.filter(c => c._id !== id));
        } catch (err) {
            alert('Kategori silinemedi.');
        }
    };

    if (user?.role !== 'admin') {
        return <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>Bu alanı görüntüleme yetkiniz yok.</div>;
    }

    return (
        <div className="glass-panel" style={{ padding: '20px', marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Kategori Yönetimi
            </h2>

            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: '30px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>Kategori Adı</label>
                    <input type="text" required className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>Renk</label>
                    <input type="color" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} style={{ padding: '2px', height: '42px', width: '60px' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ height: '42px' }}>
                    <Plus size={16} /> Ekle
                </button>
            </form>

            <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--text-muted)' }}>Mevcut Kategoriler</h3>
                {categories.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>Henüz kategori eklenmemiş.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {categories.map(cat => (
                            <li key={cat._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: 'var(--bg-dark)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: cat.color, display: 'inline-block' }}></span>
                                    <span style={{ fontWeight: '500' }}>{cat.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/{cat.slug}</span>
                                </div>
                                <button onClick={() => handleDelete(cat._id)} className="delete-btn" title="Sil">
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryManager;
