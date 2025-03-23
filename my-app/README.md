# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## How to set up environment 
1. In the main directory (my-app) make sure to install python@3.11. Run: **brew install python@3.11** in terminal (the reason is because the open source ZBar works best with python 3.11 and older models) and then install zbar by typing: **brew install zbar**. Next install: **npm install concurrently --save-dev**(to allow multiple commands to run at the same time)
3. Go the backend directory (cd backend) and then type: **npm install axios** in the terminal
4. Go into the camera_server direectory inside the backend (if already in backend directory, type: **cd camera_server**) type in terminal: **cd backend/camera_server** if in main directory (my-app)
5. Once inside camera_server, type in terminal: **python3.11 -m venv venv**
6. Type in terminal: **source venv/bin/activate**
7. Type in terminal: **pip install pyzbar flask opencv-python requests** (this will install the dependencies needed for the project to run)
8. You can test if zbar, pyzbar is working by typing in the terminal: **python -c "from pyzbar import pyzbar; print('ZBar is working!')"**
9. **IMPORTANT**: make sure you change the python interpreter to the venv environment you create on your local device!!!
  - in the camera_server directory, in terminal type either: **which python3** or **which python** (either one should work depending on which python is downloaded to local device)
  - ^step above should output a link similar to: /Users/computerName/path/..., copy this link into the python interpreter 
  - click on the camera_test.py file and access interpreter settings, click on edit path and paste the link
  - the interpreter path should now be of the venv environment
9. Now go to the root directory (my-app) and type in the terminal: **npm run start:all** and it should be set


