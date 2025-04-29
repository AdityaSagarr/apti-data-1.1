// Category and subcategory mappings
const categories = {
    1: "Arithmetic and Number Theory",
    2: "Algebra",
    3: "Time, Work and Speed",
    4: "Geometry and Mensuration",
    5: "Logical Reasoning",
    6: "Probability and Combinatorics",
    7: "Financial Mathematics"
};

const subcategories = {
    1: "Number System",
    2: "HCF and LCM",
    3: "Decimal Fractions",
    4: "Simplification",
    5: "Square and Cube Roots",
    6: "Average",
    7: "Problems on Numbers",
    8: "Problems on Ages",
    9: "Surds and Indices",
    10: "Logarithms",
    11: "Percentage",
    12: "Profit and Loss",
    13: "Ratio and Proportion",
    14: "Partnership",
    15: "Chain Rule",
    16: "Pipes and Cisterns",
    17: "Time and Work",
    18: "Time and Distance",
    19: "Boats and Streams",
    20: "Problems on Trains",
    21: "Alligation and Mixture",
    22: "Simple Interest",
    23: "Compound Interest",
    24: "Area",
    25: "Volume and Surface Area",
    26: "Races and Games",
    27: "Calendar",
    28: "Clocks",
    29: "Stocks and Shares",
    30: "Permutations and Combinations",
    31: "Probability",
    32: "True Discount",
    33: "Bankers Discount",
    34: "Heights and Distances",
    35: "Odd Man Out and Series"
};

// Topic and Chapter data
const topicsAndChapters = {
    "Arithmetic and Number Theory": [
        "Number System",
        "HCF and LCM",
        "Decimal Fractions",
        "Simplification",
        "Square and Cube Roots",
        "Average",
        "Surds and Indices",
        "Logarithms"
    ],
    "Algebra": [
        "Percentage",
        "Profit and Loss",
        "Ratio and Proportion",
        "Partnership",
        "Chain Rule",
        "Problems on Numbers",
        "Problems on Ages"
    ],
    "Time, Work and Speed": [
        "Pipes and Cisterns",
        "Time and Work",
        "Time and Distance",
        "Boats and Streams",
        "Problems on Trains"
    ],
    "Geometry and Mensuration": [
        "Area",
        "Volume and Surface Area",
        "Heights and Distances"
    ],
    "Logical Reasoning": [
        "Races and Games",
        "Calendar",
        "Clocks",
        "Odd Man Out and Series"
    ],
    "Probability and Combinatorics": [
        "Permutations and Combinations",
        "Probability"
    ],
    "Financial Mathematics": [
        "Alligation and Mixture",
        "Simple Interest",
        "Compound Interest",
        "Stocks and Shares",
        "True Discount",
        "Bankers Discount"
    ]
};

// Search functionality
let allQuestions = []; // Store all questions for filtering

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    populateCategoryDropdowns();
    loadQuestions();
    setupEventListeners();
});

// Populate category and subcategory dropdowns
function populateCategoryDropdowns() {
    const categorySelect = document.getElementById('category');
    const categoryFilter = document.getElementById('categoryFilter');
    const subcategorySelect = document.getElementById('subcategory');
    const subcategoryFilter = document.getElementById('subcategoryFilter');

    // Add categories to both dropdowns
    Object.entries(categories).forEach(([id, name]) => {
        const option = new Option(name, id);
        const filterOption = new Option(name, id);
        categorySelect.add(option);
        categoryFilter.add(filterOption);
    });

    // Add subcategories to both dropdowns
    Object.entries(subcategories).forEach(([id, name]) => {
        const option = new Option(name, id);
        const filterOption = new Option(name, id);
        subcategorySelect.add(option);
        subcategoryFilter.add(filterOption);
    });

    // Add change event listeners for category-subcategory relationship
    categorySelect.addEventListener('change', updateSubcategoryOptions);
    categoryFilter.addEventListener('change', updateSubcategoryFilterOptions);
}

// Update subcategory options based on selected category
function updateSubcategoryOptions() {
    const categoryId = document.getElementById('category').value;
    const subcategorySelect = document.getElementById('subcategory');
    
    // Clear existing options
    subcategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
    
    // Add relevant subcategories
    Object.entries(subcategories).forEach(([id, name]) => {
        if (categoryId) {
            const option = new Option(name, id);
            subcategorySelect.add(option);
        }
    });
}

// Update subcategory filter options based on selected category
function updateSubcategoryFilterOptions() {
    const categoryId = document.getElementById('categoryFilter').value;
    const subcategoryFilter = document.getElementById('subcategoryFilter');
    
    // Clear existing options
    subcategoryFilter.innerHTML = '<option value="">All Subcategories</option>';
    
    // Add relevant subcategories
    Object.entries(subcategories).forEach(([id, name]) => {
        if (categoryId) {
            const option = new Option(name, id);
            subcategoryFilter.add(option);
        }
    });
}

