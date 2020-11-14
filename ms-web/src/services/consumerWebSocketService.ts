import BaseWebSocketService from "./baseWebSocketService";

class ConsumerWebSocketService extends BaseWebSocketService {
    constructor() {
        super('api/consumer');
    }
}

const consumerWebSocketService = new ConsumerWebSocketService();

export { consumerWebSocketService }