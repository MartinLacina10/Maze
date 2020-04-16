let mapy = [
    [
	[0, 0, 3, 1, 0, 1],
	[0, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 0],
	[0, 1, 0, 1, 0, 0],
	[0, 0, 1, 2, 1, 0],
	[1, 0, 1, 0, 0, 0],
    ],
    [
	[3, 0, 0, 0, 0, 1, 1, 0],
	[0, 1, 0, 1, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 1, 1, 0],
	[0, 0, 0, 1, 1, 1, 1, 0],
	[1, 0, 1, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 0, 1, 1, 1],
	[2, 0, 0, 0, 0, 0, 0, 0],
	],
	[
	[1, 1, 1, 0, 0, 0, 0, 3],
	[1, 0, 0, 0, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 1, 0, 1, 0, 0, 0],
	[1, 0, 0, 0, 1, 1, 1, 0],
	[1, 0, 1, 1, 0, 0, 1, 0],
	[1, 0, 1, 1, 0, 1, 2, 0],
	[1, 0, 0, 0, 0, 1, 0, 0],
	],
    [
	[1, 1, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
	[0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
	[0, 1, 0, 1, 0, 1, 2, 0, 1, 1, 0, 1, 0, 1, 1, 1],
	[0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
	[0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    ],
];

window.onload = function() {
    var level = 0;
    var deska = document.getElementById("deska");
    var sirka;
    var vyska;
    var pozice;
    var hrac;

    nakresliMapu();


    document.getElementById("ovladani-nahoru")
	.addEventListener("click", function() {posunHraceNa(pozice.x, pozice.y - 1);});
    document.getElementById("ovladani-dolu")
	.addEventListener("click", function() {posunHraceNa(pozice.x, pozice.y + 1);});
    document.getElementById("ovladani-vlevo")
	.addEventListener("click", function() {posunHraceNa(pozice.x - 1, pozice.y);});
    document.getElementById("ovladani-vpravo")
	.addEventListener("click", function() {posunHraceNa(pozice.x + 1, pozice.y);});


    document.addEventListener("keydown", function(udalost) {
	switch(udalost.keyCode) {
	case 37:
	    posunHraceNa(pozice.x - 1, pozice.y);
	    break;
	case 38:
	    posunHraceNa(pozice.x, pozice.y - 1);
	    break;
	case 39:
	    posunHraceNa(pozice.x + 1, pozice.y);
	    break;
	case 40:
	    posunHraceNa(pozice.x, pozice.y + 1);
	    break;
	}
    });

    function nakresliMapu() {
	deska.innerHTML = '';
	sirka = mapy[level][0].length;
	vyska = mapy[level].length;

	for (let y = 0; y < vyska; y++) {
	    for (let x = 0; x < sirka; x++) {
		if (mapy[level][y][x] == 0) continue;

		let figurka = deska.appendChild(document.createElement("div"));
		figurka.className = "figurka-" + mapy[level][y][x];


		posunFigurkuNa(figurka, x, y);
		figurka.style.width = (100 / sirka) + "%";
		figurka.style.height = (100 / vyska) + "%";

		if (mapy[level][y][x] == 3) {
		    pozice = {"x": x, "y": y};
		    hrac = figurka;
		}
	    }
	}
    }

    function posunHraceNa(x, y) {
	if (jeMimoDesku(x, y) || mapy[level][y][x] == 1) {
	    return;
	}

	posunFigurkuNa(hrac, x, y);
	pozice = {"x": x, "y": y};

	if (mapy[level][y][x] == 2) {
	    let zvuk = document.body.appendChild(document.createElement('audio'));
	    zvuk.src = "vitezstvi.mp3";
	    zvuk.play();

	    if (++level < mapy.length) {
		nakresliMapu();
	    } else {
		deska.className = "vitezstvi";
	    }
	}
    }

    function posunFigurkuNa(figurka, x, y) {
	figurka.style.left = (100 / sirka * x) + "%";
	figurka.style.top = (100 / vyska * y) + "%";
	figurka.style.zIndex = y;
    }


    function jeMimoDesku(x, y) {
	if (x < 0 || sirka <= x) return true;
	if (y < 0 || vyska <= y) return true;
	return false;
    }
}
