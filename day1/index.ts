import fs from 'fs';
import { charIsDigit } from '../common/helpers';

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

function getCalibrationValueFromNumbers(lines: string[]): number {
    var total = 0;

    for (const line of lines) {
        var first: number | undefined = undefined;
        var last: number | undefined = undefined;
    
        for(const char of line) {
            if (charIsDigit(char)) {
                const digit = parseInt(char);
                if (!first) {first = digit; }
                last = parseInt(char);
            }
        }
    
        const result = first! * 10 + last!;
        total += result;
        // console.log(result);
    }

    return total;
}

const numbers: Map<string, number> = new Map<string, number>([
    ['zero', 0],
    ['two', 2],
    ['one', 1],
    ['eight', 8],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['nine', 9],
    ]);


function processInputString(input: string): string {
    const digitRegex = /[0-9]/gi;
    var result = input.replace(digitRegex, '_');
    // console.log(result);

    numbers.forEach((value, key) => {
        // console.log(key, value);
        result = result.replace( new RegExp(key, 'gi'), `${key[0]}${value.toString()}${key[key.length - 1]}`);
        // console.log(result);
    });

    return result;
}

const processed = processInputString(file);
// console.log(processed);
console.log(getCalibrationValueFromNumbers(processed.split('\n')));
fs.writeFileSync('./output.txt', processed);