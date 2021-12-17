export const cytoscapeStyle = [
    {
        selector: 'node',
        style: {
            width(ele) { return ele == null ? 55 : ele.data('size'); },
            height(ele) { return ele == null ? 55 : ele.data('size'); },
            label(ele) { return ele.data('id'); },
            'background-color': function (ele) { return ele.data('backgroundColor'); },
            'border-width': '3px',
            'border-color': function (ele) { return ele.data('borderColor'); },
            'border-opacity': 0.7,
            'text-valign': 'center',
            'text-halign': 'center',
            color(ele) { return ele.data('fontColor'); },
            'font-size': '10px',
            'text-wrap': 'ellipsis',
            'text-max-width': function (ele) { return ele.data('size'); },
        }
    },
    {
        selector: 'node:selected',
        style: {
            'border-color': '#0f62fe',
        }
    },
    {
        selector: 'edge',
        style: {
            width(ele) { return ele.data('size'); },
            label(ele) { return ele.data('label'); },
            'text-background-color': '#FFF',
            'text-background-opacity': 1,
            'text-background-padding': '3px',
            'line-color': function (ele) { return ele.data('backgroundColor'); },
            'curve-style': 'bezier',
            color(ele) { return ele.data('fontColor'); },
            'font-size': '10px',
            'text-rotation': 'autorotate',
        },
    }
]