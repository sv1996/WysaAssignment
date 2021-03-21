const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/sleepDB", {useNewUrlParser: true , useUnifiedTopology: true});

//TODO
const sleepSchema={
  disorder: String,
  disorderTiming: String,
  sleepTime: String ,
  wakeTime: String,
  sleepduration:String

}

const Sleep = mongoose.model("Sleep",sleepSchema );

app.get("/sleeps"  , function (req , res ){
  Sleep.find(function(err , foundSleeps){
    if(!err)
    {
        res.send(foundSleeps);
    }
    else
    {
      res.send(err);
    }

  });
});

app.post("/sleeps" , function(req , res ){
console.log( );
console.log( );
console.log( );
console.log( );
console.log( );

const newUser = new Sleep({
  disorder: req.body.disorder,
  disorderTiming: req.body.disorderTiming,
  sleepTime:req.body.sleepTime,
 wakeTime: req.body.wakeTime,
 sleepduration: req.body.sleepduration

});

newUser.save(function(err){
  if(!err){
    res.send("Successfullyy added a new sleep User (Patient) ")
  } else {
    res.send(err);
  }
});

});

app.delete("/sleeps" , function(req , res ){
  Sleep.deleteMany(function(err){
    if(!err)
    {
      res.sent("Successfull treated and deleted user from wysa");
    } else {
      res.send(err);
    }
  });
});

////////////REQUEST TARGET SPECIAL QUERY


app.route("/sleeps/:disorderTitle")

.get(function (req ,res){
  Sleep.findOne({ disorder: req.params.disorderTitle} , function (err , foundDisorder){
    if(foundDisorder) {
      res.send(foundDisorder);
    } else {
      res.send("Sleep disorder matching not found");
    }
  });
})


.put(function(req ,res ){
  Article.update(
 {disorder: req.params.disorderTitle} ,
{disorder: req.body.disorder, disorderTiming: req.body.disorderTiming,
    sleepTime:req.body.sleepTime,  wakeTime: req.body.wakeTime,
    sleepduration: req.body.sleepduration },
    {overwrite : true} ,
    function (err)
    {
    if(!err){
      res.send("Successfully updated SleepUser");
    }
    }

);
})

.patch(function (req , res ){
  Sleep.update(
    {disorder: req.params.disorderTitle},
    {disorderTiming: req.body.disorderTiming},

    function (err){
      if(!err){
        res.send("Successfullt updated the content for selected User");
        } else {
        res.send(err);
      }
    }

  );
})

.delete(function(req , res ){
  Sleep.deleteOne(
    {disorder: req.params.disorderTitle},
    function (err){
      if(!err){
        res.send("Successfully deleted corresponding User");
      } else {
        res.send(err);
      }
    }
  );
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
