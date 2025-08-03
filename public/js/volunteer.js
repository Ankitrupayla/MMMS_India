document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("volunteerForm");
  const table = document.querySelector("#volunteerTable tbody");

  function loadVolunteers() {
    const data = JSON.parse(localStorage.getItem("volunteers") || "[]");
    table.innerHTML = "";

    data.forEach((v, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${v.name}</td>
        <td>${v.age}</td>
        <td>${v.city}</td>
        <td>${v.contact}</td>
        <td>
          <a href="tel:${v.contact}" class="btn btn-sm btn-outline-primary me-2" title="Call">
            <i class="bi bi-telephone"></i>
          </a>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteVolunteer(${index})" title="Remove">
            <i class="bi bi-trash"></i>
          </button>
        </td>`;
      table.appendChild(row);
    });
  }

  window.deleteVolunteer = (index) => {
    const data = JSON.parse(localStorage.getItem("volunteers") || "[]");
    data.splice(index, 1);
    localStorage.setItem("volunteers", JSON.stringify(data));
    loadVolunteers();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const volunteer = {
      name: document.getElementById("volunteerName").value,
      age: document.getElementById("volunteerAge").value,
      city: document.getElementById("volunteerCity").value,
      contact: document.getElementById("volunteerContact").value
    };

    const data = JSON.parse(localStorage.getItem("volunteers") || "[]");
    data.push(volunteer);
    localStorage.setItem("volunteers", JSON.stringify(data));
    form.reset();
    loadVolunteers();
  });

  loadVolunteers();
});
