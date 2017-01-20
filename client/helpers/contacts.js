if(Meteor.isClient) {

    // onCreated method for Contacts Template
    Template.contacts.onCreated(function() {
	var contactList = Contacts.findOne("Contacts")["contacts"];
	var autoCompleteData = {};
	for (contact in contactList)
	    autoCompleteData[contactList[contact]["name"]] = null;
	if ($('input.autocomplete') != undefined) {
	    if (typeof $('input.autocomplete').autocomplete == "function") {
		$('input.autocomplete').autocomplete({	
		    data: autoCompleteData
		});
	    }
	}
	WebFontConfig = {
	    google: { families:
		      [ 'Roboto Slab:700,400:latin',
			'Oswald:400',
			'Mouse Memoirs',
			'Ubuntu'
		      ] }
	};
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

    Template.contacts.rendered = function() {
	Session.set("searchName", "");
    };

    Template.contacts.helpers({
	
	contactList() {
	    if (Session.get("searchName") != "") {
		var searchString = Session.get("searchName");
		return Template.contacts.__helpers[" findContact"](searchString);
	    }
	    else
		return Contacts.findOne("Contacts")["contacts"];
	},

	contactListNames() {
	    var contactObjectList = Contacts.findOne("Contacts")["contacts"];
	    var contactNameList = [];
	    for (id in contactObjectList) {
		contactNameList.push(contactObjectList[id]["name"]);
	    }
	    return contactNameList;
	},

	findContact(contactName) {
	    var contactObjectList = Contacts.findOne("Contacts")["contacts"];
	    var findResult = [];
	    for (id in contactObjectList) {
		if (contactObjectList[id]["name"] == contactName)
		    findResult.push(contactObjectList[id]);
	    }
	    return findResult;
	},

	hasPhone(contactName) {	    
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasHomePhone(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasMobilePhone(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasWorkPhone(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasPersonalEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasSecondaryEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasWorkEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasBirthday(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["birthday"]
		       != undefined)
			if(Contacts.findOne("Contacts")["contacts"][id]["birthday"] != "")			
			    return true;
		}	    
	    }
	    return false;
	},        

	hasAddress(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["address"]
		       != undefined)
			if(Contacts.findOne("Contacts")["contacts"][id]["address"] != {})			
			    return true;
		}	    
	    }
	    return false;
	},    

	hasHomeAddress(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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

	hasWorkAddress(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
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
	},
	
	
	reactiveDataFunction: function () {
            return Template.contacts.__helpers[" contactList"];
	},
	
	optionsObject : function() {
	    var optionsObject = {
		paging: false,
		columns: [
		    {
			title: 'Name',
			data: 'name', 
			className: 'nameColumn'
		    },
		    {
			title: 'Birthday',
			data: 'birthday',
			className: 'birthdayColumn'
		    },
		    {
			title: 'Phone',
			data: 'phone.mobile',
			className: 'phoneColumn'
		    },
		    {
			title: 'Email',
			data: 'email.personal',
			className: 'emailPersonalColumn'
		    }
		]
	    }
	    return optionsObject;
	}
	
    });

    Template.navigation.events({
	'keypress input.autocomplete': function (event) {	
	    if (event.which === 13) {
		event.preventDefault();		
	    }
	},

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
			    var autoCompleteData = {};
			    var contactList =
				Contacts.findOne("Contacts")["contacts"];
			    for (contact in contactList)
				autoCompleteData[contactList[contact]["name"]] = null;    
			    if ($('input.autocomplete') != undefined) {
				if (typeof $('input.autocomplete').autocomplete == "function") {
				    $('input.autocomplete').autocomplete({	
					data: autoCompleteData
				    });
				}
			    }
			}
		    });		    
		}
		r.readAsText(uploadedFile);		
	    }
	    else 
		alert("Failed to load file");
	},
	'click .newContactButton' : function(event) {
	    $('#newContactFormRow').show();
	},
	'click .contactsUploadButton' : function(event) {	    
	    $('.contactsUpload')[0].click();
	},
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
	},
	'click .clearContactsButton' : function(event) {	    
	    Meteor.call('SERVER.clearContacts',
			(err, res) => {
			    if (err) {
				alert(err);
			    } else {
				// success
				location.reload();
			    }
			});		    	    
	}	
    });

    Template.contacts.events({
	'click .cancelButton' : function(event) {
	    document.getElementsByClassName('newContactForm')[0].reset();
	    $('#newContactFormRow').hide();	    
	},

	'click .saveButton' : function(event) {
	    var name = $('#name')[0].value;
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
		    "name" : name,
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
	    if ((name == "") &&
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
		if (name == contacts[id]["name"]) {
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
				for (contact in contactList)
				    autoCompleteData[contactList[contact]["name"]] = null;    
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
	}
    });

}
