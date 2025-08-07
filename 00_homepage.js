/* Current page indicator ***************/
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Check each link against current URL
    navLinks.forEach(link => {
      // Compare normalized URLs
      const linkPath = new URL(link.href).pathname;
      const currentPath = window.location.pathname;
      
      if(linkPath === currentPath) {
        link.classList.add('active');
        
        // For homepage special case (index.html vs /)
        if(currentPath.endsWith('/') && link.href.endsWith('00_homepage.html')) {
          link.classList.add('active');
        }
      }
    });
  });
/* Current page indicator ***************/

// page transition***********************
// page transition***********************


// For Skills
document.addEventListener('DOMContentLoaded', function() {
  // Get ALL skill headers
  const skillHeaders = document.querySelectorAll('.Skills-header');
  
  skillHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Find the parent Skills section
      const skillsSection = this.closest('.Skills');
      // Toggle the expanded class
      skillsSection.classList.toggle('expanded');
    });
  });
});

