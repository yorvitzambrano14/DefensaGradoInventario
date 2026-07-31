document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const loadingSpinner = document.getElementById("loadingSpinner");

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        hideError();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showError("Por favor completa todos los campos.");
            return;
        }

        setLoadingState(true);

        try {

            await simulateApiCall(username, password);

            // Guardar sesión
            localStorage.setItem("logueado", "true");
            localStorage.setItem("usuario", username);

            // Esperar un pequeño instante
            setTimeout(() => {
                window.location.replace("index.html");
            }, 300);

        } catch (error) {

            showError(error.message);

            setLoadingState(false);

        }

    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }

    function hideError() {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
    }

    function setLoadingState(isLoading) {

        submitBtn.disabled = isLoading;

        if (isLoading) {

            btnText.style.opacity = "0";

            loadingSpinner.style.display = "block";

        } else {

            btnText.style.opacity = "1";

            loadingSpinner.style.display = "none";

        }

    }

    function simulateApiCall(user, pass) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                const usuarioCorrecto = "empresa";
                const passwordCorrecta = "empresa1";

                if (user === usuarioCorrecto && pass === passwordCorrecta) {

                    resolve();

                } else {

                    reject(new Error("Usuario o contraseña incorrectos."));

                }

            }, 1200);

        });

    }

});