import { expect } from 'chai';

import { challenge1, challenge2 } from '../index';

const testInput = readFile('@/01/resources/test.txt');
const testInput2 = readFile('@/01/resources/inpu2t.txt');

const input = readFile('@/01/resources/input.txt');

describe('Day 01', () => {
    describe('Challenge 1', () => {
        it('test 1', () => {
            const result = challenge1(testInput);
            expect(result).equal(11);
        });
    })

    describe('Challenge 2', () => {
        it('test 1', () => {
            const result = challenge2(testInput2);
            expect(result).equal(31);
        });
    })
})