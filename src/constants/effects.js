export const effectText = (className) => {
  const classTime = document.querySelector(`.${className}`);
  classTime.classList.add(`${className}-effect`);
  setTimeout(() => classTime.classList.remove(`${className}-effect`), 100);
}