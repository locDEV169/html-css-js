$(document).ready(function() {
    var getLocal = localStorage.getItem("local") //đưa biến trong localstorage ra
    var html = ''
    var addSum =''
    var totalCart
    if (getLocal) {
        abc = JSON.parse(getLocal)
        let sum = 0
        Object.keys(abc).map(function(key, index) {
            var getId =  abc[key]['id']
            console.log(getId)
            var getPrice = abc[key]['price'] // lấy ra chuỗi price
                // console.log(getPrice)
            var price = getPrice.replace('$', '')
                // console.log(price)
            total = price * abc[key]['qty']
                // console.log(total)
                var getP = abc[key]['price'].replace('$', '')
               
                sum += (abc[key]['qty'] * parseInt(abc[key]['price'].replace('$', '')));
                console.log("quantity",abc[key]['qty'],"price",parseInt(getP),"sum",sum)
                totalCart = sum
                

            html += "<tr>" +
                "<td class='cart_product'>" + "<a href=''>" + "<img src ='" + abc[key]['img'] + "'alt =''> </a> " + "</td>" +
                "<td class='cart_description'>" +
                    "<h4><a href=''>" + abc[key]['title'] + "</a></h4><p> " + getId +
                "</p></td>" +
                "<td class='cart_price'>" + "<p>" + abc[key]['price'] + "</p>" + "</td>" +
                "<td class='cart_quantity'>" +
                    "<div class='cart_quantity_button'><a class='cart_quantity_up'> + </a>" +
                        "<input class='cart_quantity_input' type='text' name='quantity' value='" + abc[key]['qty'] + "' autocomplete='off' size='2'>" +
                        "<a class='cart_quantity_down' > - </a>" +
                    "</div>" +
                "</td>" +
                "<td class='cart_total'>" +
                    "<p class= 'cart_total_price'>$" + total + "</p>" +
                "</td>" +
                    "<td class='cart_delete'>" +
                        "<a class= 'cart_quantity_delete'><i class='fa fa-times'> </i></a >" +
                    "</td>" +
                "</tr>" 
            addSum ="<ul class='result'>" + 
                        "<li>Total <span class='addSum'>$" + sum + "</span></li>" +
                    "</ul>"  
                    

                
            // console.log(key)
            console.log("qty start " + abc[key]['qty'])
            // if(abc[key]['qty'] <= 0 ){
            //     $(this).closest("tr").remove()
            //     delete abc[key]; // hàm xóa 
            // }
        });
    }
    $("table.table-condensed tbody").append(html);
    $(".result").append(addSum);

    
    $("a.cart_quantity_up").click(function() {
        var sl = $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val();
        var price = $(this).closest("tr").find("td.cart_price").find("p").text();
        var id = $(this).closest("tr").find("td.cart_description").find("p").text();
        
        //
        var getId = id.replace(' ', '') 
        // console.log(getId)
        sl = 1 + parseInt(sl);
        //
        $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val(sl);
        var replacePrice = price.replace('$', '') // loại bỏ dấu cách $
        // tổng từng cái 
        total = parseInt(sl) * replacePrice;
        //
        $(this).closest("tr").find("td.cart_total").find("p").text("$" + total)
        // // total gần cuối trang
        // $(this).closest("body").find(".result").find("li:last-child").find("span").text("$" + total)
        //
        var danhsachSP = localStorage.getItem("local")
        // dùng để tăng giá trị của từng cái item trong cái local 
        // mổi cái item có 1 cái key không trùng
        // map => duyệt qua hết tất cả cái item 
        // tạo ra một biến tổng (tổng cho toàn giỏ hàng)
        // nếu mà cái key bằng cái bằng cái mà mình đăng tăng số lượng 
        // tăng cái quantity +1
        // totalCart += quantity*Price
        // ngược lại totalCart += quantity*price
        if (danhsachSP) {
            let sum = 0
            abc = JSON.parse(danhsachSP)
            Object.keys(abc).map((key, value) => {
                    if (key == getId) {
                       
                        abc[key]['qty'] += 1
                        // sum += (abc[key]['qty'] * parseInt(abc[key]['price'].replace('$', '')));
                        totalCart += parseInt(replacePrice);
                        // console.log("quantity",abc[key]['qty'],"price",parseInt(getP),"sum",sum)
                    } 
                    

                })
                // console.log(abc)
                // $(this).closest("body").find(".result").find("li:last-child").find("span").text("$" + sum)
                // totalCart = sum
                $(".result").find("li:last-child").find("span").text("$" + totalCart)
        }
        
        var ds = JSON.stringify(abc)
        localStorage.setItem("local", ds);
        console.log(ds)

        
    })

    console.log("html sum cong" + totalCart)
    
    $("a.cart_quantity_down").click(function() {
        var sl = $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val();
        var price = $(this).closest("tr").find("td.cart_price").find("p").text();
        var id = $(this).closest("tr").find("td.cart_description").find("p").text();
        //
        var getId = id.replace(' ', '')
        console.log(getId)
        sl = parseInt(sl) - 1;
        //
        $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val(sl);
        
        var replacePrice = price.replace('$', '')
        total = parseInt(sl) * replacePrice; // lấy price * số lượng
        //
        $(this).closest("tr").find("td.cart_total").find("p").text("$" + total)
        // //total ở cuối trang
        // $(this).closest("body").find(".result").find("li:last-child").find("span").text("$" + total)
        //
        var danhsachSP = localStorage.getItem("local")
        //
        if (danhsachSP) {
            abc = JSON.parse(danhsachSP)
            let sum = 0
            Object.keys(abc).map((key, value) => {
                    console.log("QTY down"+ abc[key]['qty'])
                    if (key == getId) {
                        abc[key]['qty'] -= 1
                        // var getP = abc[key]['price'].replace('$', '')
                        // sum += (abc[key]['qty'] * parseInt(abc[key]['price'].replace('$', '')));
                        totalCart -= parseInt(replacePrice);
                        // console.log("quantity",abc[key]['qty'],"price",parseInt(getP),"sum",sum)
                        if(abc[key]['qty'] <= 0){
                            
                            $(this).closest("tr").remove()
                            delete abc[key]; // hàm xóa 
                            
                        }
                    }
                    
                    
                })
                // totalCart = sum
                $(".result").find("li:last-child").find("span").text("$" + totalCart)
        }
        
        var ds = JSON.stringify(abc)
        localStorage.setItem("local", ds);
        console.log(ds)



        
    })
    console.log("html sum tru" + totalCart)
    // xóa
    $(".cart_quantity_delete").click(function() {
        var id = $(this).closest("tr").find("td.cart_description").find("p").text();
        var total = $(this).closest("body").find(".result").find(".addSum").text();
        console.log("total" + total.replace('$',''))
        
        // $(this).closest("tr").remove()
        console.log(id)
        var danhsachSP = localStorage.getItem("local")
        if (danhsachSP) {
            abc = JSON.parse(danhsachSP)
            let sum = 0
            Object.keys(abc).map((key, value) => {
                console.log(key)
                var getId = id.replace(' ', '')
                console.log(getId)
                
                if (key == getId) {
                    var getPrice = abc[key]['price']
                    console.log("html Sum pre " + totalCart)
                    console.log("QTY delete " + abc[key]['qty'])
                    console.log("get Price " + (getPrice.replace('$','') * abc[key]['qty']))
                    totalCart -= (parseInt(getPrice.replace('$','') * abc[key]['qty']))
                    
                    $(this).closest("tr").remove()
                    delete abc[key]; // hàm xóa 
                    console.log("html Sum last " + totalCart)
                    
                }
                // sum += (abc[key]['qty'] * parseInt(abc[key]['price'].replace('$', '')));
                $(".result").find("li:last-child").find("span").text("$" + totalCart)
                console.log("html sum delete" + totalCart)
            })
            
        }
        

        var ds = JSON.stringify(abc)
        localStorage.setItem("local", ds)
       
    })
})