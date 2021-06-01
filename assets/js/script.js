let colors = document.getElementsByClassName('color');
let cells = document.getElementsByClassName('cell');
let cellResults = document.getElementsByClassName('cell_results');
let table = document.getElementById('table');
let validTurn = document.getElementById('validTurn');
let colorsList = document.getElementById('colorsList');
let colorChoosen;
let turn = 0;

colorsList.addEventListener('click', function (event) {
    if (event.target.classList.contains('color')) {
        for (let i = 0; i < colors.length; i++) {
            colors[i].classList.remove("color_clicked");
            colors[i].classList.remove("color_clicked_white");
        };
        let color = event.target;
        if (color.classList.contains("white")) {
            color.classList.toggle("color_clicked_white");
        }
        else {
            color.classList.toggle("color_clicked");
        }
        colorChoosen = color.classList[2];
    }
});
table.addEventListener('click', function (event) {
    if (event.target.classList.contains('cell')) {
        let targetCell = event.target;
        if (targetCell == cells[0 + 4 * turn] || targetCell == cells[1 + 4 * turn]
            || targetCell == cells[2 + 4 * turn] || targetCell == cells[3 + 4 * turn]) {
            if (colorChoosen != null) {
                let divColor = targetCell.children[0];
                divColor.classList.add('color', colorChoosen);
                targetCell.appendChild(divColor);
            }
        }
    }
    if (event.target.classList.contains('color')) {
        if (cellResults[0 + 4 * turn].classList.length() == 0 && cellResults[1 + 4 * turn].classList.length() == 0 
            && cellResults[2 + 4 * turn].classList.length() == 0 && cellResults[3 + 4 * turn].classList.length() == 0){
            let targetColor = event.target;
            if (colorChoosen != null) {
                targetColor.classList.remove(targetColor.classList.item(2));
                targetColor.classList.add(colorChoosen);
            }
        }
    }
});
let winColors = [[], [], [], []];
for (let i = 0; i < 4; i++) {
    winColors[i].push(Math.floor(Math.random() * 7), 0);
}
console.log(winColors);
validTurn.addEventListener('click', checkWin);
function checkWin() {
    let playerColors = [[], [], [], []];
    var checkPlace = [];
    if (cells[0 + 4 * turn].children[0].classList.contains('color') && cells[1 + 4 * turn].children[0].classList.contains('color') 
        && cells[2 + 4 * turn].children[0].classList.contains('color') && cells[3 + 4 * turn].children[0].classList.contains('color')){
        for (i = 0; i < 4; i++) {
            switch (cells[i + 4 * turn].children[0].classList[2]) {
                case 'red':
                    playerColors[i].push(0, 0);
                    break;
                case 'blue':
                    playerColors[i].push(1, 0);
                    break;
                case 'green':
                    playerColors[i].push(2, 0);
                    break;
                case 'yellow':
                    playerColors[i].push(3, 0);
                    break;
                case 'purple':
                    playerColors[i].push(4, 0);
                    break;
                case 'white':
                    playerColors[i].push(5, 0);
                    break;
                case 'black':
                    playerColors[i].push(6, 0);
                    break;
            }
        }
        for (i = 0; i < 4; i++) {
            if (playerColors[i][0] == winColors[i][0]) {
                playerColors[i][1] = 1;
                winColors[i][1] = 1;
                checkPlace.push(1);
            }
        }
        for (i = 0; i < 4; i++) {
            if (playerColors[i][1] != 1) {
                for (j = 0; j < 4; j++) {
                    if (playerColors[i][0] == winColors[j][0] && winColors[j][1] != 1) {
                        playerColors[i][1] = 1;
                        winColors[j][1] = 1;
                        checkPlace.push(0);
                    }
                }
            }
        }
        console.log(playerColors);
        while (checkPlace.length < 4) {
            checkPlace.push(null);
        }
        console.log(checkPlace);
        for (i = 0; i < 4; i++) {
            if (checkPlace[i] == 1) {
                cellResults[i + 4 * turn].classList.add('wellplaced');
            }
            if (checkPlace[i] == 0) {
                cellResults[i + 4 * turn].classList.add('misplaced');
            }
            if (checkPlace[i] == null) {
                cellResults[i + 4 * turn].classList.add('notplaced');
            }
            winColors[i][1] = 0;
        }
        if (checkPlace[0] == 1 && checkPlace[1] == 1 && checkPlace[2] == 1 && checkPlace[3] == 1){
            alert('Bien joué vous avez trouvé la combinaison secrète !!!');
        }
        turn++;
        document.getElementById('turn').innerText = 'Tour : ' + (turn + 1);
    }
}