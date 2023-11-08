import AbstractCalculator from './calculator';
import { unit } from '@ant-design/cssinjs';

export default class CSSCalculator extends AbstractCalculator {
  result: string = '';

  lowPriority?: boolean;

  constructor(num: number | string | AbstractCalculator) {
    super();
    if (num instanceof CSSCalculator) {
      this.result = `(${num.result})`;
    } else if (typeof num === 'number') {
      this.result = unit(num);
    } else if (typeof num === 'string') {
      this.result = num;
    }
  }

  add(num: number | string | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} + ${num.getResult()}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} + ${unit(num)}`;
    }
    this.lowPriority = true;
    return this;
  }

  sub(num: number | string | AbstractCalculator): this {
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} - ${num.getResult()}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} - ${unit(num)}`;
    }
    this.lowPriority = true;
    return this;
  }

  mul(num: number | string | AbstractCalculator): this {
    if (this.lowPriority) {
      this.result = `(${this.result})`;
    }
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} * ${num.getResult(true)}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} * ${num}`;
    }
    this.lowPriority = false;
    return this;
  }

  div(num: number | string | AbstractCalculator): this {
    if (this.lowPriority) {
      this.result = `(${this.result})`;
    }
    if (num instanceof CSSCalculator) {
      this.result = `${this.result} / ${num.getResult(true)}`;
    } else if (typeof num === 'number' || typeof num === 'string') {
      this.result = `${this.result} / ${num}`;
    }
    this.lowPriority = false;
    return this;
  }

  getResult(force?: boolean): string {
    return this.lowPriority || force ? `(${this.result})` : this.result;
  }

  equal(): string {
    if (typeof this.lowPriority !== 'undefined') {
      return `calc(${this.result})`;
    }
    return this.result;
  }
}
