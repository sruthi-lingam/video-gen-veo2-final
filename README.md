# Veo 2 AI Video Generation App
Author: Sruthi Lingam

Last Updated: July 10, 2025

This is a fully interactive web app built to demonstrate how users, specifically children visiting Discovery Place, can generate short AI videos using **Google’s Vertex AI Veo 2 model**. Designed with an iPad interface in mind, the app offers a fun and simple user experience that invites creativity through both text and drawn image prompts.

---

## Target Use Case

This app was designed as a prototype for a video generation exhibit at the Discovery Place kids museum. When visitors approach the iPad station, they can:
- View example videos
- Get prompt inspiration
- Create their own AI-generated video using text or a drawing
- Learn fun facts about AI while they wait

---

## Features Overview

### Welcome Screen
Introduces the app and gives two main options:
- **Create Your Own Video**
- **View Previously Generated Videos**

### Video Gallery
Displays several pre-generated videos with titles and descriptions for inspiration. Users can play and browse any video.

### I Need Ideas
If the user doesn't know what to create:
- Click **"I Need Ideas"**
- View 3 auto-generated prompt suggestions
- Click any one to select it and generate a video
- Refresh for new ideas if none are interesting

### Create Your Video
User can type their own prompt, e.g.:
> “A time traveler steps into the Jurassic jungle, surrounded by dinosaurs”

The prompt is submitted and the video begins generating.

### Draw My Video
Instead of typing, users can also draw using a built-in canvas:
- Choose a color or use the eraser
- Submit the picture to turn it into a video
- Image is uploaded and sent to Veo 2 for generation

### Generating Screen
While waiting (~45 seconds), the screen cycles through fun AI facts to keep kids entertained and educated.

### Watch the Final Video
Once ready, the user is redirected to the video player to watch their custom-generated creation.

---

## Tech Stack

### Frontend
- React + TypeScript
- React Router
- HTML Canvas API
- Inline styles + responsive layout

### Backend
- Node.js + Express
- Python scripts for Veo 2 API calls
- Google Cloud Storage (GCS) for images + video access

---

## How to Run the App

> Before running, make sure you have Python 3, Node.js, and Google Cloud credentials set up locally.

### Start the Backend Server
```bash
cd veo-server
node server.js
```

### Start the Frontend
Open a new terminal tab or window and:
```bash
cd ..
npm install     # Only needed the first time
npm run dev
```
### Requirements
Node.js v16+
Python 3.10+
Access to Google Cloud Project with Vertex AI enabled
GOOGLE_APPLICATION_CREDENTIALS environment variable set
