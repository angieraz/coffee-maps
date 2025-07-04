document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const errorMsg = document.getElementById("error_msg");
  errorMsg.textContent = "";

  try {
    const response = await fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Сталася помилка");
    }

    localStorage.setItem("token", result.data);
    window.location.href = "/";
  } catch (error) {
    errorMsg.textContent = error.message;
  }
});
