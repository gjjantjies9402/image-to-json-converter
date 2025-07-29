# Image to JSON Converter - React Application

## Overview

This React application allows users to upload an image file and convert it into a JSON object containing:
- Base64-encoded image data
- MIME content type
- Customizable caption text

The resulting JSON can be downloaded for use in your applications or APIs.

## Features

- **Image Upload**: Select any image file (JPG, PNG, GIF, etc.)
- **Live Preview**: See the uploaded image before conversion
- **Custom Caption**: Edit the default caption text
- **JSON Download**: Get a properly formatted JSON file
- **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/image-to-json-converter.git
   ```

2. Navigate to the project directory:
   ```bash
   cd image-to-json-converter
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser to:
   ```
   http://localhost:3000
   ```

## Usage

1. Click "Choose Image" to select an image file
2. (Optional) Edit the caption in the text area
3. Click "Download JSON" to save the JSON file
4. The downloaded file will contain:
   ```json
   {
     "bytes": "iVBORw0KGgoAAAANSUhEUgAA...",
     "mimeContentType": "image/png",
     "caption": "Your custom caption"
   }
   ```

## Technical Details

- **Frontend**: React.js with functional components and hooks
- **Image Processing**: Uses FileReader API and base64 encoding
- **State Management**: React useState hook
- **Styling**: CSS with responsive design

## Dependencies

- React 18+
- React DOM
- Standard React scripts (create-react-app)

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app (not recommended)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Screenshot

![App Screenshot](screenshot.png)

---

**Note**: For production use, consider adding:
- File size limitations
- Error handling for unsupported file types
- Loading indicators
- More comprehensive testing
