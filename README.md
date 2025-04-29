# Question Bank Management System

This project is a comprehensive Question Bank Management System that allows for efficient management of questions with different types, difficulties, and categories.

## Project Structure

```
.
├── CRUD-APP/                 # Web application for CRUD operations
│   ├── frontend/            # Frontend components
│   ├── backend/             # Backend server code
│   ├── js/                  # JavaScript files
│   ├── css/                 # CSS styles
│   └── node_modules/        # Node.js dependencies
│
├── DATA/                    # Raw data files
│   └── ...                 # Question data files
│
├── EDITS-LOCALLY/          # Local data editing scripts
│   └── ...                 # Scripts for local data manipulation
│
├── FIREBASE-OPERATIONS/    # Firebase data operations
│   ├── Insert-code1.ipynb  # Jupyter notebook for data insertion
│   └── question_schema.py  # Question schema definition
│
└── .git/                   # Git version control
```

## Directory Roles

### CRUD-APP

- Contains the main web application
- Provides a user interface for managing questions
- Implements CRUD (Create, Read, Update, Delete) operations
- Connects to Firebase for data storage

### DATA

- Stores raw question data files
- Contains the source data for questions
- Used as input for data processing scripts

### EDITS-LOCALLY

- Contains scripts for local data editing
- Used for preprocessing and formatting data
- Helps prepare data for Firebase upload

### FIREBASE-OPERATIONS

- Contains scripts for Firebase operations
- Handles data upload to Firebase
- Manages data schema and validation
- Includes Jupyter notebooks for data processing

## Data Flow

1. Raw data is stored in the `DATA` directory
2. Data is processed and formatted using scripts in `EDITS-LOCALLY`
3. Processed data is uploaded to Firebase using `FIREBASE-OPERATIONS`
4. The web application in `CRUD-APP` provides interface for managing the data

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
    },
..,
..,
..
  ]
}
```
