import { useState, useContext, useRef, useMemo, useEffect } from 'react';
import { createPost, uploadImage, getCategories } from '../api';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const quillRef = useRef(null);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data);
            } catch (err) { }
        };
        fetchCats();
    }, []);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            try {
                const res = await uploadImage(formData);
                const url = res.data.url;
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection(true);
                quill.insertEmbed(range.index, 'image', url);
            } catch (err) {
                console.error('Resim yükleme hatası', err);
                alert('Resim yükleme başarısız.');
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
    }), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Yazı oluşturmak için giriş yapmalısınız.');
            return;
        }
        try {
            const postData = { title, content, author: user.name };
            if (categoryId) postData.category = categoryId;

            await createPost(postData);
            navigate('/');
        } catch (err) {
            alert('Yazı oluşturulamadı.');
            console.error(err);
        }
    };

    return (
        <div className="container animate-in">
            <h1 className="page-title">Yeni Yazı</h1>
            <form onSubmit={handleSubmit} className="form-container glass-panel">
                <div className="form-group">
                    <label className="form-label">Başlık</label>
                    <input type="text" required className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Kategori (Opsiyonel)</label>
                    <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Kategori Seçin</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{ marginBottom: '60px' }}>
                    <label className="form-label">İçerik</label>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        style={{ height: '300px', backgroundColor: 'var(--bg-dark-panel)' }}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
                    Yayınla <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
