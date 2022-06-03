import { useState } from 'react'
import './Node.css'

const Node = ({ node, grid, row, col, setGrid, mouseIsDown, setMouseIsDown }) => {

    const extraClassName = node.startNode ? 'start-node' : node.endNode ? 'end-node' : ''

    const mouseDown = (row, col) => {
        if (node.startNode || node.endNode) return
        setMouseIsDown(true)
        const tempGrid = [...grid]
        tempGrid[row][col].isBarrier = true
        setGrid(tempGrid)
    }

    const mouseEnter = (row, col) => {
        if (!mouseIsDown || node.startNode || node.endNode) return
        const tempGrid = [...grid]
        tempGrid[row][col].isBarrier = true
        setGrid(tempGrid)
        console.log('MOUSE ENTERED WHILE DOWN')
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
            className={'row-' + node.row + '-col-' + node.col + ' node ' + extraClassName + ' ' + isBarrier + ' ' + isPath}>
        </div>
    )
}

export default Node   