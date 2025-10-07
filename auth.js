document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();

  // LOGIN
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        alert("Login successful: " + userCredential.user.email);
        window.location.href = "dashboard.html";
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });

    // Forgot password
    const forgotLink = document.getElementById("forgot-password");
    if (forgotLink) {
      forgotLink.addEventListener("click", async () => {
        const email = document.getElementById("login-email").value.trim();
        if (!email) {
          alert("Please enter your email to reset password.");
          return;
        }

        try {
          await auth.sendPasswordResetEmail(email);
          alert("Password reset email sent to " + email);
        } catch (error) {
          alert("Error: " + error.message);
        }
      });
    }

    // Auto redirect if already logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        window.location.href = "dashboard.html";
      }
    });
  }

  // SIGNUP
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        alert("Signup successful: " + userCredential.user.email);
        window.location.href = "dashboard.html";
      } catch (error) {
        alert("Signup failed: " + error.message);
      }
    });

    // Auto redirect if already logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        window.location.href = "dashboard.html";
      }
    });
  }

  // DASHBOARD
  const logoutBtn = document.getElementById("logout-btn");
  const welcomeText = document.getElementById("welcome");

  if (logoutBtn || welcomeText) {
    auth.onAuthStateChanged(user => {
      if (user && welcomeText) {
        welcomeText.textContent = "Welcome, " + user.email;
      } else if (!user && welcomeText) {
        window.location.href = "login.html";
      }
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await auth.signOut();
        window.location.href = "login.html";
      });
    }
  }
});
