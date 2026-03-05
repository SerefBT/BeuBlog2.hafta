import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Giriş başarısız.');
        }
    };

    return (
        <div className="container animate-in" style={{ maxWidth: '400px', marginTop: '10vh' }}>
            <h1 className="page-title" style={{ textAlign: 'center' }}>Giriş Yap</h1>
            <form onSubmit={handleSubmit} className="glass-panel">
                {error && <p style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error}</p>}
                <div className="form-group">
                    <label className="form-label">E-posta</label>
                    <input type="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Şifre</label>
                    <input type="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Giriş</button>
                <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
                    Hesabınız yok mu? <Link to="/register" style={{ color: 'var(--primary)' }}>Kayıt Ol</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
