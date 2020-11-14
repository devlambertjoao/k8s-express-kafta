import { BaseService } from "./baseService";

class ProducerService extends BaseService {
    constructor() {
        super('/api/producer');
    }

    public async sendMessage(data: MessageBody): Promise<MessageBody | undefined> {
        return await this.post('', data);
    }
}

interface MessageBody {
    msg: string;
}

const producerService = new ProducerService();

export { producerService }
