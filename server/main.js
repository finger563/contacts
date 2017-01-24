/**
 * Author: Pranav Srinivas Kumar
 * Date  : 2017.01.24
 * File  : main.js
 *
 * This is the server-side main entry point
 */

import { Meteor } from 'meteor/meteor';
import '/imports/api/methods.js';

Meteor.startup(() => {
    // Create the server-side Contacts MongoDB Collection
    Contacts = new Mongo.Collection('contacts');

    // Initialize the contacts list if Contacts doesn't have anything
    if (!Contacts.findOne()) {
	Contacts.update(
	    { _id: "Contacts" },
	    {"contacts" : []},
	    {upsert : true}
	);
    }

    // Meteor publish the contacts collection to the client side
    Meteor.publish('contacts',
		   function contactsPublication() {
		       return Contacts.find({});
		   }
		  );

});
