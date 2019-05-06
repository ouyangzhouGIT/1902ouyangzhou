class IsLogin {
    constructor () {
        this.unLoginUL = document.querySelector("#unlogin-ul");
        this.loginUL = document.querySelector("#login-ul");
        this.name = document.querySelector("#username");

        this.username = tools.cookie("username");
        this.init();
    }

    init() {
        if(this.username) {
            this.unLoginUL.classList.add("hidden");
            this.loginUL.classList.remove("hidden");
            this.name.innerHTML = this.username;
            console.log(this.username)
        }
    }
}

new IsLogin();