//TODO: Please write code in this file.
function printInventory(inputs) {
    var result='***<没钱赚商店>购物清单***\n';
    var sum = 0;

    //for循环遍历传进来的数组，将他们转换成字符串进行拼接。
    for (var i = 0; i < inputs.length; i++) {
        result=result+'名称：'+inputs[i].name+'，数量：'+ inputs[i].count+inputs[i].unit+'，单价：'+inputs[i].price.toFixed(2)+'(元)，小计：'+(inputs[i].price*inputs[i].count).toFixed(2)+'(元)\n';
        sum = sum+inputs[i].price*inputs[i].count;
    }

    //遍历结束，将字符串拼接输出。
    result=result+'----------------------\n'+'总计：'+sum.toFixed(2)+'(元)\n';
    result=result+'**********************';
    console.log(result);
}
