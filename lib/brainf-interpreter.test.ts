/**
 * Simple test for BrainF++ interpreter.
 * Run: pnpm exec tsx lib/brainf-interpreter.test.ts
 */

import { interpretBrainF } from './brainf-interpreter';

// Simpler Hello World: build H(72), e(101), l(108), l(108), o(111), space(32), W(87), o(111), r(114), l(108), d(100), !(33)
const HELLO_WORLD =
  '{mn' +
  '+'.repeat(72) + '.>' +
  '+'.repeat(101) + '.>' +
  '+'.repeat(108) + '.>' +
  '+'.repeat(108) + '.>' +
  '+'.repeat(111) + '.>' +
  '+'.repeat(32) + '.>' +
  '+'.repeat(87) + '.>' +
  '+'.repeat(111) + '.>' +
  '+'.repeat(114) + '.>' +
  '+'.repeat(108) + '.>' +
  '+'.repeat(100) + '.>' +
  '+'.repeat(33) + '.}';

const SIMPLE_HI =
  '{mn++++++++[>+++++++++<-]>.>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.}';

const SAMPLE = '{mn ,+++++.}';

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

if (runTest('Hello World', HELLO_WORLD, '', 'Hello World!')) passed++;
else failed++;

if (runTest('Simple Hi', SIMPLE_HI, '', 'Hi')) passed++;
else failed++;

if (runTest('Sample (input+5)', SAMPLE, 'A', 'F')) passed++;
else failed++;

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
