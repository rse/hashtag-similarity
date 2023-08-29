/*
**  HashTag-Similarity -- Similarity Clustering of HashTags
**  Copyright (c) 2020-2023 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

/*  minimum graph class with component finding  */
module.exports = class Graph {
    /*  construct a fresh graph  */
    constructor () {
        this.nodes = {}
        this.edges = {}
    }

    /*  manage nodes  */
    hasNode (id) {
        return this.nodes[id] !== undefined
    }
    hasNodes () {
        return Object.keys(this.nodes).length > 0
    }
    setNode (id, value = true) {
        this.nodes[id] = value
    }
    delNode (id) {
        delete this.nodes[id]
        delete this.edges[id]
        for (const id2 of Object.keys(this.edges))
            if (this.edges[id2][id] !== undefined)
                delete this.edges[id2][id]
    }
    getNode (id) {
        return this.nodes[id]
    }
    getNodes () {
        return Object.keys(this.nodes)
    }

    /*  manage edges  */
    hasEdge (id1, id2) {
        const e = this.edges[id1]
        if (!e)
            return false
        return e[id2] !== undefined
    }
    hasEdges () {
        return Object.keys(this.edges).length > 0
    }
    setEdge (id1, id2, value = true) {
        if (this.edges[id1] === undefined)
            this.edges[id1] = {}
        this.edges[id1][id2] = value
        if (this.edges[id2] === undefined)
            this.edges[id2] = {}
        this.edges[id2][id1] = value
    }
    delEdge (id1, id2) {
        if (this.edges[id1] !== undefined)
            delete this.edges[id1][id2]
        if (this.edges[id2] !== undefined)
            delete this.edges[id2][id1]
    }
    getEdge (id1, id2) {
        const e = this.edges[id1]
        return e ? e[id2] : undefined
    }
    getEdgeNodes (id1) {
        const e = this.edges[id1]
        return e ? Object.keys(e) : []
    }

    /*  find components  */
    components () {
        const components = []
        const taken = {}
        let component = new Graph()
        const dfs = (node) => {
            if (taken[node])
                return
            taken[node] = true
            component.setNode(node, this.getNode(node))
            for (const edgeNode of this.getEdgeNodes(node)) {
                component.setNode(edgeNode)
                component.setEdge(node, edgeNode, this.getEdge(node, edgeNode))
                dfs(edgeNode)
            }
        }
        for (const node of this.getNodes()) {
            if (!taken[node]) {
                if (component.hasNodes()) {
                    components.push(component)
                    component = new Graph()
                }
                dfs(node)
            }
        }
        if (component.hasNodes())
            components.push(component)
        return components
    }
}

