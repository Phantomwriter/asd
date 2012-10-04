/*
///////////////////////////////////////////////////

Howard Livingston
ASD with Marianne Sheldon
9/12
mainJS page with Jquery

///////////////////////////////////////////////////
*/


//Laod Page
$('#home').on('pageinit', function(){
		console.log("It's working");
		/* then*/
});	
$('#signupPage').on('pageinit', function(){
	var contactGroups =["--pickATheme--", "Fun", "Education", "Work"];	
	var validate = function(){
	var myForm=$('#signupForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler:function(){
	var data = myForm.serializeArray();
			storeData(this.key);
		
		}
	});
	}

//Set Link and Submit Click Events
var displayLink = $('displayLink');
			displayLink.on("click", getData);
		var clearLink =$('#clear');
			clearLink.on("click", clearLocal);
		var save= $('#submit');
			save.on("click", validate);
});

//Get data
var getData= function(){
	
		if(localStorage.length === 0){
				alert("There's no Data in Local Storage so default data was entered");
				autoFillData();
	}
		var makeDiv = $('<div id="items"></div>');
			makeDiv.appendTo('#showMembers');
		var makeList = $('<ul>');
			makeList.addClass("members").appendTo('#items');
	
		for (var i=0, len=localStorage.length; i<len;i++){
		var eachMember =$('<li>');
		eachMember.addClass('eachMember').appendTo('members');
		var linksLi= $('<li>');
		var key=localStorage.key(i);
		var value=localStorage.getItem(key);
		var obj=JSON.parse(value);
		var makeSubList=$('<ul id="each"></ul>');
			makeSubList.appendTo('eachMember');
			getImage(obj.member[1], makeSubList);
		for (var n in obj){
			var makeSubLi=$('<li>');
			var optSubText=obj[n][0] + " " + obj[n][1];
				makeSubli.appendTo('#each')
					.HTML(optSubText);
				linkLi.appendTo('#each');
		}
		makeItemLinks(localStorage.key(i), linksLi); 
	}
}
	
//Store data
var storeData= function(key){
		if(!key){
			var id=Math.floor(Math.random()*100000001);
		
		}else{
			id =key;
		};
		pickATheme();
		deviceValues();	
		var item            ={};
			item.fname		=['First Name:', $('#fname').value];
			item.lname		=['Last Name:', $('#lname').value];
			item.pword		=['Password:', $('#pword').value];
			item.cpword		=['Confirm Password:', $('#cpword').value];
			item.email		=['Email:', $('#email').value];
			item.deviceValue=['What device are you using?:',deviceValue];
			item.friends    =['I have:', $('#quantity').value];
			item.groups		=['groups:', $('#groups').value];
			item.date		=['Date:', $('#date').value];		
			
				localStorage.setItem(id, JSON.stringify(item));
					alert("Information is saved!");		
		
} 
 
//Links for the items
var	makeItemLinks = function(key, linksLi){
		var editLink=$('a');
			editLink.attr("href","#signupPage");
			editLink.key = key;
		var editText ="Edit Contact";
			editLink.addClass("editLink").on('click', editItem) .html(editText);
			linksLi.append(editLink);
	
		var deleteLink=$('a');
			deleteLink.attr("href", "#");
			deleteLink.key =key;
		var deleteText ="Delete Contact";
			deleteLink.addClass("deleteLink").on('click', deleteItem).html(deleteText);
			linksLi.append(deleteLink);
}

//Edit item
var editItem= function(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			$('#groups').val(item.groups[1]);
			$('#fname').val(item.fname[1]);
			$('#lname').val(item.lname[1]);
			$('#pword').val(item.pword[1]);
			$('#cpword').val(item.cpword[1]);
			$('#email').val(item.email[1]);
			$('#deviceValue').val(item.deviceValue[1]);
			$('#friends').val(item.friends[1]);
  			$('#friends').val(item.friends[1]);
			$('#date').val(item.date[1]);			
  		var radios=$('#deviceValue').val();
		for (var i=0; i<radios.length; i++){
			if(radios[i].val() == "CellPhone" && item.deviceValue[1] =="CellPhone"){
				radios[i].attr("checked","checked");
			}else if($(radios[i]).val() =="Tablet" && item.deviceValue[i] == "Tablet"){
				radios[i].attr("checked","checked");
			}
}
		
			var editSubmit = $('#submit');
			editSubmit.off("click", validate);
			editSubmit.val("editContact");
			editSubmit.on("click", storeData);
			editSubmit.key = this.key;
}
		
//Delete Item
var deleteItem = function (){
		var ask = confirm("R U sure U want 2 delete the content?");
		if(ask){
			localStorage.removeItem(this.key);
				alert("Deleted successfully!");
					window.location.reload();
}
}

//Auto-populate Local Storage and
//store the JSON object in local storage
var autoFillData= function (){
    	for (var n in json){
    		var id = Math.floor(Math.random()*100000001);
    			localStorage.setItem(id, JSON.stringify(json[n]));
    	}
    }

//Clear local storage
function clearLocal(){
		if(localStorage.length === 0){
			alert("There's no data to clear!");
		}else{
			localStorage.clear();
				alert("All contacts are deleted!");
				window.location.reload();
					return false;
	}
}	

//Getting image for the right category
var getImage= function (pickATheme, makeSubList){
		var imageLi=$('li'); 
    		makeSubList.append(imageLi);
    	var newImg=$('img');
    	var setSrc=newImg.attr("src", "images/" + pickATheme + ".png");
    		imageLi.append(newImg);
    }


//Get the radio button data			
var deviceValues = function() {
        var radios = $('input:radio[name=deviceValue]:checked').val();
			return radios;
}

//Pick a theme for the groups
function pickATheme(){
		var formTag = $("#groups");
			selectLi = $('<select>');
			makeSelect = $('<select>');
			makeSelect.attr("id", "groups");
	for (var i=0, j=contactGroups.length; i<j; i++){
		var makeOption =$('<option>');
		var optText= contactGroups[i];
			makeOption.attr("value", optText);
			makeOption.html=optText;
			makeSelect.appendTo(makeOption);
			
	}
			
			selectLi.appendTo(makeSelect);
}		

   

































