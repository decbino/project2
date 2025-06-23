class Car {
    constructor(id, name, brand, price, quantity, img) {
      this.id = id;
      this.name = name;
      this.brand = brand;
      this.price = price;
      this.quantity = Number(quantity);
      this.img = img;
    }

    get sum() {
      return this.price * this.quantity;
    }

    
    status(){
        if(this.quantity > 0){
            return " Còn hàng";
        }else{
        return "Hết Hàng";
    }
    }
}