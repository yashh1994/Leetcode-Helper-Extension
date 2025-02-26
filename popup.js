document.getElementById("checkComplexity").addEventListener("click", async () => {
    console.log("Button clicked: Check Complexity");

    const loadingOverlay = document.getElementById("loadingOverlay");
    const button = document.getElementById("checkComplexity");
    const resultField = document.getElementById("result");
    const code = getTextFromQueryField();

    if (!code.trim()) {
        console.warn("No code found.");
        resultField.innerText = "Please enter some code to analyze.";
        return;
    }

    try {
        loadingOverlay.style.visibility = "visible";
        button.disabled = true;

        const response = await fetch('https://leetcode-extension.onrender.com/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.analysis) {
            throw new Error("Invalid response from server.");
        }

        console.log("Complexity analysis result:", data);
        resultField.innerText = data.analysis;
    } catch (error) {
        console.error("Error analyzing complexity:", error);
        resultField.innerText = "Error analyzing complexity. Please try again.";
    } finally {
        loadingOverlay.style.visibility = "hidden";
        button.disabled = false;
    }
});

document.getElementById("improveSolution").addEventListener("click", async () => {
    console.log("Button clicked: Improve Solution");

    const loadingOverlay = document.getElementById("loadingOverlay");
    const button = document.getElementById("improveSolution");
    const resultField = document.getElementById("result");
    const code = getTextFromQueryField();

    if (!code.trim()) {
        console.warn("No solution found.");
        resultField.innerText = "Please enter a solution to improve.";
        return;
    }

    try {
        loadingOverlay.style.visibility = "visible";
        button.disabled = true;

        const response = await fetch('https://leetcode-extension.onrender.com/improve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.improved_code) {
            throw new Error("Invalid response from server.");
        }

        console.log("Improved solution result:", data);
        await navigator.clipboard.writeText(data.improved_code);
        console.log("Result copied to clipboard.");
        resultField.innerText = "Improved solution copied to clipboard!";
    } catch (error) {
        console.error("Error improving solution:", error);
        resultField.innerText = "Error improving solution. Please try again.";
    } finally {
        loadingOverlay.style.visibility = "hidden";
        button.disabled = false;
    }
});

function getTextFromQueryField() {
    const queryField = document.getElementById("queryInput");
    return queryField ? queryField.value.trim() : "";
}
