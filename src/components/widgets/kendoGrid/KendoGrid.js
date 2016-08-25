// import/require dependencies
import kendo from 'kendo-ui-web/scripts/kendo.grid.min';
import React from 'react';
import ReactDOM from 'react-dom';

// create a React component, that is a wrapper for a Kendo UI widget
const KendoGrid = React.createClass({
    resizer() {
        var gridElement = this.widgetInstance.element;
        var dataArea = gridElement.find('.k-grid-content');
        var gridHeight = $(window).height() - 230 + 43;
        var otherElements = gridElement.children().not('.k-grid-content');
        var otherElementsHeight = 0;

        if ($(window).width() < 768) {
            gridHeight = gridHeight - 51;
        }

        otherElements.each(function() {
            otherElementsHeight += $(this).outerHeight();
        });

        var dataAreaHeight = gridHeight - otherElementsHeight;
        if (dataAreaHeight <= 300) {
            dataAreaHeight = 300;
        }
        dataArea.height(dataAreaHeight);
    },

    //component is in the DOM, so do stuff to it in this callback
    componentDidMount: function() {
        var self = this;

        //get, child element node for this component
        var elementNode = ReactDOM.findDOMNode(this);

        //determine if a selector was passed on which to invoke the KUI widget
        if (this.props.selector) {
            elementNode = elementNode.querySelector(this.props.selector);
        }

        //instantiate and save reference to the Kendo UI widget on elementNode
        //note I am not using jQuery plugin to instantiate, don't want to wait for namespace on $.fn
        this.widgetInstance = new kendo.ui.Grid(elementNode, this.props.options);

        this.resizer();

        $(window).resize(this.resizer);
    },

    //not called on inital render, but whenever parent state changes this is called
    componentWillReceiveProps: function(nextProps) {
        if (this.widgetInstance.setDataSource && nextProps.options.dataSource) {
            this.widgetInstance.setDataSource(nextProps.options.dataSource);
        }
    },

    //don't run render again, create widget once, then leave it alone
    shouldComponentUpdate: function() {
        return false;
    },

    //destory it, when the component is unmouted
    componentWillUnmount: function() {
        $(window).off('resize', this.resizer);
        this.widgetInstance.destroy();
    },

    //use the passed in React nodes or a plain <div> if no React child nodes are defined
    render: function() {
        return this.props.children ? this.props.children : <div /> ;
    }
});

//export the wrapped component
export default KendoGrid
