Vue.component("cartitem", {
  props: ["item", "index"],
  data: function() {
    return {
      image: { "background-image": "url(" + this.item.imageURL + ")" }
    }
  },
  watch: {
    item: function() {
      this.image = { "background-image": "url(" + this.item.imageURL + ")" };
    }
  },
  methods: {
    remove: function() {
      this.$emit('remove', this.index, this.item);
    }
  },
  template:
      `<div class="cartItem">
        <div v-if="this.item.imageURL != undefined" class="cartImage" :style="image"></div>
        <p v-else style="font-family: 'Josefin Sans', sans-serif; font-size: 14pt; width: 100px; text-align: center;">No Image Available</p>
      
        <div style="margin: 0px 30px 0px 30px">
          <div style="font-family: 'Limelight', cursive; font-size: 20pt; margin: 0px 0px 15px 0px">{{item.name}}</div>
          <div style="font-family: 'Josefin Sans', sans-serif; font-size: 16pt;">&#36{{item.price}}</div>
        </div>
        
        <div class="popUpButton simpleButton" v-on:click="remove">Remove</div>
      </div>`
})

Vue.component("cartpopup", {
  props: ["cart"],
  data: function() {
    return {}
  },
  computed: {
    total: function() {
      var subtotal = 0;
      for (item in this.cart) {
        subtotal = subtotal + this.cart[item]["price"];
      }
      return subtotal;
    }
  },
  methods: {
    hide: function() {
      this.$emit('hide');
    },
    empty: function() {
      this.$emit('empty');
    },
    checkout: function() {
      this.$emit('checkout');
    },
    remove: function(index, item) {
      this.$emit('remove', index, item);
    }
  },
  template:
      `<div class="popUpBorder"><div class="popUpContent" style="flex-direction: column; justify-content: flex-start; align-items: center;">
     
        <cartitem @remove="remove" v-for="(item, index) in cart" v-bind:item="item" v-bind:index="index"></cartitem>

        <div class="josefin">{{this.cart.length}} Items</div>
        <div class="josefin">Total: &#36{{this.total}}</div>
        
        <div class="cartButtonContainer" v-if="cart.length > 0">
          <div class="popUpButton simpleButton" v-on:click="empty">Empty Cart</div>
          <div style="width: 50px;"></div>
          <div class="popUpButton simpleButton" v-on:click="checkout">Check Out</div>
        </div>
        
        <div style="position: absolute; right: 20px; top: 20px;" class="popUpButton simpleButton" v-on:click="hide">Exit</div>
      </div></div>`
})

Vue.component("instrumentpopup", {
  props: ["item"],
  data: function() {
    return {
      brandClass: this.item.brand.toLowerCase() + "PopUp"
    }
  },
  watch: {
    item: function() {
      this.brandClass = this.item.brand.toLowerCase() + "PopUp";
    }
  },
  methods: {
    hide: function() {
      this.$emit('hide');
    },
    add: function() {
      this.$emit('add');
    }
  },
  template:
      `<div class="popUpBorder"><div class="popUpContent">
        <img v-if="this.item.imageURL != undefined" :src=this.item.imageURL />
        <p v-else class="josefin" style="margin: 0px 50px 0px 100px">No Image Available</p>
        
        <div class="popUpInfo">
          <h3 class="limelight" style="font-size: 45pt;">{{item.name}}</h3>
          <p class="josefin">Type: {{item.type}}<br>Brand: {{item.brand}}<br>Price: &#36{{item.price}}</p>
          <div class="popUpButton" :class="brandClass" v-on:click="add">Add To Cart</div>
        </div>
        
        <div style="position: absolute; left: 20px; top: 20px;" class="popUpButton" :class="brandClass" v-on:click="hide">Exit</div>
      </div></div>`
})

