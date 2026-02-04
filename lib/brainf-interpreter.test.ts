/**
 * Simple test for BrainF++ interpreter.
 * Run: pnpm exec tsx lib/brainf-interpreter.test.ts
 */

import { interpretBrainF } from './brainf-interpreter';

const HELLO_WORLD =
  '{mn++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.>+.+++.------.--------.>+.>+.}';

const SIMPLE_HI =
  '{mn++++++++[>+++++++++<-]>.>++++[>++++++++<-]>+<[->+<]>.}';

const SAMPLE = '{fn >++}\n{mn ,(fn)+(fn).}';

function runTest(name: string, code: string, input: string, expected: string) {
  const actual = interpretBrainF(code, input);
  const pass = actual === expected;
  console.log(
    pass ? 'PASS' : 'FAIL',
    name,
    '\n  expected:',
    JSON.stringify(expected),
    '\n  actual:  ',
    JSON.stringify(actual),
  );
  return pass;
}

let passed = 0;
let failed = 0;

// Minimal: 72 pluses then print (should be 'H')
const MINIMAL_H = '{mn' + '+'.repeat(72) + '.}';
if (runTest('Minimal H (72+ .)', MINIMAL_H, '', 'H')) passed++;
else failed++;

// Loop: 8*8=64 in cell 2, then + and print = 65 = 'A'
const LOOP_A = '{mn++++++++[>++++++++<-]>+.}';
if (runTest('Loop A', LOOP_A, '', 'A')) passed++;
else failed++;

// Hello World first char only: loop then >++. should be 'H'
const HELLO_FIRST =
  '{mn++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.}';
if (runTest('Hello first char', HELLO_FIRST, '', 'H')) passed++;
else failed++;

if (runTest('Hello World', HELLO_WORLD, '', 'Hello World!\n')) passed++;
else failed++;

if (runTest('Simple Hi', SIMPLE_HI, '', 'Hi')) passed++;
else failed++;

if (runTest('Sample (input+5)', SAMPLE, 'A', 'F')) passed++;
else failed++;

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
