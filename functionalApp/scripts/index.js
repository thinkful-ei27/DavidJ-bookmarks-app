/*const STORE = {

  items: [{id: 'cuidahw18sjv1j', title: "YouTube", URL: 'www.youtube.com', rating: 4, displayDetail: true, description: 'A wonderfully accurate source of news and Culture'}],
  ratingsToDisplay: 1,
  addBookmarkModal: false
};

function generateItemElementHTML(item) {

  console.log(`Generate Item Element HTML ran for the ${item.title}`);
  if (item.displayDetail) {
    return `
    <li class="bookmark-item" role="listitem" id="${item.id}">
    <section class="inner-item">
      <p class="item-title">Item Title: ${item.title}</p>
      <p class="item-rating">Rating: ${item.rating}</p>
      <p class="item-URL">Visit Site: ${item.URL}</p>
      <p class="item-Description" role="note">Description: ${item.description}</p>
      <button type="button" class="item-delete-button">Delete</button>
    </section>
    </li>`
  } else {
      return `
      <li class="bookmark-item" role="listitem" id="${item.id}">
      <section class="inner-item">
        <p class="item-title">${item.title}</p>
        <p class="item-rating">Rating: ${item.rating}</p>
      </section>
      </li>`
  }
}

function generateItemsString(Items) {

  console.log("Generating the Items passed into generateItemsString");
  const items = Items.map( item => generateItemElementHTML(item))
  return items.join("");
}

function addItemToSTORE(item) {

  console.log(`Adding "${title}" to STORE`);
  STORE.items.push({id: cuid(), 'title': item.title, 'rating': item.rating, 'displayDetail': item.displayDetail, 'description': item.description});
}

function renderShoppingList() {
  console.log('renderShoppingList ran');
  let ItemsHTMLString = generateItemsString(STORE.items)
  $('.js-list').html(ItemsHTMLString);
}

function handleAddItemButton() {
  $('.add-bookmark-button').on('click', (event) => {
    STORE.addBookmarkModal = true;
  })
}

function handleRemoveBookmarkButton() {
  //YOU HAVE TO ADD A BUTTON TO THE LIST ITEMS
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.bookmark-item')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleRatingSelect() {
  $('.rating-filter-select').on('change', (event) => {
    STORE.ratingsToDisplay = $('.rating-filter-select').val();
  })
}
*/
function main() {
  STORE.populateItems();
  bookmark.eventListener();
  bookmark.renderBookmarks();

}
$(main());
