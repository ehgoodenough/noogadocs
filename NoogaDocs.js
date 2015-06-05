docs = new Meteor.Collection("docs")

if(Meteor.isClient)
{
	Session.set("selected", undefined);
	
	Template.noogadocs.selected = function()
	{
		return Session.get("selected");
	}
	
	Template.noogadocs.events({
		"click button": function()
		{
			var doc = {name: "untitled doc", text: ""};
			var _id = docs.insert(doc);
			Session.set("selected", _id);
		}
	});
	
	Template.browse.docs = function()
	{
		return docs.find({}, {sort: {name: 1}});
	}
	
	Template.browse.selected = function()
	{
		if(this._id == Session.get("selected"))
		{
			return "selected";
		}
	}
	
	Template.browse.events(
	{
		"click li": function()
		{
			Session.set("selected", this._id);
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
			docs.update(this._id, {$set: {text: value}});
		},
		"click span": function()
		{
			var name = docs.findOne(this._id).name;
			var value = prompt("Rename the doc?", name) || name;
			docs.update(this._id, {$set: {name: value}});
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
