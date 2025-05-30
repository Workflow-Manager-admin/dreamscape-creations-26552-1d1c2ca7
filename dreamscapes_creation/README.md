# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## AI Art Generation Integration

DreamScape Creations now features real surreal art generation using the OpenAI DALL·E API!

### How It Works

- When you choose "Generate Art" and enter your dream, your prompt will be sent to OpenAI's DALL·E API to create a custom unique image.
- Story generation remains local, template-driven for instant creative text output.

### Requirements (for Art Generation)

- You **must** provide an OpenAI API key (with DALL·E access enabled).
- Set the API key in your local environment as:

  ```sh
  # In your shell or in a .env file at the project root:
  export REACT_APP_OPENAI_API_KEY=sk-...your-openai-key...
  ```
  For Create React App: if using a `.env` file, name it `.env` **(not** `.env.local`) and ensure the var is prefixed with `REACT_APP_`.

- The API integration uses [axios](https://github.com/axios/axios) for async HTTP requests.

- If you do not set an API key, "Generate Art" will show a helpful message and not generate actual images.

### OpenAI DALL·E Developer Access

- [OpenAI API documentation](https://platform.openai.com/docs/guides/images/usage)
- Sign up for an account at [https://platform.openai.com/signup](https://platform.openai.com/signup)
- Generate or view your secret key in the API dashboard.

---

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
