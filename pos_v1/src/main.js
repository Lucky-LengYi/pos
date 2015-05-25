'use strict';

function remove_the_duplicate(object_a){
    var object_b = [];

    for (var i=0; i<object_a.length; i++) {
        var barcode = object_a[i].split("-")[0];
        var count = parseInt(object_a[i].split("-")[1]) || 1;
        var exist = false;

        object_b = update_object(object_b,barcode,count);
    }

    return object_b;
}

function update_object(object,barcode,count) {
    var exist = false;
    for (var x=0; x<object.length; x++) {
        if (object[x].barcode === barcode) {
            object[x].count += count;
            object[x].real_count += + count;
            exist = true;
            break;
        }
    }
    if (!exist) {
        object.push({barcode: barcode, count: count, real_count :count});
    }
    return object;
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

function calculate_the_real_number(object){
    var reduce_list = loadPromotions();
    reduce_list = reduce_list[0].barcodes;

    for (var i=0; i<object.length; i++) {
        for (var x=0; x<reduce_list.length; x++) {
            if (object[i].barcode===reduce_list[x]) {
                object[i].real_count=object[i].real_count-Math.floor(object[i].real_count/3);
            }
        }
    }

    return object;
}

function list_the_info(object){
    var result_list = '***<没钱赚商店>购物清单***\n';

    for (var i=0; i<object.length; i++) {
        var count_unit=object[i].count+object[i].unit;
        var subtotal=(object[i].price*object[i].real_count).toFixed(2);
        result_list +=
            '名称：'+ object[i].name + '，' +
            '数量：'+ count_unit + '，' +
            '单价：'+ object[i].price.toFixed(2) + '(元)，' +
            '小计：'+ subtotal+'(元)\n';
    }

    return result_list;
}

function free_goods(object){
    var result_reduce='----------------------\n'+
        '挥泪赠送商品：\n';

    for (var i = 0; i < object.length; i++) {
        if (object[i].real_count!=object[i].count) {
            var reduce_count_list = (object[i].count-object[i].real_count)+object[i].unit;

            result_reduce +=
                '名称：'+ object[i].name + '，' +
                '数量：'+ reduce_count_list +'\n';
        }
    }
    return result_reduce;
}

function calculate_reduce(object){
    var reduce = 0;

    for (var i = 0; i < object.length; i++) {
        if (object[i].real_count!=object[i].count) {
            reduce = reduce+(object[i].count-object[i].real_count)*object[i].price;
        }
    }

    return reduce;
}

function calculate_total_price(object){
    var total_price = 0;

    for (var i=0; i<object.length; i++) {
        total_price = total_price+object[i].price*object[i].real_count;
    }

    return total_price;
}

function calculate_sum_price(total_price,reduce){
    var result = '----------------------\n' +
        '总计：'+total_price.toFixed(2)+'(元)\n'+
        '节省：'+reduce.toFixed(2)+'(元)\n' +
        '**********************' ;
    return result;
}

function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list = remove_the_duplicate(inputs);
    sum_list = add_new_item(sum_list,all_items);
    sum_list = calculate_the_real_number(sum_list);
    var result_list = list_the_info(sum_list);
    var total_price = calculate_total_price(sum_list);
    var result_reduce = free_goods(sum_list);
    var reduce = calculate_reduce(sum_list);
    var result_sum_price = calculate_sum_price(total_price,reduce);
    var result = result_list + result_reduce + result_sum_price;

    console.log(result);
}
