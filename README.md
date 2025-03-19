# **OpenBasket Game**

Welcome to the **OpenBasket game**! This game is based on the concept of finding authentic grocery ingredients, and it includes fun and engaging mechanics to help you discover foods from different cultures.

### **Table of Contents**
1. [Project Setup](#project-setup)
2. [Game Features](#game-features)
3. [How to Play](#how-to-play)
4. [Installing and Running the Game](#installing-and-running-the-game)
5. [Code Style Guide](#code-style-guide)

---

## **Project Setup**

Before running this project, make sure you have **Node.js** installed on your system. If you don't have it, you can download it from [here](https://nodejs.org).

### **Steps to Set Up the Project**

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourname/openbasket-game.git
    cd openbasket-game
    ```

2. **Install Dependencies**:
    This project uses **Phaser** and **Firebase**, so you need to install all dependencies listed in `package.json`:
    ```bash
    npm install
    ```

3. **Run the Game**:
    After installing the dependencies, you can run the game locally:
    ```bash
    npm start
    ```

    This will start a development server, and you can view the game by navigating to `http://localhost:3000` in your browser.

---

## **Game Features**

- **Whack-a-Mole Gameplay**: Players click on quickly appearing and disappearing ingredients while avoiding penalty items.
- **Score Multiplier**: Players get score multipliers if they answer quiz questions correctly and quickly (faster answers = better multiplier).
- **Leaderboard**: Scores are saved and displayed in real-time, showing the top players.
- **Firebase Integration**: The backend uses Firebase to store and update player scores in real-time.

---

## **How to Play**

- **Main Gameplay**: Click on ingredients that appear on the screen. Avoid clicking on the penalty items (e.x. worm).
- **Quiz Questions**: Every 25 seconds, a quiz question will appear. Answer quickly to get a score multiplier.
- **Goal**: The objective is to get as many points as possible within **2 minutes**. Every correct quiz answer will increase your score multiplier.

---

## **Installing and Running the Game**

1. **Clone the repository** and navigate to the project directory.

    ```bash
    git clone https://github.com/yourname/openbasket-game.git
    cd openbasket-game
    ```

2. **Install dependencies**:
   
    ```bash
    npm install
    ```

3. **Start the development server**:
   
    ```bash
    npm start
    ```

    Your game will be available at `http://localhost:3000`.

---

## **Code Style Guide**

### **General Principles**
- **Consistent Formatting**: Use consistent indentation and spacing throughout the code to maintain readability. This project follows a **2-space indentation** style.
- **Use Descriptive Variable Names**: Variable names should clearly represent the data they hold. For example, `score` is better than `s`.
- **Keep Functions Short**: Functions should ideally be no longer than 50 lines. Break them up into smaller, reusable functions when necessary.
- **Commenting**: Comment your code when logic might not be immediately clear. Use comments to explain **why** something is done, not **what** is done (the code itself should explain the "what").
- **Frequent Pushes**: Push code frequently so we know where something is breaking.

### **JavaScript Code Style**

- **Variables and Constants**:
  - Use `const` for values that do not change and `let` for values that may change.
  - Avoid using `var`.
  - Example:
    ```javascript
    const maxTime = 120; // time in seconds
    let score = 0;
    ```

- **Arrow Functions**:
  - Use arrow functions for anonymous functions and callbacks where applicable.
  - Example:
    ```javascript
    const increaseScore = () => {
        score++;
    };
    ```

- **Template Literals**:
  - Use template literals for string concatenation when inserting variables into strings.
  - Example:
    ```javascript
    console.log(`Player's score is: ${score}`);
    ```

- **Naming Conventions**:
  - Use **camelCase** for variable names and function names.
  - Use **PascalCase** for class names.
  - Example:
    ```javascript
    function handlePlayerInput() { ... }
    const playerData = { name: 'John', score: 100 };
    class GameManager { ... }
    ```

- **Event Listeners**:
  - Use `addEventListener` to handle user events like clicks and keypresses.
  - Example:
    ```javascript
    document.getElementById('gameStartButton').addEventListener('click', startGame);
    ```

- **Avoid Global Variables**:
  - Minimize the use of global variables. Encapsulate your logic in functions, classes, or modules.
  
- **Error Handling**:
  - Always add error handling where necessary (e.g., try-catch blocks for asynchronous functions).

  ```javascript
  try {
      // risky code
  } catch (error) {
      console.error('Error:', error);
  }
-
## **License**
This project is licensed under the MIT License - see the LICENSE file for details.
