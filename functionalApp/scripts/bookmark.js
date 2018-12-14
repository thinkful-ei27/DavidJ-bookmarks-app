const bookmark = (function() {

  function generateItemElementHTML(item) {
    console.log(`Generate Item Element HTML ran for ${item.title}`);
    if (item.displayDetail) {
      return `
      <li class="bookmark-item" role="listitem" data-item-id="${item.id}">
        <section class="inner-item">
          <p class="item-title">Item Title: ${item.title}</p>
          <p class="item-rating">Rating: ${item.rating}</p>
          <p class="item-URL">Visit Site: ${item.URL}</p>
          <p class="item-Description" role="note">Description: ${item.description}</p>
        </section>
        <button type="button" class="item-delete-button">Delete</button>
      </li>`;
    } else {
      return `
        <li class="bookmark-item" role="listitem" data-item-id="${item.id}">
          <section class="inner-item">
            <p class="item-title">${item.title}</p>
            <p class="item-rating">Rating: ${item.rating}</p>
          </section>
          <button type="button" class="item-delete-button">Delete</button>
        </li>`;
    }
  }
  
  function filterByRating(items) {
    let spreadItems = [...items];
    return spreadItems.filter(item => item.rating >= STORE.ratingsToDisplay);
  }

  function generateItemsString(Item) {
    const filteredItems = filterByRating(Item);
    console.log(Item)
    const items = filteredItems.map( item => generateItemElementHTML(item))
    return items.join("");
  }

  function getItemIdFromElement(item) {
    return $(item)
    .closest('.bookmark-item')
    .data('item-id');

  }

  function renderBookmarks() {
    let ItemsHTMLString = generateItemsString(STORE.items)
    $('.js-list').html(ItemsHTMLString);
    eventListener();
  }

  function handleAddItemButton() {
    $('.add-bookmark-button').on('click', () => {
      STORE.toggleModal();
      renderBookmarks();
    })
  }

  function handleRemoveBookmarkButton() {
    $('.js-list').on('click', '.item-delete-button', (event) => {
      const id = getItemIdFromElement(event.target);
      STORE.findAndDelete(id);
      renderBookmarks();
    })
  }

  function handledClickToExpand() {
    $('.inner-item').on('click', (event) => {
      const id = getItemIdFromElement(event.target);
      const item = STORE.findByID(id);
      item.displayDetail = !(item.displayDetail);
      renderBookmarks();
    });
  }

  function handleRatingSelect() {
    $('.rating-filter-select').on('change', (event) => {
      STORE.ratingsToDisplay = $('.rating-filter-select').val();
      renderBookmarks();
    })
  }

  function eventListener() {
    handleAddItemButton();
    handleRemoveBookmarkButton();
    handledClickToExpand();
    handleRatingSelect();
  }
  
  return {
    eventListener,
    renderBookmarks,
  }
}());