# Viora Admin Dashboard

A responsive web dashboard for managing **Viora Cosmetic** and the Viora mobile app. Shop admins use it to manage products across multiple brands, process customer orders, monitor sales in real time, and send notifications to customers.

> Companion project: [**Viora App**](https://github.com/mulyalubis/viora-app), the mobile shopping app used by customers.

## Features

- **Multi-brand product management**: create, read, update, and delete products, organized by brand
- **Order processing**: view incoming orders from the mobile app and update their status
- **Real-time sales monitoring**: sales data updates live without refreshing the page
- **Notification management**: create and manage notifications sent to app users
- **Responsive layout**: works on desktop and tablet screens

## Tech Stack

| Area | Technology |
| --- | --- |
| UI library | React |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Backend and real-time data | Convex |

## Screenshots

<!-- Replace with your own screenshots, e.g. put images in public/screenshots/ -->

| Dashboard | Product management | Orders |
| --- | --- | --- |
| ![Dashboard](https://res.cloudinary.com/he0pd9rd/image/upload/v1789783004/Screenshot_2026-08-07_215345_o4ougn.png) | ![Products](https://res.cloudinary.com/he0pd9rd/image/upload/v1789783004/Screenshot_2026-08-07_220018_l3r0vr.png) | ![Orders](https://res.cloudinary.com/he0pd9rd/image/upload/v1789783003/Screenshot_2026-08-07_220054_nbebo2.png) |

## Project Structure

```
public/    Static assets
src/       Application source code (pages, components, and logic)
utils/     Utility functions
```

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- Access to the Convex deployment used by Viora App

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/mulyalubis/dashboard-viora.git
   cd dashboard-viora
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the project root:

   ```env
   VITE_CONVEX_URL=your_convex_deployment_url
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

   Then open the local address shown in the terminal.

### Production build

```bash
npm run build
npm run preview
```

## Roadmap

- [ ] Sales reports and export
- [ ] Role-based access for multiple admins
- [ ] Dark mode

## Author

**Mulya Yustisio Lubis**
[GitHub](https://github.com/mulyalubis) · [LinkedIn](https://www.linkedin.com/in/mulyalubis)