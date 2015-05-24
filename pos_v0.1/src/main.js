function remove_the_duplicate(inputs) {
    var sum_list = [];

    for (var i=0; i<inputs.length; i++) {
        var exist=false;

        for (var x=0; x<sum_list.length; x++) {
            if (inputs[i].name===sum_list[x].name) {
                sum_list[x].count++;
                exist=true;
                break;
            }
        }
        if (!exist) {
            var sum={};
            sum=inputs[i];
            sum.count=1;
            sum_list.push(sum);
        }
    }
    return sum_list;
}

function list_the_info(sum_list) {
    var result_list = '***<没钱赚商店>购物清单***\n';

    for (var y=0; y<sum_list.length; y++) {

        result_list=result_list+
        '名称：'+ sum_list[y].name+'，'+
        '数量：'+ sum_list[y].count+sum_list[y].unit+'，'+
        '单价：'+ sum_list[y].price.toFixed(2)+'(元)，'+
        '小计：'+ (sum_list[y].price*sum_list[y].count).toFixed(2)+'(元)\n';
    }

    return result_list;
}

function calculate_total_price(sum_list) {
    var total_price = 0;

    for (var y=0; y<sum_list.length; y++) {
        total_price = total_price+sum_list[y].price*sum_list[y].count;
    }

    return total_price;
}

function calculate_sum_price(total_price) {
    var result_sum_price = '----------------------\n' +
        '总计：'+total_price.toFixed(2) + '(元)\n' +
        '**********************';
    return result_sum_price;
}

function printInventory(inputs) {
    var sum_list = remove_the_duplicate(inputs);
    var total_price = calculate_total_price(sum_list);
    var result_list = list_the_info(sum_list);
    var result_sum_price = calculate_sum_price(total_price);

    var result= result_list + result_sum_price;
    console.log(result);
}
