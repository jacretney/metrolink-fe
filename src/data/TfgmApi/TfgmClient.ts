import { MetroLinkStop } from './MetroLinkStop';
import TfgmAxiosClient from './TfgmAxiosClient';

class TfgmClient {
    apiKey: string|undefined;
    client: typeof TfgmAxiosClient;

    constructor(axiosClient: typeof TfgmAxiosClient) {
        this.client = axiosClient;
    }

    async fetchAllMetroLinkStopDetails(): Promise<MetroLinkStop[]> {
        const { data } = await this.client.get(`/MetroLinks`);

        return data.value;
    }

    async fetchMetroLinkStopDetails(id: number): Promise<MetroLinkStop> {
        const { data } = await this.client.get(`/MetroLinks(${id})`);

        return data;
    }
}

export default TfgmClient;