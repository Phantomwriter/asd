/*
///////////////////////////////////////////////////

Howard Livingston
ASD with Marianne Sheldon
9/12
JS page with Jquery

///////////////////////////////////////////////////
*/


//Laod Page

$('#home').on('pageinit', function(){

	
$('#signupPage').on('pageinit', function(){
		console.log("Form Displays");
	var myForm=$('#contactForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler:function(){
	var data = myForm.serializeArray();
			storeData(this.key);
		
		}
	});

//shotrten console.log into just......say().
	var say = function(message){
		    console.log(message);
};	


//Get the radio button data			

	var getSelectedRadio = function() {
        var radios = $('input:radio[name=urgency]:checked').val();
        
		console.log(radios);
			return radios;
}

//Pick a theme for the groups

	function pickATheme(){
		var formTag = document.getElementsByTagName("groups");
			selectLi = go('select');
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
	for (var i=0, j=contactGroups.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText= contactGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML =optText;
			makeSelect.appendChild(makeOption);
			
	}
			
			selectLi.appendChild(makeSelect);
}	
				
//Toggle control 

	function toggleControls(n){
		switch(n) {
			case"on":
			go('contactForm').style.display ="none";
			go('clear').style.display ="inline";
			go('displayLink').style.display ="none";
			go('addNew').style.display ="inline";
			break;
		case "off":
			go('contactForm').style.display ="block";
			go('clear').style.display ="inline";
			go('displayLink').style.display ="inline";
			go('addNew').style.display ="none";
			go('items').style.display="none";
			break;
		default:
		return false;
	}
}

//Get data

	function getData(){
		toggleControls("on");
	
		if(localStorage.length === 0){
				alert("There's no Data in Local Storage so default data was entered");
				autoFillData();
}
		var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			go('items').style.display ="block";
	for (var i=0, len=localStorage.length; i<len;i++){
		var makeli =document.createElement('li');
		var linksLi= document.createElement('li');
			makeList.appendChild(makeli);
		var key=localStorage.key(i);
		var value=localStorage.getItem(key);
		var obj=JSON.parse(value);
		var makeSubList=document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.group[1], makeSubList);
		for (var n in obj){
			var makeSubli=document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText=obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML=optSubText;
				makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi); 
	}
}
	
 
//Store data

	function storeData(key){
		if(!key){
		var id=Math.floor(Math.random()*100000001);
		
		}else if(key === "A-Z" || "a-z")
{
		localStorage.removeItem(this.key);
}
		else
{
		id =key;
}
		getSelectedRadio();		
		var item            ={};
			item.groups		=["groups:", go('groups').value];
			item.fname		=["First Name:", go('fname').value];
			item.lname		=["Last Name:", go('lname').value];
			item.pword		=["Password:", go('pword').value];
			item.cpword		=["Confirm Password:", go('cpword').value];
			item.email		=["Email:", go('email').value];
			item.deviceValue=["What device are you using?:",deviceValue];
			item.friends    =["I have:", go('quantity').value]
			item.date		=["Date:", go('date').value];		
			localStorage.setItem(id, JSON.stringify(item));
			alert("Information is saved!");		
		
} 
 
 
//Auto populate Local Storage
//Store the JSON object in local storage
    
    function autoFillData(){
    	for (var n in json){
    		var id = Math.floor(Math.random() * 100000001);
    			localStorage.setItem(id, JSON.stringify(json[n]));
    	}
    }
//links for the items
	
	function makeItemLinks(key, linksLi){
		var breakTag = document.createElement('br');
		var editLink=document.createElement('a');
			editLink.href ="#contactForm";
			editLink.key = key;
		var editText ="editContact";
			editLink.addEventListener("click", editItem);
			editLink.innerHTML = editText;
			linksLi.appendChild(editLink);
		
		var breakTag =document.createElement('br');
			linksLi.appendChild(breakTag);
		
		
		var deleteLink=document.createElement('a');
			deleteLink.href="#clear";
			deleteLink.key =key;
		var deleteText ="deleteContact";
			deleteLink.addEventListener("click", deleteItem);
			deleteLink.innerHTML=deleteText;
			linksLi.appendChild(deleteLink);
}
//edit item
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			toggleControls("off");
			go('groups').value=item.group[1];
			go('fname').value=item.fname[1];
			go('lname').value=item.lname[1];
			go('pword').value=item.pword[1];
			go('cpword').value=item.cpword[1];
			go('email').value=item.email[1];
			go('deviceValue').value=item.deviceValue[1];
			go('friends').value=item.friends[1];
		var radio=document.forms[0].deviceValue;
		for (var i=0; i<radio.length; i++){
			if(radio[i].value == "CellPhone" && item.deviceValue[1] =="CellPhone"){
				radio[i].setAttribute("checked","checked");
			}else if(radio[i].value =="Tablet" && item.deviceValue[i] == "Tablet") {
				radio[i].setAttribute("checked","checked");
	}
}
		if(item.text[1] =="Yes")     {
			go('check').setAttribute("checked","checked");
	}
			go('friends').value=item.friends[1];
			go('date').value=item.date[1];			
				
				save.removeEventListener("click", storeData);
		
			go('submit').value ="editContact";
		var editSubmit = go('submit');
			editSubmit.addEventListener("click", storeData);
			editSubmit.key = this.key;
	
}

/*Delete Item*/
	function deleteItem(){
		var ask = confirm("R U sure U want 2 delete the content?");
		if(ask){
			localStorage.removeItem(this.key);
				alert("Deleted successfully!");
					window.location.reload();
		
		}else{
			alert("Content not deleted")
		
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

	function getImage(pickATheme, makeSubList){
    	var imageLi=document.createElement('li'); 
    		makeSubList.appendChild(imageLi);
    	var newImg=document.createElement('img');
    	var setSrc=newImg.setAttribute("src", "images/" + pickATheme + ".png");
    		imageLi.appendChild(newImg);
    }

/*Date*/
	function date(i){
		var e = document.getElementById('day');
			while(e.length>0)
				e.remove(e.length-1);
		var j=-1;
		if(i=="na")
			k=0;
		else if(i==2)
			k=28;
		else if(i==4||i==6||i==9||i==11)
			k=30;
		else
			k=31;
		while(j++<k){
		var s=document.createElement('option');
		var e=document.getElementById('day');
		if(j==0){
			s.text="Day";
			s.value="na";
		try{
			e.add(s,null);}
		catch(ex){
			e.add(s);}}
		else{
			s.text=j;
			s.value=j;
		try{
			e.add(s,null);}
		catch(ex){
			e.add(s);}}}}
			y = 2010;
		while (y-->1909){
		var s = document.createElement('option');
		var e = document.getElementById('year');
			s.text=y;
			s.value=y;
		try{
			e.add(s,null);}
			catch(ex){
		e.add(s);}}

//Local variables and function calls
		
		var contactGroups =["--pickATheme--", "Fun", "Education", "Work"],
			deviceValue,				
			selectValue = "No",
			errMsg = go('errors');
		
		
			pickATheme();

//Set Link and Submit Click Events
	
		var displayLink = go('displayLink');
			displayLink.addEventListener("click", getData);
		var clearLink =go('clear');
			clearLink.addEventListener("click", clearLocal);
		var save= go('submit');
			save.addEventListener("click", storeData);


});


































