
$(function (){
	
	var say = function(message){
		         console.log(message);};
	 var navList=$('#nav li') 
	 	.fadeOut() 
	 	.fadeIn() 
	 	.animate({fontSize:30}, 1000); 
	
					<!--or-->
		navList.slideUp();

});