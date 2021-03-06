console.log("R1D76_AddTotalCalories");
// Storage Controller

// Item Controller
const ItemController = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure
  const data = {
    items: [
      // {
      //   id: 0,
      //   name: "Steak Dinner",
      //   calories: 1200
      // },
      // {
      //   id: 1,
      //   name: "Cookie",
      //   calories: 400
      // },
      // {
      //   id: 2,
      //   name: "Eggs",
      //   calories: 300
      // }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    getTotalCalories: function() {
      const reducer = (accumulator, item) => accumulator + item.calories;
      // Sum the calories from items
      const totalCalores = data.items.reduce(reducer, 0);
      // set total calories
      data.totalCalories = totalCalores;
      return data.totalCalories;
    },
    logData: function() {
      return data;
    },
    getItems: function() {
      return data.items;
    },
    addItem: function({ name, calories }) {
      let id;
      // create ID
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      const newItem = new Item(id, name, calories);
      data.items.push(newItem);

      return newItem;
    }
  };
})();

// UI Controller
const UIController = (function() {
  // console.log("UI Controller");
  const UISelectors = {
    itemList: "#item-list",
    itemName: "#item-name",
    itemCalories: "#item-calories",
    itemAdd: ".add-btn",
    totalCalories: ".total-calories"
  };
  const viewListCalories = document.querySelector(UISelectors.itemList);

  // Public Methods
  return {
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    populateItemList: function(items) {
      let html = "";
      items.forEach(function(item) {
        html += `
        <li class="collection-item" id="item-0">
          <strong>${item.name}</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });
      viewListCalories.innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value
      };
    },
    cleanInputs: function() {
      document.querySelector(UISelectors.itemName).value = "";
      document.querySelector(UISelectors.itemCalories).value = "";
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    getSelectors: function() {
      return UISelectors;
    },
    // test: function() {
    //   console.log("This is a test");
    // },
    addListItem: function(item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // this.test();
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add html
      li.innerHTML = `
        <strong>${item.name}</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li);
    }
  };
})();

// App Controller
const AppController = (function(ItemController, UIController) {
  // console.log(ItemController.logData());
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UIController.getSelectors();

    // Add item event
    document.querySelector(UISelectors.itemAdd).addEventListener("click", itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UIController.getItemInput();
    // Check for name and calories input
    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemController.addItem(input);
      // Add item to ui list
      UIController.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Total Calories to the UI
      UIController.showTotalCalories(totalCalories);

      // Clear Fields
      UIController.cleanInputs();
    } else {
      console.error("Empty Form");
    }

    e.preventDefault();
  };

  // Public Methods
  return {
    init: function() {
      console.log("Initializing App");

      // Fetch items from data structure
      const items = ItemController.getItems();

      // Check if any items
      if (items.length === 0) {
        UIController.hideList();
      } else {
        // Populate list with items
        UIController.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemController.getTotalCalories();

      // Add Total Calories to the UI
      UIController.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemController, UIController);

AppController.init();
