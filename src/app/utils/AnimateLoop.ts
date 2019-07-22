declare const FPSMeter:any;

class AnimateLoop {

    private lastTime: number = 0;

    private meter = new FPSMeter( document.body );
    
    constructor() {
        // this.meter.set('theme', 'colorful');
        this.meter.set('theme', 'transparent');
        this.meter.set('heat', 1);
        this.meter.set('graph', 1);
        this.meter.tickStart();
        const vendors:Array<string> = ['ms', 'moz', 'webkit', 'o'];
        for(let x = 0; x < vendors.length && !(<any>window).requestAnimationFrame; ++x) {
            (<any>window).requestAnimationFrame = (<any>window)[vendors[x]+'RequestAnimationFrame'];
            (<any>window).cancelAnimationFrame = (<any>window)[vendors[x]+'CancelAnimationFrame'] || (<any>window)[vendors[x]+'CancelRequestAnimationFrame'];
        }

        let id:number;
        if( ! (<any>window).requestAnimationFrame ){
            (<any>window).requestAnimationFrame = (callback: any) => {
                const currTime = new Date().getTime();
                const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
                id = (<any>window).setTimeout( () => {
                    callback(currTime + timeToCall);
                }, timeToCall);
                this.lastTime = currTime + timeToCall;
                return id;
            };
        }

        if( ! (<any>window).cancelAnimationFrame ){
            (<any>window).cancelAnimationFrame = function( id: number ) {
                clearTimeout(id);
            };
        }

        (<any>window).requestAnimationFrame( () => this.loop() );
    }

    private loop() {
        this.meter.tick();
        // this.update();
        // this.render();
        (<any>window).requestAnimationFrame( () => this.loop()  );
    }

    
}
