import { Meteor } from 'meteor/meteor';
import '/imports/api/methods.js';

Meteor.startup(() => {
    // code to run on server at startup
    Contacts = new Mongo.Collection('contacts');

    if (!Contacts.findOne()) {
	Contacts.update(
	    { _id: "Contacts" },
	    {"contacts" : []},
	    {upsert : true}
	);
    }
    console.log(Contacts.findOne());
    Meteor.publish('contacts',
		   function contactsPublication() {
		       return Contacts.find({});
		   }
		  );

});
