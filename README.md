🏨 ExpoHotel

A full-stack mobile hotel booking application built with **React Native + Expo**, featuring authentication, session persistence, and integration with backend and payment services.

----------------------------------------------------------------------------------------------------------------------------------

📌 Overview:

**ExpoHotel** is a mobile application that allows users to:

* Create and authenticate accounts
* Browse hotels and rooms
* Make reservations with specific dates
* Maintain persistent login sessions
* Interact with real-time data

The project follows a modern architecture using **Expo Router (file-based routing)** and integrates external services.

----------------------------------------------------------------------------------------------------------------------------------

🚀 Features:

🔐 Authentication

* User sign up and login
* Unique user identification
* Session persistence using AsyncStorage

🏨 Hotels & Rooms

* Hotel listing
* Room browsing by hotel

📅 Bookings

* Date selection
* Reservation creation
* Database storage

💳 Payments

* Stripe integration (ready for implementation)

----------------------------------------------------------------------------------------------------------------------------------

🛠️ Tech Stack:

📱 Mobile

* React Native
* Expo
* Expo Router (file-based routing)

⚙️ Backend

* Supabase (BaaS)

💳 Payments

* Stripe

📦 Libraries

* React Hook Form
* Zod
* Zustand
* React Native Paper
* Day.js

----------------------------------------------------------------------------------------------------------------------------------

🧱 Project Structure:

```id="proj02"
/app            # Routes (Expo Router)
/src
  /components
  /services
  /hooks
  /store
  /utils
```

----------------------------------------------------------------------------------------------------------------------------------

🔐 Environment Variables:

Create a `.env` file in the root directory:

```env id="env03"
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

⚠️ Never commit this file.

----------------------------------------------------------------------------------------------------------------------------------

⚙️ Installation and Setup:

### Prerequisites

* Node.js
* npm or yarn
* Expo CLI

---

### 1. Install dependencies

```bash id="cmd21"
npm install
```

---

### 2. Configure environment

Create the `.env` file as described above before running the project.

---

### 3. Start the project

```bash id="cmd22"
npx expo start
```

---

### ▶️ Run on different platforms

While running, you can open the app in:

* Android Emulator
* iOS Simulator
* Expo Go
* Web browser

Or directly via:

```bash id="cmd23"
npm run android
npm run ios
npm run web
```

----------------------------------------------------------------------------------------------------------------------------------

🧭 Development:

This project uses **file-based routing** with Expo Router.

Start developing by editing files inside:

```id="dev02"
/app
```

----------------------------------------------------------------------------------------------------------------------------------

🔄 Reset Project (optional):

To generate a clean project structure:

```bash id="cmd24"
npm run reset-project
```

This moves the existing code to `app-example` and recreates a fresh `/app` directory.

----------------------------------------------------------------------------------------------------------------------------------

🗄️ Database:

Supabase is used for:

* Authentication
* Data storage
* Booking management

### Main entities:

* users
* hotels
* rooms
* bookings

----------------------------------------------------------------------------------------------------------------------------------

🔄 Application Flow:

1. User signs up or logs in
2. Session is persisted locally
3. User browses hotels
4. Selects a room
5. Chooses dates
6. Creates a booking
7. Data is stored in Supabase

----------------------------------------------------------------------------------------------------------------------------------

📚 Useful Resources:

* https://docs.expo.dev/
* https://docs.expo.dev/router/introduction/
* https://supabase.com/docs
* https://stripe.com/docs

----------------------------------------------------------------------------------------------------------------------------------

📄 License:

MIT

----------------------------------------------------------------------------------------------------------------------------------

👨‍💻 Author:

Gabriel Carlos Rigo Agostinho
