var memoryGame = {}
var count = 0;
var secondCard = "";
var firstCard = "";
var wrongGuess = 0;
var cardMatched = []



var cardsArray = [{
    "name": 'link',
    'img': './images/ca0.jpg',
},
{
    'name': 'epona',
    'img': './images/ca1.jpg',
},
{
    'name': 'ganondorf',
    'img': './images/ca2.jpg',
},
{
    'name': 'zelda',
    'img': './images/ca3.jpg',
},
{
    'name': 'goron',
    'img': './images/ca4.jpg',
},
{
    'name': 'mistake',
    'img': './images/ca5.jpg',
},
];

var duplicate = [];

memoryGame.Start = function () {
    memoryGame.randomizeItems();
    memoryGame.layeOut();
    memoryGame.getMatch();
}

memoryGame.levelStart = function () {
    var level = document.getElementById("level");
    var gamePage = document.getElementById("gamePage");
    var x = event.target;
    if (x.id == "btnLevel") {
        level.style.display = "none";
        gamePage.style.display = "block";
        duplicate = cardsArray.concat(cardsArray);
        memoryGame.Start();
    } else if (x.id == "btnLevel1") {
        var medium = [{
            "name": 'zelda2',
            'img': './images/ca6.jpg',
        },
        {
            'name': 'link2',
            'img': './images/ca7.jpg',
        },
        {
            'name': 'linkBaby',
            'img': './images/ca8.jpg',
        },
        ]
        level.style.display = "none";
        gamePage.style.display = "block";
        for (var i = 0; i < medium.length; i++) {
            cardsArray.push(medium[i]);
        }
        duplicate = cardsArray.concat(cardsArray);
        memoryGame.Start();
    }
    else if (x.id == "btnLevel2") {
        var hard = [{
            "name": 'zelda2',
            'img': './images/ca6.jpg',
        },
        {
            'name': 'link2',
            'img': './images/ca7.jpg',
        },
        {
            'name': 'linkBaby',
            'img': './images/ca8.jpg',
        },
        {
            "name": 'zora',
            'img': './images/ca9.jpg',
        },
        {
            'name': 'midna',
            'img': './images/ca10.jpg',
        },
        {
            'name': 'sheik',
            'img': './images/ca11.jpg',
        },
        ]
        level.style.display = "none";
        gamePage.style.display = "block";
        for (var i = 0; i < hard.length; i++) {
            cardsArray.push(hard[i]);
        }
        duplicate = cardsArray.concat(cardsArray);
        memoryGame.Start();
    }
}

memoryGame.layeOut = function () {
    var display = document.getElementById("layeOut");
    duplicate.forEach(item => {
        var card = document.createElement('div');
        card.classList.add("col-3");
        card.classList.add("card");
        card.dataset.name = item.name;

        var backImage = document.createElement('div');
        backImage.classList.add('backImage');
        backImage.style.backgroundImage = `url(${item.img})`;

        var frontImage = document.createElement('div');
        frontImage.classList.add('frontImage');

        display.appendChild(card);
        card.appendChild(backImage);
        card.appendChild(frontImage);
    })
}

memoryGame.randomizeItems = function () {
    duplicate.sort(() => 0.5 - Math.random());
}

memoryGame.getMatch = function () {

    var mainDivs = document.getElementById("layeOut")
    mainDivs.addEventListener('click', function (event) {
        var clicked = event.target;
        var cardClick = null;
        if (clicked.id === "layeOut" || clicked === cardClick || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains("match")) {
            return;
        }
        if (count < 2) {
            count++;
            if (count === 1) {
                firstCard = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondCard = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }

            if (firstCard !== '' && secondCard !== '') {
                if (firstCard === secondCard) {
                    setTimeout(memoryGame.match, 1200);
                    setTimeout(memoryGame.reset, 1200);
                    cardMatched.push("match");

                } else {
                    wrongGuess++
                    setTimeout(memoryGame.reset, 1200);
                    wrongGuesses.innerHTML = `mistake: ${wrongGuess}`;
                    }
            }
            cardClick = clicked;
        }
        if (cardMatched.length == cardsArray.length) {
            var music = document.getElementById("startMusic");
            var won = document.getElementById("overlay");
            var loose = document.getElementById("guesses");
            var wrongGuesses = document.createElement('div');
            loose.appendChild(wrongGuesses);
            wrongGuesses.innerHTML = `the number of wrong Guesses are ${wrongGuess}`;
            won.style.display = "block";
            var x = document.getElementById("endMusic");
            x.play();
        }
    })
}

memoryGame.initialize = function () {
    location.reload();
}

memoryGame.musicPlay = function(){
    var music = document.getElementById("startMusic");
    music.play();
}

memoryGame.match = function () {

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
}
memoryGame.reset = function () {
    firstCard = "";
    secondCard = "";
    count = 0;
    var selected = document.querySelectorAll(".selected");
    selected.forEach(card => {
        card.classList.remove("selected");
    });
}


