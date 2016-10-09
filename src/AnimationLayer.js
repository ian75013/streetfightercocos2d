	var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    moveLeft:false,
    moveRight:false,
    Jump:false,
    CrouchDown:false,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key, event) {
            	switch(key) {
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
            	}
            },
            onKeyReleased:function(key, event) {
            	switch(key) {
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
                }
            }
        }, this);
        
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);

        // init runningAction
        var animFrames = [];
        var animFramesMove = [];
        var animFramesStand = [];
        var animFramesJump = [];
        var moveLeft;
        var moveRight;
        var Jump;

        for (var i = 10; i < 21; i++) 
             {
                var strMove = "ken_" + i + ".png";
             }
		
        for (var i = 34; i < 49; i++) 
             {
                var strJump = "ken_" + i + ".png";
             }
        
        for (var i = 1; i < 9; i++) 
             {
				var strStand = "ken_0" + i + ".png";
             }
       
       
        if(moveRight==true || moveLeft==true)
		{
            console.log("Here is the problem");
            var frameMove = cc.spriteFrameCache.getSpriteFrame(strMove);
            animFramesJump.push(frameMove);
            var animationMove = new cc.Animation(animFramesMove, 0.1);
            this.runningAction = new cc.RepeatForever(new cc.Animate(animationMove))
            this.sprite = new cc.Sprite("#ken_01.png");
            this.sprite.attr({x:80, y:85});
            this.sprite.runAction(this.runningAction);
            this.spriteSheet.addChild(this.sprite);
   
        }
        else if (Jump==true)
        {
            var frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
            animFramesJump.push(frameJump);
            var animationJump = new cc.Animation(animFramesJump, 0.1);
            this.runningAction = new cc.RepeatForever(new cc.Animate(animationJump))
            this.sprite = new cc.Sprite("#ken_01.png");
            this.sprite.attr({x:80, y:85});
            this.sprite.runAction(this.runningAction);
            this.spriteSheet.addChild(this.sprite);
   
        }
        else 
        {
            var frameStand = cc.spriteFrameCache.getSpriteFrame(strStand);
            animFramesStand.push(frameStand);
            var animation = new cc.Animation(animFramesStand, 0.1);
            this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
            this.sprite = new cc.Sprite("#ken_01.png");
            this.sprite.attr({x:80, y:85});
            this.sprite.runAction(this.runningAction);
            this.spriteSheet.addChild(this.sprite);
   
        }
    }
});