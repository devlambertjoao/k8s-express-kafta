import BaseWebSocketService from "./baseWebSocketService";

class ConsumerWebSocketService extends BaseWebSocketService {
    constructor() {
        super('api/consumer/ws');
    }
}

const consumerWebSocketService = new ConsumerWebSocketService();

export { consumerWebSocketService }