document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const passwordStrength = document.querySelector('#passwordStrength div');

  // Error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const passwordTips = document.getElementById('passwordTips');

  // Toggle password visibility
  togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
  });

  // Real-time validation
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isPasswordValid) {
      alert('Form submitted successfully!');
      form.reset();
      resetValidation();
    }
  });

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
      showError(nameInput, nameError, 'Please enter your name');
      return false;
    } else {
      showSuccess(nameInput);
      hideError(nameError);
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
      showError(emailInput, emailError, 'Please enter an email');
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, emailError, 'Please enter a valid email');
      return false;
    } else {
      showSuccess(emailInput);
      hideError(emailError);
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Update password strength meter
    if (password.length > 0) {
      passwordTips.classList.remove('hidden');
      
      if (password.length < 4) {
        passwordStrength.className = 'weak';
      } else if (password.length < 8 || !hasNumber || !hasSpecialChar) {
        passwordStrength.className = 'medium';
      } else {
        passwordStrength.className = 'strong';
      }
    } else {
      passwordTips.classList.add('hidden');
    }
    
    // Validate password
    if (password === '') {
      showError(passwordInput, passwordError, 'Please enter a password');
      return false;
    } else if (!hasMinLength) {
      showError(passwordInput, passwordError, 'Password must be 8+ characters');
      return false;
    } else {
      showSuccess(passwordInput);
      hideError(passwordError);
      return true;
    }
  }

  // Helper functions
  function showError(input, errorElement, message) {
    input.classList.add('input-error');
    input.classList.remove('input-success');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }

  function showSuccess(input) {
    input.classList.remove('input-error');
    input.classList.add('input-success');
  }

  function hideError(errorElement) {
    errorElement.classList.add('hidden');
  }

  function resetValidation() {
    [nameInput, emailInput, passwordInput].forEach(input => {
      input.classList.remove('input-error', 'input-success');
    });
    [nameError, emailError, passwordError].forEach(error => {
      error.classList.add('hidden');
    });
    passwordStrength.className = '';
    passwordTips.classList.add('hidden');
    passwordInput.setAttribute('type', 'password');
    togglePassword.querySelector('i').className = 'fas fa-eye';
  }
});