export class Vector2 {
    private _x: number;
    private _y: number;

    constructor( _x: number = 0, _y: number = 0) {
        this._x = _x;
        this._y = _y;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get x(): number{
        return this._x;
    }


    public set y(y: number) {
        this._y = y;
    }

    public get y(): number{
        return this._y;
    }

    public Copy ( vector2: Vector2 ): Vector2 {
		this.x = vector2.x;
		this.y = vector2.y;
		return this;
	}

    public Clone (): Vector2 {
		return new Vector2(this.x, this.y)
	}

    /** Operations */
    public Add( vector2: Vector2 ) {
        this.x + vector2.x;
        this.y + vector2.y;
        return this;
    }
    public AddVectors ( v1: Vector2, V2: Vector2 ): Vector2 {
		this.x = v1.x + V2.x;
		this.y = v1.y + V2.y;
		return this;
	}

    public Subtract( vector2: Vector2 ): Vector2 {
        this.x -= vector2.x;
        this.y -= vector2.y;
        return this;
    }
    public SubVectors ( v1: Vector2, V2: Vector2 ): Vector2 {
		this.x = v1.x - V2.x;
		this.y = v1.y - V2.y;
		return this;
	}

    public Multiply ( vector2: Vector2 ): Vector2 {
		this.x *= vector2.x;
		this.y *= vector2.y;
		return this;
	}

    public Divide ( vector2: Vector2 ): Vector2 {
		this.x /= vector2.x;
		this.y /= vector2.y;
		return this;
    }

    /** Scalar */
    public AddScalar( value: number ): Vector2 {
        this.x += value;
        this.y += value;
        return this;
    }

    public SubtractScalar( value: number ): Vector2 {
        this.x -= value;
        this.y -= value;
        return this;
    }

    public MultiplyScalar( value: number ): Vector2 {
        this.x *= value;
        this.y *= value;
        return this;
    }

    public DivideScalar( value: number ): Vector2 {
        this.MultiplyScalar( 1 / value );
        return this;
    }


    public Min ( vector2: Vector2 ): Vector2 {
		this.x = Math.min( this.x, vector2.x );
		this.y = Math.min( this.y, vector2.y );
		return this;
	}

	public Max ( vector2: Vector2 ): Vector2 {
		this.x = Math.max( this.x, vector2.x );
		this.y = Math.max( this.y, vector2.y );
		return this;
    }
    
	public Dot ( vector2: Vector2): number {
		return (this.x * vector2.x + this.y + vector2.y);
    }

    public DotProduct ( vector2: Vector2): number {
        return this.x * vector2.x + this.y * vector2.y;
    };
    
    /** Climp */
    public Clamp ( minVector2: Vector2, maxVector2:Vector2 ): Vector2 {
		this.x = Math.max( minVector2.x, Math.min( maxVector2.x, this.x ) );
		this.y = Math.max( minVector2.y, Math.min( maxVector2.y, this.y ) );
		return this;
	}

	public ClampScalar ( minVal: number, maxVal: number ): Vector2 {
		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		return this;
	}

	public ClampLength ( min: number, max: number ): Vector2 {
		const length = this.Magnitude();
		return this.DivideScalar( length || 1 ).MultiplyScalar( Math.max( min, Math.min( max, length ) ) );
    }
    

    /** Length = Magnitude */
    public LengthSqr (): number {
        return this.MagnitudeSqr();
    }
    public MagnitudeSqr (): number {
		return this.x * this.x + this.y * this.y;
	}

	public Length (): number {
        return this.Magnitude();
    }
	public Magnitude (): number {
		return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    
	public ManhattanLength (): number {
		return Math.abs( this.x ) + Math.abs( this.y );
	}

	public Normalize () {
		return this.DivideScalar( this.Magnitude() || 1 );
    }
    
    public ApplyMatrix3 ( matrix: any ): Vector2 {
        const x = this.x;
        const y = this.y;
		const e = matrix.elements;
		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];
		return this;
    }

    /** Asserts */
    public Floor () {
		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		return this;
	}

	public Ceil () {
		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		return this;
	}

	public Round () {
		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		return this;
    }
    
	public RoundToZero () {
		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		return this;
    }

	public Angle () {
		let angle = Math.atan2( this.y, this.x );
		if ( angle < 0 ) angle += 2 * Math.PI;
		return angle;
    }

    public AngleBetween ( vector2: Vector2 ): number {
        return Math.atan2(
            vector2.y - this.y,
            vector2.x - this.x
        );
    };
    
	public Distance ( vector2: Vector2 ): number {
        return this.DistanceTo( vector2 );
    }

	public DistanceTo ( vector2: Vector2 ): number {
		return Math.sqrt( this.DistanceToSquared( vector2 ) );
    }
    
	public DistanceToSquared ( vector2: Vector2 ): number {
        const dx = this.x - vector2.x;
        const dy = this.y - vector2.y;
		return dx * dx + dy * dy;
    }
    
	public manhattanDistanceTo ( vector2: Vector2 ): number {
		return Math.abs( this.x - vector2.x ) + Math.abs( this.y - vector2.y );
    }
    
	public setLength ( length: number ) {
		return this.Normalize().MultiplyScalar( length );
    }
    
	public Lerp ( vector2: Vector2, alpha: number ): Vector2 {
		this.x += ( vector2.x - this.x ) * alpha;
		this.y += ( vector2.y - this.y ) * alpha;
		return this;
    }
    
	public LerpVectors ( v1: Vector2, v2: Vector2, alpha: number ) {
		return this.SubVectors( v2, v1 ).MultiplyScalar( alpha ).Add( v1 );
    }
    
	public Equals ( vector2: Vector2 ) {
		return ( ( vector2.x === this.x ) && ( vector2.y === this.y ) );
    }
    
	public FromArray ( array: Array<number>, offset: number ): Vector2 {
		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		return this;

    }
    
	public ToArray ( array: Array<number> = [], offset = 0 ): Array<number> {
		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		return array;
    }
    
	public FromBufferAttribute ( attribute: any, index: any, offset?: number ) {
		this.x = attribute.getX( index );
		this.y = attribute.getY( index );
		return this;
    }
    
	public RotateAround ( vector2: Vector2, angle: number ): Vector2 {
        const c = Math.cos( angle );
        const s = Math.sin( angle );
		const x = this.x - vector2.x;
		const y = this.y - vector2.y;
		this.x = x * c - y * s + vector2.x;
		this.y = x * s + y * c + vector2.y;
		return this;
    }

    public Precision ( precision: number ): Vector2 {
		const vector = this.Clone();
		vector.x = parseFloat(vector.x.toFixed(precision));
		vector.y = parseFloat(vector.y.toFixed(precision));
		return vector;
    }
    
    public PerpendicularRight(): Vector2 {
		const vector = this.Clone();
        this.x = vector.y;
        this.y = -vector.x;
        return this;
    }
    
    public PerpendicularLeft(): Vector2 {
		const vector = this.Clone();
        this.x = -vector.y;
        this.y = vector.x;
        return this;
    }

    public reflect( vector2: Vector2 ): Vector2 {
        var normal = vector2.Normalize(); // reflect through this normal
        var dot = this.DotProduct(normal);
        return this.Subtract( normal.MultiplyScalar(dot + dot) );
    }

    /***** perp *****/
	public Perp (): Vector2 {
		this.y	= -this.y;
		return this;
	};
	
	/***** perpendicular *****/
	public Perpendicular ( vector2: Vector2 ): Vector2 {
		return this.Subtract( this.Project( vector2 ) );
	};
	
	/***** project *****/
	public Project ( vector2: Vector2 ): Vector2 {
		const percent: number = this.Dot( vector2 ) / vector2.Dot( vector2 );
		return vector2.MultiplyScalar( percent );
	};
	
	/***** Cross *****/
	public Cross (vector2: Vector2): number {
		return this.x * vector2.y - this.y * vector2.x;
    }

	public Unit (): Vector2 {
		this.DivideScalar( this.Magnitude() );
		return this;
    };
   
    public toString () {
		return ("Vector2 [" + this.x + ", " + this.y + "]");
    }
    
    public static Up(): Vector2 {
        return new Vector2(0, 1);
    }
    
    public static Down(): Vector2 {
        return new Vector2(0, -1);
    }
    
    public static Right(): Vector2 {
        return new Vector2(1, 0);
    }
    
    public static Left(): Vector2 {
        return new Vector2(-1, 0);
    }
    
    public static Zero(): Vector2 {
        return new Vector2(0, 0);
    }
    
    public static One(): Vector2 {
        return new Vector2(1, 1);
    }

}