import axios from "axios";

export function Update(){
    let req = MakeRequestString();
    console.log(req);
    let cont = document.querySelector(".recepie-container");
    axios.get(req).then(v=>v.data.results).then(recepies=>{
        for(let recepy of recepies){
            console.log();
            let wrap = document.createElement("div");
            wrap.innerHTML = recepy.title;
            cont.append(wrap);
        }
    })
}
Update();
function MakeRequestString(){
    const selectIngredients = document.getElementById('selectIng');
    const selectCountry = document.getElementById('selectCountry');
    const selectTime = document.getElementById('selectTime');
    const search = document.querySelector('.search');
    const category = document.getElementById('categories');
    const paginator = document.getElementById('pagination');
    let obj = {
        category: category,
        page: paginator,
        time: selectTime,
        area:selectCountry,
        ingredients: selectIngredients
    }
    let first = true;

    let str="https://tasty-treats-backend.p.goit.global/api/recipes";
    for(let key in obj){
        if(obj[key]!=undefined && obj[key].value!=undefined){
            if(!first){
                str+="&"
            }else{
                str+="?";
                first=false;
            }
            str+=key+"="+obj[key].value;
        }
    }
    return str;
}