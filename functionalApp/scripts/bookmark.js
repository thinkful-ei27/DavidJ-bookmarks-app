const bookmark = (function() {

  function generateItemElementHTML(item) {
    console.log(`Generate Item Element HTML ran for ${item.title}`);
    if (item.displayDetail) {
      return `
      <li class="bookmark-item" role="listitem" data-item-id="${item.id}">
        <section class="inner-item">
          <p class="item-title">Item Title: ${item.title}</p>
          <p class="item-rating">Rating: ${item.rating}</p>
          <p class="item-URL">Visit Site: ${item.url}</p>
          <p class="item-Description" role="note">Description: ${item.desc}</p>
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
  function generateAddButtonHTML() {
    return `
    <form action="#" method="GET" id="add-bookmark-form" role="form">
      <label for="add-item-title">Title</label>
      <input type="text" name="add-item-title" class="add-item-title">
      <label for="add-item-url">URL</label>
      <input type="text" name="add-item-url" class="add-item-url">
      <label for="add-item-description"></label>
      <input type="text" name="add-item-description" class="add-item-description">
      <select class="add-item-rating">
        <option value="">Set Page Rating</option>  
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit" form="add-bookmark-form" value="Submit" class="add-bookmark-form-button">Add Item</button>
  </form>`
  }
  
  function filterByRating(items) {
    let spreadItems = [...items];
    return spreadItems.filter(item => item.rating >= STORE.ratingsToDisplay);
  }

  function generateItemsString(Item) {
    const filteredItems = filterByRating(Item);
    const items = filteredItems.map( item => generateItemElementHTML(item))
    return items.join("");
  }

  function getItemIdFromElement(item) {
    return $(item)
    .closest('.bookmark-item')
    .data('item-id');

  }

  function renderBookmarks() {
    let ItemsHTMLString = "";
    if (STORE.error !== "") {
      alert(STORE.error);
    }
    if (STORE.addBookmarkModal) {
      ItemsHTMLString = generateAddButtonHTML()
    } else {
     ItemsHTMLString = generateItemsString(STORE.items)
    }
    $('.js-list').html(ItemsHTMLString);
    eventListener();
  }

  function handleAddItemButton() {
    $('.add-bookmark-button').on('click', () => {
      STORE.toggleModal();
      renderBookmarks();
    })
  }

  function handleAddItemSubmit() {
    $('#add-bookmark-form').submit( (event) => {
      event.preventDefault();
      let newTitle = $('.add-item-title').val();
      let newURL = $('.add-item-url').val();
      let newDescription = $('.add-item-description').val();
      let newRating = $('.add-item-rating').val();
      let newItem = {
        id: cuid(),
        title: newTitle,
        url: newURL + "",
        rating: newRating,
        displayDetail: false,
        description: newDescription
      }
      STORE.addItem(newItem);
      console.log(`New Title: ${newTitle}, new URL: ${newURL}, new description: ${newDescription}, new Rating: ${newRating}`);
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
      let newRating = $('.rating-filter-select').val();
      STORE.changeRatingToDisplay(newRating);
      renderBookmarks();
    })
  }

  function eventListener() {
    handleAddItemButton();
    handleAddItemSubmit()
    handleRemoveBookmarkButton();
    handledClickToExpand();
    handleRatingSelect();
  }
  
  return {
    eventListener,
    renderBookmarks,
  }
}());