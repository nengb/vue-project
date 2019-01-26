if(window.io == null){
    window.io = require("socket.io-client");
}

class socketNet {
    constructor() {
        this.ip = "",
        this.sio = null,
        this.isPinging = false,
        this.fnDisconnect = null,
        this.handlers = {}
    }
    addHandler(event,fn){
		if(this.handlers[event]){
			console.log("event:" + event + "' handler has been registered.");
			return;
		}

		var handler = function(data){
			//console.log(event + "(" + typeof(data) + "):" + (data? data.toString():"null"));
			if(event != "disconnect" && typeof(data) == "string"){
				data = JSON.parse(data);
			}
			fn(data);
		};
		
		this.handlers[event] = handler; 
		if(this.sio){
			console.log("register:function " + event);
			this.sio.on(event,handler);
		}
	}
	connect(fnConnect,fnError){
		var self = this;
		var timer = setTimeout(function(){
			console.log('connect_timeout');
			self.close();
		},10000);

		this.connectInternal(function(data){
			clearTimeout(timer);
			fnConnect(data);
		},function(data){
			clearTimeout(timer);
			fnError(data)
		});
	}
	connectInternal(fnConnect,fnError) {
		var self = this;
		
		var opts = {
			'reconnection':false,
			'force new connection': true,
			'transports':['websocket', 'polling']
		}
		this.sio = window.io.connect(this.ip,opts);
		this.sio.on('reconnect',function(){
			console.log('reconnection');
		});
		this.sio.on('connect',function(data){
			console.log("connect");
			console.log(self.sio);
		   if(self.sio){
				self.sio.connected = true;
				fnConnect(data);
			}
		});
		
		this.sio.on('disconnect',function(data){
			console.log("disconnect");
			if(self.sio){
				self.sio.connected = false;
				self.close();
			}
		});
		
		this.sio.on('connect_failed',function (){
			console.log('connect_failed');
		});
		
		for(var key in this.handlers){
			var value = this.handlers[key];
			if(typeof(value) == "function"){
				if(key == 'disconnect'){
					this.fnDisconnect = value;
				}
				else{
					console.log("register:function " + key);
					this.sio.on(key,value);                        
				}
			}
		}
		
		this.startHearbeat();
	}
	startHearbeat(){
		this.sio.on('game_pong',function(){
			console.log('game_pong');
			self.lastRecieveTime = Date.now();
			self.delayMS = self.lastRecieveTime - self.lastSendTime;
			console.log(self.delayMS);
		});
		this.lastRecieveTime = Date.now();
		var self = this;

		if(!self.isPinging){
			self.isPinging = true;
			// cc.game.on(cc.game.EVENT_SHOW,function(){
			// 	self.ping();
			// 	self.ping();
			// });
			// setInterval(function(){
			// 	if(self.sio){
			// 		self.ping();                
			// 	}
			// }.bind(this),5000);
			// setInterval(function(){
			//    if(self.sio && self.sio.connected){
			// 		if(Date.now() - self.lastRecieveTime > 10000){
			// 			self.close();
			// 		}         
			// 	}
			// }.bind(this),500);
		}   
	}
	send(event,data){
		if(this.sio && this.sio.connected){
			if(data != null && (typeof(data) == "object")){
				// data = JSON.stringify(data);
				//console.log(data);              
			}
			this.sio.emit(event,data);                
		}
	}
	ping(){
		if(this.sio){
			this.lastSendTime = Date.now();
			// cc.log("Game_Ping");
			this.send('game_ping');
		}
	}
	close(){
		console.log('close');
		this.delayMS = null;
		if(this.sio && this.sio.connected){
			this.sio.connected = false;
			this.sio.disconnect();
		}
		this.sio = null;
		if(this.fnDisconnect){
			this.fnDisconnect();
			this.fnDisconnect = null;
		}
	}
	test(fnResult){
		var xhr = null;
		var fn = function(ret){
			fnResult(ret.isonline);
			xhr = null;
		}
		
		var arr = this.ip.split(':');
		var data = {
			ip:arr[0],
			port:arr[1],
		}
	
	}

}

window.socketNet = new socketNet();
