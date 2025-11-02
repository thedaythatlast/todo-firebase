# React App

This project was created using the **React** framework with **Vite** as the build tool.  
It uses **Tailwind CSS** for utility-first styling and **Material UI (MUI)** for modern, responsive UI components.

## Tech Stack

- ⚛️ **React** — Frontend framework  
- ⚡ **Vite** — Fast development and build tool  
- 🎨 **Tailwind CSS** — Utility-first CSS framework  
- 🧩 **Material UI (MUI)** — React UI component library  

(This repository includes Firebase integration, codes which include sensitive information have been censored - if you build this you have to modify the codes for your own Firebase and Google Cloud. For the buildable version without Firebase, check out https://github.com/thedaythatlast/todo)

# Getting Started

1. Install dependencies:
  ```
  npm install
  ```

2. Run the development server:
  ```
  npm run dev
  ```

3. Build for production:
  ```
  npm run build
  ```

## Pre-building prerequisite

Add the file credential.tsx in your ./src/ folder with the following and modify them accordingly:
```
// go to your Firebase project => project settings => copy the info of the firebaseConfig and paste here 
export const firebaseConfig = {
  apiKey: "<insert_your_own_info>",
  authDomain: "<insert_your_own_info>",
  databaseURL: "<insert_your_own_info>",
  projectId: "<insert_your_own_info>",
  storageBucket: "<insert_your_own_info>",
  messagingSenderId: "<insert_your_own_info>",
  appId: "<insert_your_own_info>",
  measurementId: "<insert_your_own_info>"
};

// get the client_id from Google Cloud's Clients -> OAuth 2.0 Client IDs -> Client ID of the authenticator
export const CLIENT_ID = "<insert_your_own_info>"
```

## Deployment

https://todo-b088e.web.app/

## Bugs:

- Sign-in button may not show up immediately, unless page is reloaded.
