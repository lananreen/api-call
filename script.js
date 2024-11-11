let facts = [];
let currentPage = 0;
const factsPerPage = 5;

async function fetchFacts() {
    try {
        const response = await fetch('https://dog-api.kinduff.com/api/facts?number=50');
        const data = await response.json();
        facts = data.facts;
        displayFacts();
    } catch (error) {
        console.error("Error :C ->", error);
    }
}

function displayFacts() {
    const factsContainer = document.getElementById("factsContainer");
    factsContainer.innerHTML = "";

    const start = currentPage * factsPerPage;
    const end = start + factsPerPage;

    const factsToDisplay = facts.slice(start, end);

    factsToDisplay.forEach((fact, index) => {
        const row = document.createElement("tr");
        
        const numberCell = document.createElement("td");
        numberCell.textContent = start + index + 1;
        row.appendChild(numberCell);
        
        const factCell = document.createElement("td");
        factCell.textContent = fact;
        row.appendChild(factCell);
        
        factsContainer.appendChild(row);
    });

    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = end >= facts.length;
}

function nextPage() {
    if ((currentPage + 1) * factsPerPage < facts.length) {
        currentPage++;
        displayFacts();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayFacts();
    }
}

fetchFacts();
