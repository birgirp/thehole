Template for webdev at decode

# Folder structure

Split into client and server

## Client

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3066](http://localhost:3066) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Creates a new build of the client

## Server

### `npm start`

Starts *BOTH* the server (using nodemon, so no manual reloading necessary after server-side changes)
and the client app in development mode, as parallel processes.

### `node server`

Starts a production server that serves the latest build