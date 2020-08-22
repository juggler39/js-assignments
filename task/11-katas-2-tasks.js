'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    const digits = [];
    digits.push([" _ ",
                 "| |",
                 "|_|"]);
    digits.push(["   ",
                 "  |",
                 "  |"]);
    digits.push([" _ ",
                 " _|",
                 "|_"]);
    digits.push([" _ ",
                 " _|",
                 " _|"]);
    digits.push(["   ",
                 "|_|",
                 "  |"]);
    digits.push([" _ ",
                 "|_ ",
                 " _|"]);
    digits.push([" _ ",
                 "|_ ",
                 "|_|"]);
    digits.push([" _ ",
                 "  |",
                 "  |"]);
    digits.push([" _ ",
                 "|_|",
                 "|_|"]);
    digits.push([" _ ",
                 "|_|",
                 " _|"]);
    let arr = bankAccount.split('\n');
    arr.pop();
    let result = '';
    for(let i = 0; i<arr[0].length; i += 3 ) {
        for(let j = 0; j < 10; j++){
            if( arr[0].slice(i, i+3).includes(digits[j][0]) &&
                arr[1].slice(i, i+3).includes(digits[j][1]) &&
                arr[2].slice(i, i+3).includes(digits[j][2]))
                result += j;
        }
    }
    return +result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let arr = text.split(' ');
    let result = [];
    let stringLength = 0;
    for (let i = 0; i<arr.length;) {
        if (stringLength + arr[i].length + result.length <= columns) {
            result.push(arr[i]);
            stringLength += arr[i].length;
            i++;
        }
        else{
            yield result.join(' ');
            stringLength = 0;
            result= [];
        }
    }
    yield result.join(' ');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};


function getPokerHandRank(hand) {
    const cards = '234567891JQKA';
    const ranks = hand.map(v => v[0]).sort((a, b) => cards.indexOf(a) - cards.indexOf(b)).join('');
    const suits = hand.map(v => v[v.length - 1]).join('');
    const gr = ranks.match(/(.)\1{0,99}/g);
    const gs = suits.match(/(.)\1{0,99}/g);
    if (gs.length === 1 && (cards.indexOf(ranks) !== -1 || ranks === '2345A')) return PokerRank.StraightFlush;
    if (gr[0].length === 4 || gr[1].length === 4) return PokerRank.FourOfKind;
    if (gr[0].length + gr[1].length === 5) return PokerRank.FullHouse;
    if (gs.length === 1) return PokerRank.Flush;
    if (cards.indexOf(ranks) !== -1 || ranks === '2345A') return PokerRank.Straight;
    if (gr[0].length === 3 || gr[1].length === 3 || gr[2].length === 3) return PokerRank.ThreeOfKind;
    if (gr[0].length + gr[1].length + gr[2].length === 5) return PokerRank.TwoPairs;
    if (gr[0].length + gr[1].length + gr[2].length + gr[3].length === 5) return PokerRank.OnePair;
    return PokerRank.HighCard;
}



/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    const h = figure.match(/\n/g).length;
    const w = figure.indexOf('\n');
    const dimension = Array(h).fill(0).map(() => Array(w).fill(0).map(() => [0, 0, 0]));

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (symbol(i, j) === '+' && check(i - 1, j - 1) &&
                ((symbol(i - 1, j) === '|' && symbol(i, j - 1) === '-' && dimension[i - 1][j - 1][2] === 1) ||
                    (symbol(i - 1, j) === '+' && symbol(i, j - 1) === '+')))
                yield rect(dimension[i - 1][j - 1][0] + 2, dimension[i - 1][j - 1][1] + 2);
            else if (symbol(i, j) === ' ') {
                if (check(i - 1, j - 1) && symbol(i, j - 1) === '|' && symbol(i - 1, j) === '-') {
                    dimension[i][j] = [1, 1, 1];
                } else {
                    if (check(i, j - 1)) {
                        dimension[i][j][0] = dimension[i][j - 1][0] + 1;
                        dimension[i][j][2] = dimension[i][j - 1][2];
                    }
                    if (check(i - 1, j)) {
                        dimension[i][j][1] = dimension[i - 1][j][1] + 1;
                        dimension[i][j][2] = dimension[i - 1][j][2];
                    }
                }
            } else
                dimension[i][j][2] = 1;
        }
    }

    function symbol(y, x) { return figure[y * (w + 1) + x] }
    function check(y, x) { return x >= 0 && x < w && y >= 0 && y < h && symbol(y, x) }
    function rect(w, h) {
        return '+' + '-'.repeat(w - 2) + '+\n' +
            ('|' + ' '.repeat(w - 2) + '|\n').repeat(h - 2) +
            '+' + '-'.repeat(w - 2) + '+\n';
    }
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
