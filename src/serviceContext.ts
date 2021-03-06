import ServiceMap, { ServiceMapPair, ServiceDefinitions } from './serviceMap';
import all from './methods/all';
import createMap from './methods/createMap';
import ensure from './methods/ensure';
import filter, { FilterPredicate } from './methods/filter';
import filterByTag from './methods/filterByTag';
import get from './methods/get';
import getRange from './methods/getRange';

class ServiceContext {
    map: ServiceMap;

    constructor(...definitions: ServiceDefinitions) {
        this.map = createMap(...definitions);
    }

    get(dependency: any): any {
        return get(this.map, dependency);
    }

    getRange(...dependencies: Array<any>): Array<any> {
        return getRange(this.map, ...dependencies);
    }

    async ensure(dependencies: Array<any>, callback: (...services: Array<any>) => any): Promise<any> {
        const result = await ensure(this.map, dependencies, callback);

        return result;
    }

    all(): Array<string> {
        return all(this.map);
    }

    filter(predicate: FilterPredicate): Array<string> {
        return filter(this.map, predicate);
    }

    filterByTag(tag: string): Array<string> {
        return filterByTag(this.map, tag);
    }
}

export {
    ServiceContext as default,
};
