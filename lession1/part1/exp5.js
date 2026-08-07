const obj = {
  value: 42,
  normalFn: function () {
    console.log(`Giá trị của obj này là ${this.value}`);
  },
  arrowFn: () => {
    // arrow function ko có this của riêng nó và nó sẽ phải lấy this ở bên ngoài để dùng nên ở đây nó sẽ ra undifined ở đây
    console.log(`Giá trị của obj này là ${this.value}`);
  },
};

obj.normalFn();
obj.arrowFn();

// fix
const obj1 = {
  value: 42,
  fixFn() {
    console.log(`Giá trị của obj này (từ fixFn) là ${this.value}`);

    const arrowFn = () => {
      console.log("--- Bắt đầu Arrow Function ---");
      console.log(`Giá trị của obj này (từ arrowFn) là ${this.value}`);
    };

    arrowFn();
  },
};

obj1.fixFn();
