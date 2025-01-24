# User Management App

## Prerequisites

Before running the application locally, ensure you have the following installed:

1. **Node.js (>=14.x)**  
   Download and install Node.js from [here](https://nodejs.org/).

2. **npm or Yarn**  
   npm is included with Node.js. Alternatively, you can install Yarn:  
   ```bash
   npm install --global yarn

## Setup Instructions
Follow these instructions to run the project locally.

1. Install dependencies
    ```
      npm install
    ```

2. Run the project
    ```
    npm start
    ```
 This will start the Frontend application 5173 port and two mock backends in 3001 & 3002 ports.

3. Access local url
     ```
     http://localhost:5173
     ```

## Build and deployment

1. Build the project
```
   npm run build
```
  This will create build in  ```\dist ``` Folder.

2. Deployment
 Project can be deployed using any prefeered CI/CD pipelines such as AWS Codepileine, Vercel etc.

## Key Features

1. Dashboard with Cards and Graphs
2. Users table with Add/Edit/Delete features
3. Mobile responsive menu bar
4. Dark mode enable feature

## Code Quality
Below are the practices and tools used to ensure the code is reliable, readable, and maintainable:

### 1. Using TypeScript
The project is built using TypeScript, which ensures type safety, reduces runtime errors, and improves code readability and maintainability.

### 2. Linting
This project uses ESLint to enforce consistent code styles and prevent bugs caused by common coding mistakes.

### 3. Common Components
The project follows a component-driven development approach, promoting reusability and modularity.
All reusable UI elements are created as common components (e.g., buttons, modals, input fields) and stored in the components/ directory.

### 4.  Separation of Logic
#### Component Logic: 
Components focus solely on UI rendering and user interactions. Logic related to the presentation or state management within the component is handled locally.
#### API Logic: 
All API calls and backend interactions are centralized in a dedicated services/ directory. 

## Technologies Used for Front End

1. **Build Tool** - [Vite](https://vitejs.dev/)  
2. **Language** - [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)  
3. **UI Library** - [Material-UI (MUI)](https://mui.com/)  
4. **Styling** - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) with [Styled-Components](https://styled-components.com/)  
5. **Graphs** - [Airbnb/Visx](https://airbnb.io/visx/)  
6. **Grid** - [Ag-Grid](https://www.ag-grid.com/)  
7. **Form Validation** - [Formik](https://formik.org/) with [Yup](https://github.com/jquense/yup)  
8. **Unit Testing** - [Vitest](https://vitest.dev/)  
9. **Code Editor** - [Visual Studio Code (VS Code)](https://code.visualstudio.com/)  

## Testing

1. Run unit tests 
````
npm run test
````
2.Runs tests in development mode
```
npm run test-quick
```

## Mocking API response

In order to mock the API response data , two mock servers have been used.

1. /users API (running on port ```3001```)
 This one is a JSON-SEREVR enabled mock API which is giving users table related data
 It exposes GET,POST,PUT,DELETE methods.

2. /stats API (running on port ```3002```)
This one is a Node JS Express API which gives dashboard stats.

Both of these API enpoints will start concurrently with ```npm start```
```
"json-server": "json-server --watch db.json --port 3001",
"stats-server": "node server.js",
"start": "concurrently \"npm run json-server\" \"npm run stats-server\" vite",
```




