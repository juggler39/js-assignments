'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    const h = puzzle.length;
    const w = puzzle[0].length;
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    const used = Array(h).fill(0).map(() => [w].fill(false));
    function find(y, x, pos) {
        if (pos === searchStr.length) return true;
        if (!(y >= 0 && y < h && x >= 0 && x < w)
            || used[y][x] || searchStr[pos] !== puzzle[y][x]) return false;
        used[y][x] = true;
        for (let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            if (find(ny, nx, pos + 1)) return true;
        }
        used[y][x] = false;
    }
    for (let i = 0; i < puzzle.length; i++)
        for (let j = 0; j < puzzle[0].length; j++) {
            for (let i = 0; i < used.length; i++) used[i].fill(false);
            if (find(i, j, 0)) return true;
        }
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {

    const list = [];
    function permutation(start) {
        if (start === chars.length) {
            list.push(chars);
            return;
        }
        for (let i = start; i < chars.length; i++) {
            chars = swap(chars, start, i);
            permutation(start + 1);
            chars = swap(chars, start, i);
        }
    }
    permutation(0);

    for (let x of list) yield x;

    function swap(str, i, j) {
        const s = [...str];
        [s[i], s[j]] = [s[j], s[i]];
        return s.join('');
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    let profit = 0;
    let maxPos = 0;
    let i = 0;
    while (maxPos !== quotes.length) {
        for (let j = maxPos; j < quotes.length; j++) {
            maxPos = quotes[maxPos] < quotes[j] ? j : maxPos;
        }
        while (i !== maxPos) {
            profit += quotes[maxPos] - quotes[i++];
        }
        maxPos++;
        i++;
    }
    return profit;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {

        const s = url.split('').map(x => this.urlAllowedChars.indexOf(x)+1);
        let result='';
        for (let i = 0; i < s.length; i +=2) {
            result += String.fromCharCode(s[i]*128 + (s[i+1]||0));
        }

        return result;
    },

    decode: function(code) {

        const s = code.split('').map((_, i) => code.charCodeAt(i));
        let result='';
        for (let i = 0; i < s.length; i++) {
            result += this.urlAllowedChars[Math.floor(s[i]/128)-1];
            result += s[i]%128 ? this.urlAllowedChars[s[i]%128-1] : '';
        }

        return result;
    }
};

module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
