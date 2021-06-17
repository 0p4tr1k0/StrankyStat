/*$(function() {
   function eventsBlock(events){
      events.forEach((event) => {
         $(".event-hide").hide();
         $("#stoleti ").append(`
         <h4 class="ramec ramec2 event-stoleti bg-dark ">${event.stoleti}- <i style="color:white; font-weight: 300;">${event.udalost}</i></h4>
         <div class="row event-hide bg-dark texti white p-3 ml-3 mr-2" style="margin-top:-10px!important;">
         
         <div class="col-sm-6 event-podrobnosti">
         <p id="podrobnosti" style="font-weight: 280;" >${event.podrobnosti}</p>
         </div>
         <div class="col-sm-5 event-podrobnosti">
         <img class="img-fluid mt-2 ramecek" style"width: ${event.type}" src="${event.img}" alt="Obrazek">
         </div>
         </div>`);
     
      
   });
   $(".event.stoleti").on("click", function (){
      $(".event-hide").hide();
      $(this).next().toggle(500);
   });
};
   fetch('../historie/data/events.json')
   .fetch(response => {
      console.log(response);
      return response.json()
   })
   .then(json => {
      console.log(json);
      eventsBlock(json);
   })
   .catch(function (error) {
      console.error('Chyba: \n', error);
   })



   $("#nadpys").on("click", function(){
      console.log("odpovedpls");
      $("tabulka").next().toggle(2000);
   })

});*/

// Vytvořte pole datových objektů v platných formátech JSON (otestujte jejich validitu např. zde: https://jsonformatter.curiousconcept.com/)

// Články s historickými zajímavostmi

$(function () {
   $("h2").on("click", function () {
       $(this).parents(".row").next().toggle(1000);
   });
   async function getJSON(JSONfile, action) {
      const response = await fetch(JSONfile);
      const json = await response.json();
      action(json)
    }
   getJSON('../historie/data/events.json', eventsBlock).catch(error => {
      console.error('Chyba: \n', error);
    });
    getJSON('../historie/data/heroes.json', heroesBlock).catch(error => {
        console.error('Chyba: \n', error);
      });

   function eventsBlock(events){
       events.forEach((event) => {
           $("#udalosti tbody").append(`<tr>
               <td class="event-year">${event.year}</td>
               <td>
               <p class="event-name"><i class="fas fa-chevron-down"></i> <a><b>${event.event}</b></a></p>
               <p class="event-detail">${event.detail}</p>
               </td>            
               
           </tr>`);
       });
       $(".event-detail").hide();
       $(".event-name i, .event-name a").on("click", function () {
           $("#udalosti tr").removeClass;
           $(this).parents("tr").addClass;
           $(".event-detail").hide(250);
           $(this).parent().next().toggle();
       });
   }




   function heroesBlock(heroes){
       heroes.forEach((hero) => {
           $("#postavy .list-group").append(`<li class="list-group-item list-group-item-action list-group-item-primary">${hero.name}</li>`);
       });
       function fillPersonCard(person) {
           let hero = heroes.find(item => { return item.name === person });
           $(".card-header").html(`<i class="fas fa-star-of-life"></i> <b>${hero.birth}</b> - <i class="fas fa-cross"></i> <b>${hero.death}</b>`);
           $(".card-title").text(hero.name);
           $(".card-text").text(hero.biography);
           $(".card-footer").html(`Odkaz: <a href="${hero.online}">${hero.online}</a>`);
           $(".gallery").empty();
           for (let i = 0; i < hero.portraits.length; i++) {
               $(".gallery").append(`<div class="col-sm-4"><a href="#"><img src="historie/images/${hero.portraits[i]}" alt="" class="img-fluid"></a></div>`);
           }
       }


       $("#postavy li:first").addClass('active');

       fillPersonCard(heroes[0].name);


       $("#postavy li").on("click", function () {

           $("#postavy li").removeClass("active");

           $(this).addClass("active");

           let person = $(this).text();

           $("#portret").hide(1000, function () {

               fillPersonCard(person);
           });

           $("#portret").toggle(1000);
       });
   }
    
    

   /*fetch('../historie/data/events.json')
   .then(response => {
       return response.json();
   })
   .then(json =>{
       eventsBlock(json);
   })
   .catch(function(error){
       console.error('Chyba: \n', error);
   });

   fetch('../historie/data/heroes.json')
   .then(response => {
       return response.json();
   })
   .then(json =>{
       heroesBlock(json);
   })
   .catch(function(error){
       console.error('Chyba: \n', error);
   });*/



   let timer = 0;
   window.setInterval(() => {
       timer++;
       $("article figure img").each(function (index, value) {
           $(value)
               .fadeOut(500, function () { $(value).attr("src", "images/" + articles[index].gallery[timer % articles[index].gallery.length]) })
               .fadeIn(500);
       });
   }, 5000);
})