// Setup event listeners for filters
function setupEventListeners() {
    document.getElementById('categoryFilter').addEventListener('change', loadQuestions);
    document.getElementById('subcategoryFilter').addEventListener('change', loadQuestions);
    document.getElementById('difficultyFilter').addEventListener('change', loadQuestions);
    document.getElementById('searchInput').addEventListener('input', loadQuestions);
}

// Load questions from our API
function loadQuestions() {
    fetch('http://localhost:8001/api/questions')
        .then(response => response.json())
        .then(questions => {
            allQuestions = questions; // Store all questions
            filterQuestions(); // Apply any existing filters
        })
        .catch(error => {
            console.error('Error loading questions:', error);
            alert('Failed to load questions. Please check the console for details.');
        });
}

function filterQuestions() {
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredQuestions = allQuestions.filter(question => {
        // Apply difficulty filter
        if (difficultyFilter && question.difficulty !== difficultyFilter) {
            return false;
        }
        
        // Apply search text filter
        if (searchText) {
            return (
                (question.id && question.id.toLowerCase().includes(searchText)) ||
                (question.text && question.text.toLowerCase().includes(searchText)) ||
                (question.topic && question.topic.toLowerCase().includes(searchText)) ||
                (question.chapter && question.chapter.toLowerCase().includes(searchText)) ||
                (question.tag && question.tag.toLowerCase().includes(searchText))
            );
        }
        
        return true;
    });
    
    displayQuestions(filteredQuestions);
}

