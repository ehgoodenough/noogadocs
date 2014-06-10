var docs = new Meteor.Collection("docs");

if(Meteor.isClient)
{
	Template.content.doc = function()
	{
		var _id = Session.get("_id");
		var doc = docs.findOne(_id);
		
		return doc;
	}
	
	Template.view.list = function()
	{
		return docs.find();
	}
	
	Template.edit.events =
	{
		"keyup textarea": function(event)
		{
			var value = event.target.value;
			var _id = Session.get("_id");
			
			docs.update(_id, {$set: {text: value}});
		},
		"click #back": function()
		{
			console.log("!");
			Session.set("_id");
		}
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
		docs.insert({name: "mydoc", text: "Hello World?"});
	});
}
