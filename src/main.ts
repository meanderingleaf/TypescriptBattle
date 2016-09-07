
//---------------- classes used throughout
class BattleController {

    public turn:number;
    public lastTurn:number;
    public actors:Actor[];

    constructor() {

        //setup player and enemy
        let anEnemy =  new Enemy("#enemyView", "Jukeboxing Beetle", 12);
        anEnemy.turnOver = this.turnOver.bind(this);
        anEnemy.doTurn = this.applyTurn.bind(this);

        let aPlayer = new Player("#playerView", "#ui", "Ace", 50);
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

    public nextTurn() {
        //
        this.lastTurn = this.turn;
        this.turn++;
        this.turn = this.turn % this.actors.length;
        this.actors[this.turn].runTurn();
    }

    public applyTurn(turnMethod:Function) {
        turnMethod.bind(this.actors[this.turn])(this.actors[this.lastTurn]);
    }

    public turnOver() {
        this.updateUI();
        this.nextTurn();
    }

    public updateUI() {
        this.actors.forEach(element => {
            element.updateUI();
        });
    }

}

class Actor {

    public element:HTMLElement;
    public txtName:HTMLElement;
    public txtHp:HTMLElement;

    public turnOver:Function;
    public doTurn:Function;

    public attack:number;
    public defense:number;

    public myTurn:boolean;

    constructor(public selector:string, public name:string, public hp:number) {
        this.element = <HTMLElement>document.querySelector(selector);
        this.txtName = <HTMLElement>this.element.querySelector(".name");
        this.txtHp = <HTMLElement>this.element.querySelector(".hp");

        this.txtName.innerHTML = this.name.toString();

        this.defense = 5;
        this.attack = 7;
        this.myTurn = false;
    }

    public runTurn() {
        this.myTurn = true;
    }

    public endTurn() {
       this.myTurn = false;
       this.turnOver();
    }

    public updateUI() {
        this.txtHp.innerHTML = this.hp.toString();
    }

}

class Player extends Actor {

    public inputHolder:HTMLElement;

    constructor(public selector:string, public inputSelector:string, public name:string, public hp:number) {
        super(selector, name, hp);

        this.inputHolder = <HTMLElement>document.querySelector(inputSelector);
        this.inputHolder.addEventListener("click", this.chooseAction.bind(this));
    }

    public runTurn() {
        super.runTurn();
    }

    public chooseAction(event) {
        if(this.myTurn) {
            if(event.target.getAttribute("class") == "btnSpecial") {
               this.doTurn(this.specialAttack);
            } else {
                this.doTurn(this.normalAttack);
            }
        }

        this.turnOver();
    }

    public specialAttack(target) {
        target.hp -= ((this.attack*2) - target.defense);
    }

    public normalAttack(target) {
        target.hp -= (this.attack - target.defense);
    }
}

class Enemy extends Actor {
    constructor(public selector:string, public name:string, public hp:number) {
        super(selector, name, hp);
    }

    public runTurn() {
        super.runTurn();
        console.log("Hiiiii");
        this.selectMove();

    }

    private selectMove() {
        let randomSelection:number = Math.random();

        if(randomSelection < .5) {
            this.doTurn(this.specialAttack);
        } else {
            this.doTurn(this.normalAttack);
        }

        this.turnOver();
    }

    private normalAttack(target:Actor) {
        target.hp -= (this.attack - target.defense);
        
    }

    private specialAttack(target:Actor) {
        target.hp -= ((this.attack*2) - target.defense);
    }
}



let gameBattleController = new BattleController();