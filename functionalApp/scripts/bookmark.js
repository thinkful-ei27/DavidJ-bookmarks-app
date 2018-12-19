const bookmark = (function() {

  function generateItemElementHTML(item) {
    console.log(`Generate Item Element HTML ran for ${item.title}`);
    if (item.displayDetail) {
      return `
      <li class="bookmark-item" role="listitem" data-item-id="${item.id}">
        <section class="inner-item">
          <p class="item-title">Item Title: ${item.title}</p>
          <p class="item-rating">Rating: ${item.rating}</p>
          <p class="item-URL">Visit Site: <a href="${item.url}">${item.url}</a></p>
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
      <fieldset>
        <legend>Add a new class</legend>
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
      </fieldset>
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
  }

  function handleAddItemButton() {
    $('.add-bookmark-button').on('click', () => {
      STORE.setModalTrue();
      renderBookmarks();
    })
  }

  function handleAddItemSubmit() {
    $('.total-container').on('submit', $('#add-bookmark-form'), (event) => {
      event.preventDefault();
      let newTitle = $('.add-item-title').val();
      let newURL = $('.add-item-url').val();
      let newDescription = $('.add-item-description').val();
      let newRating = $('.add-item-rating').val();
      if (newRating == 0) newRating = 3;
      let newItem = {
        title: newTitle,
        url: `http://${newURL}`,
        desc: newDescription,
        rating: newRating,
      }
      STORE.addItem(newItem)
      console.log(`New Title: ${newTitle}, new URL: ${newURL}, new description: ${newDescription}, new Rating: ${newRating}`);
      STORE.setModalfalse();
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
    $('.js-list').on('click', '.inner-item', (event) => {
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