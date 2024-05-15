async function addHospital() {
    const lat_lng_rs = document.getElementById('lat_lng_rs').value;
    const nama_rs = document.getElementById('nama_rs').value;
    const alamat_rs = document.getElementById('alamat_rs').value;
    const id_type_rs = document.getElementById('id_type_rs').value;

    const apiUrl = 'http://api_2105551075.local.net/api/hospitals';
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                lat_lng_rs: lat_lng_rs,
                nama_rs: nama_rs,
                alamat_rs: alamat_rs,
                id_type_rs: id_type_rs,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                alert('Hospital added successfully!');
            } else {
                alert(data.message);
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding hospital. Please try again later.');
    }
}

async function getHospitals() {
    const apiUrl = 'http://api_2105551075.local.net/api/gethospitals';
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
            }
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching hospitals. Please try again later.');
        return [];
    }
}

async function getHospitalById(id_rs) {
    const apiUrl = `http://api_2105551075.local.net/api/hospitals/${id_rs}`;
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
            }
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching hospital details. Please try again later.');
        return null;
    }
}

async function editHospital() {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');

    const apiUrl = `http://api_2105551075.local.net/api/hospitals/${hospitalId}`;
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found");
        return;
    }

    const updatedData = {
        lat_lng_rs: document.getElementById("lat_lng_rs").value,
        nama_rs: document.getElementById("nama_rs").value,
        alamat_rs: document.getElementById("alamat_rs").value,
        id_type_rs: document.getElementById("id_type_rs").value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                alert('Hospital updated successfully!');
                // Redirect or refresh as needed
            } else {
                alert(data.message);
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating hospital. Please try again later.');
    }
}

async function deleteHospital(id_rs) {
    const apiUrl = `http://api_2105551075.local.net/api/hospitals/${id_rs}`;
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token not found");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (data.success) {
                alert('Hospital deleted successfully! Refresh the page!');
                // Redirect or refresh as needed
            } else {
                alert(data.message);
            }
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting hospital. Please try again later.');
    }
}