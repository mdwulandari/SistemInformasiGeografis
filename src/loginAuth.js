async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const apiUrl = 'http://api_2105551075.local.net/api/register';
  
    try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: name,
              email: email,
              password: password,
          }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          if (data.success) {
              alert('Registered successfully!');
          } else {
              alert(data.message);
          }
      } else {
          throw new Error('Network response was not ok');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi nanti.');
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const apiUrl = 'http://api_2105551075.local.net/api/login';

  try {
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password,
          }),
      });

      const data = await response.json();

      if (response.ok) {
          if (data.success) {
              alert('Login successful!');
              // Save to local storage
              localStorage.setItem("token", data.data.token);
              console.log(data.data.token);

              // Redirect to system dashboard after successful login
              window.location.href = 'mapmarker.html';
          } else {
              alert(data.message);
          }
      } else {
          throw new Error('Network response was not ok');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in. Please try again later.');
  }
}

async function logout() {
    const apiUrl = 'http://api_2105551075.local.net/api/logout';
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                alert('Logout successful!');
                // Redirect to register page after successful logout
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging out. Please try again later.');
    }
}