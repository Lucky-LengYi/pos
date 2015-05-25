'use strict';

function list_the_info(inputs) {
    var result_list='***<没钱赚商店>购物清单***\n';

    for (var i=0; i<inputs.length; i++) {
        result_list +=
        '名称：'+ inputs[i].name + '，' +
        '数量：'+ inputs[i].count+inputs[i].unit + '，' +
        '单价：'+ inputs[i].price.toFixed(2)+'(元)，' +
        '小计：'+ (inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
    }

    return result_list;
}

function calculate_sum_price(inputs){
    var sum = 0;

    for (var i=0; i<inputs.length; i++) {
        sum = sum + inputs[i].price*inputs[i].count;
    }

    var result = '----------------------\n' +
        '总计：'+sum.toFixed(2) + '(元)\n' +
        '**********************';
    return result;
}

function printInventory(inputs) {
    var sum = 0;
    var result_list = list_the_info(inputs);
    var result_sum_price = calculate_sum_price(inputs);
    var result = result_list + result_sum_price;

    console.log(result);
}
