# ⚡ Performance Dashboard — Real-Time Data Visualization (Next.js 14 + TypeScript)

This project is a **high-performance real-time dashboard** built using **Next.js 14 (App Router)**, **React**, and **TypeScript**.  
It’s designed to render and update **10,000+ data points at 60 frames per second** using a **Canvas + React hybrid** rendering approach.

---

## 🚀 Features

- **Real-time updates** — new data arrives every 100ms  
- **Multiple chart types** — Line, Bar, Scatter, Heatmap  
- **Canvas rendering** for high-speed performance  
- **Virtual scrolling** for large data tables  
- **Zoom, pan, and filtering** interactions  
- **Responsive design** for desktop, tablet, and mobile  
- **Web Workers (optional)** for background data processing  
- **Performance monitor** for FPS & memory tracking  

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Rendering | HTML Canvas + React |
| State Management | React Hooks + Context API |
| Styling | Tailwind CSS |
| Deployment | Vercel or Node.js server |

---

## 🧠 Performance Highlights

- Maintains **60fps** rendering with 10,000+ data points  
- Uses **`requestAnimationFrame`** for smooth chart updates  
- **OffscreenCanvas + double buffering** for flicker-free rendering  
- **Memoized hooks** to avoid unnecessary re-renders  
- **Concurrent React features** like `useTransition` for fluid UI  
- **Memory-efficient** — stable usage over long runs

---

## 🧰 Setup & Run

```bash
# Clone the repository
git clone https://github.com/your-username/performance-dashboard.git
cd performance-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000/dashboard
<img width="1762" height="850" alt="image" src="https://github.com/user-attachments/assets/ac344cbd-a07d-42a4-a920-4d9c4bae24a5" />

<img width="1770" height="835" alt="image" src="https://github.com/user-attachments/assets/80392220-b07f-44a5-a91b-6779388ecd6f" />

<img width="1752" height="829" alt="image" src="https://github.com/user-attachments/assets/75a7f24e-017a-4ed3-b63e-0978bc44e9a3" />


