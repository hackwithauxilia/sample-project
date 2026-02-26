
function requireLogin() {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

function goToUpdateAccount() {
    window.location.href = "update_acct.html";
}

document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("loginBtn");
    const verifyBtn = document.getElementById("verifyBtn");
    const mfaModal = document.getElementById("mfaModal");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin") {

                // Store partial auth state
                sessionStorage.setItem("mfaPending", "true");

                // Show MFA popup
                mfaModal.classList.add("show");

            } else {
                alert("Invalid Customer ID or Password");
            }
        });
    }

    if (verifyBtn) {
        verifyBtn.addEventListener("click", function () {

            const otp = document.getElementById("otp").value;

            if (otp === "123456") {

                sessionStorage.removeItem("mfaPending");
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("totalRisk", "0");

                window.location.href = "dashboard.html";

            } else {
                alert("Invalid OTP");
            }
        });
    }
});


function evaluateSubmission(nextPage) {

    const inputs = document.querySelectorAll("input");
    let pageRisk = 0;

    // Calculate risk for current page
    inputs.forEach(input => {
        if (input.dataset.risk === "high" && input.value.trim() !== "") {
            pageRisk += 25;
        }
    });

    // Get existing total risk from session
    let totalRisk = parseInt(sessionStorage.getItem("totalRisk")) || 0;

    // Add current page risk
    totalRisk += pageRisk;

    // Store updated total risk
    sessionStorage.setItem("totalRisk", totalRisk);

    // Show loading spinner
    showLoading();

    setTimeout(() => {

        // Remove loading overlay safely
        document.querySelector(".loading-overlay")?.remove();

        // If this is final stage, show alert first
        if (nextPage === "final") {
            showFinalAlert(totalRisk);

            // After showing alert, redirect to dashboard (or any page you want)
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 3000);

        } else {
            // Normal navigation
            window.location.href = "accounts.html";
        }

    }, 2000);
}

function evaluateSub(nextPage) {

    const inputs = document.querySelectorAll("input");
    let pageRisk = 0;

    // Calculate risk for current page
    inputs.forEach(input => {
        if (input.dataset.risk === "high" && input.value.trim() !== "") {
            pageRisk += 25;
        }
    });

    // Get existing total risk from session
    let totalRisk = parseInt(sessionStorage.getItem("totalRisk")) || 0;

    // Add current page risk
    totalRisk += pageRisk;

    // Store updated total risk
    sessionStorage.setItem("totalRisk", totalRisk);

    // Show loading spinner
    showLoading();

    setTimeout(() => {

        // Remove loading overlay safely
        document.querySelector(".loading-overlay")?.remove();

        // If this is final stage, show alert first
        if (nextPage === "final") {
            showFinalAlert(totalRisk);

            // After showing alert, redirect to dashboard (or any page you want)
            setTimeout(() => {
                window.location.href = "accounts.html";
            }, 3000);

        } else {
            // Normal navigation
            window.location.href = "statements.html";
        }

    }, 2000);
}

function evaluateSubs(nextPage) {

    const inputs = document.querySelectorAll("input");
    let pageRisk = 0;

    // Calculate risk for current page
    inputs.forEach(input => {
        if (input.dataset.risk === "high" && input.value.trim() !== "") {
            pageRisk += 25;
        }
    });

    // Get existing total risk from session
    let totalRisk = parseInt(sessionStorage.getItem("totalRisk")) || 0;

    // Add current page risk
    totalRisk += pageRisk;

    // Store updated total risk
    sessionStorage.setItem("totalRisk", totalRisk);

    // Show loading spinner
    showLoading();

    setTimeout(() => {

        // Remove loading overlay safely
        document.querySelector(".loading-overlay")?.remove();

        // If this is final stage, show alert first
        if (nextPage === "final") {
            showFinalAlert(totalRisk);

            // After showing alert, redirect to dashboard (or any page you want)
            setTimeout(() => {
                window.location.href = "statements.html";
            }, 3000);

        } else {
            // Normal navigation
            window.location.href = "login.html";
        }

    }, 2000);
}

function showLoading() {

    const overlay = document.createElement("div");
    overlay.className = "loading-overlay";
    overlay.innerHTML = `
        <div class="spinner"></div>
        Processing Request Securely...
    `;

    document.body.appendChild(overlay);
}


function showFinalAlert(score) {

    let level = "";
    let message = "";

    if (score >= 75) {
        level = "HIGH RISK";
        message = "Multiple highly sensitive credentials were collected.";
    }
    else if (score >= 25) {
        level = "MODERATE RISK";
        message = "Some sensitive authentication data was exposed.";
    }
    else {
        level = "LOW RISK";
        message = "Minimal sensitive information entered.";
    }

    const modal = document.createElement("div");
    modal.className = "alert-modal";
    modal.innerHTML = `
        <div class="alert-content">
            <h3>⚠ Suspicious Activity Detected</h3>
            <p><strong>Suspicion Level:</strong> ${level}</p>
            <p><strong>Total Exposure Score:</strong> ${score}%</p>
            <p>${message}</p>
            <button onclick="logout()">End Session</button>
        </div>
    `;

    document.body.appendChild(modal);
}