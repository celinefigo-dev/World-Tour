// router.js
export function navigateTo(url) {
    history.pushState(null, null, url);
    window.dispatchEvent(new Event('popstate'));
}
