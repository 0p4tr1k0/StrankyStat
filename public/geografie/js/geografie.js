$(document).ready(function () {
    let kraje = [];
    let mesta = [];
    let cityColor = $('#group').attr('fill');
    let krajColor = $('#gruppe').attr('fill');
    let lastfill = $("svg").attr('fill');
    console.log(krajColor);

    fetch('../geografie/data/kraje.json')
     .then(response => {
        return response.json();
     })
     .then(json =>{
        kraje = json;
     })
     .catch(function(error){
        console.error('Chyba: \n', error);
     });
    
     fetch('../geografie/data/mesta.json')
     .then(response => {
        return response.json();
     })
     .then(json =>{
        mesta = json;
     })
     .catch(function(error){
        console.error('Chyba: \n', error);
     });

    $('rect').on('click', function () {
        $('rect').css({ 'fill': cityColor });
        $(this).css('fill', 'rgb(227, 157, 5)');
       
        let id = $(this).attr('id');
        console.log(id)
        let mesto = mesta.find(item => {return item.id == id});
        console.log(mesta);
        $('#info').html(`
        <div class = "row">
            <div class = "col-12">
                <h2 class = "text-center py-1">${mesto.name}</h2>
            </div>
        </div>
        <div class = "row">
            <div class = "col-8 pt-2">
                <p class = "pl-4"><strong>Populace</strong>:<i>${mesto.population}</i></p>
                <p class = "text-justify">${mesto.popis}</p>
            </div>  
            <div class = "col-4 pt-2>
            <figure class = "text-center">
                <img src = "img/${mesto.znak}" class = "m-auto" style = "width:300px">
            </figure>
            </div>
        </div>`)

    })
    

    $("path").on('click', function () { //on click on path
        if (lastfill == 'rgb(255, 255, 0)') { //if lastfill is yellow
            $(this).css({ 'fill': 'black' }); //set the color to black
            lastfill = "#7c7c7c"; //set lastfill to grey
        } else {
            $("path").css('fill', $("svg").attr('fill')); //revert all to grey
            $(this).css({ 'fill': 'yellow' }); //set current to yellow
            lastfill = "rgb(255, 208, 0)"; //set last fill to yellow
        }
        let id = $(this).attr('id');
        console.log(id)
        let kraj = kraje.find(item => {return item.id == id});
        console.log(kraj);
        $('#info').html(`
        <div class = "row">
            <div class = "col-12">
                <h2 class = "text-center py-1">${kraj.region}</h2>
            </div>
        </div>
        <div class = "row">
            <div class = "col-12 pt-2">
                <p class = "pl-4"><strong>Populace</strong>: <i>${kraj.population}</i></p>
                <p class = "text-justify">${kraj.text}</p>
            </div>  
        </div>`)
    });
    $("path").on('mouseover', function () { //on mouse over on path
        lastfill = $(this).css('fill');
        if (lastfill == 'rgb(255, 255, 0)') { //if lastfill is yellow
            $(this).css({ 'fill': 'rgb(252, 182, 83)' }); //set path to blackish yellow
        } else {
            $(this).css({ 'fill': 'rgb(237, 148, 24)' }); //set path to black
        }
    });
    $("path").on('mouseout', function () { //on mouse out on path set previous color
        $(this).css({ 'fill': lastfill });
    });

    
});