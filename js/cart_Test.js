$(document).ready(function() {
    var convert = localStorage.getItem("local");
    if (convert) {
        abc = JSON.parse(convert)
            // console.log(abc)
    }

    var html = "";

    Object.keys(abc).map((key, value) => {

        var str = abc[key]['price'] // lấy ra chuỗi price
        console.log(str)
        var res = str.split("$") // tách chữ $

        console.log(res[1])
        tong = res[1] * abc[key]['qty'];

        html +=
            "<tr id='" + key + "'>" +
            "<td class='cart_product'>" +
            "<a href=''><img src=" + abc[key]['img'] + " alt=''></a>" +
            "</td>" +
            "<td class='cart_description'>" +
            "<h4>" +
            "<a href=''>" + abc[key]['tiile'] + "</a>" +
            "</h4>" +
            "<p>" + key + "</p>" +
            "</td>" +
            "<td class='cart_price'>" +
            "<p>" + abc[key]['price'] + "</p>" +
            "</td>" +

            "<td class='cart_quantity'>" +
            "<div class='cart_quantity_button'>" +
            "<a class='cart_quantity_up' href=''> + </a>" +
            "<input class='cart_quantity_input' type='text' name='quantity' value='" + abc[key]['qty'] + "'autocomplete='off' size='2'>" +
            "<a class='cart_quantity_down' href=''> - </a>" +
            "</div>" +
            "</td>" +
            "<td class='cart_total'>" +
            "<p class='cart_total_price'>$" + tong +
            "</p>" +
            "</td>" +
            "<td class='cart_delete'>" +
            "<a class='cart_quantity_delete' href=''>" +
            "<i class='fa fa-times'></i>" + "</a>" +
            "</td>" +
            "</tr>";



    })
    $("table tbody").append(html);


    // tang sl

    $(".cart_quantity_up").click(function() {
        var sl = $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val();
        var price = $(this).closest("tr").find("td.cart_price").find("p").text();
        var id = $(this).closest("tr").find("td.cart_description").find("p").text();
        // console.log(id)
        sl = 1 + parseInt(sl);

        $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val(sl);
        var res = price.split("$")
        t = parseInt(sl) * res[1];

        $(this).closest("tr").find("td.cart_total").find("p").text("$" + t)



        var danhsachSP = localStorage.getItem("local")

        if (danhsachSP) {
            abc = JSON.parse(danhsachSP)

            Object.keys(abc).map((key, value) => {
                    if (key == id) {
                        abc[key]['qty'] += 1
                    }

                })
                // console.log(abc)
        }

        var ds = JSON.stringify(abc)
        localStorage.setItem("local", ds)
        console.log(ds)



        return false;
    })

    //giam sl
    $(".cart_quantity_down").click(function() {
            var sl = $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val();
            var price = $(this).closest("tr").find("td.cart_price").find("p").text();
            var id = $(this).closest("tr").find("td.cart_description").find("p").text();
            sl = parseInt(sl) - 1;
            $(this).closest("div.cart_quantity_button").find("input.cart_quantity_input").val(sl);
            var res = price.split("$")
            t = parseInt(sl) * res[1];

            $(this).closest("tr").find("td.cart_total").find("p").text("$" + t)

            if (sl <= 0) {
                $(this).closest("tr").remove()
            }
            var danhsachSP = localStorage.getItem("local")

            if (danhsachSP) {
                abc = JSON.parse(danhsachSP)

                Object.keys(abc).map((key, value) => {
                    if (key == id) {
                        abc[key]['qty'] -= 1
                    }

                })

            }
            var ds = JSON.stringify(abc)
            localStorage.setItem("local", ds)
            console.log(ds)
            return false;
        })
        // xoa the html
    $(".cart_quantity_delete").click(function() {
        var id = $(this).closest("tr").find("td.cart_description").find("p").text();
        $(this).closest("tr").remove()

        var danhsachSP = localStorage.getItem("local")
        if (danhsachSP) {
            abc = JSON.parse(danhsachSP)

            Object.keys(abc).map((key, value) => {
                if (key == id) {
                    $(this).closest("tr").remove()

                    // $(key).remove()
                    // console.log(key)
                }

            })

        }

        var ds = JSON.stringify(abc)
        localStorage.setItem("local", ds)
            // console.log(ds)

        return false;

    })
});