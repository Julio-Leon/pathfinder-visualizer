import { useState } from 'react'
import './Node.css'

const Node = ({ node, grid, row, col, setGrid, mouseIsDown, setMouseIsDown }) => {

    const extraClassName = node.startNode ? 'start-node' : node.endNode ? 'end-node' : ''

    const oppositeBarrier = (row, col) => {
        const tempGrid = [...grid]
        tempGrid[row][col].isBarrier = !node.isBarrier
        setGrid(tempGrid)
    }

    const movePoints = () => {
        
    }

    const mouseDown = (row, col) => {
        if (node.startNode || node.endNode) return
        setMouseIsDown(true)
        oppositeBarrier(row, col)
    }

    const mouseEnter = (row, col) => {
        if (!mouseIsDown || node.startNode || node.endNode) return
        oppositeBarrier(row, col)
    }

    const mouseUp = () => {
        setMouseIsDown(false)
    }

    const isBarrier = node.isBarrier ? 'is-barrier' : ''

    const isPath = node.isPath ? 'is-path' : ''

    return (
        <div 
            onMouseDown={() => {mouseDown(row, col)}}
            onMouseEnter={() => {mouseEnter(row, col)}}
            onMouseUp={() => {mouseUp()}}
            onClick={() => {movePoints()}}
            className={'row-' + node.row + '-col-' + node.col + ' node ' + extraClassName + ' ' + isBarrier + ' ' + isPath}>
        </div>
    )
}

export default Node   