const STORE = (function() {
  const items = [];
  let ratingsToDisplay = 3;
  let addBookmarkModal = false;
  let error = "";

  function addItem(item) {
    console.log('Store.additem ran');
    api.createItem(item, () => {
      console.log('Create Item succesfully called')
      populateItems();
    })

  }

  function findByID(id) {
    return this.items.find( (item) => item.id === id);

  }
  const findAndDelete = function(id) {
    console.log(`Deleting item with ID: ${id}`)
    api.deleteItem(id, () => {
      populateItems();
      
    })
    //this.items = this.items.filter( object => object.id !== id);
  }

  function setModalTrue() {
      this.addBookmarkModal = true;
    //this.addBookmarkModal === true ? false : true;  Not sure why this didn't work, but it didn't
    console.log(`Modal Toggled to ${this.addBookmarkModal}`);
  }

  function setModalfalse() {
    this.addBookmarkModal = false;
    console.log(`Modal Toggled to ${this.addBookmarkModal}`);
  }

  function populateItems() {
    console.log('Populate Items called');
    api.getItems( (data) => {
      STORE.items = data;
      console.log("pupulate Items successful")
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
    setModalTrue,
    setModalfalse,
    newError,
    populateItems,
    changeRatingToDisplay,
    clearError,
    error
  }
}())