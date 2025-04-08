/* Send form data to google sheet */
document.getElementById("userPref").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
      gender: form.gender.value,
      age: form.age.value,
      shopping_frequency: form.shopping_frequency.value,
      ethnic_cuisine: form.ethnic_cuisine.value
    };

    try {
        await fetch("https://script.google.com/macros/s/AKfycbwCc5s188W2cWgr1q5DQmLWbd5hRUDpB-v9Qz8l2_zW3CgC8dEkZI1xjTx1N3QKPt2N/exec", {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              gender: form.gender.value,
              age: form.age.value,
              shopping_frequency: form.shopping_frequency.value,
              ethnic_cuisine: form.ethnic_cuisine.value
            })
          });

      window.location.href = "game.html"; 
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  }); 