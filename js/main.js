window.onload=()=>{
    const tabla = document.querySelector("table > tbody");
    likes = JSON.parse(sessionStorage.getItem("likes"))||[];

    function eventLikes(e){
        e.preventDefault();
        let node = e.target;
        let id = parseInt(node.parentNode.parentNode.getAttribute("data-id"));
        if(node.className == "far fa-heart"){
            likes.push(id);
        }else if(node.className == "fas fa-heart"){
            likes = likes.filter(el=>el!=id);
        }else{
            return false;
        }
        sessionStorage.setItem("likes",JSON.stringify(likes));
        loadData();
    }
    function printLikes(y){
        if(likes.indexOf(y) != -1){
            return `<i class="fas fa-heart"></i>`;
        }else{
            return `<i class="far fa-heart"></i>`;
        }
    }
    function printTable(data){
        tabla.innerHTML="";
        data.forEach(ob => {
            let tr = document.createElement("tr");
            tr.setAttribute("data-id",ob.id);
            tr.innerHTML += `
                <td><i class="fas fa-volume-up"></i></td>
                <td>${printLikes(ob.id)}</td>
                <td>${ob.titulo}</td>
                <td>${ob.artista.toString()}</td>
                <td>${ob.album}</td>
                <td>${ob.date}</td>
                <td><i class="fas fa-ellipsis-v"></i></td>
                <td>${ob.time}</td>
            `;
            tabla.appendChild(tr);
        });
    }
    function loadData(){
        fetch("./js/datos.json")
        .then(result=>result.json())
        .then(data=>printTable(data));

    }
    init=()=>{
        loadData()
        tabla.addEventListener("click",eventLikes);
    }

    init();
}