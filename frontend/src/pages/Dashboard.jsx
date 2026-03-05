import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import CategoryManager from '../components/CategoryManager';
import { User as UserIcon } from 'lucide-react';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');

    if (loading) return <div className="loader-container"><div className="loader"></div></div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container animate-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <UserIcon size={32} />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem' }}>Merhaba, {user.name}</h1>
                    <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)' }}>{user.email} {user.role === 'admin' && <span className="admin-badge">Admin</span>}</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                {/* Sol Menü */}
                <div className="glass-panel" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '5px', padding: '15px' }}>
                    <button
                        onClick={() => setActiveTab('profile')}
                        style={{ padding: '10px 15px', border: 'none', background: activeTab === 'profile' ? 'var(--primary)' : 'transparent', color: activeTab === 'profile' ? 'white' : 'var(--text-main)', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                    >
                        Profilim
                    </button>
                    {user.role === 'admin' && (
                        <button
                            onClick={() => setActiveTab('categories')}
                            style={{ padding: '10px 15px', border: 'none', background: activeTab === 'categories' ? 'var(--primary)' : 'transparent', color: activeTab === 'categories' ? 'white' : 'var(--text-main)', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                        >
                            Kategori Yönetimi
                        </button>
                    )}
                </div>

                {/* Sağ İçerik Alanı */}
                <div style={{ flex: 1 }}>
                    {activeTab === 'profile' && (
                        <div className="glass-panel" style={{ padding: '20px' }}>
                            <h2 style={{ marginTop: 0 }}>Profil Bilgileri</h2>
                            <p>Bu alan ileride profil güncelleme için kullanılabilir.</p>
                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <label className="form-label">İsim</label>
                                <input type="text" className="form-control" value={user.name} disabled />
                            </div>
                            <div className="form-group">
                                <label className="form-label">E-posta</label>
                                <input type="email" className="form-control" value={user.email} disabled />
                            </div>
                        </div>
                    )}

                    {activeTab === 'categories' && user.role === 'admin' && (
                        <CategoryManager />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
