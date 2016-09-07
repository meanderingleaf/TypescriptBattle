var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//---------------- classes used throughout
var BattleController = (function () {
    function BattleController() {
        //setup player and enemy
        var anEnemy = new Enemy("#enemyView", "Jukeboxing Beetle", 12);
        anEnemy.turnOver = this.turnOver.bind(this);
        anEnemy.doTurn = this.applyTurn.bind(this);
        var aPlayer = new Player("#playerView", "#ui", "Ace", 50);
        aPlayer.turnOver = this.turnOver.bind(this);
        aPlayer.doTurn = this.applyTurn.bind(this);
        //setup fight array
        this.actors = new Array();
        this.actors.push(aPlayer);
        this.actors.push(anEnemy);
        this.updateUI();
        //begin
        this.turn = 0;
        this.nextTurn();
    }
    BattleController.prototype.nextTurn = function () {
        //
        this.lastTurn = this.turn;
        this.turn++;
        this.turn = this.turn % this.actors.length;
        this.actors[this.turn].runTurn();
    };
    BattleController.prototype.applyTurn = function (turnMethod) {
        turnMethod.bind(this.actors[this.turn])(this.actors[this.lastTurn]);
    };
    BattleController.prototype.turnOver = function () {
        this.updateUI();
        this.nextTurn();
    };
    BattleController.prototype.updateUI = function () {
        this.actors.forEach(function (element) {
            element.updateUI();
        });
    };
    return BattleController;
})();
var Actor = (function () {
    function Actor(selector, name, hp) {
        this.selector = selector;
        this.name = name;
        this.hp = hp;
        this.element = document.querySelector(selector);
        this.txtName = this.element.querySelector(".name");
        this.txtHp = this.element.querySelector(".hp");
        this.txtName.innerHTML = this.name.toString();
        this.defense = 5;
        this.attack = 7;
        this.myTurn = false;
    }
    Actor.prototype.runTurn = function () {
        this.myTurn = true;
    };
    Actor.prototype.endTurn = function () {
        this.myTurn = false;
        this.turnOver();
    };
    Actor.prototype.updateUI = function () {
        this.txtHp.innerHTML = this.hp.toString();
    };
    return Actor;
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(selector, inputSelector, name, hp) {
        _super.call(this, selector, name, hp);
        this.selector = selector;
        this.inputSelector = inputSelector;
        this.name = name;
        this.hp = hp;
        this.inputHolder = document.querySelector(inputSelector);
        this.inputHolder.addEventListener("click", this.chooseAction.bind(this));
    }
    Player.prototype.runTurn = function () {
        _super.prototype.runTurn.call(this);
    };
    Player.prototype.chooseAction = function (event) {
        if (this.myTurn) {
            if (event.target.getAttribute("class") == "btnSpecial") {
                this.doTurn(this.specialAttack);
            }
            else {
                this.doTurn(this.normalAttack);
            }
        }
        this.turnOver();
    };
    Player.prototype.specialAttack = function (target) {
        target.hp -= ((this.attack * 2) - target.defense);
    };
    Player.prototype.normalAttack = function (target) {
        target.hp -= (this.attack - target.defense);
    };
    return Player;
})(Actor);
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(selector, name, hp) {
        _super.call(this, selector, name, hp);
        this.selector = selector;
        this.name = name;
        this.hp = hp;
    }
    Enemy.prototype.runTurn = function () {
        _super.prototype.runTurn.call(this);
        console.log("Hiiiii");
        this.selectMove();
    };
    Enemy.prototype.selectMove = function () {
        var randomSelection = Math.random();
        if (randomSelection < .5) {
            this.doTurn(this.specialAttack);
        }
        else {
            this.doTurn(this.normalAttack);
        }
        this.turnOver();
    };
    Enemy.prototype.normalAttack = function (target) {
        target.hp -= (this.attack - target.defense);
    };
    Enemy.prototype.specialAttack = function (target) {
        target.hp -= ((this.attack * 2) - target.defense);
    };
    return Enemy;
})(Actor);
var gameBattleController = new BattleController();
//# sourceMappingURL=main.js.map