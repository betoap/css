interface Point {
    coordinates(): any;
}

class NDPoint implements Point {
    private values: number[] = [];

    constructor()
    constructor(point: Point)
    constructor(x: number)
    constructor(x: number, y: number)
    constructor(x: number, y: number, z: number)
    constructor(coordinates: number[])
    constructor(xOrPoint?: Point | number | number[], y?: number, z?: number) {
        console.log(this.values)
        if (typeof xOrPoint === 'undefined' || xOrPoint === null) {
            this.values = [];
        } else if (xOrPoint instanceof Array) {
            this.values = xOrPoint;
        } else if (typeof xOrPoint === 'number') {
            if (typeof y !== 'undefined') {
                if (typeof z !== 'undefined') {
                    this.values = [xOrPoint, y, z];
                } else {
                    this.values = [xOrPoint, y];
                }
            } else {
                this.values = [xOrPoint];
            }
        } else {
            // this.values = [xOrPoint.coordinates()];
        }
    }
    coordinates(): any {
        return this.values;
    }
}

new NDPoint();
new NDPoint(new NDPoint());
new NDPoint(10);
new NDPoint(10, 10);
new NDPoint(10, 10, 10);
new NDPoint(10, 10, 10);
new NDPoint([10, 10, 10]);