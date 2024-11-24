document.addEventListener("DOMContentLoaded", function(){
    let begin_node,end_node;
    console.log("Dom loaded")
    const dropdowns = document.querySelectorAll(".dropdown");
    console.log(dropdowns)
    console.log("loaded dropdowns")
    dropdowns.forEach(dropdown =>{
        //Condicional para verificar que dropdown es
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector(".menu");
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');
        console.log(select)
        console.log(options)
        select.addEventListener('click', ()=>{
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });

        options.forEach(option =>{
            option.addEventListener('click',() =>{
                //console.log(dropdown.id)
                //console.log(option.innerText)
                if(dropdown.id == 'begin'){ //Chequeo de dropdown
                    begin_node = option.id
                    //console.log("begin: " + begin_node)
                }else if(dropdown.id == 'end'){
                    end_node = option.id
                    //console.log("end: " + end_node)
                }
                console.log(begin_node)
                console.log(end_node)
                if(typeof begin_node !== 'undefined' && typeof end_node !== 'undefined'){
                    visualization(begin_node,end_node)
                }
                selected.innerText = option.innerText;
                //Añadir visualización
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                options.forEach(option =>{
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });
    
});