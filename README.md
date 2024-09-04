# CliniQ360 - Entropy

**Tech Stack**

- **Frontend:** React
- **Backend:** Python
- **AI Engine:** OpenAI GPT
- **Agentic Framework:** AutoGen

## Deployment Steps

To run the application, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone <git_repo_path>
   ```

2. **Navigate to Frontend Folder**

   ```
   cd frontend
   ```

3. **Update BACKEND_API_PATH url**

   a. Locate .env.dev file and update the "BACKEND_API_PATH" to your local IP address.

4. **Install npm packages**

   ```
   npm install
   ```

5. **Run Frontend**

   ```
   npm run dev
   ```

6. **Update OPEN_API_KEY**
   Create env file under "backend/core" and update

   ```
   OPENAI_API_KEY=<your_openai_key>
   ```

7. **Build Backend**
   ```
   sh build_all.sh
   ```
