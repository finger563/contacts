Meteor.methods({
    'SERVER.uploadContacts' : function(uploadedContacts) {
	var uploadedContactsJSON = JSON.parse(uploadedContacts);
	console.log(uploadedContactsJSON.contacts);
	Contacts.update("Contacts",
			uploadedContactsJSON,
			{upsert : true});
    }
});
