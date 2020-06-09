require("dotenv").config();
const express= require("express");
const Backendless=require("backendless");


const app= express();
app.set("view engine", "ejs");
app.use(express.static("public"));

var APP_ID = process.env.APP_ID;
var API_KEY = process.env.API_KEY;

Backendless.initApp(APP_ID, API_KEY);

brands={1:"montra", 2:"hercules", 3:"bsa", 4:"hero", 5:"lectro", 6:"avon", 7:"kross", 8:"machcity", 9:"phoenix", 10:"xtal", 11:"cyclux"}
list2=["Mountain","E-bikes","Geared","City","ATB","Hybrid"];
list3=["Girls", "Kids", "Boys", "Accessories", "Fitness"];

app.get("/", function(req, res){
  res.render("discover");
});


app.get("/list/:listName", function(req,res){
  var value=req.params.listName;
  value=value.trim();

  if(value in brands){
    var whereClause="Brand='"+brands[value]+"'";
  }

  if(list2.includes(value)){
    var whereClause = "Featured='"+value+"'";
  }
  if(list3.includes(value)){
    var whereClause="category='"+value+"'";
  }

var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
queryBuilder.setPageSize(100);
Backendless.Data.of( "Cycle" ).find( queryBuilder )
 .then( function( foundCycles ) {
   res.render("list", {cycles: foundCycles});
  })
 .catch( function( fault ) {
  });
})

app.get("/cycles/:cycleName", function(req, res){
  var name= req.params.cycleName;
  name=decodeURIComponent(name);

  var whereClause="name='"+ name +"'";
  console.log(whereClause);
  var queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause( whereClause );
  Backendless.Data.of( "Cycle" ).find( queryBuilder )
   .then( function( foundCycle ) {
     console.log(foundCycle);
         res.render("cycle", {cycle: foundCycle});
    })
   .catch( function( fault ) {
    });
})

app.get("/locateUs", function(req,res){
  res.render("locateUs");
})

app.get("/aboutUs", function(req, res){
  res.render("aboutUs");
})



app.listen(3000, function(){
  console.log("server started at port 3000");
});
