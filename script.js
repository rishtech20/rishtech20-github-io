var button = document.getElementById("enter");
var additem = document.getElementById("userinput");
var ul = document.querySelector("ul");
var i_title = document.getElementsByTagName("i")[0];
var i_Note = document.getElementsByTagName("i")[1]; //To edit the Note to self content
var i_descList = document.getElementsByTagName("i")[2]; //To edit the List description
var note2Self = document.getElementsByTagName("p")[0]; //Variable holding the content of Note to self
var listDescp = document.getElementsByTagName("p")[1]; //Variable holding the content of Note to self
var h1 = document.getElementsByTagName("h1")[0];
var li = document.getElementsByTagName("li");
var i_ok = document.getElementsByClassName("glyphicon glyphicon-ok"); //array to hold all the ok icons
i_trash = document.getElementsByClassName("glyphicon glyphicon-trash"); //array to hold all the trash icons

//function to update the number of the items in the list
function countList(){
	var badge = document.getElementsByClassName("badge")[0];
	badge.innerText = li.length;
}
countList();

//<span style="float: right;"><i class="glyphicon glyphicon-ok"></i>  
//<i class="glyphicon glyphicon-trash" style="margin-left: 10px;"></i> </span>
//Adding new item to the list
function createListElement(){
	var li = document.createElement("li");
	var att = document.createAttribute("class");       // Create a "class" attribute
	att.value = "list-group-item list-group-item-action";
	li.setAttributeNode(att);
	li.appendChild(document.createTextNode(additem.value));
	var span = document.createElement("span");
	span.setAttribute('style', 'float: right;'); 
	var  i1 = document.createElement("i");
	i1.setAttribute('class', 'glyphicon glyphicon-ok');
	span.appendChild(i1);
	var i2 = document.createElement("i");
	i2.setAttribute('class', 'glyphicon glyphicon-trash');
	i2.setAttribute('style', 'margin-left: 10px');
	span.appendChild(i2);
	li.appendChild(span);
	ul.appendChild(li);
	countList();
	additem.value = "";
	i_ok[i_ok.length - 1].addEventListener("click", bindClick(i));
	i_trash[i_ok.length - 1].addEventListener("click", bindClickTrash(i));
}

button.addEventListener("click", function(){
	if (additem.value === ""){
		console.error("No Text entered!!!");
		return null;
	}
	createListElement();
})

additem.addEventListener("keypress", function(event){
	if (additem.value.length > 0 && event.keyCode === 13){
		createListElement();
	}
})

//Editing the List Title
/*
* Description: Clicking the pen icon laucnhes the title edit mode, the list title is replced by a text box where the user ca
* input a new name and hitting the return key or clicking on the pen icon again saves the new title and it displayed.
*/
var titleClicks = 0;
var edit_box = document.createElement("input");

function open_editBox(){
	edit_box.value = h1.innerText;
	h1.replaceWith(edit_box);
}

function close_editBox(){
	edit_box.replaceWith(h1);
}

function save_editBox(event){
	console.log(event);
	if (event.keyCode === 13 && edit_box.value.length > 0){
		console.log("we are inside");
		h1.innerText = edit_box.value;
		close_editBox();
	}
}

i_title.addEventListener("click", function(){
	titleClicks++;
	if (titleClicks % 2 !== 0){
		open_editBox();
	}
	else{
		close_editBox();
	}
});

edit_box.addEventListener("keypress", function(event){
	save_editBox(event);
})

/*
* Description: Clickin on the pen icon launches the text edit mode where user can input new text and hitting return key
* replaces the previous text with the newly created text.
*/
//Editing Note to self Card: 
var textArea1 = document.createElement("textarea"); //creating the text area to replace the Note 2 self text

function openTextArea(){
	textArea1.value = note2Self.innerText;
	note2Self.replaceWith(textArea1);
	textArea1.addEventListener("keypress", saveAndCloseTextArea);
}

function saveAndCloseTextArea(event){
	if (event.keyCode === 13 && textArea1.value.length > 0){
		note2Self.innerText = textArea1.value;
		textArea1.replaceWith(note2Self);	
	}
}

i_Note.addEventListener("click", openTextArea);

//Editing List Description Card - Description same as for Editing Note 2 Self
var textArea2 = document.createElement("textarea"); //creating the text area to replace the List Description text

function openTextArea2(){
	textArea2.value = listDescp.innerText;
	listDescp.replaceWith(textArea2);
	textArea2.addEventListener("keypress", saveAndCloseTextArea2);
}

function saveAndCloseTextArea2(event){
	if (event.keyCode === 13 && textArea2.value.length > 0){
		listDescp.innerText = textArea2.value;
		textArea2.replaceWith(listDescp);	
	}
}

i_descList.addEventListener("click", openTextArea2)

//Marking the list item as complete
/*
*  Description: When, the user clicks on the ok button the list item should turn red and the text should inherit
* line-thorugh text decoration. Also, the percentage should change accordingly.
*/
//style="text-decoration: line-through; background-color: rgba(255, 0, 0, 0.5);
//Using closure

 for(var i=0; i< i_ok.length; i++) {
      i_ok[i].addEventListener("click", bindClick(i));
 }

 function bindClick(i) {
    return function() {
        li[i].setAttribute("style", "text-decoration: line-through; background-color: rgba(210, 0, 100, 0.4);");
    };
 }

//Deleting the list item when trash icon is clicked.
/*
*  Description: When, the user clicks on the trash button the list item should be deleted from the list.
*  Also, the percentage should change accordingly.
*/
//Using closure
 for(var i=0; i< li.length; i++) {
      i_trash[i].addEventListener("click", bindClickTrash(i));
 }

 function bindClickTrash(i) {
    return function() {
    	if (li.length === 1){
    		li[0].remove();
    		countList();
    		return 0;
    	}
    	console.log(i);
        li[i].remove();
        countList();
    };
 }




