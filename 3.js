var bS = document.querySelectorAll('.navButton');
var rmp = document.querySelectorAll('.roadMapPoint');

bS.forEach(function(item){
  item.addEventListener('click', move);
});
rmp.forEach(function(item){
  item.addEventListener('click', moveRound);
});
function move(arg) {
	console.log(arg);
	var direction = arg.path[0].innerText;
	var trgt = arg.path[1];
	var trgt2 = trgt.querySelectorAll('.roadMapPoint');
	if (direction == '<') {
		for (i = 0; i < trgt2.length; i++) {
			if(trgt2[i].classList.contains('ball')){
				var a = (parseInt(trgt2[i].getAttribute('data-id'))-1);
			};
		};
		if (a == 0) {
			trgt2[a].classList.remove('ball')
			a = 3;
			trgt2[a].classList.add('ball');
		} else {
			trgt2[a].classList.remove('ball');
			trgt2[(a-1)].classList.add('ball');
		}
	} else if (direction == '>') {
		for (i = 0; i < trgt2.length; i++) {
			if(trgt2[i].classList.contains('ball')){
				var a = (parseInt(trgt2[i].getAttribute('data-id'))-1);
			};
		};
		if (a == 3) {
			trgt2[a].classList.remove('ball')
			a = 0;
			trgt2[a].classList.add('ball');
		} else {
		trgt2[a].classList.remove('ball');
		trgt2[(a+1)].classList.add('ball');
		};
	};
};

function moveRound(arg) {
	console.log(arg);
	var a = arg.path[0].dataset.id;
	var trgt = arg.path[1];
	var trgt2 = trgt.querySelectorAll('.roadMapPoint');
	trgt2[(a-1)].classList.toggle('ball');
};