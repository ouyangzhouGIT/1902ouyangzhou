class Login {
    constructor () {
        this.inputUserName = document.querySelector("#inputUserName");
        this.inputPassword = document.querySelector("#inputPassword");
        this.btn = document.querySelector("#btn");
        this.checkbox = document.querySelector("#checkbox");
        this.bindEvent();
    }

    bindEvent () {
        this.btn.onclick = () => {
            let username = this.inputUserName.value,
                password = this.inputPassword.value,
                name = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}/,
                pwd = /^.{6,}$/;

            if(!(name.test(username))){
                 alert("用户名格式不正确，请重新输入");
                 return;
            }
            if(!(pwd.test(password))){
                alert("密码格式不正确，请重新输入");
                return;
            }

            tools.ajax("post", "../api/v1/login.php", {username, password}, data => {
                // console.log(data);
                alert(data.res_message);
                if(data.res_code === 1){
                    if(this.checkbox.checked){
                        tools.cookie("username", username, {expires: 7, path: "/"})
                    }else{
                        tools.cookie("username", username, {path: "/"})
                    }

                    window.location.href = "../index.html";
                }
            })
            return false;
        }
    }
}

new Login();