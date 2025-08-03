document.addEventListener("DOMContentLoaded", () => {
  const requestForm = document.getElementById("requestForm");
  const requestTableBody = document.querySelector("#requestTable tbody");
  const searchForm = document.getElementById("searchForm");
  const searchHospital = document.getElementById("searchHospital");
  const searchBloodGroup = document.getElementById("searchBloodGroup");

  let requests = [];
  let editingIndex = -1;

  requestForm.addEventListener("submit", e => {
    e.preventDefault();

    const request = {
      patientName: document.getElementById("patientName").value.trim(),
      patientAge: document.getElementById("patientAge").value.trim(),
      bloodGroup: document.getElementById("bloodGroup").value,
      hospital: document.getElementById("hospital").value.trim(),
      contact: document.getElementById("contact").value.trim(),
      requiredDate: document.getElementById("requiredDate").value,
    };

    // Prepare WhatsApp message (replace 'YOURGROUPNUMBER' with actual WhatsApp group number, e.g., 919XXXXXXXXX)
    const whatsappNumber = "7440989857"; // example: "919876543210"
    const message = encodeURIComponent(
      `Blood Request:\n` +
      `Patient: ${request.patientName}\n` +
      `Age: ${request.patientAge}\n` +
      `Blood Group: ${request.bloodGroup}\n` +
      `Hospital: ${request.hospital}\n` +
      `Contact: ${request.contact}\n` +
      `Required Date: ${request.requiredDate}`
    );
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

    if (editingIndex > -1) {
      requests[editingIndex] = request;
      editingIndex = -1;
    } else {
      requests.push(request);
    }

    requestForm.reset();
    renderTable();

    // Open WhatsApp chat in new tab to send message
    window.open(whatsappURL, "_blank");
  });

  requestTableBody.addEventListener("click", e => {
    const row = e.target.closest("tr");
    const index = [...requestTableBody.children].indexOf(row);

    if (e.target.closest(".edit-btn")) {
      const request = requests[index];
      document.getElementById("patientName").value = request.patientName;
      document.getElementById("patientAge").value = request.patientAge;
      document.getElementById("bloodGroup").value = request.bloodGroup;
      document.getElementById("hospital").value = request.hospital;
      document.getElementById("contact").value = request.contact;
      document.getElementById("requiredDate").value = request.requiredDate;

      editingIndex = index;
      highlightEditingRow(index);
      requestForm.scrollIntoView({ behavior: "smooth" });
    }

    if (e.target.closest(".delete-btn")) {
      if (confirm("Are you sure you want to delete this request?")) {
        requests.splice(index, 1);
        if (editingIndex === index) {
          editingIndex = -1;
          requestForm.reset();
        }
        renderTable();
      }
    }
  });

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    renderTable();
  });

  function highlightEditingRow(index) {
    // Remove previous highlights
    [...requestTableBody.children].forEach((tr, i) => {
      tr.classList.toggle("table-warning", i === index);
    });
  }

  function renderTable() {
    const filterHospital = searchHospital.value.trim().toLowerCase();
    const filterBlood = searchBloodGroup.value;

    requestTableBody.innerHTML = "";

    requests.forEach((request, index) => {
      const matchesHospital = request.hospital.toLowerCase().includes(filterHospital);
      const matchesBlood = !filterBlood || request.bloodGroup === filterBlood;

      if (matchesHospital && matchesBlood) {
        const row = document.createElement("tr");
        if (index === editingIndex) {
          row.classList.add("table-warning");
        }
        row.innerHTML = `
          <td>${request.patientName}</td>
          <td>${request.patientAge}</td>
          <td>${request.bloodGroup}</td>
          <td>${request.hospital}</td>
          <td>${request.contact}</td>
          <td>${request.requiredDate}</td>
          <td>
            <a href="tel:${request.contact}" class="btn btn-sm btn-outline-primary me-2" title="Call">
              <i class="bi bi-telephone"></i>
            </a>
            <button class="btn btn-sm btn-outline-secondary edit-btn me-2" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger delete-btn" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        requestTableBody.appendChild(row);
      }
    });
  }
});
