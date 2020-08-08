import axios from "axios";

const UserService = {
  async retrieveUsers() {
    try {
      const response = await axios.get("/api/users");

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  /*async getItem(itemLink) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].link === itemLink) {
        return Promise.resolve(this.items[i]);
      }
    }

    return null;
  }

  async createItem(item) {
    console.log("ItemService.createItem():");

    console.log(item);

    return Promise.resolve(item);
  }

  async deleteItem(itemId) {
    console.log("ItemService.deleteItem():");

    console.log("item ID:" + itemId);
  }

  async updateItem(item) {
    console.log("ItemService.updateItem():");

    console.log(item);
  }*/
};

export default UserService;
