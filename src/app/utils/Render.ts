class Render{

    private width: number;
    private height: number;
    private id: string;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor( id: string = 'canvas', width?: number, height?: number ) {
        const { width: _width, height: _height } = this.windowSize();
        this.width = width || _width;
        this.height = height || _height;
        this.id = id;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.width.toString() );
        this.canvas.setAttribute('height', this.height.toString());
        this.canvas.setAttribute('id', this.id );
        this.canvas.setAttribute('name', this.id );
        this.context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.context.translate( this.width / 2, 200 );
        document.body.append(this.canvas);
    }

    private windowSize(): { width: number, height: number } {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        const height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        return { width, height }
    }

    clear(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImageTile( img: any, x: number, y: number, index: number ) {
        this.context.save();
        this.context.translate((x - y) * this.tileWidth / 2, (x + y) * this.tileHeigth / 2);
        this.context.drawImage(
            img,
            index * this.tileWidth,
            0,
            this.tileWidth,
            img.height,
            -this.tileWidth / 2,
            0,
            this.tileWidth,
            img.height
        );
        this.context.restore();
    }

    draw(): void {
        this.clear();
    }

    private tileWidth: number = 80;
    private tileHeigth: number = this.tileWidth / 2;
    public drawTile( x:number, y: number, color: any ) {
        this.context.save();
        this.context.translate( (x - y) * this.tileWidth / 2, ( x + y ) * this.tileHeigth / 2 );
        this.context.beginPath();
        this.context.moveTo( 0, 0 );
        this.context.lineTo( this.tileWidth / 2 , this.tileHeigth / 2 );
        this.context.lineTo( 0 , this.tileHeigth );
        this.context.lineTo( -this.tileWidth / 2 , this.tileHeigth / 2 );
        this.context.closePath();
        this.context.fillStyle = color;
        this.context.fill();

        this.context.restore();
    }


    drawBlock(x: number, y: number, z: number) {
		var top = "#eeeeee",
			right = "#cccccc",
			left = "#999999";

		this.context.save();
		this.context.translate((x - y) * this.tileWidth / 2, (x + y) * this.tileHeigth / 2);

		// draw top
		this.context.beginPath();
		this.context.moveTo(0, -z * this.tileHeigth);
		this.context.lineTo(this.tileWidth / 2, this.tileHeigth / 2 - z * this.tileHeigth);
		this.context.lineTo(0, this.tileHeigth - z * this.tileHeigth);
		this.context.lineTo(-this.tileWidth / 2, this.tileHeigth / 2 - z * this.tileHeigth);
		this.context.closePath();
		this.context.fillStyle = top;
		this.context.fill();

		// draw left
		this.context.beginPath();
		this.context.moveTo(-this.tileWidth / 2, this.tileHeigth / 2 - z * this.tileHeigth);
		this.context.lineTo(0, this.tileHeigth - z * this.tileHeigth);
		this.context.lineTo(0, this.tileHeigth);
		this.context.lineTo(-this.tileWidth / 2, this.tileHeigth / 2);
		this.context.closePath();
		this.context.fillStyle = left;
		this.context.fill();

		// draw right
		this.context.beginPath();
		this.context.moveTo(this.tileWidth / 2, this.tileHeigth / 2 - z * this.tileHeigth);
		this.context.lineTo(0, this.tileHeigth - z * this.tileHeigth);
		this.context.lineTo(0, this.tileHeigth);
		this.context.lineTo(this.tileWidth / 2, this.tileHeigth / 2);
		this.context.closePath();
		this.context.fillStyle = right;
		this.context.fill();

		this.context.restore();		
	}
}


