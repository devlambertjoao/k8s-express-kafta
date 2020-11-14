export default abstract class BaseWebSocketService {
    private ws: WebSocket;

    constructor(webSocketPath: string) {
        this.ws = new WebSocket(this.setupWsConnectionString(webSocketPath));
    }

    public getWSInstance(): WebSocket {
        return this.ws;
    }

    private setupWsConnectionString(webSocketPath: string) {
        const vueAppUrl = process.env.VUE_APP_URL.replace('http://', '').replace('https://', '')
                            .replace('ws://', '').replace('wss://', '');

        return `ws://${vueAppUrl}/${webSocketPath}`
    }
}