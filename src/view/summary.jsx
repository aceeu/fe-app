import React from 'react';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import './summary.css';

const height = 70;
const totalHeight = height + 40; // 40 labels
const step = 50;

const color = d3Scale.scaleOrdinal().range(["red", "blue", "green", "brown", "cyan"]);

export default class Summary extends React.PureComponent {
    onRef = svgG => this.svgG = svgG;

    d3render() {
        let keys = Object.keys(this.props.summary);
        const max = Math.max(...keys.map(k => this.props.summary[k]));
        const values  = keys.map(k => ({name: k, val: this.props.summary[k] / max * height}));
        let divs = d3.select(this.svgG).selectAll('rect').data(values);
        divs.exit().remove();
        divs.enter()
            .append('rect')
            .merge(divs)
            .attr('x', (d, i) => i * step)
            .attr('y', d => height - d.val)
            .attr('height', d => d.val)
            .attr('width', step - 5)
            .attr('fill', d => color(d.name))
            .html(d => `<title>${d.name}, ${this.props.summary[d.name]}</title>`);
        
        let texts = d3.select(this.svgG).selectAll('text').data(values);
        texts.exit().remove();
        texts.enter()
            .append('text')
            .merge(texts)
            .attr('x', (d, i) => i * step)
            .attr('y', (d, i) => height + 10 + (i % 2) * 10)
            .attr('class', 'summary--label')
            .text(d => d.name);
    }



    componentDidMount() {
        this.d3render();
    }

    componentDidUpdate() {
        this.d3render();
    }

    render() {
        let keys = Object.keys(this.props.summary);
        return (
            <div
                className={'summary'}
            >
                <svg width={keys.length * step} height={totalHeight} >
                    <g ref={this.onRef}></g>
                </svg>
            </div>
        );
    }
}
