/**
 * Author: Pranav Srinivas Kumar
 * Date  : 2017.01.24
 * File  : helpers/contacts.js
 *
 * This is the helper file for the contacts template
 * This file contains template helper methods and event handlers
 */

if(Meteor.isClient) {

    // Helper function to capitalize first letter of a string
    // e.g., gmail => Gmail
    function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // onCreated method for Contacts Template
    // This method is called when the template is first created
    Template.contacts.onCreated(function() {

	// Get a list of fullnames from the Contacts Collection
	var contactObjectList = Contacts.findOne("Contacts")["contacts"];
	var autoCompleteData = {};
	for (id in contactObjectList) {
	    var first_name = contactObjectList[id]["name"]["first"];
	    var middle_name = contactObjectList[id]["name"]["middle"];
	    var last_name = contactObjectList[id]["name"]["last"];
	    var key = "";
	    (first_name != "")? key += first_name + " " : key = key;
	    (middle_name != "")? key += middle_name + " " : key = key;
	    (last_name != "")? key += last_name : key = key;
	    autoCompleteData[key] = null;	    
	}
	// Use the list of fullnames to configure the autocomplete list used
	// by the searchbar in the navigation header
	if ($('input.autocomplete') != undefined) {
	    if (typeof $('input.autocomplete').autocomplete == "function") {
		$('input.autocomplete').autocomplete({	
		    data: autoCompleteData
		});
	    }
	}

	// Configure Google Fonts
	WebFontConfig = {
	    google: { families:
		      [ 'Roboto Slab:700,400:latin',
			'Oswald:400',
			'Mouse Memoirs',
			'Ubuntu'
		      ] }
	};
	// Async load of Google Fonts for use in main.html
	(function() {
	    var wf = document.createElement('script');
	    wf.src =
		('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	    wf.type = 'text/javascript';
	    wf.async = 'true';
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(wf, s);
	})();
	Session.set("searchName", "");
    });

    // Template onRendered Method to initialize template 
    // This method is called each time the page is refreshed
    Template.contacts.rendered = function() {
	Session.set("searchName", "");
    };

    // Template helper methods
    Template.contacts.helpers({

	// Use name.first, name.middle, and name.last to generate fullname string
	getContactDisplayName(first_name, middle_name, last_name) {
	    var key = "";
	    (first_name != "")? key += first_name + " " : key = key;
	    (middle_name != "")? key += middle_name + " " : key = key;
	    (last_name != "")? key += last_name : key = key;
	    return key;
	},

	// Get the domain of the email from the full address
	getEmailDomain(emailAddress) {
	    return capitalizeFirstLetter(emailAddress.split('@')[1].split('.')[0]);
	},

	// Get a list of contacts objects
	// Return 1 value if this is in the context of a search
	// Return all contacts otherwise
	contactList() {
	    if (Session.get("searchName") != "") {
		var searchString = Session.get("searchName");
		return Template.contacts.__helpers[" findContact"](searchString);
	    }
	    else
		return Contacts.findOne("Contacts")["contacts"];
	},

	// Returns a list of contact names (fullnames)
	contactListNames() {
	    var contactObjectList = Contacts.findOne("Contacts")["contacts"];
	    var contactNameList = [];
	    for (id in contactObjectList) {
		var first_name = contactObjectList[id]["name"]["first"];
		var middle_name = contactObjectList[id]["name"]["middle"];
		var last_name = contactObjectList[id]["name"]["last"];
		var key = "";
		(first_name != "")? key += first_name + " " : key = key;
		(middle_name != "")? key += middle_name + " " : key = key;
		(last_name != "")? key += last_name : key = key;
		contactNameList.push(key);
	    }
	    return contactNameList;
	},
	
	// Return the contact record when provided with the contact fullname
	findContact(contactName) {
	    var contactObjectList = Contacts.findOne("Contacts")["contacts"];
	    var findResult = [];
	    for (id in contactObjectList) {
		var first_name = contactObjectList[id]["name"]["first"];
		var middle_name = contactObjectList[id]["name"]["middle"];
		var last_name = contactObjectList[id]["name"]["last"];
		var key = "";
		(first_name != "")? key += first_name + " " : key = key;
		(middle_name != "")? key += middle_name + " " : key = key;
		(last_name != "")? key += last_name : key = key;
		if (key == contactName)
		    findResult.push(contactObjectList[id]);
	    }
	    return findResult;
	},

	// Get the contact object for the contact currently being edited
	getEditContact() {
	    var contactName = Session.get("editContact");
	    return Template.contacts.__helpers[" findContact"](contactName);
	},

	// Does the contact have any phone numbers to display?
	hasPhone(first_name, middle_name, last_name) {	    
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]
		       != undefined)
			if((Contacts.findOne("Contacts")["contacts"][id]["phone"]["mobile"] != "") ||
			   (Contacts.findOne("Contacts")["contacts"][id]["phone"]["home"] != "") ||
			   (Contacts.findOne("Contacts")["contacts"][id]["phone"]["work"] != ""))
			    return true;
		}	    
	    }
	    return false;
	},

	// Does the contact have any HOME phone numbers to display?
	hasHomePhone(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["home"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["home"] != "")
				return true;
		    }
		}	    
	    }
	    return false;
	},

	// Does the contact have any MOBILE phone numbers to display?
	hasMobilePhone(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["mobile"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["mobile"] != "")
				return true;
		    }
		}	    
	    }
	    return false;
	},

	// Does the contact have any WORK phone numbers to display?
	hasWorkPhone(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["work"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["phone"]["work"] != "")
				return true;
		    }
		}	    
	    }
	    return false;
	},			

	// Does the contact have any email to display?
	hasEmail(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]
		       != undefined)
			if((Contacts.findOne("Contacts")["contacts"][id]["email"]["personal"] != "") ||
			   (Contacts.findOne("Contacts")["contacts"][id]["email"]["secondary"] != "") ||
			   (Contacts.findOne("Contacts")["contacts"][id]["email"]["email"] != ""))
			    return true;
		}	    
	    }
	    return false;
	},    	

	// Does the contact have any PERSONAL email to display?
	hasPersonalEmail(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["email"]["personal"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["email"]["personal"] != "")	
				return true;
		    }
		}	    
	    }
	    return false;
	},

	// Does the contact have any SECONDARY email to display?
	hasSecondaryEmail(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["email"]["secondary"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["email"]["secondary"] != "")
				return true;
		    }
		}	    
	    }
	    return false;
	},    	

	// Does the contact have any WORK email to display?
	hasWorkEmail(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]
		       != undefined) {		    
			if(Contacts.findOne("Contacts")["contacts"][id]["email"]["work"] != undefined)
			    if(Contacts.findOne("Contacts")["contacts"][id]["email"]["work"] != "")
				return true;
		    }
		}	    
	    }
	    return false;
	},

	// Does the contact have any birthday to display?
	hasBirthday(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["birthday"]
		       != undefined)
			if(Contacts.findOne("Contacts")["contacts"][id]["birthday"] != "")			
			    return true;
		}	    
	    }
	    return false;
	},        

	// Does the contact have any address to display?
	hasAddress(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["address"]
		       != undefined)
			if(Contacts.findOne("Contacts")["contacts"][id]["address"] != {})			
			    return true;
		}	    
	    }
	    return false;
	},    

	// Does the contact have any HOME address to display?
	hasHomeAddress(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["address"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["address"]["home"] != undefined)
			    if((Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["apartment"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["street"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["city"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["state"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["zip"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["home"]["country"] != ""))
				return true;
		    }
		}	    
	    }
	    return false;
	},

	// Does the contact have any WORK address to display?
	hasWorkAddress(first_name, middle_name, last_name) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if((Contacts.findOne("Contacts")["contacts"][id]["name"]["first"] == first_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["middle"] == middle_name) &&
		   (Contacts.findOne("Contacts")["contacts"][id]["name"]["last"] == last_name)) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["address"]
		       != undefined) {
			if(Contacts.findOne("Contacts")["contacts"][id]["address"]["work"] != undefined)
			    if((Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["company"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["street"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["city"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["state"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["zip"] != "") &&
			       (Contacts.findOne("Contacts")["contacts"][id]["address"]["work"]["country"] != ""))
				return true;
		    }
		}	    
	    }
	    return false;
	}
    });

    // Navigation Template Event Handlers
    Template.navigation.events({

	// Handle typing and pressing ENTER on the autocomplete search bar
	'keypress input.autocomplete': function (event) {	
	    if (event.which === 13) {
		event.preventDefault();		
	    }
	},

	// Save searchName for searching after autocomplete is completed
	// and an actual name appears on the searchbar
	'change input.autocomplete' : function(event) {
	    var contactNameList =
		Template.contacts.__helpers[" contactListNames"]();
	    for (id in contactNameList) {
		if (contactNameList[id] != event.target.value)
		    Session.set("searchName", "");
		else {
		    Session.set("searchName", event.target.value);
		    break;
		}
	    }
	},

	// Handle upload of contacts JSON
	'change input.contactsUpload' : function(event) {
	    var uploadedFile =
		document.getElementsByClassName('contactsUpload')[0].files[0];
	    if (uploadedFile) {
		var r = new FileReader();
		r.onload = function(e) { 
		    var contents = e.target.result;
		    Meteor.call('SERVER.uploadContacts',
				contents,
				(err, res) => {
			if (err) {
			    alert(err);
			} else {
			    // success!			    
			    location.reload();
			}
		    });		    
		}
		r.readAsText(uploadedFile);		
	    }
	    else 
		alert("Failed to load file");
	},

	// Handle click of the newContacts "+" button in the navbar
	'click .newContactButton' : function(event) {
	    $('#newContactFormRow').show();	    
	},

	// Handle click of the importContacts button in the navbar	
	'click .contactsUploadButton' : function(event) {	    
	    $('.contactsUpload')[0].click();
	},

	// Handle click of the exportContacts button in the navbar	
	'click .exportContactsButton' : function(event) {
	    var contacts = Contacts.findOne("Contacts")["contacts"];
	    var dataString = "data:text/json;charset=utf-8,"
		+ encodeURIComponent(JSON.stringify({"_id" : "Contacts",
						     "contacts" : contacts},
						    null, "\t"));
	    var dlAnchorElem = document.getElementById('downloadContacts');
	    dlAnchorElem.setAttribute("href", dataString);
	    dlAnchorElem.setAttribute("download", "contacts.json");
	    dlAnchorElem.click();
	}
    });

    // Contacts Template Event Handlers
    Template.contacts.events({

	// Handle editContact Trigger
	'focus .contactName' : function(event) {	    
	    Session.set("editContact", event.target.id);
	},

	// Handle newContact save button
	'click .saveButton' : function(event) {
	    var first_name = $('#first_name')[0].value;
	    var middle_name = $('#middle_name')[0].value;
	    var last_name = $('#last_name')[0].value;
	    var nickname = $('#nickname')[0].value;
	    
	    var birthday = $('#birthday')[0].value;

	    var mobile_phone = $('#mobile_phone')[0].value;
	    var home_phone = $('#home_phone')[0].value;
	    var work_phone = $('#work_phone')[0].value;

	    var personal_email = $('#personal_email')[0].value;
	    var secondary_email = $('#secondary_email')[0].value;
	    var work_email = $('#work_email')[0].value;

	    var home_apartment = $('#home_apartment')[0].value;
	    var home_street = $('#home_street')[0].value;
	    var home_city = $('#home_city')[0].value;
	    var home_state = $('#home_state')[0].value;
	    var home_zip = $('#home_zip')[0].value;
	    var home_country = $('#home_country')[0].value;

	    var work_company = $('#work_company')[0].value;
	    var work_street = $('#work_street')[0].value;
	    var work_city = $('#work_city')[0].value;
	    var work_state = $('#work_state')[0].value;
	    var work_zip = $('#work_zip')[0].value;
	    var work_country = $('#work_country')[0].value;

	    var newContact =
		{
		    "name" : {
			"first" : first_name,
			"middle" : middle_name,
			"last" : last_name,
			"nickname" : nickname
		    },
		    "birthday" : birthday,
		    "email" : {
			"personal" : personal_email,
			"secondary" : secondary_email,
			"work" : work_email
		    },
		    "phone" : {
			"mobile" : mobile_phone,
			"home" : home_phone,
			"work" : work_phone
		    },
		    "address" : {
			"home" : {
			    "apartment" : home_apartment,
			    "street" : home_street,
			    "city" : home_city,
			    "state" : home_state,
			    "zip" : home_zip,
			    "country" : home_country
			},
			"work" : {
			    "company" : work_company,
			    "street" : work_street,
			    "city" : work_city,
			    "state" : work_state,
			    "zip" : work_zip,
			    "country" : work_country
			}			
		    }
		};

	    var contacts = Contacts.findOne("Contacts")["contacts"];

	    // Empty form check
	    if ((first_name == "") &&
		(middle_name == "") &&
		(last_name == "") &&
		(nickname == "") &&
		(birthday == "") &&
		(personal_email == "") &&
		(secondary_email == "") &&
		(work_email == "") &&
		(mobile_phone == "") &&
		(home_phone == "") &&
		(work_phone == "") &&
		(home_apartment == "") &&
		(home_street == "") &&
		(home_city == "") &&
		(home_state == "") &&
		(home_country == "") &&
		(work_company == "") &&
		(work_street == "") &&
		(work_city == "") &&
		(work_state == "") &&
		(work_country == "")) {
		Materialize.toast("Contact is Empty. Nothing to save!",
				  4000);
		return;
	    }	    

	    // Name collision check
	    for (id in contacts) {
		if ((first_name == contacts[id]["name"]["first"]) &&
		    (middle_name == contacts[id]["name"]["middle"]) &&
		    (last_name == contacts[id]["name"]["last"])) {
		    Materialize.toast("Contact " + name + " already exists!",
				      4000);
		    Materialize.toast("Contact name must be unique!", 4000);
		    return;
		}
	    }

	    // Contact is not empty and there are no name collisions
	    // Time to save contact
	    Meteor.call('SERVER.addContact',
			newContact,
			(err, res) => {
			    if (err) {
				alert(err);
			    } else {
				// success!			    
				var autoCompleteData = {};
				var contactList =
				    Contacts.findOne("Contacts")["contacts"];
				for (id in contactList) {
				    var first_name = contactList[id]["name"]["first"];
				    var middle_name = contactList[id]["name"]["middle"];
				    var last_name = contactList[id]["name"]["last"];
				    var key = "";
				    (first_name != "")? key += first_name + " " : key = key;
				    (middle_name != "")? key += middle_name + " " : key = key;
				    (last_name != "")? key += last_name : key = key;
				    autoCompleteData[key] = null;
				}
				if ($('input.autocomplete') != undefined) {
				    if (typeof $('input.autocomplete').autocomplete == "function") {
					$('input.autocomplete').autocomplete({	
					    data: autoCompleteData
					});
				    }
				}
			    }
			});		    

	    document.getElementsByClassName('newContactForm')[0].reset();
	    $('#newContactFormRow').hide();
	},

	// Handle newContact cancel button
	'click .cancelButton' : function(event) {
	    document.getElementsByClassName('newContactForm')[0].reset();
	    $('#newContactFormRow').hide();	    
	},

	// Handle editContact cancel button
	'click .cancelButton-edit' : function(event) {
	    $('.button-collapse').sideNav('hide');
	},

	// Handle editContact delete button
	'click .deleteButton-edit' : function(event) {
	    var contactBeingDeleted = Session.get('editContact');
	    var contacts = Contacts.findOne("Contacts")["contacts"];
	    for (id in contacts) {
		var key = "";
		(contacts[id]["name"]["first"] != "")? key += contacts[id]["name"]["first"] + " " : key = key;
		(contacts[id]["name"]["middle"] != "")? key += contacts[id]["name"]["middle"] + " " : key = key;
		(contacts[id]["name"]["last"] != "")? key += contacts[id]["name"]["last"] : key = key;	    
		
		if (key == contactBeingDeleted) {
		    contacts.splice(id, 1);
		    break;
		}
	    }
	    Meteor.call('SERVER.saveContacts',
			contacts,
			(err, res) => {
			    if (err) {
				alert(err);
			    } else {
				// success!
				Session.set('editContact', "");
				location.reload();				
			    }
			});	    
	},

	// Handle editContact save button
	'click .saveButton-edit' : function(event) {
	    var contactBeingEdited = Session.get('editContact');
	    
	    var first_name = $('#first_name_edit')[0].value;
	    var middle_name = $('#middle_name_edit')[0].value;
	    var last_name = $('#last_name_edit')[0].value;
	    var nickname = $('#nickname_edit')[0].value;
	    
	    var birthday = $('#birthday_edit')[0].value;

	    var mobile_phone = $('#mobile_phone_edit')[0].value;
	    var home_phone = $('#home_phone_edit')[0].value;
	    var work_phone = $('#work_phone_edit')[0].value;

	    var personal_email = $('#personal_email_edit')[0].value;
	    var secondary_email = $('#secondary_email_edit')[0].value;
	    var work_email = $('#work_email_edit')[0].value;

	    var home_apartment = $('#home_apartment_edit')[0].value;
	    var home_street = $('#home_street_edit')[0].value;
	    var home_city = $('#home_city_edit')[0].value;
	    var home_state = $('#home_state_edit')[0].value;
	    var home_zip = $('#home_zip_edit')[0].value;
	    var home_country = $('#home_country_edit')[0].value;

	    var work_company = $('#work_company_edit')[0].value;
	    var work_street = $('#work_street_edit')[0].value;
	    var work_city = $('#work_city_edit')[0].value;
	    var work_state = $('#work_state_edit')[0].value;
	    var work_zip = $('#work_zip_edit')[0].value;
	    var work_country = $('#work_country_edit')[0].value;

	    var contacts = Contacts.findOne("Contacts")["contacts"];
	    for (id in contacts) {
		var key = "";
		(contacts[id]["name"]["first"] != "")? key += contacts[id]["name"]["first"] + " " : key = key;
		(contacts[id]["name"]["middle"] != "")? key += contacts[id]["name"]["middle"] + " " : key = key;
		(contacts[id]["name"]["last"] != "")? key += contacts[id]["name"]["last"] : key = key;	    
		
		if (key == contactBeingEdited) {
		    // Edit Contact File Here
		    contacts[id]["name"]["first"] = first_name;
		    contacts[id]["name"]["middle"] = middle_name;
		    contacts[id]["name"]["last"] = last_name;
		    contacts[id]["name"]["nickname"] = nickname;
		    contacts[id]["birthday"] = birthday;
		    contacts[id]["phone"]["mobile"] = mobile_phone;
		    contacts[id]["phone"]["home"] = home_phone;
		    contacts[id]["phone"]["work"] = work_phone;
		    contacts[id]["email"]["personal"] = personal_email;
		    contacts[id]["email"]["secondary"] = secondary_email;
		    contacts[id]["email"]["work"] = work_email;
		    contacts[id]["address"]["home"]["apartment"] = home_apartment;
		    contacts[id]["address"]["home"]["street"] = home_street;
		    contacts[id]["address"]["home"]["city"] = home_city;
		    contacts[id]["address"]["home"]["state"] = home_state;
		    contacts[id]["address"]["home"]["zip"] = home_zip;
		    contacts[id]["address"]["home"]["country"] = home_country;
		    
		    contacts[id]["address"]["work"]["company"] = work_company;
		    contacts[id]["address"]["work"]["street"] = work_street;
		    contacts[id]["address"]["work"]["city"] = work_city;
		    contacts[id]["address"]["work"]["state"] = work_state;
		    contacts[id]["address"]["work"]["zip"] = work_zip;
		    contacts[id]["address"]["work"]["country"] = work_country;
		    break;
		}
	    }
	    Meteor.call('SERVER.saveContacts',
			contacts,
			(err, res) => {
			    if (err) {
				alert(err);
			    } else {
				// success!
				Session.set('editContact', "");
				location.reload();				
			    }
			});	    
	}
	
    });

}
