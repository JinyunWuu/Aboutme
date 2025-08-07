class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-bg');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resizeDebounce = null;
    
    this.init();
  }

  init() {
    this.setCanvasSize();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(`Canvas resized to: ${this.canvas.width}x${this.canvas.height}`);
  }

  createParticles() {
    const particleCount = Math.floor(this.canvas.width * this.canvas.height / 30000);
    const colors = ['#e3e7ea', '#e3e7ea', '#e3e7ea', '#e3e7ea'];//['#4e54c8', '#8f94fb', '#00b4db', '#6a3093'];
    
    this.particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 2.5 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => {
        this.setCanvasSize();
        this.repositionParticles();
      }, 100);
    });
  }

  repositionParticles() {
    const xRatio = this.canvas.width / (this.canvas.oldWidth || this.canvas.width);
    const yRatio = this.canvas.height / (this.canvas.oldHeight || this.canvas.height);
    
    this.particles.forEach(p => {
      p.x *= xRatio;
      p.y *= yRatio;
      
      // Ensure particles stay within bounds
      p.x = Math.max(p.size, Math.min(p.x, this.canvas.width - p.size));
      p.y = Math.max(p.size, Math.min(p.y, this.canvas.height - p.size));
    });
    
    this.canvas.oldWidth = this.canvas.width;
    this.canvas.oldHeight = this.canvas.height;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Boundary check
      if (p.x <= p.size || p.x >= this.canvas.width - p.size) p.speedX *= -1;
      if (p.y <= p.size || p.y >= this.canvas.height - p.size) p.speedY *= -1;
      
      // Draw particle
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
});