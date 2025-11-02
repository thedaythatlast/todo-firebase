# React App

This project was created using the **React** framework with **Vite** as the build tool.  
It uses **Tailwind CSS** for utility-first styling and **Material UI (MUI)** for modern, responsive UI components.

## Tech Stack

- ⚛️ **React** — Frontend framework  
- ⚡ **Vite** — Fast development and build tool  
- 🎨 **Tailwind CSS** — Utility-first CSS framework  
- 🧩 **Material UI (MUI)** — React UI component library  

(This repository includes Firebase integration, codes which include sensitive information have been censored - if you build this you have to modify the codes for your own Firebase and Google Cloud. For the buildable version without Firebase, check out https://github.com/thedaythatlast/todo)

## Getting Started

1. Install dependencies:
  bash
  npm install

2. Run the development server:
  npm run dev

3. Build for production:
  npm run build

# Pre-building prerequisite

Add the following credential.tsx file in the folder ./src/ and modify it accordingly:
'''
// go to your Firebase project => project settings => copy the info of the firebaseConfig and paste here 
export const firebaseConfig = {
  apiKey: "<censored>",
  authDomain: "<censored>",
  databaseURL: "<censored>",
  projectId: "<censored>",
  storageBucket: "<censored>",
  messagingSenderId: "<censored>",
  appId: "<censored>",
  measurementId: "<censored>"
};

// get the client_id from Google Cloud's Clients -> OAuth 2.0 Client IDs -> Client ID of the authenticator
export const CLIENT_ID = "<censored>"
'''

## Deployment

https://todo-b088e.web.app/

## Bugs:

- Sign-in button may not show up immediately, unless page is reloaded.