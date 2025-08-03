
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/donations.json")
    .then(r => r.json())
    .then(data => {
      populate(data);
      document.getElementById("donateForm").addEventListener("submit", e => {
        e.preventDefault();
        const entry = {
          name: e.target.d_name.value,
          bg: e.target.d_bg.value,
          contact: e.target.d_contact.value
        };
        data.unshift(entry);
        populate(data);
        e.target.reset();
      });
    });

  function populate(list) {
    const tbody = document.querySelector("#donationTable tbody");
    tbody.innerHTML = "";
    list.forEach(x => {
      tbody.innerHTML += `<tr><td>${x.name}</td><td>${x.bg}</td><td>${x.contact}</td></tr>`;
    });
  }
});
    