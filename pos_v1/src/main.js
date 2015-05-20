
function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list = [];
    var inputs_length = inputs.length;
    for (var i=0; i<inputs_length; i++) {
        var exist=false;

        var barcode=inputs[i].length>11?inputs[i].substring(0,10):inputs[i];
        var count=inputs[i].length>11?parseInt(inputs[i].substring(11)):1;

        for (var x=0; x<all_items.length; x++) {
            if(all_items[x].barcode===barcode){
                for (var y=0; y<sum_list.length; y++) {
                    if (all_items[x].name===sum_list[y].name) {
                        sum_list[y].count=sum_list[y].count+count;
                        sum_list[y].reduce=sum_list[y].reduce+count;
                        exist=true;
                        break;
                    }
                }
                if (!exist) {
                    all_items[x].count=count;
                    all_items[x].reduce=count;

                    sum_list.push(all_items[x]);
                }
            }
        }
    }

    var result_title = '***<没钱赚商店>购物清单***\n';
    var total_price = 0;
    var reduce = 0;
    var reduce_list = loadPromotions();
    reduce_list = reduce_list[0].barcodes;
    var sum_list_length =sum_list.length;

    for (var m=0; m<sum_list_length; m++) {
        for (var a=0; a<reduce_list.length; a++) {
            if (sum_list[m].barcode===reduce_list[a]) {
                if (sum_list[m].reduce>2) {
                    sum_list[m].reduce=sum_list[m].reduce-Math.floor(sum_list[m].reduce/3);
                }
            }
        }
    }

    var result_list='';
    var result_reduce='----------------------\n'+'挥泪赠送商品：\n';

    for (var z=0; z<sum_list_length; z++) {
        var subtotal=(sum_list[z].price*sum_list[z].reduce).toFixed(2);
        var count_unit=sum_list[z].count+sum_list[z].unit;

        result_list=result_list +
        '名称：'+ sum_list[z].name + '，' +
        '数量：'+ count_unit + '，' +
        '单价：'+ sum_list[z].price.toFixed(2) + '(元)，' +
        '小计：'+ subtotal+'(元)\n';

        total_price = total_price+sum_list[z].price*sum_list[z].reduce;

        if (sum_list[z].reduce!=sum_list[z].count) {

            var reduce_count_list = (sum_list[z].count-sum_list[z].reduce)+sum_list[z].unit;

            result_reduce=result_reduce+
            '名称：'+ sum_list[z].name + '，' +
            '数量：'+ reduce_count_list +'\n';

            reduce = reduce+(sum_list[z].count-sum_list[z].reduce)*sum_list[z].price;
        }
    }


    var result_sum_price;

    result_sum_price = '----------------------\n' +
    '总计：'+total_price.toFixed(2)+'(元)\n'+
    '节省：'+reduce.toFixed(2)+'(元)\n';

    var result_bottom='**********************';
    result = result_title + result_list + result_reduce + result_sum_price + result_bottom;
    console.log(result);
}
