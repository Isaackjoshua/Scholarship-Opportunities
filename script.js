// Handle our submission form
document.getElementById('submit-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const title = document.getElementById('opportunity-title').value;
    const description = document.getElementById('opportunity-description').value;
    const messageElement = document.getElementById('submit-message'); // Display the submission message
  
    try {
      // Send a POST request to the server
      const response = await fetch(`${SERVER_URL}/submit-opportunity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        // If successful,it will show success message
        messageElement.textContent = result.message;
        messageElement.style.color = 'green';
  
        // Clear form fields
        document.getElementById('opportunity-title').value = '';
        document.getElementById('opportunity-description').value = '';
      } else {
        // If failed,then show the error message
        messageElement.textContent = result.message;
        messageElement.style.color = 'red';
      }
    } catch (error) {
      console.error("Error submitting opportunity:", error);
      messageElement.textContent = "An error occurred. Please try again later.";
      messageElement.style.color = 'red';
    }
  });
  