let myCar = new Store(1,"Garage", "Volvo");
console.log("myCar", myCar);
let cart = [];

function getAll(list) {
    let html = ``;
    for (let i = 0; i < list.length; i++) {
        let car = list[i];
html += `
  <tr>
    <td>${car.id}</td>
    <td>${car.name}</td>
    <td>${car.brand}</td>
    <td>${car.price}</td>
    <td>${car.quantity}</td>
    <td><img src="${car.img}" width="100"/></td>
    <td>${car.status()}</td>
     <td title="${car.sum.toLocaleString('vi-VN')}">${car.sum.toLocaleString('vi-VN')}</td>
    <td><button onclick = "addtoCart(${car.id})">Mua xe</button></td>
    <td><button onclick="navigateToUpdate(${car.id})">Sửa</button></td>
    <td><button onclick="deleteCar(${car.id})">Xóa</button></td>
  </tr>
`;
    }
    document.getElementById("list_products").innerHTML=html;
}




function navToHome() {
    if (!localStorage.getItem("isLogin")) {
        navToLogin();
        return;
    }
    document.getElementById("ui").innerHTML = `
    <h2>Danh sách xe</h2>
    <button onclick="navToHome()">Home</button>
    <button onclick="navToAdd()">Thêm sản phẩm</button>
    <button onclick="handleLogout()">Đăng xuất</button>
    <button onclick= "viewCart()">Đơn hàng </button>
    <input id = "search" placeholder = " Tìm kiếm xe" oninput="search()">
    <table border="1">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Hình Ảnh</th>
                <th>Tình Trạng</th>
                <th>Thành Tiền</th>
                <th colspan="3">Action</th>
            </tr>
            <tbody id="list_products">
            </tbody>
        </table>
    `
    let list = myCar.getListCar();
    console.log("list", list);
    getAll(list);

}

function AddCar(){
    let list = myCar.getListCar();
    let id = list.length + 1;
    let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);
    let img = document.getElementById("img").value;
    let p = new Car(id,name,brand,price,quantity,img);
    myCar.add(p);
    navToHome();
}

function navToAdd(){
    document.getElementById("ui").innerHTML =`
    <h2>Thêm Sản Phẩm</h2>
    <form method = "post">
    <label>Tên Dòng Xe </label><br><br>
    <input type = "text" id = "name" placeholder = "Điền dòng xe"></input><br><br>
    <label for ="brand">Hãng Xe</label><br><br>
   <select name = "dong_xe" id = "brand">
   <option value = ""> -- Hãy chọn một dòng xe -- </option>
   <option value = "toyota">Toyota</option>
   <option value = "Mazda">Mazda</option>
   <option value = "bmw">Bmw</option>
   <option value = "Volvo">Volvo</option>
   </select><br><br>
   <label>Giá Xe </label><br><br>
    <input type = "number" id = "price" placeholder = "Điền giá xe"></input><br><br>
    <label>Số Lượng Xe </label><br><br>
    <input type = "number" id = "quantity" placeholder = "Số Lượng Xe"></input><br><br>
   <label>Hình Ảnh </label><br><br>
    <input type = "text" id = "img" placeholder = "Điền link hình ảnh"></input><br><br>
    <button onclick = "AddCar()" type = "button">Lưu</button>
    `
}

