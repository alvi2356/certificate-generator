(() => {
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('pwd');
    const errorMsg = document.getElementById('error-msg');
    const statsDiv = document.getElementById('stats');
  
    loginBtn.addEventListener('click', () => {
      const password = passwordInput.value.trim();
      errorMsg.textContent = '';
      statsDiv.style.display = 'none';
  
      if (!password) {
        errorMsg.textContent = 'Please enter the password.';
        return;
      }
  
      fetch('/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetch('/stats')
            .then(res => res.json())
            .then(stats => {
              const namesList = stats.names.map((name, idx) => `<li>${idx + 1}. ${name}</li>`).join('');
              statsDiv.innerHTML = `
                <h2>Welcome, Admin!</h2>
                <p><strong>Total Certificates Generated:</strong> ${stats.totalGenerated}</p>
                <h3>Generated Certificate Names:</h3>
                <ul>${namesList}</ul>
              `;
              statsDiv.style.display = 'block';
            });
        } else {
          errorMsg.textContent = 'Incorrect password.';
        }
      })
      .catch(err => {
        errorMsg.textContent = 'Error contacting server.';
        console.error(err);
      });
    });
  })();
  