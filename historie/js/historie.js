$(function () {
     function eventsBlock(events) {
        events.forEach((event) => {
           $("#udalosti table").append(`<tr>
              <td class="event-year">${event.year}</td>
              <td>
                <p class="event-name"><i class="fas fa-chevron-down"></i> <a href="${event.url}" target="_new">${event.event}</a></p>
                <p class="event-detail">${event.detail}</p>
              </td>            
              <td class="event-evaluation">${(event.evaluation == "true") ? 
              '<i class="fas fa-plus-circle text-success"></i>' 
              : '<i class="fas fa-minus-circle text-danger"></i>'}</td>
          </tr>`);
        });
        $(".event-detail").hide();
        $(".event-name i, .event-name a").on("mouseover", function () {
        $("#udalosti tr").removeClass("bg-secondary text-white");

        $(this).parents("tr").addClass("bg-secondary text-white");

        $(".event-detail").hide();

        $(this).parent().next().show(500);
      });
      $("h2").on("click", function () {
            $(this).parents(".row").next().toggle(1000);
     });
     function heroesBlock(heroes) {
        heroes.forEach((hero) => {
           $("#postavy .list-group").append(`<li class="list-group-item list-group-item-action list-group-item-primary">${hero.name}</li>`);
        });
        function fillPersonCard(person) {

            let hero = heroes.find(item => {  return item.name === person});

            $(".card-header").html(`<i class="fas fa-star-of-life"></i> <b>${hero.birth}</b> - <i class="fas fa-cross"></i> <b>${hero.death}</b>`);
            $(".card-title").text(hero.name);
            $(".card-text").text(hero.biography);
            $(".card-footer").html;
            $(".gallery").empty();

            $("#postavy li").on("click", function () {
                $("#postavy li").removeClass("active");
                $(this).addClass("active");
                let person = $(this).text();
                $("#portret").slideUp(1000, function () {
                   fillPersonCard(heroes, person);
                });
                $("#portret").slideDown(1000);
             });



        }

        fetch('../historie/data/events.json')
      .then(response => {
         console.log(response);
         return response.json()
      })
      .then(json => {
         console.log(json);
         eventsBlock(json);
      })
      .catch(function (error) {
         console.error('Chyba: \n', error);
      });

      fetch('../historie/data/heroes.json')
   .then(response => {
      console.log(response);
      return response.json()
   })
   .then(json => {
      console.log(json);
      heroesBlock(json);
   })
   .catch(function (error) {
      console.error('Chyba: \n', error);
   });
});