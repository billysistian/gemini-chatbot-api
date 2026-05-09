# Gemini Chatbot AI

Proyek ini adalah aplikasi chatbot berbasis web yang mengintegrasikan Google Gemini AI. Aplikasi ini menggunakan Node.js di sisi backend dan antarmuka chat modern yang responsif di sisi frontend menggunakan Tailwind CSS.

## Fitur Utama

- **Integrasi Google Gemini**: Menggunakan teknologi AI terbaru dari Google untuk memberikan jawaban yang cerdas dan relevan.
- **Riwayat Percakapan (Contextual)**: Bot mampu mengingat konteks percakapan dalam satu sesi untuk interaksi yang lebih alami.
- **Format Markdown**: Mendukung rendering otomatis untuk teks **tebal (bold)**, *list item*, dan baris baru.
- **UI/UX Modern**: Antarmuka chat yang bersih dengan dukungan animasi "Thinking..." saat bot sedang memproses jawaban.

## Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Frontend**: JavaScript (Vanilla), HTML5, Tailwind CSS
- **AI**: Google Gemini API
- **Formatting**: Custom Markdown Parser

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal:
- Node.js (Versi 18 atau lebih tinggi)
- Akun Google AI Studio untuk mendapatkan API Key.

## Instalasi

1. **Clone Repository:**
   ```bash
   git clone <url-repository-anda>
   cd gemini-chatbot-api
   ```

2. **Instal Dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   - Buat API key di Google AI Studio copy API key nya
   - Tambahkan file .env di project ini
   - Isi file .env dengan GEMINI_API_KEY=Copy API key nya disini

## Menjalankan Aplikasi

1. Jalankan server:
   ```bash
   node index.js
   ```
2. Akses aplikasi melalui browser di: `http://localhost:3000`

## Struktur Proyek

- `public/` - Berisi file statis untuk frontend.
  - `script.js` - Logika utama frontend, pengolahan UI chat, dan Markdown parser.
- `node_modules/` - Dependensi proyek.

## Screenshot

<p align="center">
  <img src="public/img/gemini-chatbot-api.png" width="100%">
</p>