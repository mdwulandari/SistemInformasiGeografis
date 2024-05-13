async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const apiUrl = 'http://gis_2105551075.local.net/api/register';
  
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

  const apiUrl = 'http://gis_2105551075.local.net/api/login';

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
              // Redirect to system dashboard (index.html) after successful login
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
