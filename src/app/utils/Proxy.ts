export class Proxy{
    public static create (scope:any, method:Function, ...params: Array<any> ): any {
        var aArgs:Array<any> = Array.prototype.slice.call(arguments, 2);
        return function () {
            const _arr = Array.prototype.slice.call(arguments, 0);
            return method.apply(scope, aArgs.concat(_arr));
        };
    }
}