function updateCar(id){
    let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
    let price = Number(document.getElementById("price").value);
    let quantity = Number(document.getElementById("quantity").value);
    let img = document.getElementById("img").value;
    let p = new Car(id,name,brand,price,quantity,img);
    myCar.update(id,p);
    navToHome();
}
function navigateToUpdate(id) { 
    let car = myCar.getListCarbyId(id)
    document.getElementById("ui").innerHTML = `
    <h2>Sửa sản phẩm</h2>
    <div>
             <form method = "post">
    <label>Tên Dòng Xe </label><br><br>
    <input type = "text" id = "name" placeholder = "Điền dòng xe" value ="${car.name}"></input><br><br>
    <label for ="brand">Hãng Xe</label><br><br>
   <select name = "dong_xe" id = "brand" value = "${car.brand}">
   <option value = ""> -- Hãy chọn một dòng xe -- </option>
   <option value = "toyota">Toyota</option>
   <option value = "Mazda">Mazda</option>
   <option value = "bmw">Bmw</option>
   <option value = "Volvo">Volvo</option>
   </select><br><br>
   <label>Giá Xe </label><br><br>
    <input type = "number" id = "price" placeholder = "Điền giá xe" value ="${car.price}"></input><br><br>
    <label>Số Lượng Xe </label><br><br>
    <input type = "number" id = "quantity" placeholder = "Số Lượng Xe" value ="${car.quantity}"></input><br><br>
   <label>Hình Ảnh </label><br><br>
    <input type = "text" id = "img" placeholder = "Điền link hình ảnh" value ="${car.img}"></input><br><br>
       <button onclick = "updateCar(${id})" type = "button">Lưu</button>
    </div>
    `
}
function handleLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Tài khoản mặc định
    if (username === "admin" && password === "123") {
        localStorage.setItem("isLogin", true);
        navToHome();
    } else {
        alert("Sai tài khoản hoặc mật khẩu");
    }
}function navToLogin() {
    document.getElementById("ui").innerHTML = `
        <h2>Đăng nhập</h2>
        <label>Tên đăng nhập:</label><br>
        <input type="text" id="username" placeholder="Nhập tên"><br><br>
        <label>Mật khẩu:</label><br>
        <input type="password" id="password" placeholder="Nhập mật khẩu"><br><br>
        <button onclick="handleLogin()">Đăng nhập</button>
    `;
}
function handleLogout() {
    localStorage.removeItem("isLogin");
    navToLogin();
}
function deleteCar(id) {
    let isConfirm = confirm("Bạn có muốn xóa?");
    if(isConfirm){
        myCar.remove(id);
        navToHome();
}
}
function search(){
    let nameSearch = document.getElementById("search").value;
    let list = myCar.output(nameSearch);
    getAll(list);
}

function viewCart() {
    let html = `
        <h2>Giỏ Hàng</h2>
        <button onclick="navToHome()">← Quay lại</button>
        <table border="1">
            <tr>
                <th>Tên xe</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hình ảnh</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
                <th>Thanh Toán</th>
            </tr>
    `;

    let total = 0;
    for (let i = 0; i < cart.length;i++) {
        let car = cart[i];
        let sum = car.price * car.quantity;
        total += sum;
        html += `
            <tr>
                <td>${car.name}</td>
                <td>${car.price.toLocaleString('vi-VN')}</td>
                <td>${car.quantity}</td>
                <td><img src="${car.img}" width="80"/></td>
                <td>${sum.toLocaleString('vi-VN')}</td>
                <td><button onclick="removeFromCart(${car.id})">Xóa</button></td>
               <td> <button onclick = "payment()">Thanh toán</button></td>
            </tr>
        `;
    }

    html += `
        <tr>
            <td colspan="4"><strong>Tổng cộng</strong></td>
            <td colspan="2"><strong>${total.toLocaleString('vi-VN')} VND</strong></td>
            
            
        </tr>
        </table>
    `;

    document.getElementById("ui").innerHTML = html;
}
function removeFromCart(id){
    let isConfirm = confirm("Bạn có muốn xóa đơn hàng?");
    if(isConfirm){
        let index = -1;
        for(let i = 0; i < cart.length;i++){
            let p = cart[i];
            if(p.id === id){
                index = i;
                break;
            }
        }
        if(index !== -1){
            cart.splice(index,1);
            viewCart();
        }
        
}
}

function addtoCart(id){
    
    let car = myCar.getListCarbyId(id);
    let index = -1;
    for(let i = 0; i < cart.length;i++){
        if (cart[i].id === id) {
            index = i;
            break;
        }
    }
    if(index !== -1){
        cart[index].quantity += 1;
    }else{
        cart.push({
            id : car.id,
            name : car.name,
            price: car.price,
            quantity: 1,
            img: car.img
        });
    }
alert("đã thêm vào giỏ hàng");
}

function payment(){
    document.getElementById("ui").innerHTML = `
    <div>
     <button onclick="viewCart()">← Quay lại</button>
    <h3>Thông tin khách hàng</h3>
    <form method = " post">
    <label>Họ và tên </label><br><br>
    <input placeholder = " Điền họ và tên"><br><br>
    <label>Địa chỉ </label><br><br>
    <input placeholder = " Địa chỉ"><br><br>
    <label>SĐT </label><br><br>
    <input placeholder = " SĐT"><br><br>
    <label>email</label><br><br>
    <input placeholder = " email"><br><br>
    <button>Gửi</button>
    </form>
    </div>
    `
}

navToHome();


if (localStorage.getItem("isLogin")) {
    navToHome();
} else {
    navToLogin();
}