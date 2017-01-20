Meteor.methods({
    'SERVER.uploadContacts' : function(uploadedContacts) {
	var uploadedContactsJSON = JSON.parse(uploadedContacts);
	Contacts.update("Contacts",
			uploadedContactsJSON,
			{upsert : true});
    },
    'SERVER.addContact' : function(newContact) {
	var contacts = Contacts.findOne("Contacts")["contacts"];
	contacts.push(newContact);
	Contacts.update("Contacts",
			{
			    _id: "Contacts",
			    "contacts" : contacts
			},
			{upsert : true});
    },
   'SERVER.clearContacts' : function() {
	var contacts = Contacts.findOne("Contacts")["contacts"];
	contacts = [];
	Contacts.update("Contacts",
			{
			    _id: "Contacts",
			    "contacts" : contacts
			},
			{upsert : true});
    }      
});
