export const dijkstra = (grid, startNode, endNode) => {
    if (!grid || !startNode || !endNode) return 

    grid[startNode[0]][startNode[1]].distance = 0

    const unvisitedNodes = []

    grid.forEach(row => {
        row.forEach(node => {
            unvisitedNodes.push(node)
        })
    });

    const visitedNodesInOrder = []

    while(unvisitedNodes.length) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance)
        const currentNode = unvisitedNodes.shift()

        if (currentNode.distance === Infinity) return [visitedNodesInOrder, currentNode]

        if (currentNode.isBarrier) continue

        if (currentNode.endNode) return [visitedNodesInOrder, currentNode]

        visitedNodesInOrder.push(currentNode)

        grid[currentNode.row][currentNode.col].isVisited = true
        updateNeighbors(currentNode, grid)
    }
}

const updateNeighbors = (currentNode, grid) => {
    const neighbors = getNeighbors(currentNode, grid)
    for (let i = 0; i < neighbors.length; i++) {
        grid[neighbors[i][0]][neighbors[i][1]].distance = currentNode.distance + 1
        grid[neighbors[i][0]][neighbors[i][1]].previous = [currentNode.row, currentNode.col]
    }
}

const getNeighbors = (currentNode, grid) => {
    const neighbors = []
    // UP
    if (currentNode.row - 1 >= 0) neighbors.push([currentNode.row - 1, currentNode.col])
    // RIGHT
    if (currentNode.col + 1 < 50) neighbors.push([currentNode.row, currentNode.col + 1])
    // DOWN
    if (currentNode.row + 1 < 30) neighbors.push([currentNode.row + 1, currentNode.col])
    // LEFT
    if (currentNode.col - 1 >= 0) neighbors.push([currentNode.row, currentNode.col - 1])

    return neighbors.filter(neighbor => !grid[neighbor[0]][neighbor[1]].isVisited)
}