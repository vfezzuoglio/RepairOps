# RepairOps

A full-stack repair shop management platform built with ASP.NET Core, React, and React Native.

## Overview

RepairOps helps repair shops manage their workflow from intake to completion. Sales reps create repair tickets on a tablet, technicians update status and add notes from a web dashboard, and admins manage pricing, users, and view revenue reports.

## Tech Stack

- **Backend:** ASP.NET Core 9, Entity Framework Core, MySQL
- **Web App:** React + Vite
- **Mobile App:** React Native + Expo
- **Auth:** JWT with role-based access control
- **DevOps:** Docker + Docker Compose

## User Roles

| Role | Access |
|------|--------|
| Admin | Full access including user management, pricing, reports |
| Technician | View queue, update status, add notes, manage services |
| SalesRep | Create repair tickets, search customers |

## Getting Started

### Prerequisites
- Docker Desktop
- Node.js v18+
- Expo Go (on mobile device for React Native)

### Running the Backend

```bash
# Clone the repo
git clone https://github.com/vfezzuoglio/RepairOps.git
cd RepairOps

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start backend + database
docker-compose up
```

API will be available at `http://localhost:5045`

### Running the Web App

```bash
cd RepairOps.Web
npm install
npm run dev
```

Web app will be available at `http://localhost:5173`

### Running the Mobile App

```bash
cd RepairOps.Mobile
npm install
npx expo start --tunnel
```

Scan the QR code with Expo Go on your Android device.

## Features

### Repair Tickets
- Create tickets with customer and device info
- Track status through the repair lifecycle
- Add technician notes
- Attach services and generate customer quotes

### Inventory
- Track parts with low stock alerts
- Log inventory transactions
- Deduct parts when used on repairs

### Admin Panel
- Manage users and roles
- Create and manage service price list by device model
- View revenue reports broken down by sales rep

## API Endpoints

| Module | Base URL |
|--------|----------|
| Auth | `/api/auth` |
| Customers | `/api/customer` |
| Devices | `/api/device` |
| Repair Tickets | `/api/repairticket` |
| Inventory | `/api/inventory` |
| Service Prices | `/api/serviceprice` |
| Ticket Services | `/api/ticketservice` |
| Users | `/api/user` |

## Environment Variables

Create a `.env` file in the root with: