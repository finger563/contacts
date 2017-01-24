/**
 * Author: Pranav Srinivas Kumar
 * Date  : 2017.01.24
 * File  : imports/api/methods.js
 *
 * This is the Meteor Methods interface to the server
 */

Meteor.methods({

    // Method to import contacts
    'SERVER.uploadContacts' : function(uploadedContacts) {	
	var uploadedContactsJSON = JSON.parse(uploadedContacts);
	Contacts.update("Contacts",
			uploadedContactsJSON,
			{upsert : true});
    },

    // Method to add a new contact
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

    // Method to save a list of contacts
    'SERVER.saveContacts' : function(newContactsSet) {
	Contacts.update("Contacts",
			{
			    _id: "Contacts",
			    "contacts" : newContactsSet
			},
			{upsert : true});	
    },

    // Method to clear all contacts
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
