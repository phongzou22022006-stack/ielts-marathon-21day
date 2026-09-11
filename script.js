// IELTS Marathon 21-Day Platform - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Rhythm selector functionality
    const rhythmSelect = document.getElementById('rhythm');
    if (rhythmSelect) {
        rhythmSelect.addEventListener('change', function() {
            updateDailyTasks(this.value);
        });
    }
    
    // Timer functionality for modules
    initTimers();
    
    // Audio recorder simulation
    initAudioRecorder();
    
    // Evidence logger interactions
    initEvidenceLogger();
    
    // Writing module functionality
    initWritingModule();
    
    // Speaking module functionality
    initSpeakingModule();
    
    // Phrase bank functionality
    initPhraseBank();
    
    // Error tracker functionality
    initErrorTracker();
    
    // 21-day tracker functionality
    initDayTracker();
});

function initApp() {
    // Set current day indicator (example: day 3)
    const currentDay = 3;
    updateDayIndicator(currentDay);
    
    // Initialize streak counter (example: 12 days)
    updateStreakCounter(12);
}

function updateDayIndicator(day) {
    // Update day indicator in roadmap
    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach(el => {
        el.classList.remove('active', 'completed', 'in-progress');
        const dayNum = parseInt(el.textContent);
        if (dayNum === day) {
            el.classList.add('in-progress');
        } else if (dayNum < day) {
            el.classList.add('completed');
        }
    });
    
    // Update daily banner (example)
    const bannerTitle = document.querySelector('.daily-banner h1');
    if (bannerTitle) {
        bannerTitle.textContent = `DAY ${day.toString().padStart(2, '0')}: Evidence-Based Reading & Logical Argument`;
    }
}

function updateStreakCounter(days) {
    const streakElement = document.querySelector('.streak');
    if (streakElement) {
        streakElement.textContent = `🔥 ${days} Days`;
    }
}

function updateDailyTasks(minutes) {
    // This would filter/show different tasks based on selected time
    console.log(`Daily rhythm set to ${minutes} minutes`);
    // In a real app, this would show/hide or modify task cards
}

function initTimers() {
    // Initialize timers for different modules
    const timers = document.querySelectorAll('.timer');
    timers.forEach(timer => {
        // Set initial time (example: 20 minutes for reading)
        timer.textContent = '⏱️ 20:00';
    });
}

function initAudioRecorder() {
    const recordBtn = document.querySelector('.audio-recorder .record');
    const stopBtn = document.querySelector('.audio-recorder .stop');
    const timer = document.querySelector('.audio-recorder .timer');
    const waveform = document.querySelector('.waveform');
    
    let isRecording = false;
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    
    if (recordBtn && stopBtn && timer) {
        recordBtn.addEventListener('click', startRecording);
        stopBtn.addEventListener('click', stopRecording);
    }
    
    function startRecording() {
        if (isRecording) return;
        
        isRecording = true;
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        startTime = Date.now() - elapsedTime;
        
        // Start waveform animation
        waveform.style.opacity = '1';
        
        timerInterval = setInterval(updateTimer, 100);
    }
    
    function stopRecording() {
        if (!isRecording) return;
        
        isRecording = false;
        recordBtn.disabled = false;
        stopBtn.disabled = true;
        
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        
        // Stop waveform animation
        waveform.style.opacity = '0.5';
        
        updateTimer();
    }
    
    function updateTimer() {
        const timeElapsed = isRecording ? Date.now() - startTime : elapsedTime;
        const totalSeconds = Math.floor(timeElapsed / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function initEvidenceLogger() {
    const evidenceForm = document.querySelector('.evidence-logger');
    if (!evidenceForm) return;
    
    // Add interactivity to evidence logger
    const locationInput = evidenceForm.querySelector('input[placeholder="Para. 3, Sentence 2"]');
    const paraphraseTextarea = evidenceForm.querySelector('textarea');
    const confidenceSpans = evidenceForm.querySelectorAll('.rating span');
    const trapSelect = evidenceForm.querySelector('select');
    
    // Confidence rating
    confidenceSpans.forEach((span, index) => {
        span.addEventListener('click', function() {
            confidenceSpans.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
    
    // Form submission simulation
    evidenceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Evidence logged:', {
            location: locationInput.value,
            paraphrase: paraphraseTextarea.value,
            confidence: document.querySelector('.rating span.active')?.textContent || '0',
            trap: trapSelect.value
        });
        
        // Show success feedback
        alert('Evidence logged successfully!');
        evidenceForm.reset();
        confidenceSpans.forEach(span => span.classList.remove('active'));
    });
}

function initWritingModule() {
    const rewriteBtn = document.querySelector('.editor-toolbar button');
    const essayEditor = document.querySelector('.essay-editor');
    const wordCountSpan = document.querySelector('.editor-toolbar span');
    
    if (rewriteBtn && essayEditor) {
        rewriteBtn.addEventListener('click', function() {
            // Simulate rewrite version functionality
            const currentText = essayEditor.value;
            if (currentText.trim()) {
                alert('Rewrite version created! Current text saved as draft 1.');
                // In a real app, this would show version history
            } else {
                alert('Please write something first!');
            }
        });
    }
    
    // Word count functionality
    if (essayEditor && wordCountSpan) {
        essayEditor.addEventListener('input', function() {
            const wordCount = essayEditor.value.trim() ? 
                essayEditor.value.trim().split(/\s+/).length : 0;
            wordCountSpan.textContent = `Words: ${wordCount}/250`;
            
            // Change color if over limit
            if (wordCount > 250) {
                wordCountSpan.style.color = '#EF4444';
            } else {
                wordCountSpan.style.color = '#6B7280';
            }
        });
    }
}

function initSpeakingModule() {
    const transcript = document.querySelector('.transcript p');
    if (!transcript) return;
    
    // Add click-to-tag functionality for transcript
    transcript.addEventListener('click', function(e) {
        // Get selection or clicked word
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const word = range.toString().trim();
            
            if (word) {
                // Simple tagging demo - in reality would be more sophisticated
                const tagTypes = ['pause', 'repetition', 'vague', 'grammar', 'unnatural', 'missing'];
                const randomTag = tagTypes[Math.floor(Math.random() * tagTypes.length)];
                
                // Create mark element
                const mark = document.createElement('mark');
                mark.className = `tag ${randomTag}`;
                mark.textContent = word;
                
                // Replace selection with marked text
                range.deleteContents();
                range.insertNode(mark);
                
                // Clear selection
                selection.removeAllRanges();
                
                console.log(`Tagged "${word}" as ${randomTag}`);
            }
        }
    });
}

function initPhraseBank() {
    const phraseForm = document.querySelector('.phrase-form');
    if (!phraseForm) return;
    
    phraseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const phraseInput = phraseForm.querySelector('input[placeholder="e.g., in recent years"]');
        const meaningInput = phraseForm.querySelector('input[placeholder="gần đây"]');
        const patternInput = phraseForm.querySelector('input[placeholder="in + [adjective] + years"]');
        const contextInput = phraseForm.querySelector('input[placeholder="Academic writing"]');
        const exampleInput = phraseForm.querySelector('input[placeholder="In recent years, technology has..."]');
        const registerSelect = phraseForm.querySelector('select');
        
        if (phraseInput.value && meaningInput.value) {
            // Create phrase item
            const phraseList = document.querySelector('.phrase-list');
            const phraseItem = document.createElement('div');
            phraseItem.className = 'phrase-item';
            phraseItem.innerHTML = `
                <span class="phrase">${phraseInput.value}</span>
                <span class="meaning">${meaningInput.value}</span>
                <span class="register">${registerSelect.value}</span>
            `;
            
            phraseList.appendChild(phraseItem);
            
            // Clear form
            phraseForm.reset();
            
            console.log('Phrase added to bank:', {
                phrase: phraseInput.value,
                meaning: meaningInput.value,
                pattern: patternInput.value,
                context: contextInput.value,
                example: exampleInput.value,
                register: registerSelect.value
            });
        } else {
            alert('Please enter both phrase and meaning!');
        }
    });
}

