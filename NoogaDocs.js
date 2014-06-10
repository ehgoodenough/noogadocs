var docs = new Meteor.Collection("docs");

if(Meteor.isClient)
{
	Template.edit.doc = function()
	{
		var _id = Session.get("_id");
		var doc = docs.findOne(_id);
		
		return doc;
	}
	
	Template.edit.events =
	{
		"keyup textarea": function(event)
		{
			var value = event.target.value;
			var _id = Session.get("_id");
			
			docs.update(_id, {$set: {text: value}});
		},
		"click span": function()
		{
			var doc = docs.findOne(Session.get("_id"));
			var value = prompt("Rename the doc?", doc.name);
			docs.update(Session.get("_id"), {$set: {name: value}});
		}
	}
	
	Template.view.list = function()
	{
		return docs.find();
	}
	
	Template.view.events =
	{
		"click li": function()
		{
			Session.set("_id", this._id);
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		docs.remove({});
		docs.insert({name: "mydoc", text: "1"});
		docs.insert({name: "mydoc", text: "2"});
		docs.insert({name: "mydoc", text: "3"});
	});
}
