document.addEventListener("DOMContentLoaded", () => {
  const donorForm = document.getElementById("donorForm");
  const donorTableBody = document.querySelector("#donorTable tbody");
  const searchCity = document.getElementById("searchCity");
  const searchBloodGroup = document.getElementById("searchBloodGroup");

  let donors = [];
  let editingIndex = -1;

  donorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const donor = {
      name: document.getElementById("donorName").value.trim(),
      age: document.getElementById("donorAge").value.trim(),
      blood: document.getElementById("donorBlood").value,
      location: document.getElementById("donorLocation").value.trim(),
      contact: document.getElementById("donorContact").value.trim(),
    };

    if (editingIndex > -1) {
      donors[editingIndex] = donor;
      editingIndex = -1;
    } else {
      donors.push(donor);
    }

    donorForm.reset();
    renderTable();
  });

  donorTableBody.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    const index = [...donorTableBody.children].indexOf(row);

    if (e.target.closest(".edit-btn")) {
      const donor = donors[index];
      document.getElementById("donorName").value = donor.name;
      document.getElementById("donorAge").value = donor.age;
      document.getElementById("donorBlood").value = donor.blood;
      document.getElementById("donorLocation").value = donor.location;
      document.getElementById("donorContact").value = donor.contact;
      editingIndex = index;
      donorForm.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Filter listeners
  searchCity.addEventListener("input", renderTable);
  searchBloodGroup.addEventListener("change", renderTable);

  function renderTable() {
    const filterCity = searchCity.value.trim().toLowerCase();
    const filterBlood = searchBloodGroup.value;

    donorTableBody.innerHTML = "";

    donors.forEach((donor, index) => {
      const matchesCity = donor.location.toLowerCase().includes(filterCity);
      const matchesBlood = !filterBlood || donor.blood === filterBlood;

      if (matchesCity && matchesBlood) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${donor.name}</td>
          <td>${donor.age}</td>
          <td>${donor.blood}</td>
          <td>${donor.location}</td>
          <td>${donor.contact}</td>
          <td>
            <a href="tel:${donor.contact}" class="btn btn-sm btn-outline-primary me-1" title="Call">
              <i class="bi bi-telephone"></i>
            </a>
            <button class="btn btn-sm btn-outline-secondary edit-btn" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
          </td>
        `;
        donorTableBody.appendChild(row);
      }
    });
  }
});
