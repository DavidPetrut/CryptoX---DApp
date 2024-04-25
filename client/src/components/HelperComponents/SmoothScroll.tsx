const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
  
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    const duration = 700; 
    let start: number | null = null;
  
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
  
      window.scrollTo(0, startPosition + distance * progressPercentage);
  
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      }
    };
  
    window.requestAnimationFrame(animate);
  };
  
  export default scrollToId;
  