# Dashie - A Simplified CMS

## Overview

Dashie is an easy-to-use client management software built with React, TypeScript, Node.js/Express.js, and MongoDB. It enables users to track clients, projects, and handle payments all through one dynamic dashboard.

### User Profile

- Freelancers or business owners who:

### Features

**User Authentication**: Secure user registration and login system
**Data Visualization**: Interactive charts and graphs for data presentation
**MongoDB Integration**: Flexible document-based data storage
**Responsive Design**: Looks as intended on all popular devices
**Client Management**: CRUD operations for users to create a book of business
**Project Tracking**: Keep track of upcoming, past, and current projects and their status
**Payment Integration**: Handle payments with clients through Stripe integration
**AI Pricing**: Uses AI to generate recommended pricing and send out customized quotes
**Career Tracker**: Visualize career related income and expenses over time

<!-- ### User Profile

- Formula 1 Fans:
  - Who have an interest in learning more
  - Who want to see more live stats when watching a race
  - Who want a reliable site which allows them to follow the sport
  - Who like the idea of having a profile with custom data tracking, as well as a custom theme.

### Features

- As a user, I want to be able to login to my account and view my custom profile page
- As a user, I want to be able to customize what I see on my profile page
- As a user, I want to be able to follow a race weekend live during all the sessions
- As a user, I want to be able to pick a team and have it's theme applied to the website
- As a user, I want to be able to view a list of all current drivers and sort by various stats
- As a user, I want to be able to view a list of all current teams and sort by various stats
- As a user, I want to be able to see the race details each weekend (e.g. tire allocation, track temperatures, weather predictions, etc.)
- As a user, I want to be able to follow a race session live while also seeing stats that the broadcast doesn't show
- As a user, I want to be able to follow the current season race by race and see how the championships have progressed over time -->

### Tech Stack

**Frontend**:

- React
- TypeScript
- Sass

  **Backend**:

- Node.js
- Express.js
- TypeScript

  **Database**:

- MongoDB Atlas

  **Authentication**:

- JWT-based authentication
- OAuth2 implementation with Google

  **CI/CD**:

- GitHub Actions for automated testing and deployment
- Docker for containerized deployment

<!-- ### APIs

- OpenF1
  - LIVE data
  - Updated every 4s
- Ergast, rapidAPI(API-FORMULA-1, F1 Motorsport Data)
  - Statistical data -->

<!-- ### Sitemap

- Welcome
  - Hero Section
  - Log In + Sign Up Forms (also displayed in the fixed header)
- Profile Page
  - Custom theme of selected team
  - Chosen data and trackers fill predefined slots
- This Year Page
  - List of all the races
  - Driver & Team standings
  - Championship progression line graphs
- Race Weekend Page
  - Trackers and data for current race weekend
  - Graphic of the current race track
  - All Sessions will have their own view so you can follow practice, qualifying, and the race -->

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account

### Installation

**1. Clone the repository**

```
git clone https://github.com/nickdoucette24/dashie-v1.git
cd dashie-v1
```

**2. Set up environment variables**

```
cp .env.example .env
```

**3. Install dependencies**

```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**4. Run database migrations**

```
cd ../server
npm run migrate
```

**5. Start the development servers**

```
# Terminal 1 - Start the server
cd server
npm run dev

# Terminal 2 - Start the client
cd client
npm run dev
```

**6. Open your web browser and navigate to**
_http://localhost:3000_

## Project Structure

dashie-v1/
├── .github/ # GitHub Actions workflows
├── client/ # React frontend
│ ├── public/ # Static assets
│ ├── src/ # React components and logic
│ └── package.json # Frontend dependencies
├── server/ # Express backend
│ ├── src/ # API routes, controllers, models, etc.
│ └── package.json # Backend dependencies
└── .env # Environment variables

## API Documentation

### Authentication

**POST /api/auth/register** - Register a new user
**POST /api/auth/login** - Login a use

<!-- **GET /api/auth/profile** - Get a user profile -->

### Users

**GET /api/users** - Get all users (admin only)
**GET /api/users/:id** - Get user by ID
**PUT /api/users/:id** - Update user by ID
**DELETE /api/users/:id** - Delete user by ID

## Deployment

The application uses GitHub Actions for CI/CD. When code is pushed to the main branch, it automatically:

1. Runs tests
2. Builds the application
3. Creates a database backup
4. Deploys to the production environment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-new-feature`
3. Commit your changes `git commit -m "Add commit details here"`
4. Push to the branch `git push origin feature/your-new-feature`
5. Submit a pull request!

## Acknowledgements

- MongoDB Atlas for database hosting
- React Query for data fetching
- Chart.js for data visualization

<!-- ## Nice-to-haves -->
