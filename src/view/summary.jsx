import React from 'react';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Svg from 'd3-svg';
import * as d3Shape from 'd3-shape';
import './summary.css';

const width = 100,
    height = 100,
    radius = Math.min(width, height) / 2;

const color = d3Scale.scaleOrdinal()
    .range(["red", "blue", "green", "brown", "cyan"]);

const arc = d3Shape.arc()
    .outerRadius(radius * .8)
    .innerRadius(radius* .3);

const pie = d3Shape.pie()
    .sort(null)
    .value(d => 
        d.val
    );

export default class Summary extends React.PureComponent {

    constructor(props) {
        super(props);
    }
    onRef = (svgG) => {
        this.svgG = svgG;
    }

    d3render() {
        let keys = Object.keys(this.props.summary);
        const values  = keys.map(k => ({name: k, val: this.props.summary[k]}));
        let paths = d3.select(this.svgG).selectAll('path').data(pie(values));
        paths.exit().remove();
        paths.enter()
            .append('path')
            .merge(paths)
            .attr('d', arc)
            .style('fill', function(d) { 
                return color(d.data.name); 
            });
        
        let txts = d3.select(this.svgG).selectAll('text').data(pie(values));
        txts.exit().remove();
        txts.enter().append('text')
            .style('color', 'blue')
            .merge(txts)
            .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.name; });

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
            <div>
                {keys.map(p => (<div><span>{p}:</span><span>{this.props.summary[p]}</span></div>))}
                <svg width={width} height={height} >
                    <g ref={this.onRef} transform={`translate(${radius} ${radius})`}></g>
                </svg>
            </div>
        );
    }
}