function initErrorTracker() {
    const errorTable = document.querySelector('.error-table tbody');
    const addErrorBtn = document.querySelector('.error-tracker-card .btn-block');
    
    if (addErrorBtn) {
        addErrorBtn.addEventListener('click', function() {
            // Show modal or form to add new error
            const errorType = prompt('Error Type (Reading/Writing/Speaking/Vocabulary/Grammar):');
            const description = prompt('Error Description:');
            const priority = prompt('Priority (High/Medium/Low):');
            
            if (errorType && description && priority) {
                // Add to table
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${errorType}</td>
                    <td>${description}</td>
                    <td><span class="priority ${priority.toLowerCase()}">${priority}</span></td>
                    <td><button class="btn-sm">Review</button></td>
                `;
                
                errorTable.appendChild(newRow);
                
                console.log('New error added:', { errorType, description, priority });
            }
        });
    }
    
    // Add review button functionality
    errorTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-sm')) {
            const row = e.target.closest('tr');
            const errorType = row.cells[0].textContent;
            const description = row.cells[1].textContent;
            
            alert(`Reviewing ${errorType} error:\n${description}\n\nPlease practice this specific error type.`);
        }
    });
}

function initDayTracker() {
    const trackerTable = document.querySelector('.tracker-table tbody');
    if (!trackerTable) return;
    
    // Make days clickable to update status
    trackerTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('status')) {
            const cell = e.target;
            const row = cell.closest('tr');
            const dayCell = row.cells[0];
            const dayNum = dayCell.textContent;
            
            // Cycle through statuses: pending → in-progress → completed → pending
            let currentStatus = cell.textContent.trim();
            let newStatus = '○'; // pending
            
            if (currentStatus === '○') {
                newStatus = '⟳'; // in-progress
            } else if (currentStatus === '⟳') {
                newStatus = '✓'; // completed
            }
            
            cell.textContent = newStatus;
            cell.className = `status ${newStatus === '✓' ? 'completed' : newStatus === '⟳' ? 'in-progress' : 'pending'}`;
            
            // If marking as completed, prompt for biggest error
            if (newStatus === '✓') {
                const biggestError = prompt(`Day ${dayNum}: What was your biggest error today?`);
                if (biggestError !== null && biggestError !== '') {
                    const errorCell = row.cells[3];
                    errorCell.textContent = biggestError;
                    
                    // Set re-test date (7 days later as example)
                    const reTestCell = row.cells[4];
                    const futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + 7);
                    reTestCell.textContent = futureDate.getDate().toString().padStart(2, '0');
                }
            }
            
            console.log(`Day ${dayNum} status updated to: ${newStatus}`);
        }
    });
}

// Utility function to format numbers with leading zeros
function padNumber(num, length) {
    return String(num).padStart(length, '0');
}