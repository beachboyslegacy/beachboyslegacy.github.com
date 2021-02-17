function sortItems(order) {
    var items_list = document.getElementById("items");
    var sorted_items_list = items_list.cloneNode(false);

    var items = [...items_list.children];
    items.sort((thisItem, thatItem) => {
        var thisScore = parseInt(thisItem.dataset.year)*10000 +
            parseInt(thisItem.dataset.month)*100 +
            parseInt(thisItem.dataset.day);

        var thatScore = parseInt(thatItem.dataset.year)*10000 +
            parseInt(thatItem.dataset.month)*100 +
            parseInt(thatItem.dataset.day);

        return order*(thatScore - thisScore);

    });

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

    var sortingButton = document.getElementById("sorting-release");
    sortingButton.addEventListener("click", () => {
        sortItems(parseInt(sortingButton.dataset.order));
        sortingButton.dataset.order *= -1;
    });
});
