    var firstTimeMoveLeft=true;
    var firstTimeMoveRight=true;
    var firstTimeJump=true;
    var firstTimeStand=true;
    var moveLeft=false;
    var moveRight=false;
    var Jump=false;
    var CrouchDown=false;
    var animFrames=[];
    var animFramesMoveRight=[];
    var animFramesMoveLeft=[];
    var animFramesStand=[];
    var animFramesJump=[];
    var strMoveRight=[];
    var strMoveLeft=[];
    var strJump=[];
    var strStand=[];
    var frameMoveRight;
    var frameMoveLeft;
    var frameJump;
    var frameStand;
    var animationJump;
    var animationMoveLeft;
    var animationMoveRight;
    var animation;
    var xpos=0;
    var ypos=0;
    var jumppos=0;
    var moveActionLeft;
    var moveActionRight;
    var jumpAction;
    var standAction;
    var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
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
                strMoveLeft = "ken_" + i + ".png";
                frameMoveLeft = cc.spriteFrameCache.getSpriteFrame(strMoveLeft);
                animFramesMoveLeft.push(frameMoveLeft);
             }
		
        for (var i = 20; i >=10; i--) 
             {
                strMoveRight = "ken_" + i + ".png";
                frameMoveRight = cc.spriteFrameCache.getSpriteFrame(strMoveRight);
                animFramesMoveRight.push(frameMoveRight);
        
             }
		

        for (var i = 34; i < 49; i++) 
         {
                strJump = "ken_" + i + ".png";
                frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
                animFramesJump.push(frameJump);
         }
        
        for (var i = 48; i >= 34; i--) 
         {
                strJump = "ken_" + i + ".png";
                frameJump = cc.spriteFrameCache.getSpriteFrame(strJump);
                animFramesJump.push(frameJump);
           
         }
        

        for (var i = 1; i < 10; i++) 
             {
			       strStand = "ken_0" + i + ".png";
                    frameStand = cc.spriteFrameCache.getSpriteFrame(strStand);
                    animFramesStand.push(frameStand);
             }
       
      	    
            animationMoveLeft = new cc.Animation(animFramesMoveLeft, 0.1);
            moveActionLeft = new cc.RepeatForever(new cc.Animate(animationMoveLeft));

            animationMoveRight = new cc.Animation(animFramesMoveRight, 0.1);
            moveActionRight = new cc.RepeatForever(new cc.Animate(animationMoveRight));
                
        
            
            animationJump = new cc.Animation(animFramesJump, 0.1);
            jumpAction = new cc.RepeatForever(new cc.Animate(animationJump));
                   

            animation = new cc.Animation(animFramesStand, 0.1);
            standAction = new cc.RepeatForever(new cc.Animate(animation));
       
            this.sprite = new cc.Sprite("#ken_01.png");
            this.sprite.attr({x:80, y:85});
            this.spriteSheet.addChild(this.sprite);
                 

            this.scheduleUpdate();
             
        
    },
    
    update:function(dt)
        {
          
              if(moveLeft==true)
              {
                   if(firstTimeJump==false)
                   {
                       this.sprite.stopAction(jumpAction);
                       firstTimeJump=true;
               
                   }
                   
                   if(firstTimeStand==false)
                   {
                       this.sprite.stopAction(standAction);
                       firstTimeStand=true;
               
                   }
                   if(firstTimeMoveRight==false)
                   {
                       this.sprite.stopAction(moveActionRight);
                       firstTimeMoveRight=true;
                   }
                   
                   if(firstTimeMoveLeft==true)
                   {
                       this.sprite.runAction(moveActionLeft);
                       firstTimeMoveLeft=false;
                   }
                   xpos-=1;
                  
                  
              }
              else if(moveRight==true)
              {
                   if(firstTimeJump==false)
                   {
                       this.sprite.stopAction(jumpAction);
                       firstTimeJump=true;
               
                   }
                   
                   if(firstTimeStand==false)
                   {
                       this.sprite.stopAction(standAction);
                       firstTimeStand=true;
               
                   }
                   if(firstTimeMoveLeft==false)
                   {
                       this.sprite.stopAction(moveActionLeft);
                       firstTimeMoveLeft=true;
               
                   }
                   
                   if(firstTimeMoveRight==true)
                   {
                       this.sprite.runAction(moveActionRight);
                       firstTimeMoveRight=false;
                   }
                   xpos+=1;
                   
  
              }
              else if(Jump==true)
              {
                   if(firstTimeStand==false)
                   {
                       this.sprite.stopAction(standAction);
                       firstTimeStand=true;
               
                   }
                   if(firstTimeMoveLeft==false)
                   {
                       this.sprite.stopAction(moveActionLeft);
                       firstTimeMoveLeft=true;
               
                   }
                   
                   if(firstTimeMoveRight==false)
                   {
                       this.sprite.stopAction(moveActionRight);
                       firstTimeMoveRight=true;
                   }
                  if(firstTimeJump==true)
                  {
                      this.sprite.runAction(jumpAction);
                      firstTimeJump=false;
                  }
                  
              }
              else if(moveLeft==false && moveRight==false && Jump==false && CrouchDown==false)
              {
                   if(firstTimeJump==false)
                   {
                       this.sprite.stopAction(jumpAction);
                       firstTimeJump=true;
               
                   }
                   if(firstTimeMoveLeft==false)
                   {
                       this.sprite.stopAction(moveActionLeft);
                       firstTimeMoveLeft=true;
               
                   }
                   
                   if(firstTimeMoveRight==false)
                   {
                       this.sprite.stopAction(moveActionRight);
                       firstTimeMoveRight=true;
                   }
                  
                  if(firstTimeStand==true)
                  {
                  this.sprite.runAction(standAction);
                  firstTimeStand=false;
                  } 
                  
              }
               this.sprite.setPosition(this.getPosition().x+xpos+120,this.getPosition().y+85);
              //this.runningAction = new cc.RepeatForever(new cc.Animate(animationJump))
        }
    
});