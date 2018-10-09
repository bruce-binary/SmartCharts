export default class BinaryAPI {
    static get DEFAULT_COUNT() { return 1000; }
    streamRequests = {};
    constructor(requestAPI, requestSubscribe, requestForget) {
        this.requestAPI = requestAPI;
        this.requestSubscribe = requestSubscribe;
        this.requestForget = requestForget;
    }

    getActiveSymbols() {
        return this.requestAPI({
            active_symbols: 'brief',
            product_type: 'basic',
        });
    }

    getServerTime() {
        return this.requestAPI({ time: 1 });
    }

    getTradingTimes(trading_times = 'today') {
        return this.requestAPI({ trading_times });
    }

    getTickHistory(params) {
        const request = BinaryAPI.createTickHistoryRequest(params);
        return this.requestAPI(request);
    }

    subscribeTickHistory(params, callback) {
        const key = this._getKey(params);
        const request = BinaryAPI.createTickHistoryRequest({ ...params, subscribe: 1 });
        this.streamRequests[key] = { request, callback };
        // Send a copy of the request, in case it gets mutated outside
        this.requestSubscribe({ ...request }, callback);
    }

    forget(params) {
        const key = this._getKey(params);
        const { request, callback } = this.streamRequests[key];
        delete this.streamRequests[key];
        return this.requestForget(request, callback);
    }

    static createTickHistoryRequest({ symbol, granularity, start, end, subscribe, adjust_start_time = 1 }) {
        const request = {
            ticks_history: symbol,
            granularity: +granularity,
            style: +granularity ? 'candles' : 'ticks',
            end: 'latest',
            count: BinaryAPI.DEFAULT_COUNT,
        };

        if (adjust_start_time) {
            request.adjust_start_time = adjust_start_time;
        }

        if (subscribe) {
            request.subscribe = 1;
        }

        if (start) {
            delete request.count;
            request.start = start;
        }

        if (end) {
            request.end = end;
        }

        return request;
    }

    _getKey({ symbol, granularity }) {
        return `${symbol}-${granularity}`;
    }
}
