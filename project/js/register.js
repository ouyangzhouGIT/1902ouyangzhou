class Redister {
    constructor () {
        this.inputUserName = document.querySelector("#inputUserName");
        this.inputPassword = document.querySelector("#inputPassword");
        this.btn = document.querySelector("#btn");
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

            tools.ajax("post", "../api/v1/register.php", {username, password}, data => {
                // console.log(data);
                alert(data.res_message);
            })
            return false;
        }
    }
}

new Redister()