      // Define all the variables
        let playerScore = 0;
        let computerScore = 0;
        const playerprogress = document.querySelector("#playerprogress");
        const progressbar = document.querySelector("#progressbar");
        const computerprogress = document.querySelector("#computerprogress");
        const start = document.querySelector("#start");
        const choicesbar = document.querySelector("#player-choice");
        const resetButton = document.getElementById('draggableReset');
        const playerScoreElement = document.getElementById('player-score');
        const computerScoreElement = document.getElementById('computer-score');
        const playerDisplay = document.getElementById('player-display');
        const computerDisplay = document.getElementById('computer-display');
        const resultElement = document.getElementById('result');

      // The main function to play the game when any weapon is clicked
        function playGame(playerChoice, button) { 
            start.style.height = "1px";
            start.style.opacity = "0";
            const choices = ['✊', '🤚', '✌']; 
            const computerChoice = choices[Math.floor(Math.random() * 3)]; //A random choice to play

            // Update the in the screen displays
            playerDisplay.innerText = playerChoice;
            computerDisplay.innerText = computerChoice;

            // Determine the result
            let result = '';
            if (playerChoice === computerChoice) { // Tie
                result = "It's a tie!";
                choicesbar.classList.remove("lose", "win");
                choicesbar.classList.add("tie");
            } else if ( 
              // Win variations
                (playerChoice === '✊' && computerChoice === '✌') ||
                (playerChoice === '🤚' && computerChoice === '✊') ||
                (playerChoice === '✌' && computerChoice === '🤚')
            ) {
              // Win
                playerScore++;  // Increase the player score
                result = "You win!";
                choicesbar.classList.remove("tie", "lose");
                choicesbar.classList.add("win");
                playerDisplay.classList.add('pulse');
                setTimeout(() => {
                    playerDisplay.classList.remove('pulse');
                }, 900);
              
            } else { //Lose
                computerScore++; // Increase the computer score
                result = "You lose!";
                choicesbar.classList.remove("tie", "win");
                choicesbar.classList.add("lose");
                computerDisplay.classList.add('pulse');
                setTimeout(() => {
                    computerDisplay.classList.remove('pulse');
                }, 900);
            }

            // Update the scores
            playerScoreElement.innerText = `Your Score: ${playerScore}`;
            computerScoreElement.innerText = `Computer Score: ${computerScore}`;

            // Update the result element with the result message
            resultElement.innerText = result;

            // Update the progress bar
            updateProgress();

            // Create floating ghost animation
            createFloatingGhost(playerChoice, button);
        }

      // Floating animation for the weapons when they are clicked
        function createFloatingGhost(choice, button) {
            const ghost = document.createElement('div');
            ghost.classList.add('floating-ghost', 'ghost');
            ghost.innerText = choice;
            document.body.appendChild(ghost); // Show the 👻

          // Get the button and the display positions
            const buttonRect = button.getBoundingClientRect(); 
            const displayRect = playerDisplay.getBoundingClientRect();

          // Starting position
            ghost.style.left = `${buttonRect.left}px`;
            ghost.style.top = `${buttonRect.top}px`;
          
          // Go to the player display with a small deley
            setTimeout(() => {
                ghost.style.transform = `translate(${displayRect.left - buttonRect.left}px, ${displayRect.top - buttonRect.top}px)`;
                ghost.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                ghost.remove();
            }, 1050);
        }

        function updateProgress() {
            let progress = (100 * (playerScore / (computerScore + playerScore))).toFixed(1); // Get the percentages from the points in one number after "."
            if (isNaN(progress)) { // Replace "NaN" with 0 when the both side's score is 0
                progress = "0";
            }
            playerprogress.textContent = progress + "%";
            computerprogress.textContent = 100 - progress + "%";
            progressbar.style.width = `${progress}%`; // Show visualization of the persentage

          // Increase the font size to the side which is ahead
          if (progress > 50) {
                playerprogress.style.fontSize = "200%";
                computerprogress.style.fontSize = "100%";
            } else if (100 - progress > 50) {
                playerprogress.style.fontSize = "100%";
                computerprogress.style.fontSize = "200%";
            } else {
                playerprogress.style.fontSize = "200%";
                computerprogress.style.fontSize = "200%";
            }
        }

      // Adjust sizes based on the screen size
        function adjustSize() {
            if (window.innerHeight < 592) {
                start.style.height = "74vh";
            } else {
                start.style.height = "80vh";
            }
        }

        var isDragging = false;
        var wasDragged = false;

        // Function to update the position of the reset button
        function moveButton(event) {
            var newX = event.clientX || event.touches[0].clientX;
            var newY = event.clientY || event.touches[0].clientY;
            resetButton.style.left = newX - resetButton.offsetWidth / 2 + 'px';
            resetButton.style.top = newY - resetButton.offsetHeight / 2 + 'px';
        }

        // Mouse Events
        resetButton.addEventListener('mousedown', function(event) {
            isDragging = true;
            wasDragged = false;
        }, false);

        document.addEventListener('mousemove', function(event) {
            if (isDragging) {
                moveButton(event);
                wasDragged = true;
            }
        }, false);

        document.addEventListener('mouseup', function(event) {
            if (isDragging) {
                isDragging = false;
            }
        }, false);

        resetButton.addEventListener('click', function(event) {
            if (!wasDragged) {
                reset();
            }
        }, false);

        // Touch Events
        resetButton.addEventListener('touchstart', function(event) {
            isDragging = true;
            wasDragged = false;
        }, false);

        resetButton.addEventListener('touchmove', function(event) {
            if (isDragging) {
                moveButton(event);
                wasDragged = true;
                event.preventDefault(); // Prevent scrolling when touch is used
            }
        }, false);

        resetButton.addEventListener('touchend', function(event) {
            if (isDragging) {
                isDragging = false;
            }
            if (!wasDragged) {
                reset();
            }
        }, false);

        function reset() {
            playerScoreElement.innerText = `Your Score: 0`;
            computerScoreElement.innerText = `Computer Score: 0`;
            computerScore = 0;
            playerScore = 0;
            playerDisplay.innerText = "❓";
            computerDisplay.innerText = "❓";
            resultElement.innerText = "";
            updateProgress();
            start.style.height = "80vh";
            start.style.opacity = "1";
          
          adjustSize() // Readjust sizes
        }
      
        // Execute the function on page load
        window.addEventListener('load', adjustSize);
      
        // Execute the function on window resize
        window.addEventListener('resize', adjustSize);