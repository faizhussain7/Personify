# Personify

A full-stack mobile application built with **React Native**, **Expo**, and **.NET Core Web API** to manage a database of persons with full CRUD functionality.

---

## Project Overview

Personify is a full-stack project developed to demonstrate a mobile application with a frontend built using **React Native** and **Expo**, and a backend powered by a **.NET Core Web API**. The app interacts with a database of persons, enabling users to perform **Create, Read, Update, and Delete (CRUD)** operations via a clean and modern UI.

---

## Tech Stack

### Frontend
- **React Native**: Framework for building the mobile application.
- **Expo**: Platform for developing and deploying the app.
- **TanStack Query**: For efficient data fetching, caching, and state management.
- **Gorhom Bottom Sheet**: For interactive bottom sheet components.
- **Expo API Routes**: For handling API interactions.
- **NativeWind**: Tailwind CSS-inspired styling for React Native.

### Backend
- **.NET Core Web API**: RESTful API for handling CRUD operations.
- **Database**: A custom database (`persons`) to store person-related data.

---

## Features
- Full **CRUD** functionality for managing persons.
- Responsive and modern UI with bottom sheet navigation.
- Efficient data fetching and caching with TanStack Query.
- Seamless integration between the Expo frontend and .NET Core backend.

---

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Expo CLI**: `npm install -g expo-cli`, discover Expo at https://docs.expo.dev/
- **.NET SDK** (for the backend, version compatible with your .NET Core Web API)
- A code editor like **VS Code**
- A mobile device or emulator (e.g., iOS Simulator, Android Emulator) or the **Expo Go** app for testing.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/personify.git
cd personify
```

Install dependencies:
```bash
npm install
```

Initialize and Start the Expo development server:
```bash
npx expo start
```

- Scan the QR code with the **Expo Go** app on your mobile device or use an emulator.
- For iOS emulator: Press `i` in the terminal.
- For Android emulator: Press `a` in the terminal.

---

## Available Expo Commands
- Start the development server:
  ```bash
  npx expo start
  ```
- Build the app for production (Android/iOS):
  ```bash
  npx expo run:android
  npx expo run:ios
  ```
- Clear the cache and restart the server:
  ```bash
  npx expo start --clear
  ```
- Install a specific dependency:
  ```bash
  npx expo install <package-name>
  ```
---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## Contact
For questions or feedback, reach out to [mfaizhussain7@gmail.com](mailto:mfaizhussain7@gmail.com) or open an issue on the repository.

---
