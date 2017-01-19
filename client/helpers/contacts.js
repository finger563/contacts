if(Meteor.isClient) {

    // onCreated method for Contacts Template
    Template.contacts.onCreated(function() {
	$('ul.tabs').tabs();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip({delay: 50});    
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
	    console.log("async fonts loaded", WebFontConfig);
	})();
    });

    Template.contacts.rendered = function() {
	$('ul.tabs').tabs();
	$('.collapsible').collapsible();
	$('.tooltipped').tooltip({delay: 50});    
	var contactList = Template.contacts.__helpers[" contactList"]();
	var autoCompleteData = {};
	for (contact in contactList)
	    autoCompleteData[contactList[contact]["name"]] = null;    
	$('input.autocomplete').autocomplete({	
	    data: autoCompleteData
	});
	Session.set("searchName", "");
    };

    Template.contacts.helpers({
	
	contactList() {
	    if (Session.get("searchName") != "")
		return Template.contacts.__helpers[" findContact"](Session.get("searchName"));
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

	hasPersonalEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]["personal"]
		       != undefined)
			return true;
		    else
			return false;
		}	    
	    }
	    return false;
	},    

	hasWorkEmail(contactName) {
	    for (id in Contacts.findOne("Contacts")["contacts"]) {
		if(Contacts.findOne("Contacts")["contacts"][id]["name"]
		   == contactName) {
		    if(Contacts.findOne("Contacts")["contacts"][id]["email"]["work"]
		       != undefined)
			return true;
		    else
			return false;
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
			return true;
		    else
			return false;
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
			return true;
		    else
			return false;
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
			    return true;
			else
			    return false;
		    }
		    else
			return false;
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
			    return true;
			else
			    return false;
		    }
		    else
			return false;
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

    Template.contacts.events({
	'keypress input.autocomplete': function (event) {	
	    if (event.which === 13) {
		event.preventDefault();
		console.log("Enter Key handled", event.target.value);
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
	    $('.tooltipped').tooltip({delay: 50});
	}
    });

}
