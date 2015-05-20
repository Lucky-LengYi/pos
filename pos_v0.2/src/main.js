function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list=[];

    for (var i=0; i<inputs.length; i++) {
        var exist=false;
        var all_items_length=all_items.length;

        for (var x=0; x<all_items_length; x++) {
            if (inputs[i]===all_items[x].barcode) {
                for (var y=0; y<sum_list.length; y++) {
                    if (all_items[x].name===sum_list[y].name) {
                        sum_list[y].count++;
                        exist=true;
                        break;
                    }
                }
                if (!exist) {
                    all_items[x].count=1;
                    sum_list.push(all_items[x]);
                }
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
    var result_sum_price = '----------------------\n'+'总计：'+total_price.toFixed(2)+'(元)\n';

    var result_bottom='**********************';
    var result= result_title + result_list + result_sum_price + result_bottom;
    console.log(result);
}
