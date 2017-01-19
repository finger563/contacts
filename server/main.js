import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Contacts = new Mongo.Collection('contacts');

    if (!Contacts.findOne()) {
	Contacts.update(
	    { _id: "Contacts" },
	    { $addToSet: {contacts:
			  {
			      name : "Anusha Kumar",
			      birthday : "November 23, 1995",
			      email : {
				  personal : "anushakumar23@gmail.com"
			      }
			  }
			 }
	    },
	    {upsert : true}
	);

	Contacts.update(
	    { _id: "Contacts" },
	    { $addToSet: {contacts:
			  {
			      name : "Pranav Srinivas Kumar",
			      birthday : "April 7, 1990",
			      email : {
				  personal : "pranav.srinivas.kumar@gmail.com",
				  work : "pranav.kumar@siemens.com"
			      },
			      phone : {
				  mobile : "+1-615-414-1561"
			      },		      
			      address : {
				  home : {
				      apartment : "The Crossings at Plainsboro",
				      street : "311 Fox Run Drive",
				      city : "Plainsboro",
				      state : "New Jersey",
				      zip : "08536",
				      country : "United States of America"
				  },
				  work : {
				      street : "755 College Road East",
				      city : "Princeton",
				      state : "New Jersey",
				      zip : "08540",
				      country : "United States of America"
				  }
			      }			      
			  }
			 }
	    },
	    {upsert : true}
	);
    }
    
    console.log(JSON.stringify(Contacts.findOne()));
    Meteor.publish('contacts',
		   function contactsPublication() {
		       return Contacts.find({});
		   }
		  );

});
