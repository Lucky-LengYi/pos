function list_the_info(object){

    var OBJECT_LENGTH = object.length;
    var result_list = '';

    for (i=0; i<OBJECT_LENGTH; i++) {
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
function calculate_total_price(object){

    var total_price = 0;
    var OBJECT_LENGTH = object.length;
    for (i=0; i<OBJECT_LENGTH; i++) {
        total_price = total_price+object[i].price*object[i].real_count;
    }
    return total_price;
}
function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list = [];
    var INPUTS_LENGTH = inputs.length;
    var i,x,y;

    for (i=0; i<INPUTS_LENGTH; i++) {
        var barcode = inputs[i].split("-")[0];
        var count = parseInt(inputs[i].split("-")[1]) || 1;
        var exist = false;

        for (x=0; x<sum_list.length; x++) {
            if (sum_list[x].barcode === barcode) {
                sum_list[x].count = sum_list[x].count + count;
                sum_list[x].real_count = sum_list[x].real_count + count;
                exist = true;
                break;
            }
        }

        if (!exist) {
            var new_item = {};
            new_item.barcode = barcode;
            new_item.count = count;
            new_item.real_count = count;

            sum_list.push(new_item);
        }
    }

    var ALL_ITEMS_LENGTH = all_items.length;
    var SUM_LIST_LENGTH = sum_list.length;

    for (i = 0; i < SUM_LIST_LENGTH; i++) {
        for (x = 0; x < ALL_ITEMS_LENGTH; x++) {
            if (sum_list[i].barcode===all_items[x].barcode) {
                sum_list[i].name=all_items[x].name;
                sum_list[i].unit=all_items[x].unit;
                sum_list[i].price=all_items[x].price;
            }
        }
    }


    var result_title = '***<没钱赚商店>购物清单***\n';
    var reduce = 0;
    var reduce_list = loadPromotions();
    reduce_list = reduce_list[0].barcodes;

    for (i=0; i<SUM_LIST_LENGTH; i++) {
        for (x=0; x<reduce_list.length; x++) {
            if (sum_list[i].barcode===reduce_list[x]) {
                sum_list[i].real_count=sum_list[i].real_count-Math.floor(sum_list[i].real_count/3);
            }
        }
    }

    var result_list = list_the_info(sum_list);
    var total_price = calculate_total_price(sum_list);

    var result_reduce='----------------------\n'+
        '挥泪赠送商品：\n';

    for (i = 0; i < sum_list.length; i++) {
        if (sum_list[i].real_count!=sum_list[i].count) {
            var reduce_count_list = (sum_list[i].count-sum_list[i].real_count)+sum_list[i].unit;

            result_reduce +=
                '名称：'+ sum_list[i].name + '，' +
                '数量：'+ reduce_count_list +'\n';
            reduce = reduce+(sum_list[i].count-sum_list[i].real_count)*sum_list[i].price;
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
