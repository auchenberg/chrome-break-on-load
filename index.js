const CDP = require('chrome-remote-interface');

CDP((client) => {

    const {Debugger, DOMDebugger, Page } = client;

    console.log('DOMDebugger.setInstrumentationBreakpoint set')
    DOMDebugger.setInstrumentationBreakpoint({
        eventName: "scriptFirstStatement"
    })

    Debugger.scriptParsed((params) => {
        console.log(`Debugger.scriptParsed, scriptId ${params.scriptId}`, );
    });

    Debugger.paused((params) => {
        console.log(`Debugger.paused in scriptId ${params.callFrames[0].location.scriptId}`, );
        Debugger.resume();
    });

    Debugger.resumed((params) => {
        console.log('Debugger.resumed')
    })

    Debugger.enable();

}).on('error', (err) => {
    console.error(err);
});