var docs = new Meteor.Collection("docs");

if(Meteor.isClient)
{
	Session.set("selected", undefined);
	
	Template.content.selected = function()
	{
		return Session.get("selected");
	}
	
	Template.content.events(
	{
		"click button": function()
		{
			var doc = {name: "untitled doc", text: ""};
			var _id = docs.insert(doc);
			Session.set("selected", _id);
		}
	});
	
	Template.edit.doc = function()
	{
		var _id = Session.get("selected");
		return docs.findOne(_id);
	}
	
	Template.edit.events(
	{
		"keyup textarea": function(event)
		{
			var value = event.target.value;
			var _id = Session.get("selected");
			docs.update(_id, {$set: {text: value}});
		},
		"click span": function(event)
		{
			var _id = Session.get("selected")
			var name = docs.findOne(_id).name;
			var value = prompt("Rename the doc?", name) || name;
			docs.update(_id, {$set: {name: value}});
		}
	});
	
	Template.view.list = function()
	{
		return docs.find({}, {sort: {name: 1}});
	}
	
	Template.view.selected = function()
	{
		if(this._id == Session.get("selected"))
		{
			return "selected";
		}
	}
	
	Template.view.events(
	{
		"click li": function()
		{
			Session.set("selected", this._id);
		}
	});
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		docs.remove({});
	});
}
