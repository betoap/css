export class Detector {
    canvas () {
        return !!(<any>window).CanvasRenderingContext2D
    }

    webgl () {
        try {
            const context: any = document.createElement( 'canvas' ).getContext( 'experimental-webgl') || document.createElement( 'canvas' ).getContext( 'webgl');
            const support: any = context.getSupportedExtensions()
            return !!(<any>window).WebGLRenderingContext && 
                !!context &&
                !!this.canvas() && 
                !!support;
        } catch( e ) {
            return false;
        }
    }

    auto() {
        
    }
}