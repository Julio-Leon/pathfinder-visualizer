import './Node.css'

const Node = ({ node }) => {

    const extraClassName = node.startNode ? 'start-node' : node.endNode ? 'end-node' : ''

    return (
        <div className={'node ' + extraClassName}></div>
    )
}

export default Node