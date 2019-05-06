class EditTable{
    constructor (tbody) {
        this.tbody = document.querySelector(tbody);
        this.bindEvents()
    }

    bindEvents () {
        this.tbody.onclick = e => {
            let target = e.target,
                classList = Array.from(target.classList),
                tr = target.parentNode.parentNode;
            
            if(classList.includes("btn-edit")){
                this.editBtnClick(tr);
            }else if(classList.includes("btn-del")){
                this.delBtnClick(tr);
            }else if(classList.includes("btn-ok")){
                this.okBtnClick(tr);
            }else if(classList.includes("btn-cancel")){
                this.cancelBtnClick(tr);
            }
        }
    }

    editBtnClick (tr) {
        Array.from(tr.querySelectorAll("span")).forEach(span => {
            span.nextElementSibling.value = span.innerHTML;
        })

        tr.classList.add("edit");
    }

    delBtnClick (tr) {
        if(confirm("你确定要删除吗？")){
            let id = tr.getAttribute("data-id");
            tools.ajaxGetPromise("api/v1/delete.php", {id}).then(data => {
                // console.log(data);
            })
            getShop.init()
        }
    }

    okBtnClick (tr) {
        let inputPrice = tr.querySelector(".inputPrice"),
            inputNum = tr.querySelector(".inputNum"),
            id = tr.getAttribute("data-id"),
            price = inputPrice.value,
            num = inputNum.value;

        tools.ajaxGetPromise("api/v1/ok.php", {id, price, num}).then(data => {
            // console.log(data);
            alert(data.res_message);
            tr.classList.remove("edit");
            if(data.res_code === 1){
                inputPrice.previousElementSibling.innerHTML = inputPrice.value;
                inputNum.previousElementSibling.innerHTML = inputNum.value;
            }
        })
    }

    cancelBtnClick (tr) {
        tr.classList.remove("edit");
    }
}


new EditTable ("#tbody");