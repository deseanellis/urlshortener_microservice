const mongoose = require('mongoose');
const { Schema } = mongoose;

const linkSchema = new Schema({
  short: String,
  actual: {type: String, alias: 'redirectsTo'}
});

const counterSchema = new Schema({
  name: String,
  value: Number
});

linkSchema.virtual('shortURL').get(function(){
  return "https://mellow-raft.glitch.me/" + this.short;
});


linkSchema.statics.findOneOrCreate = async function(query, obj) {
  var _item = await this.findOne(query);
  
  if (_item) {    
      return _item;
      }
  obj.short = await getNextSequenceValue("links");
  var _tmp = new this(obj);
  _item = await _tmp.save();
  console.log("New: " + obj);
  return _item;
};

mongoose.model('links', linkSchema);
mongoose.model('counters', counterSchema);

async function getNextSequenceValue(sequenceName){
   const Counter = mongoose.model('counters');
   var sequenceDocument = await Counter.findOneAndUpdate(
     {name: sequenceName },
     {$inc:{value:1}}
   );
	
   return sequenceDocument.value;
}