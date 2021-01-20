function elementIsVisible(el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Find images with data-src and load them if visible.
function loadVisibleImages() {
    // Get all images with data-src and no src set.
    const visible_lazy_images = [
        ...document.getElementsByTagName("img")
    ].filter(
        img => !img.src && img.dataset.src
    ).filter(img => elementIsVisible(img));

    for(image of visible_lazy_images) {
        image.src = image.dataset.src;
    }
}

window.addEventListener("load", () => {
    loadVisibleImages();

    // Try loading newly visible images when scrolling.
    document.addEventListener("scroll", () => loadVisibleImages());
});
