import { useEffect, useState } from "react";

import './PathFinderVisualizer.css'

import Node from './Node/Node'

const PathFinderVisualizer = () => {
  const [grid, setGrid] = useState(null);

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
          isVisited: false,
          distance: Infinity
        };
        newRow.push(newNode)
      }
      newGrid.push(newRow)
    }
    setGrid(newGrid)
  }, []);

  return (
    <div className="pathfinder-visualizer flex-container">
        {
            grid && grid.map(row => {
                return <div className="row flex-container">
                    {
                        row.map(node => {
                            return <Node node={node} />
                        })
                    }
                </div>
            })
        }
    </div>
  )
};

export default PathFinderVisualizer;
