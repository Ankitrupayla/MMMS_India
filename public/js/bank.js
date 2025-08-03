document.addEventListener("DOMContentLoaded", () => {
  const bankForm = document.getElementById("bankForm");
  const bankTableBody = document.querySelector("#bankTable tbody");

  bankForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("bankName").value.trim();
    const location = document.getElementById("bankLocation").value.trim();
    const contact = document.getElementById("bankContact").value.trim();

    if (!name || !location || !contact) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${location}</td>
      <td>${contact}</td>
      <td><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}"
             target="_blank" class="btn btn-sm btn-outline-primary">Map</a></td>
    `;

    bankTableBody.appendChild(row);
    bankForm.reset();
  });
});
