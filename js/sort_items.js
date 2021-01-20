function sortItems(order) {
    const items_list = document.getElementById("items");
    const sorted_items_list = items_list.cloneNode(false);

    const items = [...items_list.children];
    items.sort((thisItem, thatItem) => (
        order*(parseInt(thatItem.dataset.date) - parseInt(thisItem.dataset.date))

    ));

    for (item of items) {
        sorted_items_list.append(item);
    }

    items_list.parentNode.replaceChild(sorted_items_list, items_list);

    // Try loading newly visible images now that order has changed.
    loadVisibleImages();
}

window.addEventListener("load", () => {
    document
        .getElementById("sorting-release")
        .addEventListener("click", () => {
            itemsOrder = sortItems();
        });

    const sortingButton = document.getElementById("sorting-release");
    sortingButton.addEventListener("click", () => {
        sortItems(parseInt(sortingButton.dataset.order));
        sortingButton.dataset.order *= -1;
    });
});
