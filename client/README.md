# Query Tracker Frontend 🛸

A premium cyber-themed ticketing and query management system built with high-performance modern web technologies.

## 🚀 Technology Stack
- **Framework:** [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **API Client:** [Axios](https://axios-http.com/) with secure interceptors
- **Notifications:** [React-Toastify](https://fslightbox.com/react) with custom premium branding
- **Icons:** [React Icons (Feather)](https://react-icons.github.io/react-icons/)

## 🛰️ Navigation & Routes

| Route | Protocol | Security | Description |
| :--- | :--- | :--- | :--- |
| `/` | Landing | Public | Introduction to the system mission and features. |
| `/user/login` | Login | Public | Secure authentication portal. |
| `/user/register` | Register | Public | Operator registration and network entry. |
| `/user/home` | Home | Auth | Real-time operational console with stats and live feeds. |
| `/user/createTicket` | Ticket Gen | Auth | Secure transmission protocol for initializing new queries. |
| `/user/getTickets` | Dashboard | Auth | Global mission logs for viewing, editing, and solving queries. |
| `/admin/panel` | Admin Panel | Admin | Level 0 Command Center for user and network management. |

## ✨ Core Features
- **Global Transparency:** All operators can view existing queries to prevent redundant reports.
- **Collaborative Solving:** Any operator can contribute solutions to any query, empowering the entire network.
- **Role-Based Workflows:** Contextual buttons and controls that adjust based on user ownership and admin privileges.
- **Matrix-Rain UI:** High-end dark theme aesthetics with dynamic background effects and lemon accents.
- **Premium Notifications:** Custom-styled high-contrast toast notifications for system feedback.

## 🛠️ Installation & Setup
1. `npm install`
2. Configure base URL in `src/utils/axiosInterceptor.js`
3. `npm run dev`
