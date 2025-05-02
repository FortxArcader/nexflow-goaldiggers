# Team Goal Diggers - NexFlow

## Project Title: NexFlow - AI-Powered Workflow Manager

### Problem Statement

Managing multiple developer tools and platforms can be time-consuming and inefficient. Developers often switch between various tools like GitHub, Jira, and Postman, which disrupts their workflow and reduces productivity. NexFlow addresses this problem by integrating these tools into a unified platform powered by AI, enabling seamless task automation and management.

### Tech Stack

- **Frontend**: React, TypeScript, Three.js
- **Backend**: Node.js, Express, OpenAI API, MCP Servers
- **Deployment**: Vercel
- **Other Tools**: Axios, dotenv, nodemon

### Setup Instructions

Follow these steps to set up and run NexFlow on your local machine:

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Veyrax API key and OpenAI API key (for backend functionality)

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FortxArcader/nexflow-goaldiggers.git
   cd nexflow-goaldiggers
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```
   VEYRAX_API_KEY=your_veyrax_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

#### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd ../frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

### Deployment

The application is deployed and accessible at: [NexFlow Deployment](https://nexflow-deployment.vercel.app/)


### Team Members

- **Mudit Garg**
- **Shlok Bhardwaj**
- **Kairav Mittal**
- **Saisha Goel**

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request.
