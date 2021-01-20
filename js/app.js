// appliquons la structure en module
var app = {
    diceNumber: 3,
    // l'init sera toujours la fonction de mise en place de l'interface (ajout dynamique d'éléments, ajout d'écouteurs d'événements, configuration de l'application)
    init: function() {
        console.log('init');

        // branchons un écouteur sur le slider

        var slider = document.querySelector("#dice-number-input");
        // callback : fonction qu'on exécute pas
        slider.addEventListener('input', app.handleSliderChange);

        var gameForm = document.querySelector("#dice-form");

        gameForm.addEventListener('submit', app.handleFormSubmit);
    },
    handleFormSubmit: function(event) {
        // la méthode preventDefault empêche le comportement par défaut d'un événement
        // Hopopop reste là !
        event.preventDefault();

        // et lance une partie !
        app.play();
    },
    handleSliderChange: function(event) {
        console.log('change');

        // 1 et 2. je récupère la nouvelle valeur de l'élément qui a déclenché cet événement, directement sous forme de nombre 
        var val = event.target.valueAsNumber;

        // 3. je retrouver mon output
        var output = document.querySelector("#dice-number");

        // 4. et j'applique à mon output la valeur que j'ai récupérée du slider quelques lignes plus tôt
        output.value = val;

        app.diceNumber = val;
    },
    // cette fonction sera chargée de lancer la partie
    play: function() {
        app.clearBoards();

        // et on répète l'exécution de la fonction createDie ce même nombre de fois
        for (var index = 0; index < app.diceNumber; index++) {
            // la fonction s'occupe de tout, j'ai juste à l'appeler
            app.createDie('player');
            app.createDie('dealer');
            app.createDie('player3');
            app.createDie('player4');
        }
    },
    clearBoards: function() {
        // enlève les dés
        // 1. récupérer tous les plateaux dont il faudra retirer les dés
        var boards = document.querySelectorAll(".board");

        console.log(boards);
        
        for (var index = 0; index < boards.length; index++) {
            // boards[index] représente un des plateaux à nettoyer
            // on va redéfinir le contenu de ce plateau comme étant une chaîne vide : rien, nada, nothing
            boards[index].innerHTML = "";
        }
    },
    getRandom: function(minValue, maxValue) {
        // le mot clé return va se charger de retourner à quiconque appelle la fonction le résultat de ce charmant calcul
        return Math.round(Math.random() * (maxValue - minValue)) + minValue;
    },
    createDie: function(target) {
        // 1. créer le dé
        var die = document.createElement("div");
    
        // 2. lui ajouter une classe "dice"
        die.className = "dice";
    
        // 3a. récupérer la div #player ou #dealer, selon target
        var player = document.querySelector("#" + target);
        // équivalent "old school"
        // document.getElementById("player")
    
        // 3b. ajouter le dé
        player.appendChild(die);
    
        // 4. tirer une valeur pour le dé
        var dieValue = app.getRandom(1, 6);
    
        // 5a. calculer le décalage
        // on doit décaler l'arrière-plan de (valeur - 1) face
        var bgLag = dieValue - 1;
        // et chaque face fait 100px
        bgLag *= -100;
    
        // 5b. appliquer un décalage d'arrière-plan au dé
        // ne pas oublier l'unité
        die.style.backgroundPositionX = bgLag + "px";
    
        // on affiche la valeur du dé pour vérifier que ça colle
        console.log(dieValue);
    }
};

app.init();

console.log(app.getRandom(1, 6));