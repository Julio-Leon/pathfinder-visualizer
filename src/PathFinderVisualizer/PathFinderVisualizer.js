import { useEffect, useState, useRef } from "react";

import './PathFinderVisualizer.css'

import Node from './Node/Node'
import { dijkstra } from "../algo/dijkstra";

const PathFinderVisualizer = () => {
  const [grid, setGrid] = useState(null);

  const [mouseIsDown, setMouseIsDown] = useState(false)

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < 30; i++) {
      const newRow = [];
      for (let j = 0; j < 50; j++) {
        const newNode = {
          row: i,
          col: j, 
          startNode: i === 15 && j === 5,
          endNode: i === 15 && j === 45,
          isBarrier: false,
          isVisited: false,
          distance: Infinity,
          isPath: false
        };
        newRow.push(newNode)
      }
      newGrid.push(newRow)
    }
    setGrid(newGrid)
  }, []);

  const animateDijkstra = () => {
    const response = dijkstra(grid, [15, 5], [15, 45])

    const visitedNodesInOrder = [...response[0]]

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const className = '.row-' + visitedNodesInOrder[i].row + '-col-' + visitedNodesInOrder[i].col
        const element = document.querySelector(className)
        if (!element.classList.contains('start-node')) {
          element.classList.add('visited-node')
        }
      }, (15 * i))
    }

    if (response[1].distance !== Infinity) {
      setTimeout(() => {
        createPath(response[1])
      }, (15 * visitedNodesInOrder.length))
    }
  }

  const createPath = (endNode) => {
    let currentNode = grid[endNode.previous[0]][endNode.previous[1]]
    while (!currentNode.startNode) {
      const tempGrid = [...grid]
      tempGrid[currentNode.row][currentNode.col].isPath = true
      setGrid(tempGrid)
      currentNode = grid[currentNode.previous[0]][currentNode.previous[1]]
    }
  }

  return (
    <div className="pathfinder-visualizer flex-container">
        {
            grid && grid.map((row, i) => {
                return <div key={i} className="row flex-container">
                    {
                        row.map((node, j) => {
                            return <Node key={j} node={node} row={node.row} col={node.col} grid={grid} setGrid={setGrid} mouseIsDown={mouseIsDown} setMouseIsDown={setMouseIsDown} />
                        })
                    }
                </div>
            })
        }
        <button className="animate-dijkstra-button" onClick={animateDijkstra}>Animate!</button>
    </div>
  )
};

export default PathFinderVisualizer;
