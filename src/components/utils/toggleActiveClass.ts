export function toggleActiveClass(target: HTMLElement): void {
  if (target instanceof HTMLElement) {
    target.classList.toggle('categories-item__action--active');
  }
}
