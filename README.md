# CodeCollab

A real-time collaborative coding platform where multiple users can join rooms, write code together, chat, and execute JavaScript code.

## Project Overview

CodeCollab allows developers to collaborate in real time through shared coding rooms. Users can join rooms, edit code simultaneously, communicate through chat, and execute JavaScript code directly from the browser.

The project demonstrates real-time communication using Socket.IO, frontend development with React, backend development with Node.js and Express, and database integration using MongoDB.

## Features

### Room Management

* Create collaboration rooms
* Join existing rooms
* Work with room-specific code sessions

### Real-Time Code Collaboration

* Multiple users can edit code simultaneously
* Changes are synchronized instantly using Socket.IO
* Room-based code sharing

### Code Editor

* Monaco Editor integration
* Syntax highlighting
* VS Code-like editing experience

### Real-Time Chat

* Communicate with other users in the same room
* Instant message delivery using Socket.IO

### Code Execution

* Execute JavaScript code directly from the browser
* View output inside the application

### Database Integration

* Store room information using MongoDB
* Persistent room management

## System Architecture

The application follows a client-server architecture.

```text
+-------------+
|    User     |
+-------------+
       |
       v
+-------------+
| React Client|
+-------------+
       |
       | REST API + Socket.IO
       v
+------------------+
| Node.js Backend  |
| Express Server   |
+------------------+
       |
       v
+-------------+
|  MongoDB    |
+-------------+
```

### Frontend

The frontend is built using React and Vite. It provides:

* Room management interface
* Monaco code editor
* Real-time chat interface
* Code execution controls

### Backend

The backend is built using Node.js, Express, and Socket.IO. It is responsible for:

* Managing rooms
* Handling real-time communication
* Processing code execution requests
* Interacting with MongoDB

### Database

MongoDB stores room information and supports persistent room management.

## Project Structure

```text
CODECOLLAB
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── Chat.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   └── package.json
│
├── server
│   ├── index.js
│   └── package.json
│
└── README.md
```

### Folder Responsibilities

#### client/

Contains the React frontend application.

#### client/src/components/

Reusable UI components used throughout the application.

#### Chat.jsx

Handles real-time messaging between users in a room.

#### Editor.jsx

Provides the Monaco code editor and code execution functionality.

#### Sidebar.jsx

Manages room creation, room listing, and room selection.

#### Navbar.jsx

Displays the application's navigation interface.

#### server/

Contains the backend application.

#### index.js

Main server entry point responsible for:

* Express server setup
* Socket.IO configuration
* MongoDB connection
* Room APIs
* Code execution APIs

#### README.md

Project documentation and setup guide.

## Installation and Setup

### Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas account
* Git

### Clone the Repository

```bash
git clone <repository-url>
cd CODECOLLAB
```

### Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

### Backend Setup

Open a new terminal.

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node index.js
```

The backend will run on:

```text
http://localhost:5000
```

### Database Setup

Create a MongoDB Atlas cluster and obtain the connection string.

Update the MongoDB connection string inside:

```text
server/index.js
```

Start the backend again after updating the connection string.
