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

//SignUp Page
$('#signupPage').on('pageinit', function(){
	alert("It's also working");
	var validate = function(){
	var myForm=$('#signupForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler:function(){
	var data = myForm.serializeArray();
			storeData(data);

		}
	});
	}

//getXmlData
$('#xmlButton').on('click',function(){
                $('<p>').html('xml').appendTo('#xmlData');
				$('#xmlData').empty();
                $.ajax({
                    url:"xhr/data.xml",
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                       console.log(xml);
                       $(xml).find("item").each(function(){
						var firstName = $(this).find('fname').text();
						var lastName = $(this).find('lname').text();
						var password = $(this).find('pword').text();
						var confirmPassword = $(this).find('cpword').text();
						var eMail = $(this).find('email').text();
						var deviceValue = $(this).find('deviceValue').text();
						var friends = $(this).find('friends').text();
						var group = $(this).find('group').text();
						var date = $(this).find('date').text();

                            $(''+
								  '<div id="items">'+
										'<p>First name:'+ fname +'</p>'+
										'<p>LastName:'+ lname +'</p>'+
										'<p>Password:'+ pword +'</p>'+
										'<p>Confirm password:'+ cpword+'</p>'+
										'<p>E-Mail:'+ email +'</p>'+
										'<p>deviceValue:'+ devicevalue +'</p>'+
										'<p>friends:'+ friends +'</p>'+
										'<p>group:'+ group +'</p>'+
										'<p>date:'+ date +'</p>'+
								   '</div>'
                                 ).appendTo('#xmlData');
                 	  });
				 }
		})


});	

//Get json data
$('#jsonButton').on('click', function(){
		$('<p>').html('json').appendTo('#jsonData');
		$("#jsonData").empty();
		$.ajax({
			url:'xhr/data.json',
			type:'GET',
			dataType:'json',
			success:function(result){
				for(var i=0, j=result.json.length; i<j; i++) {
					var json =result.json[i];
				$('' + 
					'<div>' +
						'<p>'+ json.fname +'</p>'+
						'<p>Last Name:' +json.lname +'</p>'+
						'<p>Password:'+json.pword +'</p>'+
						'<p>Confirm Password:'+json.cpword +'</p>'+
						'<p>E-mail:'+ json.email +'</p>'+
						'<p>deviceValue:'+json.deviceValue +'</p>'+
						'<p>Friends:'+json.friends +'</p>'+
						'<p>date:'+json.date +'</p>'+
					'</div>'
				).appendTo('#jsonData');
			}
		}
  });

});

//Get CSV Data
$('#csvButton').on('click', function(){
			$('#csvData').empty();
			$('<p>').html('CSV').appendTo('#csvData');
			$.ajax({
				type: "GET",
				url: "xhr/data.csv",
				dataType: "text",
				success: function(data) {
					var line = data.split('\n');
					for (var i = 1, x = line.length; i < x; i++) {
						var obj = line[i];
						var item = obj.split(',');
						var itemList = $(''+
								  '<div id="items">'+
										'<p>First Name: '+ item[0] +'</p>'+
										'<p>Last Name: '+ item[1] +'</p>'+
										'<p>Password: '+ item[2] +'</p>'+
										'<p>Conform Password: '+ item[3] +'</p>'+
										'<p>E-mail: '+ item[4] +'</p>'+
										'<p>Device Value: '+ item[5] +'</p>'+
										'<p>Friends: '+ item[6] +'</p>'+
										'<p>Group: '+ item[7] +'</p>'+
										'<p>Date: '+ item[8] +'</p>'+
									'</div>'
                                 ).appendTo('#csvData');

				}		
			}
		})
	});

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
};	


//Set Link and Submit Click Events
var displayLink = $('displayLink');
			displayLink.on("click", getData);
			alert("Displayed");
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
			makeDiv.append('#showMembers');
		var makeList = $('<ul>');
			makeList.append("members").append('#item');
	
		for (var i=0, len=localStorage.length; i<len;i++){
		var eachMember =$('<li>');
		eachMember.append('members');
		var linksLi= $('<li>');
		var key=localStorage.key(i);
		var value=localStorage.getItem(key);
		var obj=JSON.parse(value);
		var makeSubList=$('<ul>');
			makeSubList.append('#eachMember');
			getImage(obj.member[1], makeSubList);
		for (var n in obj){
			var makeSubLi=$('<li>');
			var optSubText=obj[n][0] + " " + obj[n][1];
				makeSubli.append('#item')
					.HTML(optSubText);
				linkLi.append('#item');
	
		}
		makeItemLinks(localStorage.key(i), linksLi); 
	makeList.append(linksLi);
	}
};
	
//Save data
var storeData= function(data){
			var id=Math.floor(Math.random()*100000001);
		console.log(data);
		deviceValues();	
		var item            ={};
			item.fname		=['First Name:', $('#fname').value];
			item.lname		=['Last Name:', $('#lname').value];
			item.pword		=['Password:', $('#pword').value];
			item.cpword		=['Confirm Password:', $('#cpword').value];
			item.email		=['Email:', $('#email').value];
			item.deviceValue=['What device are you using?:',deviceValue];
			item.friends    =['I have:', $('#quantity').value];
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
			deleteLink.attr("deleteLink").on('click', deleteItem).html(deleteText);
			linksLi.append(deleteLink);
};

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
};
		
//Delete Item
var deleteItem = function (){
		var ask = confirm("R U sure U want 2 delete the content?");
		if(ask){
			localStorage.removeItem(this.key);
				alert("Deleted successfully!");
					window.location.reload();
}
};

//Auto-populate Local Storage and
//store the JSON object in local storage
var autoFillData= function (){
    	for (var n in json){
    		var id = Math.floor(Math.random()*100000001);
    			localStorage.setItem(id, JSON.stringify(json[n]));
    	alert("It filled the data");
    	}
    };


//Getting image for the right category
var getImage= function (pickATheme, makeSubList){
		var imageLi=$('li'); 
    		makeSubList.append(imageLi);
    	var newImg=$('img');
    	var setSrc=newImg.attr("src", "images/" + pickATheme + ".png");
    		imageLi.append(newImg);
    };


//Get the radio button data			
var deviceValues = function() {
        var radios = $('input:radio[name=deviceValue]:checked').val();
			return radios;
};












   

































