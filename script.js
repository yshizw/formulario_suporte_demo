const messages = {
    success: "Enviado!",
    error: "Erro ao enviar",
    connectionError: "Ocorreu um erro. Por favor, tente novamente."
};

const getMessage = (key) => messages[key];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // Get all form field values
            const firstName = document.querySelector("input[name=firstName]").value;
            const lastName = document.querySelector("input[name=lastName]").value;
            const email = document.querySelector("input[name=email]").value;
            const department = document.querySelector("select[name=department]").value;
            const request = document.querySelector("select[name=request]").value;
            const priority = document.querySelector("select[name=priority]").value;
            const subject = document.querySelector("input[name=subject]").value;
            const message = document.querySelector("textarea[name=message]").value;

            // Validate required fields
            if (!firstName || !lastName || !email || !department || !request || !priority || !subject || !message) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            // Prepare data for API
            const formData = {
                firstName,
                lastName,
                email,
                department,
                request,
                priority,
                subject,
                message,
                timestamp: new Date().toISOString()
            };

            fetch("https://api.sheetmonkey.io/form/5sLTXFRGMAVBmBMVLM1xi2", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert(getMessage("success"));
                    form.reset();
                } else {
                    alert(getMessage("error"));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(getMessage("connectionError"));
            });
        });
    }
});