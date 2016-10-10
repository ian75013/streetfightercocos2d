	var moveLeft=false;
    var moveRight=false;
    var Jump=false;
    var CrouchDown=false;
    var animFrames=[];
    var animFramesMove=[];
    var animFramesStand=[];
    var animFramesJump=[];
    var strMove;
    var strJump;
    var strStand;
    var frameMove;
    var frameJump;
    var frameStand;
    var animationJump;
    var animationMove;
    var animation;
    var xpos=0;
    var ypos=0;
    var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    
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
        }, this)
        
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);

        // init runningAction
     
        for (var i = 10; i < 21; i++) 
             {
                strMove = "ken_" + i + ".png";
             }
		
        for (var i = 34; i < 49; i++) 
             {
                strJump = "ken_" + i + ".png";
             }
        
        for (var i = 1; i < 9; i++) 
             {
				strStand = "ken_0" + i + ".png";
             }
       
       
       
		    console.log("Here is the problem");
            frameMove = cc.spriteFrameCache.getSpriteFrame(strMove);
            animFramesMove.push(frameMove);
            animationMove = new cc.Animation(animFramesMove, 0.1);
        
            frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
            animFramesJump.push(frameJump);
            animationJump = new cc.Animation(animFramesJump, 0.1);
     
            frameStand = cc.spriteFrameCache.getSpriteFrame(strStand);
            animFramesStand.push(frameStand);
            animation = new cc.Animation(animFramesStand, 0.1);
            this.sprite = new cc.Sprite("#ken_01.png");
            this.sprite.attr({x:80, y:85});
            this.spriteSheet.addChild(this.sprite);
                 

            this.scheduleUpdate();
             
        
    },
    
    update:function(dt)
        {
          
              if(moveLeft==true)
              {
                   this.runningAction = new cc.RepeatForever(new cc.Animate(animationMove))
                   this.sprite.runAction(this.runningAction);
                    xpos-=1;
                   this.sprite.setPosition(80+xpos,85);
        
              }
              if(moveRight==true)
              {
                   this.runningAction = new cc.RepeatForever(new cc.Animate(animationMove))
                   this.sprite.runAction(this.runningAction);
                   xpos+=1;
                   this.sprite.setPosition(80+xpos,85);
        
              }
              if(Jump==true)
              {
                   this.runningAction = new cc.RepeatForever(new cc.Animate(animationJump));
                   this.sprite.runAction(this.runningAction);
                   
              }
              if(moveLeft==false && moveRight==false && Jump==false && CrouchDown==false)
              {
                   this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
                   this.sprite.runAction(this.runningAction);
              }
              
              //this.runningAction = new cc.RepeatForever(new cc.Animate(animationJump))
        }
    
});