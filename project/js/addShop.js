class AddShop {
    constructor () {
        this.inputName = document.querySelector("#inputName");
        this.inputPrice = document.querySelector("#inputPrice");
        this.inputNum = document.querySelector("#inputNum");
        this.addBtn = document.querySelector("#btn-shop-add");
        this.init();
    }

    init () {
        this.addBtn.onclick = () => {
            let name = this.inputName.value,
                price = this.inputPrice.value,
                num = this.inputNum.value;
            //表单验证
            if(name === "" || price === "" || num === ""){
                alert("输入不能为空");
                return;
            };

            tools.ajaxGetPromise("api/v1/add.php", {name, price, num}).then(data => {
                // console.log(data);
                if(data.res_code === 1){
                    alert(data.res_message);

                    //清空input的value
                    this.inputName.value = "";
                    this.inputPrice.value = "";
                    this.inputNum.value = "";

                    //隐藏模态框
                    $('#addModal').modal('hide');

                    //重新渲染页面
                    getShop.init();
                    // console.log(getShop)
                }else{
                    alert(data.res_message);
                }
            })
        }
    }

}

new AddShop();