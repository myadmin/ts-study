import { parseQueryString } from '../src/ts/type7';

describe('test', () => {
    it('test parseQueryString', () => {
        expect(parseQueryString('a=1')).toEqual({ a: '1' })
    });
});
