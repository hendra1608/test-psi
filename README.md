# 📦 Monorepo: Backend (NestJS + Prisma) & Frontend (Next.js)

Repository ini berisi dua aplikasi dalam satu monorepo:

- **Backend** → NestJS + Prisma 
- **Frontend** → Next.js  

## 📂 Struktur Folder
```
apps/
backend/ # NestJS + Prisma (dengan Prisma migration & seed)
frontend/ # Next.js (frontend)
shared/ # (opsional, untuk lib/shared code)
package.json # root (script global)

yaml
Copy code

```

## 🚀 Cara Menjalankan

### 1. Install Dependencies
Jalankan sekali untuk menginstall semua dependencies pada **backend** & **frontend**:
```bash
npm install
```

### 2. Jalankan Aplikasi (1 Command)
Perintah berikut akan otomatis:

Menjalankan Prisma migrate (deploy schema ke DB)

Menjalankan Prisma seed (apps/backend/prisma/seed.ts)

Menjalankan backend (NestJS) dan frontend (Next.js) secara bersamaan

```bash
Copy code
npm run dev
```