function printInventory(inputs) {
    var result_title='***<没钱赚商店>购物清单***\n';
    var sum = 0;
    var result_list='';

    var inputs_length = inputs.length;

    for (var i=0; i<inputs_length; i++) {
        
        result_list=result_list+
        '名称：'+ inputs[i].name + '，' +
        '数量：'+ inputs[i].count+inputs[i].unit + '，' +
        '单价：'+ inputs[i].price.toFixed(2)+'(元)，' +
        '小计：'+ (inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
        sum = sum + inputs[i].price*inputs[i].count;
    }

    var result_sum_price = '----------------------\n' +
    '总计：'+sum.toFixed(2) + '(元)\n';

    var result_bottom = '**********************';
    var result = result_title + result_list + result_sum_price + result_bottom;
    console.log(result);
}
