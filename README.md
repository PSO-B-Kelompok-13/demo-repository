# 📝 Task Tracker

**Task Tracker** adalah aplikasi manajemen tugas harian berbasis **Electron** yang dikembangkan sebagai bagian dari proyek akhir mata kuliah **Pengembangan Sistem Operasi (PSO B)**. Aplikasi ini memudahkan pengguna, khususnya mahasiswa, untuk mencatat, mengelola, dan melacak progres tugas.

Repositori ini merupakan hasil *fork* dan pengembangan lanjutan dari [cassidoo/todometer](https://github.com/cassidoo/todometer), dengan penambahan pipeline CI/CD serta pengemasan dalam container Docker.

---

## Develop by Kelompok 13 – PSO B

- Viqi Alvianto - 5026221001
- Muhammad Fauzan – 5026221080
- Adithya Eka Pramudita – 5026221164
- Achmad Fahmi Ainur Ridho – 5026221167

---

## Deskripsi Proyek
Aplikasi ini adalah sebuah To-Do List yang dirancang untuk membantu pengguna mengelola pekerjaan harian. Fitur utamanya meliputi:
- Manajemen Tugas: Menambah, menyelesaikan, dan menghapus tugas.
- Timer Pomodoro: Timer terintegrasi untuk membantu fokus saat mengerjakan tugas.

## 🛠️ Tools & Teknologi

### 💻 Development
- Electron (Desktop App)
- HTML / CSS / JavaScript

### 🐳 Containerization & Pipeline
- Docker
- GitHub Actions (CI/CD)
- Vitest (Unit Testing)
- Trivy (Vulnerability Scanning)

### ☁️ Deployment & Infrastructure
- Terraform
- AWS EC2
- DockerHub

---

## Alur Kerja

### Diagram Alur Kerja Sederhana
Developer 
    |
    |-- (Push ke 'dev' branch) --> GitHub
                                    |
                                    |--> [CI PIPELINE] 
                                    |    1. ESLint Check
                                    |    2. Unit Tests (Vitest)
                                    |    3. Build Docker Image
                                    |    4. Scan Image (Trivy)
                                    |    5. Push Image to Docker Hub
                                    |
    |-- (Merge 'dev' ke 'main') --> GitHub
                                    |
                                    |--> [CD PIPELINE] 
                                    |    1. Pull Image from Docker Hub
                                    |    2. SSH to AWS EC2
                                    |    3. Deploy Container
                                    |
                                    V
                              AWS EC2 Instance 

### CI/CD Workflow
Setiap perubahan pada branch main akan secara otomatis:

1. Build dan push Docker image ke DockerHub
2. Menjalankan unit tests di dalam container
3. Provisioning infrastruktur cloud (via Terraform)
4. Deploy image terbaru ke cloud VM (via SSH ke EC2)

### 1. Pipeline CI (Continuous Integration) - ci.yml
Pipeline ini bertugas untuk memastikan setiap perubahan kode pada dev branch memiliki kualitas yang baik, aman, dan siap untuk diintegrasikan.

Trigger: Setiap push atau pull_request ke branch dev.

Jobs:
- Linting (lint): Menjalankan ESLint untuk memeriksa konsistensi gaya kode dan mendeteksi potensi masalah. Plugin eslint-plugin-security juga digunakan untuk SAST (Static Application Security Testing) sederhana.
- Unit Testing (unit-test): Menjalankan pengujian unit menggunakan Vitest untuk memverifikasi fungsionalitas komponen aplikasi (misalnya, penambahan item, interaksi UI). Job ini bergantung pada keberhasilan job lint.
- Build Docker Image (build): Jika testing berhasil, job ini akan membangun aplikasi React dan mengemasnya ke dalam sebuah Docker image menggunakan Dockerfile. Image ini diberi tag viexxx/kelompok13:latest.
- Scan Docker Image (scan): Menggunakan Trivy untuk memindai kerentanan (vulnerabilities) pada Docker image yang baru saja dibuat, baik pada level OS maupun dependensi aplikasi. Job ini hanya akan melaporkan kerentanan HIGH dan CRITICAL.
- Push to Docker Hub: Setelah build dan scan selesai, image diunggah ke Docker Hub agar siap digunakan untuk deployment.

### 2. Pipeline CD (Continuous Deployment) - cd.yml
Pipeline ini bertugas untuk men-deploy versi terbaru aplikasi ke server production (AWS EC2) secara otomatis.

Trigger: Setiap push ke branch main.

Jobs:
- Configure AWS Credentials: Mengautentikasi GitHub Actions agar dapat berinteraksi dengan layanan AWS.
- Pull Docker Image: Mengunduh image viexxx/kelompok13:latest dari Docker Hub ke runner GitHub Actions.
- Deploy to EC2:
- Membuat koneksi SSH ke instance AWS EC2 menggunakan private key yang disimpan di GitHub Secrets.
- Menjalankan serangkaian perintah di dalam server EC2:
- docker pull viexxx/kelompok13:latest: Memastikan server memiliki image terbaru.
- docker rm -f devops-pso-container || true: Menghentikan dan menghapus kontainer lama (jika ada).
- docker run -d -p 3000:3000 ...: Menjalankan kontainer baru dari image yang telah di-pull, dan memetakan port 3000 dari kontainer ke port 3000 di host EC2.

### 3. Pipeline IaC (Infrastructure as Code) - terraform.yml
Pipeline ini digunakan untuk provisi dan manajemen infrastruktur di AWS secara otomatis menggunakan Terraform.

Trigger: Setiap push ke branch infra.

Tujuan: Membuat atau memperbarui infrastruktur yang diperlukan untuk aplikasi, yaitu:
- AWS EC2 Instance: Sebuah server virtual t2.micro untuk hosting aplikasi.
- Security Group: Aturan firewall yang mengizinkan trafik masuk pada port 22 (SSH) dan 3000 (HTTP).

Jobs:
- Setup Terraform: Menginisialisasi Terraform di runner.
- Terraform Plan: Menampilkan rencana perubahan infrastruktur tanpa menerapkannya.
- Terraform Apply: Menerapkan perubahan yang direncanakan untuk membuat atau memperbarui sumber daya di AWS.


### Semua proses ini dikelola oleh GitHub Actions dalam folder .github/workflows/


## Menjalankan Proyek Secara Lokal
Ikuti langkah-langkah berikut untuk menjalankan aplikasi di lingkungan pengembangan lokal Anda.

Prasyarat
- Node.js (v20 atau lebih baru)
- npm (biasanya terinstal bersama Node.js)

Langkah-langkah:
1. Clone Repository:
```bash
git clone https://github.com/PSO-B-Kelompok-13/demo-repository.git
```

2. Masuk ke direktori proyek and install dependencies:
```bash
cd demo-repository && npm install
```

3. Jalankan aplikasi:
```bash
npm run dev
```

## 🔐 Konfigurasi dan Secrets
Untuk mereplikasi pipeline CI/CD, Anda perlu mengkonfigurasi secrets berikut di repository GitHub Anda (Settings > Secrets and variables > Actions):
- AWS_ACCESS_KEY_ID: Kunci akses AWS IAM.
- AWS_SECRET_ACCESS_KEY: Kunci rahasia AWS IAM.
- DOCKER_USERNAME: Username Docker Hub Anda.
- DOCKER_PASSWORD: Password atau Access Token Docker Hub.
- EC2_INSTANCE_PUBLIC_DNS: Alamat DNS publik dari instance EC2 Anda.
- SSH_PRIVATE_KEY: Kunci privat SSH (.pem) untuk mengakses instance EC2.
