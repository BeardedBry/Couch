const express = require('express');
const app = express();

// Mongoose and MongoDB
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;

var catSchema = new mongoose.Schema({
    name: String
});

catSchema.methods.speak = function () {
    var greeting = this.name ? `Meow, name is ${this.name}` : "I don't have a name";
    console.log(greeting);
}

var Cat = mongoose.model('Cat', catSchema);

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('mongoose connected!');
    //var zuzu = new Cat({name: 'Zuzu'});

    // zuzu.save(function(err,zuzu){
    //     if (err) console.error(err);
    //     zuzu.speak();
    // });

    //var hobbes = new Cat({name: 'Hobbes', color: 'Orange'});
    // hobbes.save(function(err,zuzu){
    //     if (err) console.error(err);
    //     hobbes.speak();
    // });

    // Cat.find((err, cats)=>{
    //     if (err) console.error(err);
    //     console.log(cats);
    // });


});
//////////////////////////////////////

// Todo replace with mongodb database,


app.get('/api/:collection', function(req,res) {
    //console.log(db);
    console.log(req.params.collection);
    if(req.params.collection == "Cats"){
        Cat.find(function(err, cats){
            if(err) console.log('error: ' + err);
            console.log(cats);
            res.send(cats);
        });
    }
});


app.get('/api/:collection/:name', function(req,res) {

    const collection = req.params.collection;
    const name = req.params.name;

    if(collection =='Cats');
    var query = Cat.find({'name':name });
    query.select('name');
    //query.limit(1);
    //query.sort({name: -1});
    query.exec( function(err, cat){
        if(err) return console.log('error: ' + err);
        res.send(cat);
    });

});

app.post('/api/:collection/:name', function(req, res) {
    const collection = req.params.collection;
    const name = req.params.name;

    if(collection =='Cats');
    var cat = new Cat({name: name});
    cat.save(function(err,res){
        if (err) console.error(err);
    });

});


// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
