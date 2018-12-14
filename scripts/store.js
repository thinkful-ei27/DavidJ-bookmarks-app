const STORE = (function() {
  const items = [{id: "cuidahw18sjv1j", title: "YouTube", URL: "www.youtube.com", rating: 4, displayDetail: false, description: "A wonderfully accurate source of news and Culture"}];
  let ratingsToDisplay = 3;
  let addBookmarkModal = false;

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
    //this.addBookmarkModal ? false : true;

    console.log(`Modal Toggled to ${this.addBookmarkModal}`);
  }


  return {
    items,
    ratingsToDisplay,
    addBookmarkModal,
    addItem,
    findByID,
    findAndDelete,
    toggleModal,

  }
}())