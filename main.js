
var o = {}; //буфер для edit
var oh = {}; //буфер для edit header
var ob = {}; //буфер для add
window.onload = function(){
	if(!localStorage.counter){
		localStorage.setItem('counter', 0);
	};
	if(!localStorage.menucounter){
		localStorage.setItem('menucounter', 0);
	}

	//выгрузка из localstorage
	if(localStorage.nav){
		load('nav');
	};	
	if(localStorage.sidebar) {
		load('sidebar');
	};
	if(localStorage.article){
		load('article');
	};

	addEvents();
	addEmptyBlocks();
}

function load(block) {//загружаем блоки
	let tempsave = JSON.parse(localStorage[block]);
	for (var i = 0; i < tempsave.length; i++){
		let element = document.createElement('div');
		document.getElementById(block).appendChild(element); 
		element.outerHTML = tempsave[i];
	}
}

function addEvents() {//назначаем кнопки edit
	let editBtn = document.querySelectorAll('.editButton');
		editBtn.forEach(function(item) {
		item.addEventListener('click', function(e) {
			// console.log(e.path[2].id)
			if(e.path[2].id == 'nav') {
				if (editheadermodal.classList.contains('close')){
					editheadermodal.classList.toggle('close')
					editheadermodalHeader.innerHTML = ("edit " + e.path[1].id + ":");
				};
			} else {
				editmodal.classList.contains('close')
				editmodal.classList.toggle('close')
				editmodalHeader.innerHTML = ("edit " + e.path[1].id + ":");
			}
			//для тестов)
			// o.path = e.path;
			// console.log(o.path);
			o.target = (e.path[1].id);
			o.parent = (e.path[2].id);
			// eih1.value = document.getElementById(o.target + 'h1').innerHTML;
			// eitxt.value = document.getElementById(o.target + 'txt').innerHTML;

		})
	});
}

function addEmptyBlocks() {	
	let emptyblock = document.createElement('div');
		emptyblock.classList.add("textblock", "empty");
		emptyblock.id = "emptysidebar"
		emptyblock.addEventListener('click', function(e) {
			if (addmodal.classList.contains('close')){
				addmodal.classList.toggle('close');
			}
			ob.target = (e.path[1].id);
			addmodalHeader.innerHTML = ("add new item in " + ob.target + ":");
		});
	sidebar.appendChild(emptyblock);//всегда будет пустой блок + кнопка добавить новый блок в sidebare
	
	let emptyblock2 = document.createElement('div');
		emptyblock2.classList.add("textblock", "empty");
		emptyblock2.id = "emptyarticle"
		emptyblock2.addEventListener('click', function(e) {
			if (addmodal.classList.contains('close')){
				addmodal.classList.toggle('close');
			}
			ob.target = (e.path[1].id);
			addmodalHeader.innerHTML = ("add new item in " + ob.target + ":");
		});
	article.appendChild(emptyblock2);//всегда будет пустой блок + кнопка добавить новый блок в article

	let emptyMenu = document.createElement('div');
		emptyMenu.classList.add("menu", "empty");
		emptyMenu.id = "emptyMenu";
		emptyMenu.addEventListener('click', function(e) {
			if (addmenumodal.classList.contains('close')){
				addmenumodal.classList.toggle('close');
			}

		// oh.path = e.path;
		addmenumodalHeader.style = "color: black";
		addmenumodalHeader.innerHTML = ("add new item in " + e.path[1].id + ":");
		})
	nav.appendChild(emptyMenu);
}

function saveLS(block){//сохраняем блоки
	let clone = [];
	let saveArray = [];
		clone = Array.from(document.getElementById(block).children);
		clone.forEach(function(item) {
			if(!item.classList.contains('empty')){
			saveArray.push(item.outerHTML);
			};
		});
    localStorage[block] = JSON.stringify(saveArray);
}

function add() {//новый блок
	localStorage.counter++;
	let div = document.createElement('div');
		div.classList.add('textblock');
		div.id = ("tb" + localStorage.counter);
	let divEditBtn = document.createElement('button');
		divEditBtn.classList.add('editButton');
		divEditBtn.innerHTML = "Edit";
		div.appendChild(divEditBtn);
	let divH1 = document.createElement('h1');
		divH1.id = (div.id + "h1");
		divH1.innerHTML = aih1.value;
		div.appendChild(divH1);
	let divText = document.createElement('div');
		divText.classList.add('text');
		divText.id =(div.id + "txt");
		divText.innerHTML = aitxt.value;
		div.appendChild(divText);
	let block = document.getElementById(ob.target);
		//пустой блок всегда снизу
		if (ob.target == 'sidebar') {
			block.insertBefore(div,(document.getElementById('empty' + ob.target)));
		} else if (ob.target == 'article') {
			block.insertBefore(div,(document.getElementById('empty' + ob.target)));
		}
	saveLS(ob.target);
	addEvents();
}

function addMenu() {
	oh.counter = 0;
	localStorage.menucounter++
	addmenumodalHeader.innerHTML = "add new menu item";
	addmenumodalHeader.style = "color: black";

	if (nav.childElementCount > 4) {
		addmenumodalHeader.innerHTML = ("sorry, 4 menu items max");
		addmenumodalHeader.style = "color: red";
	} else {
		oh.counter++
		let div = document.createElement('div');
			div.classList.add('menu');
			div.id = ("menu" + localStorage.menucounter);
		let menuEditBtn = document.createElement('button');
			menuEditBtn.classList.add('editButton');
			menuEditBtn.innerHTML = "Edit";
		div.appendChild(menuEditBtn);
		let a = document.createElement('a');
			a.innerHTML = amn.value;
			a.setAttribute('href', aml.value);
			div.appendChild(a);
		nav.insertBefore(div, emptyMenu);
		saveLS('nav');
		addEvents();
	}
}

function save() {
	if (o.parent == 'nav') {
		// let trgt = document.getElementById(o.target);
		// console.log(document.getElementById(o.target).children[1])
		// ob.text = document.getElementById(o.target).children[1];
		// // console.log(o.target);
		// console.log(o.parent);
		document.getElementById(o.target).children[1].innerHTML = emn.value
		document.getElementById(o.target).children[1].setAttribute('href', eml.value);
		saveLS(o.parent.toString());
	} else {
		document.getElementById(o.target + 'h1').innerHTML = eih1.value;
		document.getElementById(o.target + 'txt').innerHTML = eitxt.value;
		saveLS(o.parent.toString());
	}
}

function remove() {
	document.getElementById(o.target).remove();
	saveLS(o.parent.toString());
	discard();
}

function discard() {
	if (!addmodal.classList.contains('close')){
		addmodal.classList.toggle('close');
	};
	if (!addmenumodal.classList.contains('close')){
		addmenumodal.classList.toggle('close');
	};
	if (!editmodal.classList.contains('close')){
		editmodal.classList.toggle('close');
	};
	if (!editheadermodal.classList.contains('close')){
		editheadermodal.classList.toggle('close');
	};
}
