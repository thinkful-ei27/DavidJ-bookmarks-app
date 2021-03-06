const api = (function () {
    const BASE_URL = "https://thinkful-list-api.herokuapp.com/davidj/bookmarks";

    function getItems(callback) {
        $.getJSON(BASE_URL, callback);
    }

    function createItem(newItem, callback) {
      console.log(newItem);
        $.ajax({
            url: `${BASE_URL}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newItem),
            success: callback,
            error: errorCallback
        });
    }

    const errorCallback = function(error) {
      const errorMessage = error.responseJSON.message;
      STORE.newError(errorMessage);
      bookmark.renderBookmarks();
      STORE.clearError();
    };

    function changeItem(newItem, id, callback) {
      $.ajax({
        url: `${BASE_URL}/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(newItem),
        success: callback,
        error: errorCallback
      });
    }

    function deleteItem(id, callback) {
      $.ajax({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
        contentType: 'application/json',
        success: callback,
        error: errorCallback
      });
    }



    return {
        getItems,
        createItem,
        changeItem,
        deleteItem
    }
})();