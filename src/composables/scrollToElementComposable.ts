export function scrollToElement(identifier: string) {
    const el = document.querySelector(identifier);
    if (el) {
        el.scrollIntoView();
    }
}
