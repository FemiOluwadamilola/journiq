# Journiq API Documentation

**Project:** Journiq — AI-Powered Photo Memory Mapping & Animation Platform
**Version:** 1.0
**Stack:** Node.js (Express) • MongoDB • Google Drive API • Mapbox • EJS (Frontend) • TensorFlow\.js (AI Animation - future module)

---

## 📘 Overview

**Journiq** is a web-based application that connects with your Google Drive (and potentially iCloud), fetches and analyzes your stored photos, extracts geolocation (EXIF GPS) data, and visualizes your memories on an interactive map. It also allows you to generate animations using AI (future module). Every photo tells a Journey.
---


## 🧭 System Design Flow

### 1. **User Authentication**

* **OAuth 2.0 with Google** to access user's Drive
* **Endpoint:** `GET /auth/google`

  * Redirects to Google Consent Screen
* **Callback:** `GET /auth/google/callback`

  * Exchanges auth code for `access_token`
  * Stores user session and tokens in MongoDB

### 2. **Photo Sync from Google Drive**

* **Trigger:** User logs in or clicks "Sync Photos"
* **Endpoint:** `POST /api/photos/sync`
* **Process:**

  1. Uses user's `accessToken` to query Google Drive API
  2. Lists all non-trashed images (`mimeType contains 'image/'`)
  3. For each image:

     * Extracts: ID, name, thumbnail, created time, links
     * Downloads image stream to extract GPS coordinates (EXIF)
     * Saves or updates in MongoDB
* **Model:** `Photo`

  ```js
  {
    userId,
    fileId,
    name,
    createdTime,
    thumbnailLink,
    webViewLink,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  }
  ```

### 3. **Memory Map Rendering**

* **Endpoint:** `GET /memory-map`
* **Flow:**

  * Fetches all photos with geolocation for the logged-in user
  * Renders them on a map (Mapbox) via EJS frontend
  * Popups show thumbnails, names, and links to full photo

### 4. **Photo Timeline View (Optional)**

* **Endpoint:** `GET /timeline`
* **Flow:**

  * Groups user photos by `createdTime`
  * Displays a scrollable timeline of memories

### 5. **AI Animation (Planned)**

* **Endpoint:** `POST /api/animation/generate`
* **Flow:**

  * Takes selected photos
  * Sends them to TensorFlow\.js or Python backend for animation generation
  * Returns a downloadable or streamable animation clip

---

## 📁 API Endpoints Summary

### Auth

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/auth/google`          | Start Google OAuth            |
| GET    | `/auth/google/callback` | Complete OAuth & store tokens |
| GET    | `/logout`               | End user session              |

### Photo Sync & Management

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| POST   | `/api/photos/sync` | Sync user photos from Google Drive |
| GET    | `/api/photos`      | List all user photos (paginated)   |
| GET    | `/api/photos/:id`  | Get a specific photo detail        |

### Memory Map

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| GET    | `/memory-map`     | Render map with photo markers      |
| GET    | `/api/photos/map` | Return photos with GPS only (JSON) |

### AI Animation (Planned)

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| POST   | `/api/animation/generate` | Create animation from selected photos |

---

## 🧱 Data Models

### User

```js
{
  _id,
  googleId,
  name,
  email,
  accessToken,
  refreshToken,
  createdAt
}
```

### Photo

```js
{
  _id,
  userId,
  fileId,
  name,
  mimeType,
  createdTime,
  thumbnailLink,
  webViewLink,
  location: {
    type: 'Point',
    coordinates: [lng, lat]
  },
  createdAt,
  updatedAt
}
```

---

## 🗂 Folder Structure (Backend)

```
journiq/
├── models/
│   └── userModel.js
│   └── photoModel.js
├── routes/
│   └── authRoutes.js
│   └── photoRoutes.js
├── controllers/
│   └── authController.js
│   └── photoController.js
├── services/
│   └── googleDriveService.js
│   └── exifService.js
├── views/
│   └── memory-map.ejs
├── public/
│   └── js/
├── app.js
└── .env
```

---

## 🧠 Future Plans

* iCloud Photos support (via Apple APIs)
* AI photo summarization
* Voice-tagged memories
* Video memory timelines
* Offline export options (PDF, MP4)

---

## 🚀 Deployment Tips

* Use Google Cloud, Vercel, or Render
* Use MongoDB Atlas
* Protect Google credentials in `.env`
* Set up HTTPS and secure cookies

---

## 🧪 Testing

* Use Postman to test `/api/photos/sync`
* Use mock EXIF images for local dev
* Test map rendering with 5–10 photos first

---

## 📞 Support & Contributions

Contact: `founder@journiq.app` (or your dev email)
Contributions: PRs welcome on [GitHub repo](https://github.com/your-org/journiq)

---

## 🌍 Live Demo (Coming Soon)

URL: `https://journiq.app`

---

Built with ❤️ to help you **map and relive your memories**.
