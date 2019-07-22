export class Time {

    private static lastUpdate: number = 0;

    public static get DeltaTime() {
        const now       = Date.now();
        const deltaTime = now - this.lastUpdate;
        this.lastUpdate = now;
        return deltaTime;
    }
}