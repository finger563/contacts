/**
 * Author: Pranav Srinivas Kumar
 * Date  : 2017.01.24
 * File  : client/main.js
 *
 * This is the client-side main entry point
 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Include the Template HTML files
import './templates/navigation.html'
import './templates/home.html'
import './templates/contacts.html'

// Include the Main HTML file
import './main.html';

// Include the Meteor Methods interface
import '/imports/api/methods.js';


// Configure Iron Router by setting the layout to main.html
Router.configure({
    layoutTemplate: 'main' 
});

/**
 * Create the client-side copy of the contacts Collection
 * This collection will contain all the key-value pairs 
 * received via subscription from the server side
 */
Contacts = new Mongo.Collection('contacts');

/**
 * Lets just have a single page in this app
 *
 * Setup the route for the home page to display contacts.html
 *
 * Also setup a Meteor subscription to receive the contacts collection
 * from the server side
 */
Router.route('/',
	     {
		 name : 'contacts',
		 template : 'contacts',
		 waitOn: function () {
		     return Meteor.subscribe('contacts', this.params._id);
		 }   		 
	     }
	    );



