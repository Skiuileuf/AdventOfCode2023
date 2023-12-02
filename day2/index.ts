import fs from 'fs';

const file = fs.readFileSync('./input.txt', 'utf-8');
const lines = file.split('\n');

interface Bag {
    [key: string]: number;
}

function sumOfPlayableGameIDs() {
    const maximumBag: Bag = {
        "red": 12,
        "green": 13,
        "blue": 14,
    }
    
    var sum = 0;
    
    for (const line of lines) {
        const game = Number.parseInt(line.split(':')[0].split(' ')[1]);
        const sets = line.split(':')[1].split(';');
    
        var isValid = true;
        for(const set of sets) {
            const cubes = set.split(',');
    
            for(const cube of cubes) {
                const count = Number.parseInt(cube.trim().split(' ')[0]);
                const color: string = cube.trim().split(' ')[1];
    
                if(count > maximumBag[color]) {
                    isValid = false;
                    break;
                }
            }
            
        }
        sum += isValid ? game : 0;
    }

    return sum;
}

var sum = 0;

for (const line of lines) {
    const game = Number.parseInt(line.split(':')[0].split(' ')[1]);
    const sets = line.split(':')[1].split(';');

    const minimumBag: Bag = {
        "red": 0,
        "green": 0,
        "blue": 0,
    }

    for(const set of sets) {
        const cubes = set.split(',');

        for(const cube of cubes) {
            const count = Number.parseInt(cube.trim().split(' ')[0]);
            const color: string = cube.trim().split(' ')[1];

            if(count > minimumBag[color]) {
                minimumBag[color] = count;
            }
        }
    }

    const power = minimumBag["red"] * minimumBag["green"] * minimumBag["blue"];
    sum += power;
}

console.log(sum);