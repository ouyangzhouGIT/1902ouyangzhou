class SelectList{
    constructor (tbody) {
        this.tbody = document.querySelector(tbody);
        //默认处于第一页
        this.pageIndex = 1;
        //默认总页数为1
        this.pageCound = 1;
        //count指的是一页的数量(不能被修改)
        Object.defineProperty(this, "count", {
            writable : false,
            value : 4
        });
        this.init();
    }

    init () {
        // 解构赋值
        let {pageIndex, count} = this; 
        tools.ajaxGetPromise("api/v1/select.php", {pageIndex, count}).then(data => {
            // console.log(data);
            if(data.res_code === 1){
                if(data.revisePage){
                    this.pageIndex = data.revisePage;
                }
                // console.log(data)
                this.render(data.res_body.data);
                this.pageCount = data.res_body.pageCount;
                pagination.render(this);
            }else{
                //查询失败的话弹出失败信息
                alert(data.res_massage);
            }
        })
    }

    render (list) {
        // console.log(list);
        let html = "";
        list.forEach((shop, index) => {
            html += `<tr data-id = "${shop.id}">
                        <td>${(this.pageIndex-1) * this.count + index+1}</td>
                        <td>${shop.name}</td>
                        <td>
                            <span>${shop.price}</span>
                            <input type="text" class="inputPrice">
                        </td>
                        <td>
                            <span>${shop.num}</span>
                            <input type="text" class="inputNum">
                        </td>
                        <td>
                            <button type="button" class="btn btn-info btn-xs btn-edit">编辑</button>
                            <button type="button" class="btn btn-danger btn-xs btn-del">删除</button>
                            <button type="button" class="btn btn-warning btn-xs btn-ok">确定</button>
                            <button type="button" class="btn btn-success btn-xs btn-cancel">取消</button>
                        </td>
                    </tr>`
        })
        this.tbody.innerHTML = html;
    }
}

let getShop = new SelectList("#tbody");