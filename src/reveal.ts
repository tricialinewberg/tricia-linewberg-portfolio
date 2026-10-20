/** Stop observing as soon as a one-time reveal is scheduled, even if CSS is canceled. */
export function setupReveals(): () => void {
 if (!('IntersectionObserver' in window)) return () => {};
 const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   const element = entry.target as HTMLElement;
   if (!element.dataset.revealed) {
    element.dataset.revealed = 'true';
    element.classList.add('is-revealed');
   }
   observer.unobserve(element);
  }
 }, {threshold: .12});
 document.querySelectorAll<HTMLElement>('.project, .competencies, .about-award').forEach(element => {
  if (!element.dataset.revealed) observer.observe(element);
 });
 return () => observer.disconnect();
}
