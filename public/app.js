$(document).ready(function(){

$("#scraper").on("click"){

	$.ajax({
    method: "GET",
    url: "/scrape/" 
  })

 }




})