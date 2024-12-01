import { maxOf } from './functions';
import { minOf } from './functions';
import { sum } from './functions';
import { avg } from './functions';
import { asc } from './functions';
import { desc } from './functions';
import { chunk } from './functions';
import { groupBy, groupByFunction } from './functions';

declare global {
    interface Array<T> {
        /**
         * 
         * @param count The number of max values to return
        */
       max(count: number): number[];
       max(): number;
       /**
        * 
        * @param count The number of min values to return
       */
      min(count: number): number[];
      min(): number;
      chunk<T>(size: number): T[][];
      sum(): number;
      avg(): number;
      asc(): number[];
      desc(): number[];
      groupBy<T>(key: groupByFunction<T>): { [key: string]: T[] };
      count<T>(value: T): number;
    }
}

const max = function (this: number[], count: number = 1): number | number[] {
    return maxOf(this, count);
};

Object.assign(Array.prototype, { max });

const min = function (this: number[], count: number = 1): number | number[] {
    return minOf(this, count);
};

Object.assign(Array.prototype, { min });

Array.prototype.sum = function (this: number[]): number {
    return sum(this);
};

Array.prototype.avg = function (this: number[]): number {
    return avg(this);
};

Array.prototype.asc = function (this: number[]): number[] {
    return asc(this);
};

Array.prototype.desc = function (this: number[]): number[] {
    return desc(this);
}

Array.prototype.chunk = function<T> (this: any[], size: number): T[][] {
    return chunk(this, size);
}

Array.prototype.groupBy = function<T> (this: T[], key: groupByFunction<T>): { [key: string]: T[] } {
    return groupBy(this, key);
}

Array.prototype.count = function<T> (this: T[], value: T): number {
    return this.filter(x => x === value).length;
}
