var firstTimeMoveLeft = true;
var firstTimeMoveRight = true;
var firstTimeJump = true;
var firstTimeStand = true;
var firstTimeCrouch = true;
var firstTimeUp = true;
var firstTimeHadoken = true;


var moveLeft = false;
var moveRight = false;
var Jump = false;
var CrouchDown = false;
var Up = false;
var Hadoken = false;
var Stand = true;

var animFrames = [];
var animFramesMoveRight = [];
var animFramesMoveLeft = [];
var animFramesStand = [];
var animFramesJump = [];
var animFramesCrouch = [];
var animFramesUp = [];
var animFramesHadoken = [];

var strMoveRight = [];
var strMoveLeft = [];
var strJump = [];
var strStand = [];
var strCrouch = [];
var strUp = [];
var strHadoken = [];

var frameMoveRight;
var frameMoveLeft;
var frameJump;
var frameStand;
var frameCrouch;
var frameUp;
var frameHadoken;

var animationJump;
var animationMoveLeft;
var animationMoveRight;
var animation;
var animationCrouch;
var animationUp;
var animationHadoken;

var xpos = 0;
var ypos = 0;

var onjump = false;

var moveActionLeft;
var moveActionRight;
var jumpAction;
var standAction;
var CrouchAction;
var UpAction;
var HadokenAction;


