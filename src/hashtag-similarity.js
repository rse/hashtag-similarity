/*
**  HashTag-Similarity -- Similarity Clustering of HashTags
**  Copyright (c) 2020 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  external requirements  */
const metaphone = require("double-metaphone")
const dice      = require("dice-coefficient")

/*  internal requirements  */
const Graph     = require("./hashtag-graph.js")

/*  exported API function  */
module.exports = function (hashtags, options = {}) {
    /*  provide option defaults  */
    options = Object.assign({}, {
        weightMetaphone:     1.0,
        weightDiceCoeff:     3.0,
        similarityThreshold: 0.5
    }, options)

    /*  canonicalize input  */
    let mapped = true
    if (typeof hashtags === "object" && hashtags instanceof Array) {
        /*  convert plain hashtag array into a map  */
        const map = {}
        for (const hashtag of hashtags) {
            if (map[hashtag] === undefined)
                map[hashtag] = 0
            map[hashtag]++
        }
        hashtags = map
        mapped = false
    }
    if (!(typeof hashtags === "object" && hashtags instanceof Object))
        throw new Error("invalid hashtag argument (expected Object or Array)")

    /*  helper function: match by phonetic similarity (Double-Metaphone algorithm)  */
    const matchPhonetic = (word1, word2) => {
        const w1 = metaphone(word1)
        const w2 = metaphone(word2)
        if (w1[0] === w2[0] && w1[1] === w2[1])
            return 0.75
        else if (w1[0] === w2[0] || w1[1] === w2[1])
            return 0.50
        else
            return 0.0
    }

    /*  helper function: match by lexical similarity (Dice-Coefficient algorithm)  */
    const matchDice = (word1, word2) => {
        return dice(word1, word2)
    }

    /*  find hashtag clusters  */
    const g = new Graph()
    const hashtagsSorted = Object.keys(hashtags).sort()
    for (const hashtag1 of hashtagsSorted) {
        for (const hashtag2 of hashtagsSorted) {
            const P = matchPhonetic(hashtag1, hashtag2)
            const D = matchDice(hashtag1, hashtag2)
            let dist = 1.0
            if (hashtag1 !== hashtag2) {
                dist = (
                    (options.weightMetaphone * P + options.weightDiceCoeff * D) /
                    (options.weightMetaphone +     options.weightDiceCoeff)
                )
            }
            if (dist >= options.similarityThreshold) {
                if (!g.hasNode(hashtag1)) g.setNode(hashtag1)
                if (!g.hasNode(hashtag2)) g.setNode(hashtag2)
                g.setEdge(hashtag1, hashtag2, dist)
            }
            if (hashtag2 === hashtag1)
                break
        }
    }
    const comps = g.components()

    /*  canonicalize output  */
    const result = []
    if (mapped) {
        for (const comp of comps) {
            const map = {}
            for (const tag of comp.getNodes())
                map[tag] = hashtags[tag]
            result.push(map)
        }
    }
    else {
        for (const comp of comps)
            result.push(comp.getNodes().sort((a, b) => hashtags[b] - hashtags[a]))
    }
    return result
}

