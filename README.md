# BEUBlog — MERN Stack Blog Uygulaması

BEUBlog, MERN (MongoDB, Express.js, React, Node.js) yığını kullanılarak geliştirilmiş, modern, hızlı ve tam donanımlı bir Full-Stack blog platformudur. Zengin metin editörü, rol bazlı yetkilendirme (Admin/User), dinamik kategori yönetimi ve karanlık/aydınlık tema seçenekleri gibi gerçek dünya senaryolarında beklenen tüm standart özellikleri bünyesinde barındırır.

## 🚀 Projenin Temel Özellikleri

*   **📝 Tam Kapsamlı Blog Yönetimi:** Yazı oluşturma, düzenleme, listeleme ve silme (CRUD) işlemleri.
*   **✍️ Zengin Metin Editörü (Rich Text Editor):** React Quill entegrasyonu sayesinde kalın/italik metinler, başlıklar, kod blokları ve metin içine resim gömme (sunucuya yükleyerek) özellikleri.
*   **🔒 Kimlik Doğrulama (JWT):** JSON Web Token tabanlı güvenli kayıt olma, giriş yapma ve oturum (session) yönetimi.
*   **🛡️ Rol Bazlı Yetkilendirme (RBAC):** Admin ve standart Kullanıcı olarak farklı yetki seviyeleri. Admin paneli erişimi ve içerik denetimi.
*   **🏷️ Dinamik Kategori Sistemi:** Yazıları belirli kategorilere atama, renklendirilmiş kategori etiketleri oluşturma ve yönetme (sadece Admin yetkisiyle).
*   **⏸️ Moderasyon (Askıya Alma):** Adminlerin platformdaki uygunsuz bulan yazıları "Askıya Al"arak misafirlerden ve diğer kullanıcılardan gizleme yeteneği.
*   **🎨 Tema Desteği:** CSS Değişkenleri üzerinden yönetilen, tek tıkla geçiş yapılabilen Dark (Karanlık) ve Light (Aydınlık) Mode.
*   **🔗 SEO Dostu URL'ler (Slug URL):** `/post/blog-basligi` şeklinde arama motorlarına uygun düzenli link yapıları.

## 🛠️ Kullanılan Teknolojiler (Tech Stack)

### Frontend (İstemci - Port: 5173)
*   **React 18** & **Vite:** Hızlı, modern ve bileşen tabanlı kullanıcı arayüzü
*   **React Router v7:** Sayfalar arası geçiş ve dinamik (Slug) yönlendirmeler
*   **Axios:** Backend API ile veri iletişimi ve JWT interceptor yapısı
*   **React Quill:** Gelişmiş içerik girişi ve resim işleme
*   **Lucide React:** Modern ve hafif SVG ikon kütüphanesi
*   **Saf CSS:** "Vanilla CSS" değişkenleriyle tasarlanmış duyarlı (Responsive) arayüz

### Backend (Sunucu - Port: 5000)
*   **Node.js** & **Express.js 5:** Yüksek performanslı ve ölçeklenebilir REST API mimarisi
*   **MongoDB** & **Mongoose 9:** NoSQL veri tabanı ve esnek JSON tabanlı veri modellemesi
*   **JSON Web Token (jsonwebtoken) & bcryptjs:** Kullanıcı verilerini şifreleme ve token doğrulama
*   **Multer:** Platform üzerinden sisteme güvenli görsel/dosya yükleme ve tutma sistemi
*   **Slugify:** Blog başlıklarını temiz bir şekilde benzersiz URL bileşenlerine çevirme

## 💾 Kurulum ve Çalıştırma Rehberi

Projeyi kendi bilgisayarınızda (lokalde) çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Ön Gereksinimler
Sisteminizde **Node.js** (v18+) ve **MongoDB** (Local veya Atlas) kurulu ve çalışır durumda olmalıdır.

### 1️⃣ Repoyu İndirme ve Bağımlılıkları Kurma

```bash
# Reposu klonlayın
git clone https://github.com/SerefBT/BeuBlog2.hafta.git
cd BeuBlog2.hafta

# Backend bağımlılıklarını kurun
cd backend
npm install

# Frontend bağımlılıklarını kurun
cd ../frontend
npm install
```

### 2️⃣ Ortam Değişkenlerini Ayarlama (.env)
`backend` klasörü içinde bir `.env` dosyası oluşturun ve aşağıdaki değerleri tanımlayın:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/blogdb
PORT=5000
JWT_SECRET=super_gizli_anahtariniz_ile_degistirin
```

### 3️⃣ Uygulamayı Başlatma (Development Mode)

İki ayrı terminal penceresi açın.

**Terminal 1 (Backend API):**
```bash
cd backend
node server.js
# Çıktı: "Server is running on port: 5000" ve "MongoDB connect success"
```

**Terminal 2 (Frontend UI):**
```bash
cd frontend
npm run dev
# Çıktı: VITE v5.x ready... http://localhost:5173
```

Tarayıcınızı açın ve `http://localhost:5173` adresine giderek uygulamayı kullanmaya başlayın.

### 👑 Bir Kullanıcıyı Admin Yapma (CLI Scripti)
Web sitesinden standart bir kullanıcı hesabı açtıktan sonra, bu kullanıcıyı yönetici (**Admin**) yapmak için terminalden backend klasöründeyken aşağıdaki scripti çalıştırın:
```bash
cd backend
node make-admin.js hesap_mailiniz@ornek.com
```
Bunu yaptığınızda hesabınızla yönetici paneline erişip kategori ekleyebilir ve yazıları askıya alabilirsiniz.

---
*Geliştirme: Şerafettin (SerefBT) - 2026*
