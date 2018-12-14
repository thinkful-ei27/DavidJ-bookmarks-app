const STORE = (function() {
  const items = [];
  let ratingsToDisplay = 3;
  let addBookmarkModal = false;
  let error = "";

  function addItem(item) {
    this.items.push(item);

  }

  function findByID(id) {
    return this.items.find( (item) => item.id === id);

  }
  const findAndDelete = function(id) {
    console.log(`Deleting item with ID: ${id}`)
    this.items = this.items.filter( object => object.id !== id);
  }

  function toggleModal() {
    if (this.addBookmarkModal) {
      this.addBookmarkModal = false;
    } else {
      this.addBookmarkModal = true;
    }
    //this.addBookmarkModal === true ? false : true;  Not sure why this didn't work, but it didn't

    console.log(`Modal Toggled to ${this.addBookmarkModal}`);
  }
  function populateItems() {
    api.getItems( (data) => {
      STORE.items = data;
      bookmark.renderBookmarks();
    })
  }

  function changeRatingToDisplay(newRating) {
    this.ratingsToDisplay = newRating;
  }

  function newError(errorMessage) {
    this.error = errorMessage;
  }

  function clearError() {
    this.error = "";
  }


  return {
    items,
    ratingsToDisplay,
    addBookmarkModal,
    addItem,
    findByID,
    findAndDelete,
    toggleModal,
    newError,
    populateItems,
    changeRatingToDisplay,
    clearError,
    error
  }
}())