function displayQuestions(questions) {
    const questionsTableBody = document.getElementById('questionsTableBody');
    questionsTableBody.innerHTML = '';

    questions.forEach(question => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${question.id || ''}</td>
            <td>${question.type || ''}</td>
            <td>${question.text || ''}</td>
            <td>${question.topic || ''}</td>
            <td>${question.chapter || ''}</td>
            <td>${question.tag || ''}</td>
            <td>${question.difficulty || ''}</td>
            <td>${question.xp || ''}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2" onclick="editQuestion('${question.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteQuestion('${question.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        questionsTableBody.appendChild(row);
    });
}

// Add event listeners for search and filter
document.getElementById('searchInput').addEventListener('input', filterQuestions);
document.getElementById('difficultyFilter').addEventListener('change', filterQuestions);

// Add a new option to the question form
function addOption() {
    const optionsContainer = document.getElementById('optionsContainer');
    const optionCount = optionsContainer.children.length;
    
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item mb-2';
    optionDiv.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Option text" required>
            </div>
            <div class="col-md-2">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="optionLatex${optionCount}">
                    <label class="form-check-label" for="optionLatex${optionCount}">LaTeX</label>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="optionImage${optionCount}">
                    <label class="form-check-label" for="optionImage${optionCount}">Image</label>
                </div>
            </div>
            <div class="col-md-1">
                <div class="form-check">
                    <input class="form-check-input correct-option" type="radio" name="correctOption" id="correct${optionCount}">
                    <label class="form-check-label" for="correct${optionCount}">Correct</label>
                </div>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="row mt-2 option-latex-container" style="display: none;">
            <div class="col-12">
                <input type="text" class="form-control" placeholder="LaTeX string">
            </div>
        </div>
        <div class="row mt-2 option-image-container" style="display: none;">
            <div class="col-12">
                <input type="text" class="form-control" placeholder="Image URL">
            </div>
        </div>
    `;
    
    optionsContainer.appendChild(optionDiv);

    // Add event listeners for LaTeX and Image toggles
    const latexToggle = optionDiv.querySelector(`#optionLatex${optionCount}`);
    const imageToggle = optionDiv.querySelector(`#optionImage${optionCount}`);
    const latexContainer = optionDiv.querySelector('.option-latex-container');
    const imageContainer = optionDiv.querySelector('.option-image-container');

    latexToggle.addEventListener('change', () => {
        latexContainer.style.display = latexToggle.checked ? 'block' : 'none';
    });

    imageToggle.addEventListener('change', () => {
        imageContainer.style.display = imageToggle.checked ? 'block' : 'none';
    });
}

// Edit an existing question
function editQuestion(questionId) {
    fetch(`http://localhost:8001/api/questions/${questionId}`)
        .then(response => response.json())
        .then(question => {
            // Fill the form
            document.getElementById('questionId').value = questionId;
            document.getElementById('id').value = question.id;
            document.getElementById('type').value = question.type;
            document.getElementById('questionText').value = question.text;
            document.getElementById('isLatex').checked = question.is_latex;
            document.getElementById('isImage').checked = question.is_image;
            document.getElementById('latexString').value = question.latex_string || '';
            document.getElementById('imageUrl').value = question.image_url || '';
            document.getElementById('xp').value = question.xp;
            document.getElementById('tag').value = question.tag;
            document.getElementById('difficulty').value = question.difficulty;
            
            // Handle topic and chapter
            const topicSelect = document.getElementById('topic');
            const chapterSelect = document.getElementById('chapter');
            
            // Set topic and populate chapters
            topicSelect.value = question.topic;
            populateChapterDropdown(question.topic);
            
            // Set chapter after a small delay to ensure chapters are populated
            setTimeout(() => {
                chapterSelect.value = question.chapter;
            }, 100);
            
            // Show/hide LaTeX and Image containers
            document.getElementById('latexContainer').style.display = question.is_latex ? 'block' : 'none';
            document.getElementById('imageContainer').style.display = question.is_image ? 'block' : 'none';
            
            // Clear and add options
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.option_list.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item mb-2';
                optionDiv.innerHTML = `
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" value="${option.text}" required>
                        </div>
                        <div class="col-md-2">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="optionLatex${index}" ${option.is_latex ? 'checked' : ''}>
                                <label class="form-check-label" for="optionLatex${index}">LaTeX</label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="optionImage${index}" ${option.is_image ? 'checked' : ''}>
                                <label class="form-check-label" for="optionImage${index}">Image</label>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="form-check">
                                <input class="form-check-input correct-option" type="radio" name="correctOption" id="correct${index}" ${option.is_correct ? 'checked' : ''}>
                                <label class="form-check-label" for="correct${index}">Correct</label>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.parentElement.parentElement.remove()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row mt-2 option-latex-container" style="display: ${option.is_latex ? 'block' : 'none'}">
                        <div class="col-12">
                            <input type="text" class="form-control" value="${option.latex_string || ''}" placeholder="LaTeX string">
                        </div>
                    </div>
                    <div class="row mt-2 option-image-container" style="display: ${option.is_image ? 'block' : 'none'}">
                        <div class="col-12">
                            <input type="text" class="form-control" value="${option.image_url || ''}" placeholder="Image URL">
                        </div>
                    </div>
                `;
                optionsContainer.appendChild(optionDiv);

                // Add event listeners for LaTeX and Image toggles
                const latexToggle = optionDiv.querySelector(`#optionLatex${index}`);
                const imageToggle = optionDiv.querySelector(`#optionImage${index}`);
                const latexContainer = optionDiv.querySelector('.option-latex-container');
                const imageContainer = optionDiv.querySelector('.option-image-container');

                latexToggle.addEventListener('change', () => {
                    latexContainer.style.display = latexToggle.checked ? 'block' : 'none';
                });

                imageToggle.addEventListener('change', () => {
                    imageContainer.style.display = imageToggle.checked ? 'block' : 'none';
                });
            });
            
            // Show the modal
            document.getElementById('modalTitle').textContent = 'Edit Question';
            new bootstrap.Modal(document.getElementById('questionModal')).show();
        })
        .catch(error => {
            console.error('Error loading question:', error);
            alert('Failed to load question. Please check the console for details.');
        });
}

function showSuccessMessage(message) {
    const successAlert = document.getElementById('successAlert');
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message;
    successAlert.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 5000);
}

async function saveQuestion() {
    const questionData = {
        id: document.getElementById('id').value,
        type: document.getElementById('type').value,
        text: document.getElementById('questionText').value,
        is_latex: document.getElementById('isLatex').checked,
        is_image: document.getElementById('isImage').checked,
        image_url: document.getElementById('imageUrl').value || null,
        latex_string: document.getElementById('latexString').value || null,
        xp: parseInt(document.getElementById('xp').value),
        tag: document.getElementById('tag').value,
        difficulty: document.getElementById('difficulty').value,
        topic: document.getElementById('topic').value,
        chapter: document.getElementById('chapter').value,
        option_list: []
    };

    // Collect options
    const optionsContainer = document.getElementById('optionsContainer');
    const options = optionsContainer.getElementsByClassName('option-item');
    for (let option of options) {
        questionData.option_list.push({
            text: option.querySelector('.option-text').value,
            is_correct: option.querySelector('.is-correct').checked,
            is_latex: option.querySelector('.is-latex').checked,
            is_image: option.querySelector('.is-image').checked,
            latex_string: option.querySelector('.latex-string')?.value || null,
            image_url: option.querySelector('.image-url')?.value || null
        });
    }

    try {
        await db.collection('questions').doc(questionData.id).set(questionData);
        
        // Show success message
        showSuccessMessage(`Question "${questionData.id}" added successfully!`);
        
        // Close modal
        const questionModal = bootstrap.Modal.getInstance(document.getElementById('questionModal'));
        questionModal.hide();
        
        // Clear form
        document.getElementById('questionForm').reset();
        document.getElementById('optionsContainer').innerHTML = '';
        
        // Refresh questions table
        loadQuestions();
    } catch (error) {
        console.error('Error saving question:', error);
        alert('Error saving question: ' + error.message);
    }
}