Vue.component("createinstrument", {
  props: [],
  data: function() {
    return {
      name: "",
      type: "",
      brand: "",
      price: 0,
      imageURL: "",
      errorMessage: null
    }
  },
  methods: {
    hide: function() {
      this.$emit('hide');
      this.name = "";
      this.type = "";
      this.brand = "";
      this.price = 0;
      this.imageURL = "";
      this.errorMessage = null;
    },
    create: function() {
      if (this.name === "") {
        this.errorMessage = "Please add a name.";
      } else if (this.type === "") {
        this.errorMessage = "Please add a type.";
      } else if (this.brand === "") {
        this.errorMessage = "Please choose a brand.";
      } else if (this.price === 0) {
        this.errorMessage = "Please add a price other than $0.";
      } else {
        this.$emit('create', {name: this.name, type: this.type, price: this.price, brand: this.brand}); 
      }
    }
  },
  template:
    `<div class="popUpBorder"><div class="popUpContent josefin">
    
      <div class="popUpInputContainer">
        <input class="nameInput" type="text" v-model="name" placeholder="Name"/><br>
        <input class="textInput" type="text" v-model="type" placeholder="Type"/><br>
        
        Choose a Brand<br>
        <div><input type="radio" id="Fender" name="brand" value="Fender" v-model="brand"><label class="textInput" for="Fender">Fender</label></div>
        <div><input type="radio" id="Yamaha" name="brand" value="Yamaha" v-model="brand"><label class="textInput" for="Yamaha">Yamaha</label></div>
        <div><input type="radio" id="Maton" name="brand" value="Maton" v-model="brand"><label class="textInput" for="Maton">Maton</label></div><br>
        
        <input class="textInput" type="number" v-model="price" placeholder="Price"/><br>
        <input class="textInput" type="text" v-model="imageURL" placeholder="Image URL"/><br>
        {{this.errorMessage}}
        <div class="popUpButton simpleButton" v-on:click="create">Create Instrument</div>
      </div>
      
      <div style="position: absolute; left: 20px; top: 20px;" class="popUpButton simpleButton" v-on:click="hide">Exit</div>
    </div></div>`
})

Vue.component("instrument", {
  props: ["item", "index"],
  data: function() {
    return {
      image: { "background-image": "url(" + this.item.imageURL + ")" },
      brandClass: this.item.brand.toLowerCase()
    }
  },
  watch: {
    item: function() {
      this.image = { "background-image": "url(" + this.item.imageURL + ")" };
      this.brandClass = this.item.brand.toLowerCase();
    }
  },
  methods: {
    click: function() {
      this.$emit('click', this.item, this.index);
    },
    add: function() {
      this.$emit('add', this.index);
    }
  },
  template:
    `<div class="container" v-on:click="click" :class="brandClass">
      <div class="card diamond"></div>
      <div class="card"><div class="small" :style="image">
        <h3 class="limelight">{{item.name}}</h3>
        <div class="button" v-on:click="add">Add to Cart</div>
      </div></div>
    </div>`
})

var app = new Vue({
  el: "#app",
  data: {
    instruments: [
      {name: "Piano" , price: 7000, type: "String", brand: "Fender", imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.JhPgyQj8Hlhxo2KQTHulVQHaEK%26pid%3DApi&f=1"},
      {name: "Violin", price: 400, type: "String", brand: "Fender", imageURL: "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2017/04/expensive-violin.jpg"},
      {name: "Guitar", price: 500, type: "String", brand: "Yamaha", imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RggSXDeIOLjvk7VrN2YDQgHaJb%26pid%3DApi&f=1"},
      {name: "French Horn", price: 1200, type: "Brass", brand: "Yamaha", imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.djiLHFOrP3bgEpiiV8-2CAHaEK%26pid%3DApi&f=1"},
      {name: "Saxophone", price: 600, type: "Brass", brand: "Maton", imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.OLBNxQMrpooW0ucBuZzJagAAAA%26pid%3DApi&f=1"},
      {name: "Trumpet", price: 800, type: "Brass", brand: "Maton", imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.iPxQa3V-fUdkA9dHhrGWjwHaE7%26pid%3DApi&f=1"}],
    popUp: {},
    popUpIndex: 0,
    popUpType: "info",
    popUpVisible: false,
    allowPopUp: true,
    cart: [],
    search: ""
  },
  methods: {
    showPopUp: function(item, index) {
      if (this.allowPopUp) {
        this.popUp = item;
        this.popUpIndex = index;
        this.popUpType = "info";
        this.popUpVisible = true;
      } else {
        this.allowPopUp = true;
      }
    },
    showCreateInstrument: function() {
      this.popUpType = "create";
      this.popUpVisible = true;
    },
    showCart: function() {
      this.popUpType = "cart";
      this.popUpVisible = true;
    },
    hidePopUp: function() {
      this.popUpVisible = false;
    },
    addToCart: function(index) {
      var itemToAdd = this.instruments[index];
      this.cart = this.cart.concat([itemToAdd]);
      this.instruments.splice(index, 1);
      this.allowPopUp = false;
      this.hidePopUp();
    },
    popUpAddToCart: function() {
      this.addToCart(this.popUpIndex);
      this.hidePopUp();
    },
    emptyCart: function() {
      this.instruments = this.instruments.concat(this.cart);
      this.cart = [];
    },
    createInstrument: function(item) {
      this.instruments = this.instruments.concat([item]);
      this.hidePopUp();
    },
    resetSearch: function() {
      this.search = "";
    },
    removeCartItem: function(index, item) {
      this.instruments = this.instruments.concat([item]);
      this.cart.splice(index, 1);
    },
    checkOut: function() {
      this.cart = [];
      this.popUpType = "thanks";
      setTimeout(() => {
        this.popUpVisible = false;
      }, 2500)
    }
  }
})