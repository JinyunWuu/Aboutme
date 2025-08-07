
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // Form elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Error elements
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      
      // Validation functions
      function validateName() {
        if (nameInput.validity.valueMissing) {
          nameError.textContent = 'Name is required';
          nameError.style.display = 'block';
          return false;
        } else if (nameInput.validity.patternMismatch) {
          nameError.textContent = 'Only letters and spaces allowed';
          nameError.style.display = 'block';
          return false;
        } else {
          nameError.style.display = 'none';
          return true;
        }
      }
      
      function validateEmail() {
        if (emailInput.validity.valueMissing) {
          emailError.textContent = 'Email is required';
          emailError.style.display = 'block';
          return false;
        } else if (emailInput.validity.typeMismatch) {
          emailError.textContent = 'Please enter a valid email';
          emailError.style.display = 'block';
          return false;
        } else {
          emailError.style.display = 'none';
          return true;
        }
      }
      
      function validateMessage() {
        if (messageInput.validity.valueMissing) {
          messageError.textContent = 'Message is required';
          messageError.style.display = 'block';
          return false;
        } else if (messageInput.value.length < 10) {
          messageError.textContent = 'Message must be at least 10 characters';
          messageError.style.display = 'block';
          return false;
        } else {
          messageError.style.display = 'none';
          return true;
        }
      }
      
      // Event listeners for real-time validation
      nameInput.addEventListener('input', validateName);
      emailInput.addEventListener('input', validateEmail);
      messageInput.addEventListener('input', validateMessage);
      
      // Form submission handler
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
          // Show loading state
          const submitBtn = this.querySelector('[type="submit"]');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          
          try {
            const response = await fetch(this.action, {
              method: 'POST',
              body: new FormData(this),
              headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
              alert("Message sent successfully!");
              this.reset();
            } else {
              throw new Error('Form submission failed');
            }
          } catch (error) {
            alert("Oops! There was a problem sending your message.");
            console.error(error);
          } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        }
        if (response.ok) {
          // Formspree redirect failed - force our own
          setTimeout(() => {
            window.location.href = "Homepage.html"; 
          }, 1500);
        }
      });
    }
  });
  //   contact page
  