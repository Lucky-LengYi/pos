//TODO: Please write code in this file.
function printInventory(inputs) {
    var all_items = loadAllItems();
    var sum_list=[];

    for (var i = 0; i < inputs.length; i++) {
        var exist=false;
        var sum={};

        var barcode=inputs[i].length>11?inputs[i].substring(0,10):inputs[i];
        var count=inputs[i].length>11?parseInt(inputs[i].substring(11)):1;

        for (var x = 0; x < all_items.length; x++) {
            if(all_items[x].barcode===barcode){
                for (var y = 0; y < sum_list.length; y++) {
                    if (all_items[x].name===sum_list[y].name) {
                        sum_list[y].count=sum_list[y].count+count;
                        sum_list[y].reduce=sum_list[y].reduce+count;
                        exist=true;
                    }
                }
                if (!exist) {
                    sum.name=all_items[x].name;
                    sum.unit=all_items[x].unit;
                    sum.price=all_items[x].price;
                    sum.barcode=all_items[x].barcode;
                    sum.reduce=count;
                    sum.count=count;
                    sum_list.push(sum);
                }
            }
        }
    }
    var result='***<没钱赚商店>购物清单***\n';
    var total_price=0;
    var reduce=0;
    var reduce_list=loadPromotions();
    reduce_list=reduce_list[0].barcodes;
    for (var m = 0; m < sum_list.length; m++) {
        for (var a = 0; a < reduce_list.length; a++) {
            if (sum_list[m].barcode===reduce_list[a]) {
                if (sum_list[m].reduce>2) {
                    sum_list[m].reduce=sum_list[m].reduce-Math.floor(sum_list[m].reduce/3);
                }
            }
        }
    }

    for (var z = 0; z < sum_list.length; z++) {
        result=result+'名称：'+sum_list[z].name+'，数量：'+ sum_list[z].count+sum_list[z].unit+'，单价：'+sum_list[z].price.toFixed(2)+'(元)，小计：'+(sum_list[z].price*sum_list[z].reduce).toFixed(2)+'(元)\n';
        total_price = total_price+sum_list[z].price*sum_list[z].reduce;
    }
    result=result+'----------------------\n'+'挥泪赠送商品：\n';
    for (var q = 0; q < sum_list.length; q++) {
        if (sum_list[q].reduce!=sum_list[q].count) {
            result=result+'名称：'+sum_list[q].name+'，数量：'+ (sum_list[q].count-sum_list[q].reduce)+sum_list[q].unit+'\n';
            reduce=reduce+(sum_list[q].count-sum_list[q].reduce)*sum_list[q].price;
        }
    }

    result=result+'----------------------\n'+'总计：'+total_price.toFixed(2)+'(元)\n';
    result=result+'节省：'+reduce.toFixed(2)+'(元)\n';
    result=result+'**********************';

    console.log(result);
}
