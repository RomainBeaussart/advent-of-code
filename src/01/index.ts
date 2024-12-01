import { NEWLINE, WHITESPACE } from '../libs/global'
import { Tuple } from './types/tuple';
// import { pipe } from "rxjs"

type NumberTuple = Tuple<number>;
type NumberListTuple = Tuple<number[]>;

function convertToLists(input: string): NumberListTuple {
    const lists: [NumberTuple] = input.split(NEWLINE)
        .map(
            (x: string) => x
                .splitToNumbers(' ')
        ) as [NumberTuple]

    return lists.reduce(
        (acc: [Array<number>, Array<number>], x: NumberTuple) => {
            acc[0].push(x[0]);
            acc[1].push(x[1]);
            return acc;
        },
        [[], []]
    ) as NumberListTuple;
}

export function challenge1(input: string) {
    const columns = convertToLists(input)
        .map((column) => column.sort((a, b) => a - b));

    const [column1, column2] = columns;

    const distance = column1.reduce(
        (acc, x, i) => acc + Math.abs(x - column2[i]),
        0
    );
    return distance;
        
}

export function challenge2(input: string) {
    const [column1, column2] = convertToLists(input);

    return column1.reduce(
        (acc, x) => {
            return acc += column2.count(x) * x
        }, 0)

}