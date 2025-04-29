# Question Bank Manager Web Application

This is the web application component of the Question Bank Management System, providing a user interface for managing questions in Firebase.

## Project Structure

```
CRUD-APP/
├── frontend/            # Frontend components
│   ├── index.html      # Main HTML file
│   ├── js/             # JavaScript files
│   │   ├── app.js      # Main application logic
│   │   └── config.js   # Firebase configuration
│   └── css/            # CSS styles
│       └── styles.css  # Custom styles
│
├── backend/            # Backend server code
│   └── server.js      # Express server
│
├── node_modules/       # Node.js dependencies
├── package.json        # Project configuration
└── serviceAccountKey2.json  # Firebase service account key
```

## Features

- View all questions in a table format
- Add new questions through form or JSON input
- Edit existing questions
- Delete questions
- Filter questions by difficulty
- Search questions
- Dark mode support

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Firebase project with Firestore database

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Update `js/config.js` with your Firebase project credentials
   - Ensure `serviceAccountKey2.json` is properly configured

3. Start the server:
```bash
npm start
```

4. Access the application:
   - Open your web browser
   - Navigate to `http://localhost:8001`

## Usage

### Adding Questions
1. Click "Add Question" for form-based input
2. Click "Add as JSON" for JSON-based input
3. Fill in the required fields
4. Click Save

### Editing Questions
1. Click the edit button (pencil icon) next to a question
2. Modify the fields
3. Click Save

### Deleting Questions
1. Click the delete button (trash icon) next to a question
2. Confirm the deletion

### Filtering and Searching
- Use the difficulty dropdown to filter by difficulty level
- Use the search box to search through questions

## Question Schema

Each question follows this structure:
```json
{
  "id": "M.3.17.S.1",
  "type": "MCQuestion",
  "text": "Question text",
  "is_latex": false,
  "is_image": false,
  "image_url": null,
  "latex_string": null,
  "xp": 1,
  "tag": "Tag info",
  "difficulty": "EASY",
  "topic": "Topic name",
  "chapter": "Chapter name",
  "option_list": [
    {
      "is_image": false,
      "is_latex": false,
      "text": "Option text",
      "latex_string": null,
      "image_url": null,
      "is_correct": false
    }
  ]
}
```

## Troubleshooting

1. If the application doesn't start:
   - Check if port 8001 is available
   - Verify Node.js and npm are installed correctly
   - Check the console for error messages

2. If Firebase connection fails:
   - Verify Firebase credentials in config.js
   - Check internet connection
   - Ensure Firebase project is properly set up

3. If questions don't appear:
   - Check Firebase Firestore database
   - Verify network connection
   - Check browser console for errors 