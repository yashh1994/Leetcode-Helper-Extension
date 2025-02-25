document.getElementById("checkComplexity").addEventListener("click", async () => {
    console.log("Button clicked");

    const loadingOverlay = document.getElementById("loadingOverlay");
    const button = document.getElementById("checkComplexity");
    const code = getTextFromQueryField();

    if (!code) {
        console.log("No code found.");
        return;
    }

    loadingOverlay.style.visibility = "visible";
    button.disabled = true;

    fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Complexity analysis result:", data);
        document.getElementById("result").innerText = data.analysis || "Error analyzing complexity.";
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error analyzing complexity.";
    })
    .finally(() => {
        loadingOverlay.style.visibility = "hidden";
        button.disabled = false;
    });
});

document.getElementById("improveSolution").addEventListener("click", async () => {
    console.log("Button clicked");

    const loadingOverlay = document.getElementById("loadingOverlay");
    const button = document.getElementById("improveSolution");
    const code = getTextFromQueryField();

    if (!code) {
        console.log("No solution found.");
        return;
    }

    loadingOverlay.style.visibility = "visible";
    button.disabled = true;

    fetch('http://localhost:5000/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Improved solution result:", data);
        navigator.clipboard.writeText(data.improved_code || "Couldn't improve solution.").then(() => {
            console.log("Result copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy result to clipboard: ", err);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        loadingOverlay.style.visibility = "hidden";
        button.disabled = false;
    });
});

function getTextFromQueryField() {
    const queryField = document.getElementById("queryInput");
    return queryField ? queryField.value : "";
}
