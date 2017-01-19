
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './templates/navigation.html'
import './templates/home.html'
import './templates/contacts.html'
import './main.html';
import '/imports/api/methods.js';

Router.configure({
    layoutTemplate: 'main'
});

Contacts = new Mongo.Collection('contacts');

Router.route('/',
	     {
		 name : 'contacts',
		 template : 'contacts',
		 waitOn: function () {
		     return Meteor.subscribe('contacts', this.params._id);
		 }
	     }
	    );



