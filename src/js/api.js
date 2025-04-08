import { db, collection, addDoc, getDocs, orderBy, query  } from './firebase';

/* Add player score to database */
const addToLeaderboard = async (username, score) => {
  try {
    const docRef = await addDoc(collection(db, "leaderboard"), {
      username: username,
      score: score,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

/* Get all entries and sort from highest to lowest and render to table */
const getLeaderboardData = async () => {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
    
    const querySnapshot = await getDocs(q);
    
    // Create a table element
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    
    // Create the table header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = ['Username', 'Score'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    // Create table body
    const tbody = table.createTBody();
  
    // Populate the table rows with leaderboard data
    querySnapshot.forEach(doc => {
      const row = tbody.insertRow();
      const data = doc.data();
      const usernameCell = row.insertCell();
      const scoreCell = row.insertCell();
      
      usernameCell.textContent = data.username;
      scoreCell.textContent = data.score;
    });
  
    // Append the table to the document body (or any container of your choice)
    const leaderboardContainer = document.getElementById('leaderboard-container');
    leaderboardContainer.innerHTML = ''; // Clear any existing content
    leaderboardContainer.appendChild(table);
  };

document.getElementById("test-form").addEventListener("submit", (e) => {
    e.preventDefault();

    let userElement = document.getElementById("username"); // 
    let username = userElement.value;
    let scoreElement = document.getElementById("score"); // 
    let score = scoreElement.value;

    console.log(username, score);
    addToLeaderboard(username, parseInt(score));
    
})

getLeaderboardData();