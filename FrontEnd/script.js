let data;
let data2;
const galleryjs = document.getElementById("gallery-js");

// afficher les projets dans la gallery //
fetch("http://localhost:5678/api/works")
  .then(reponse => reponse.json())
  .then(projetdata => {
    data = projetdata;
   
    data.forEach(projet => {
        const projetElement = document.createElement("div");
    projetElement.innerHTML = `
      <img src="${projet.imageUrl}" alt="${projet.title}">
      <figcaption>${projet.title}</figcaption>
    `;
     galleryjs.appendChild(projetElement);
    });    
    
 }
  );

  // filtrer les projets grâce aux boutons//

const category = document.getElementById("filter-buttons");
fetch ("http://localhost:5678/api/categories")
  .then(response2 => response2.json())
  .then(categorydata =>  {
    data2 = categorydata;
    
const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => filterByCategory("all"));
    category.appendChild(allButton);

    categorydata.forEach(bouton => {
        const boutonFiltre = document.createElement("button");
        boutonFiltre.textContent = bouton.name;
        boutonFiltre.addEventListener("click", () => filterByCategory(bouton.id));
        category.appendChild(boutonFiltre);
    });    
});
function filterByCategory(category) {
        let projetsFiltres;
        if (category === "all") {
          projetsFiltres = data;
        } else {
          projetsFiltres = data.filter(projet => projet.categoryId === category);
        }
        galleryjs.innerHTML = "";
        projetsFiltres.forEach(projet => {
          const projetElement = document.createElement("div");
          projetElement.innerHTML = `
            <img src="${projet.imageUrl}" alt="${projet.title}">
            <figcaption>${projet.title}</figcaption>
          `;
          galleryjs.appendChild(projetElement);
});
}