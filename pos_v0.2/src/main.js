function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list=[];
    var INPUTS_LENGTH = inputs.length;
    var i,x,y;

    for (i=0; i<INPUTS_LENGTH; i++) {

        var exist = false;
        var all_items_length = all_items.length;

        for (x=0; x<sum_list.length; x++) {
            if (sum_list[x].barcode === inputs[i]) {
                sum_list[x].count++;
                exist = true;
                break;
            }
        }
        if (!exist) {
            var new_item = {};
            new_item.count = 1;
            new_item.barcode = inputs[i];

            sum_list.push(new_item);
        }
    }

    var ALL_ITEMS_LENGTH = all_items.length;
    var SUM_LIST_LENGTH = sum_list.length;

    for (i = 0; i < SUM_LIST_LENGTH; i++) {
        for (x = 0; x < ALL_ITEMS_LENGTH; x++) {
            if (sum_list[i].barcode === all_items[x].barcode) {
                sum_list[i].name=all_items[x].name;
                sum_list[i].unit=all_items[x].unit;
                sum_list[i].price=all_items[x].price;
            }
        }
    }

    var result_title = '***<没钱赚商店>购物清单***\n';
    var result_list = '';
    var total_price = 0;
    var sum_list_length = sum_list.length;

    for (var z = 0; z < sum_list_length; z++) {

        var count_unit=sum_list[z].count+sum_list[z].unit;
        var subtotal=(sum_list[z].price*sum_list[z].count).toFixed(2);

        result_list=result_list+
        '名称：'+ sum_list[z].name + '，' +
        '数量：'+ count_unit + '，' +
        '单价：'+ sum_list[z].price.toFixed(2) + '(元)，' +
        '小计：'+ subtotal + '(元)\n';

        total_price = total_price+sum_list[z].price*sum_list[z].count;
    }
    var result_sum_price = '----------------------\n'+
    '总计：'+total_price.toFixed(2)+'(元)\n';

    var result_bottom='**********************';
    var result= result_title + result_list + result_sum_price + result_bottom;
    console.log(result);
}
