$(".co").click(function(){
  console.log($(this).text().trim());
  window.location.href="/list/"+$(this).text().trim();
})

$(".featured .card").click(function(){
  console.log($(this).text());
  window.location.href="/list/"+$(this).text().trim();
})

$(".category-card").click(function(){
  window.location.href="/list/"+$(this).text().trim();
})
