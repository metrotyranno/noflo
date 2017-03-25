// Load the NoFlo interface
var noflo = require('noflo');
// Also load any other dependencies you have
var fs = require('fs');

// Implement the getComponent function that NoFlo's component loader
// uses to instantiate components to the program
exports.getComponent = function () {
  // Start by instantiating a component
  var c = new noflo.Component();

  // Provide some metadata, including icon for visual editors
  c.description = 'Log input';
  c.icon = 'file';

  // Declare the ports you want your component to have, including
  // their data types
  c.inPorts.add('in', {
    datatype: 'string'
  });
  c.outPorts.add('out', {
    datatype: 'string'
  });
  
  // Implement the processing function that gets called when the
  // inport buffers have packets available
  c.process(function (input, output) {
    // Precondition: check that the "in" port has a data packet.
    // Not necessary for single-inport components but added here
    // for the sake of demonstration
    if (!input.hasData('in')) {
      return;
    }

    output.send({
      out: input.getData('in')
    });
    output.done();
  });

  // Finally return to component to the loader
  return c;
};