var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    sprite: null,

    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                switch (key) {
                    case 37:               // Left is 37
                        self.moveLeft = true;
                        console.log("Left was pressed");
                        break;
                    case 39:              // Right is 39
                        self.moveRight = true;
                        break;
                    case 38:                // Up is 38
                        self.Jump = true;
                        break;
                    case 40:                //Down is 40
                        self.CrouchDown = true;
                        break;
                    case 65:               // A is 65
                        self.Hadoken = true;
                        break;
                }
            },
            onKeyReleased: function (key, event) {
                switch (key) {
                    case 37:
                        self.moveLeft = false;
                        break;
                    case 39:
                        self.moveRight = false;
                        break;
                    case 38:
                        self.Jump = false;
                        break;
                    case 40:
                        self.CrouchDown = false;
                        break;
                    case 65:               // A is 65
                        self.Hadoken = false;
                        break;

                }
            }
        }, this)

        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);

        // init runningAction

        for (var i = 10; i < 21; i++) {
            strMoveLeft = "ken_" + i + ".png";
            frameMoveLeft = cc.spriteFrameCache.getSpriteFrame(strMoveLeft);
            animFramesMoveLeft.push(frameMoveLeft);
        }

        for (var i = 20; i >= 10; i--) {
            strMoveRight = "ken_" + i + ".png";
            frameMoveRight = cc.spriteFrameCache.getSpriteFrame(strMoveRight);
            animFramesMoveRight.push(frameMoveRight);

        }


        for (var i = 34; i < 49; i++) {
            strJump = "ken_" + i + ".png";
            frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
            animFramesJump.push(frameJump);
        }

        for (var i = 48; i >= 34; i--) {
            strJump = "ken_" + i + ".png";
            frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
            animFramesJump.push(frameJump);

        }


        for (var i = 1; i < 10; i++) {
            strStand = "ken_0" + i + ".png";
            frameStand = cc.spriteFrameCache.getSpriteFrame(strStand);
            animFramesStand.push(frameStand);
        }


        for (var i = 33; i < 39; i++) {
            strCrouch = "ken_" + i + ".png";
            frameCrouch = cc.spriteFrameCache.getSpriteFrame(strCrouch);
            animFramesCrouch.push(frameCrouch);
        }

        for (var i = 38; i > 32; i--) {
            strUp = "ken_" + i + ".png";
            frameUp = cc.spriteFrameCache.getSpriteFrame(strUp);
            animFramesUp.push(frameUp);
        }


        for (var i = 22; i < 34; i++) {
            strHadoken = "ken_" + i + ".png";
            frameHadoken = cc.spriteFrameCache.getSpriteFrame(strHadoken);
            animFramesHadoken.push(frameHadoken);
        }

        animationMoveLeft = new cc.Animation(animFramesMoveLeft, 0.1);
        moveActionLeft = new cc.RepeatForever(new cc.Animate(animationMoveLeft));

        animationMoveRight = new cc.Animation(animFramesMoveRight, 0.1);
        moveActionRight = new cc.RepeatForever(new cc.Animate(animationMoveRight));



        animationJump = new cc.Animation(animFramesJump, 0.1);
        jumpAction = new cc.RepeatForever(new cc.Animate(animationJump));


        animation = new cc.Animation(animFramesStand, 0.1);
        standAction = new cc.RepeatForever(new cc.Animate(animation));

        animationCrouch = new cc.Animation(animFramesCrouch, 0.1);
        CrouchAction = new cc.Repeat(new cc.Animate(animationCrouch), 1);

        animationUp = new cc.Animation(animFramesUp, 0.1);
        UpAction = new cc.Repeat(new cc.Animate(animationUp), 1);

        animationHadoken = new cc.Animation(animFramesHadoken, 0.1);
        HadokenAction = new cc.Repeat(new cc.Animate(animationHadoken), 1);



        this.sprite = new cc.Sprite("#ken_01.png");
        this.sprite.attr({ x: 80, y: 85 });
        this.spriteSheet.addChild(this.sprite);


        this.scheduleUpdate();


    },

    update: function (dt) {

        if (moveLeft == true) {
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
       
            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }

            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }


            if (firstTimeMoveLeft == true) {
                this.sprite.runAction(moveActionLeft);
                firstTimeMoveLeft = false;
            }
            xpos -= 1;
            if (ypos != 0) { ypos -= 1; }
            this.sprite.setPosition(this.getPosition().x + xpos + 120, this.getPosition().y + ypos + 85);

        }
        else if (moveRight == true) {
            
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
            

            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }

            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == true) {
                this.sprite.runAction(moveActionRight);
                firstTimeMoveRight = false;
            }

            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }


            xpos += 1;
            if (ypos != 0) { ypos -= 1; }
            this.sprite.setPosition(this.getPosition().x + xpos + 120, this.getPosition().y + ypos + 85);

        }
        else if (CrouchDown == true) {
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }

            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }

            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == true) {
                this.sprite.runAction(CrouchAction);
                firstTimeCrouch = false;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }
        }

        else if (Up == true) {
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }

            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }

            if (firstTimeUp == true) {
                this.sprite.runAction(UpAction);
                firstTimeUp = false;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }
        }

        else if (Hadoken == true) {
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }



            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }

            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == true) {
                this.sprite.runAction(HadokenAction);
                firstTimeHadoken = false;
            }
        }


        else if (Jump == true) {
            if(firstTimeStand==false)
            {

                this.sprite.stopAction(standAction);
                firstTimeStand=true;

            }
       
            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }
            if (firstTimeJump == true) {
                this.sprite.runAction(jumpAction);
                firstTimeJump = false;
            }

            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }


            onjump = true;
            if (ypos < 80 && onjump == true) { ypos += 1; }
            if (ypos == 80) { onjump = false; }
            this.sprite.setPosition(this.getPosition().x + xpos + 120, this.getPosition().y + ypos + 85);
        }
        else if (moveLeft == false && moveRight == false && Jump == false && CrouchDown == false && Up == false && Hadoken == false) {
            if (firstTimeJump == false) {
                this.sprite.stopAction(jumpAction);
                firstTimeJump = true;

            }
            if (firstTimeMoveLeft == false) {
                this.sprite.stopAction(moveActionLeft);
                firstTimeMoveLeft = true;

            }

            if (firstTimeMoveRight == false) {
                this.sprite.stopAction(moveActionRight);
                firstTimeMoveRight = true;
            }
            if(firstTimeStand==true)
            {

                this.sprite.runAction(standAction);
                firstTimeStand=false;

            }
       


            if (firstTimeUp == false) {
                this.sprite.stopAction(UpAction);
                firstTimeUp = true;
            }

            if (firstTimeCrouch == false) {
                this.sprite.stopAction(CrouchAction);
                firstTimeCrouch = true;
            }

            if (firstTimeHadoken == false) {
                this.sprite.stopAction(HadokenAction);
                firstTimeHadoken = true;
            }


            if (ypos != 0) { ypos -= 1; }
            this.sprite.setPosition(this.getPosition().x + xpos + 120, this.getPosition().y + ypos + 85);

        }
        //this.runningAction = new cc.RepeatForever(new cc.Animate(animationJump))
    }

});