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
        console.error("Error fetching facts:", error);
    }
}

function displayFacts() {
    const factsContainer = document.getElementById("factsContainer");
    factsContainer.innerHTML = ""; 

    const start = currentPage * factsPerPage;
    const end = start + factsPerPage;

    const factsToDisplay = facts.slice(start, end);

    factsToDisplay.forEach(fact => {
        const factElement = document.createElement("p");
        factElement.classList.add("fact");
        factElement.textContent = fact;
        factsContainer.appendChild(factElement);
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

//draft//