# WanderLust - Travel Listing Platform

A full-stack travel listing web application where users can discover destinations, create listings, and share reviews. Built with Node.js and MongoDB, featuring user authentication, image uploads, and responsive design.

## Live Demo

🌐 **[View Live App](https://wanderlust-your-app.onrender.com)**

## Features

- Browse travel listings with search and pagination
- User authentication (signup, login, logout)
- Create, edit, and delete listings
- Upload images with Cloudinary integration
- Review and rating system
- Responsive mobile-friendly design
- Form validation and error handling

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Frontend:** EJS, Bootstrap 5, JavaScript  
**Authentication:** Passport.js  
**File Storage:** Cloudinary  
**Deployment:** Render

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret_key
   ```

4. **Start the application**
   ```bash
   npm start
   # or for development
   nodemon app.js
   ```

5. **Access the app**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
wanderlust/
├── models/          # Database models (User, Listing, Review)
├── routes/          # Route handlers
├── views/           # EJS templates
├── public/          # Static assets (CSS, JS, images)
├── app.js           # Application entry point
└── package.json     # Dependencies and scripts
```

## Deployment

The app is deployed on Render. For your own deployment:

1. Connect your GitHub repository to Render
2. Add environment variables in the Render dashboard
3. Use the following start command: `node app.js`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
