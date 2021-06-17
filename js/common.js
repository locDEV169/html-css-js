$(document).ready(function() {
    var object = {};
    var html = "";
    
    var convert = localStorage.getItem("local"); // lấy dữ liệu localstorage có tên local
    if (convert) {
        object = JSON.parse(convert)

    }
    $(".cartClick").append(Object.getOwnPropertyNames(object).length);
    


    $("a.add-to-cart").click(function() {
        
        
        // var html ='';
        var getImg = $(this).closest(".single-products").find(".productinfo").find("img").attr('src')
        var getName = $(this).closest(".single-products").find(".productinfo").find("p").text()
        var getPrice = $(this).closest(".single-products").find(".productinfo").find("h2").text()
        var getId = $(this).closest(".single-products").find(".productinfo").find(".id").text()
        var objCon = {};
        //đẩy vào obj con
        objCon["id"] = getId
        objCon["title"] = getName
        objCon["price"] = getPrice
        objCon["img"] = getImg
        objCon["qty"] = 1

        var sum = 1;
        var convert = localStorage.getItem("local"); // lấy dữ liệu localstorage có tên local
        if (convert) {
            
            object = JSON.parse(convert)
            Object.keys(object).map((key, value) => {
                var click = Object.getOwnPropertyNames(object).length
                if (key == getId) {
                    object[key]["qty"] += 1;
                    sum = 2;
                    
                    // $(this).closest("body").find(".cartClick").text(Object.getOwnPropertyNames(object).length)
                }
                
            })
        }
        if (sum != 2) {
            object[getId] = objCon
            
        }
        
        $(this).closest("body").find(".cartClick").text(Object.getOwnPropertyNames(object).length)
        
        var convertJson = JSON.stringify(object) // chuyển thành 1 chuỗi
        localStorage.setItem("local", convertJson) //hàm chuyển vào local
        console.log(convertJson)


    })


})