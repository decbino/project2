class Store {
    id;
    name
    brand;
    listCar;
    constructor(id,name,brand){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.listCar = [];
        this.getDataInStorage();
    }
add(newCar){
  this.listCar.push(newCar);
  this.saveDataInStorage();

}
remove(id){
    let index = -1;
    for(let i = 0; i < this.listCar.length;i++){
        let p = this.listCar[i];
        if(p.id == id){
            index = i;
            break;
        }
    }
    if(index == -1){
        alert("không có sản phẩm này");
    }else{
        this.listCar.splice(index,1)
    }
    this.saveDataInStorage();
}

getListCar(){
    return this.listCar;
}
 update(id,newCar){
    let index = -1;
    for(let i = 0; i< this.listCar.length;i++){
        let p = this.listCar[i];
        if(p.id == id){
            index = i;
            break;
        }
    }
    if(index === -1){
        alert("không có sản phẩm nào");
    }else{
        this.listCar[index] = newCar;
    }
    this.saveDataInStorage();

 }
 getListCarbyId(id){
    for(let i = 0; i<this.listCar.length;i++){
        let p = this.listCar[i];
        if(p.id === id){
            return p;
        }
    }
 }
saveDataInStorage(){
    localStorage.setItem("listCar", JSON.stringify(this.listCar));
}
getDataInStorage() {
    let data = localStorage.getItem("listCar");
    if (data) {
        let arr = JSON.parse(data);
        this.listCar = arr.map(c => new Car(c.id, c.name, c.brand, c.price, c.quantity, c.img));
    } else {
        this.listCar = [];
    }
}
}