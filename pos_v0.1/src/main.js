//TODO: Please write code in this file.
function printInventory(inputs) {
    var sum_list=[];

    for (var i = 0; i < inputs.length; i++) {
        var exist=false;
        var sum={};

        for (var x = 0; x < sum_list.length; x++) {
            if (inputs[i].name===sum_list[x].name) {
                sum_list[x].count++;
                exist=true;
            }
        }
        if (!exist) {
            sum.name=inputs[i].name;
            sum.unit=inputs[i].unit;
            sum.price=inputs[i].price;
            sum.count=1;
            sum_list.push(sum);
        }
    }

    var result='***<没钱赚商店>购物清单***\n';
    var total_price=0;
    for (var y = 0; y < sum_list.length; y++) {
        result=result+'名称:'+sum_list[y].name+'，数量：'+ sum_list[y].count+sum_list[y].unit+'，单价：'+sum_list[y].price.toFixed(2)+'，小计：'+(sum_list[y].price*sum_list[y].count).toFixed(2)+'(元)\n';
        total_price = total_price+sum_list[y].price*sum_list[y].count;
    }
    result=result+'----------------------\n'+'总计：'+total_price.toFixed(2)+'(元)\n';
    result=result+'**********************';
    return(result);

}
