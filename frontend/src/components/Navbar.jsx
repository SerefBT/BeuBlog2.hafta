import { Link, useNavigate } from 'react-router-dom';
import { PenLine, Sun, Moon, LogOut, User } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar glass-panel">
            <Link to="/" className="nav-brand">
                <PenLine size={24} />
                <span>BEUBlog</span>
            </Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Keşfet</Link>
                {user ? (
                    <>
                        <Link to="/create" className="btn-primary nav-btn">
                            <PenLine size={16} /> Yazı Yaz
                        </Link>
                        <Link to="/dashboard" className="nav-link">
                            <User size={16} style={{ marginRight: '5px' }} /> {user.name} {user.role === 'admin' && <span className="admin-badge">Admin</span>}
                        </Link>
                        <button onClick={handleLogout} className="btn-icon">
                            <LogOut size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Giriş Yap</Link>
                        <Link to="/register" className="btn-primary nav-btn">Kayıt Ol</Link>
                    </>
                )}
                <button onClick={toggleTheme} className="btn-icon">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
