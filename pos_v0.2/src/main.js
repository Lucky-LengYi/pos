'use strict';

function remove_the_duplicate(inputs) {
    var sum_list = [];

    for (var i=0; i<inputs.length; i++) {
        var exist = false;

        for (var x=0; x<sum_list.length; x++) {
            if (sum_list[x].barcode === inputs[i]) {
                sum_list[x].count++;
                exist = true;
                break;
            }
        }
        if (!exist) {
            sum_list.push({count:1, barcode:inputs[i]});
        }
    }
    return sum_list;
}

function add_new_item(object_a,object_b){

    for (var i = 0; i < object_a.length; i++) {
        for (var x = 0; x < object_b.length; x++) {
            if (object_a[i].barcode===object_b[x].barcode) {
                object_a[i].name=object_b[x].name;
                object_a[i].unit=object_b[x].unit;
                object_a[i].price=object_b[x].price;
            }
        }
    }

    return object_a;
}

function list_the_info(sum_list){
    var result_list = '***<没钱赚商店>购物清单***\n';

    for (var i = 0; i < sum_list.length; i++) {
        var count_unit=sum_list[i].count+sum_list[i].unit;
        var subtotal=(sum_list[i].price*sum_list[i].count).toFixed(2);

        result_list=result_list+
        '名称：'+ sum_list[i].name + '，' +
        '数量：'+ count_unit + '，' +
        '单价：'+ sum_list[i].price.toFixed(2) + '(元)，' +
        '小计：'+ subtotal + '(元)\n';
    }
    return result_list;
}

function calculate_total_price(object){
    var total_price = 0;

    for (var i=0; i<object.length; i++) {
        total_price = total_price+object[i].price*object[i].count;
    }

    return total_price;
}

function calculate_sum_price(total_price){
    var result_sum_price = '----------------------\n' +
        '总计：'+total_price.toFixed(2)+'(元)\n'+
        '**********************' ;
    return result_sum_price;
}

function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list = remove_the_duplicate(inputs);
    sum_list = add_new_item(sum_list,all_items);

    var result_list = list_the_info(sum_list);
    var total_price = calculate_total_price(sum_list);
    var result_sum_price = calculate_sum_price(total_price);
    var result= result_list + result_sum_price;

    console.log(result);
}