// Delete a question
function deleteQuestion(questionId) {
    if (confirm('Are you sure you want to delete this question?')) {
        fetch(`http://localhost:8001/api/questions/${questionId}`, {
            method: 'DELETE'
        })
        .then(() => {
            loadQuestions();
        })
        .catch(error => {
            console.error('Error deleting question:', error);
            alert('Failed to delete question. Please check the console for details.');
        });
    }
}

// Reset form and show modal for new question
document.getElementById('questionModal').addEventListener('show.bs.modal', function (event) {
    // If the modal was triggered by the Add Question button
    if (!event.relatedTarget || event.relatedTarget.getAttribute('data-bs-target') === '#questionModal') {
        document.getElementById('modalTitle').textContent = 'Add New Question';
        document.getElementById('questionId').value = '';
        document.getElementById('questionForm').reset();
        document.getElementById('optionsContainer').innerHTML = '';
    }
});

// Add event listeners for LaTeX and Image toggles in the main form
document.getElementById('isLatex').addEventListener('change', function() {
    document.getElementById('latexContainer').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('isImage').addEventListener('change', function() {
    document.getElementById('imageContainer').style.display = this.checked ? 'block' : 'none';
});

// Populate topic dropdown
function populateTopicDropdown() {
    const topicSelect = document.getElementById('topic');
    topicSelect.innerHTML = '<option value="">Select Topic</option>';
    
    Object.keys(topicsAndChapters).forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

// Populate chapter dropdown based on selected topic
function populateChapterDropdown(selectedTopic) {
    const chapterSelect = document.getElementById('chapter');
    chapterSelect.innerHTML = '<option value="">Select Chapter</option>';
    
    if (selectedTopic && topicsAndChapters[selectedTopic]) {
        topicsAndChapters[selectedTopic].forEach(chapter => {
            const option = document.createElement('option');
            option.value = chapter;
            option.textContent = chapter;
            chapterSelect.appendChild(option);
        });
    }
}

// Add event listener for topic change
document.getElementById('topic').addEventListener('change', function() {
    populateChapterDropdown(this.value);
});

// Dark Mode Toggle Function
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode');
    const toggleButton = document.querySelector('.dark-mode-toggle');
    
    // Update button icon
    if (isDarkMode) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-toggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Initialize other components
    populateTopicDropdown();
    loadQuestions();
});

async function saveQuestionFromJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorDiv = document.getElementById('jsonError');
    
    try {
        // Parse and validate JSON
        const questionData = JSON.parse(jsonInput);
        
        // Validate required fields
        const requiredFields = ['id', 'type', 'text', 'xp', 'difficulty', 'topic', 'chapter'];
        for (const field of requiredFields) {
            if (!questionData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        
        // Validate option_list for MCQuestion
        if (questionData.type === 'MCQuestion' && (!questionData.option_list || !Array.isArray(questionData.option_list))) {
            throw new Error('MCQuestion must have an option_list array');
        }
        
        // Validate at least one correct option for MCQuestion
        if (questionData.type === 'MCQuestion') {
            const hasCorrectOption = questionData.option_list.some(option => option.is_correct);
            if (!hasCorrectOption) {
                throw new Error('MCQuestion must have at least one correct option');
            }
        }
        
        // Save to Firebase
        try {
            await db.collection('questions').doc(questionData.id).set(questionData);
            
            // Show success message
            showSuccessMessage(`Question "${questionData.id}" added successfully!`);
            
            // Close modal and refresh questions
            const jsonModal = bootstrap.Modal.getInstance(document.getElementById('jsonModal'));
            jsonModal.hide();
            
            // Clear input
            document.getElementById('jsonInput').value = '';
            errorDiv.style.display = 'none';
            
            // Refresh questions table
            loadQuestions();
            
        } catch (error) {
            console.error('Error saving question:', error);
            errorDiv.textContent = `Error saving question: ${error.message}`;
            errorDiv.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Invalid JSON:', error);
        errorDiv.textContent = `Invalid JSON: ${error.message}`;
        errorDiv.style.display = 'block';
    }
} 