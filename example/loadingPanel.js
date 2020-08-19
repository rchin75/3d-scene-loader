/**
 * Dynamic generation of a simple loading window with a progress bar.
 * @param canvasID Optional canvas ID. If provided the loading window will be rendered inside the canvas DIV.
 * @returns {{onProgress: onProgress}} An onProgress function to pass to createScene().
 */
export default function generateLoadingPanel (canvasID) {
    generateCSS(canvasID);
    generateHTML(canvasID);
    return {
        onProgress: onProgress
    };
}

/**
 * Generates the CSS for the loading panel.
 * @param canvasID Optional canvas ID.
 */
function generateCSS(canvasID) {
    const style = document.createElement('style');
    //Deprecated: style.type = 'text/css';
    let inner = '';
    if (canvasID) {
        inner += `
        #progressWindowOuterContainer {
            box-sizing: border-box;
            position: absolute;
            overflow: visible;
            width: 100%;
            height: 0px;
            margin: 0;
            padding: 0;
        }
        `;
    } else {
        inner += `
        #progressWindowOuterContainer {
            box-sizing: border-box;
            position: fixed;
            overflow: visible;
            width: 100%;
            height: 0px;
            margin: 0;
            padding: 0;
        }
        `;
    }

    inner += `
    #progressWindow {
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 130px;
        top: 50px;
        margin-left: auto;
        margin-right: auto;
        background-color: black;
        color: white;
        border: 1px solid #cccccc;
        padding: 10px;
    }
    
    #progressWindowHeader {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 10px;
    }
    
    #progressBar {
        box-sizing: border-box;
        width: 100%;
        height: 16px;
        background-color: #aaaaaa;
        border: 1px solid #666666;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    #progressBarPercentage {
        box-sizing: border-box;
        width: 0%;
        height: 14px;
        background-color: #00ee00;
        overflow: hidden;
    }
    
    #progressLogPanel {
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        border: 1px solid #666666;
        overflow: auto;
        padding: 5px;
        font-size: 12px;
    }
    `;
    style.innerHTML = inner;
    document.getElementsByTagName('head')[0].appendChild(style);
}

/**
 * Generates the HTML for the loading panel.
 * @param canvasID Optional canvas ID.
 */
function generateHTML(canvasID) {
    const div = document.createElement('div');
    div.id = 'progressWindowOuterContainer';
    div.innerHTML = `
        <div id="progressWindow">
            <div id="progressWindowHeader">Loading scene ...</div>
            <div id="progressBar">
                <div id="progressBarPercentage"></div>
            </div>
            <div id="progressLogPanel"></div>
        </div>
    `;
    if (canvasID) {
        document.getElementById(canvasID).appendChild(div);
    } else {
        document.getElementsByTagName('body')[0].appendChild(div);
    }

}

/**
 * Updates the progress info.
 * @param progress Progress object from the scene generator.
 */
function onProgress(progress) {
    const progressPercentage = (progress.percentage * 100) + "%";

    // Updates the progress bar.
    const progressBar = document.getElementById( 'progressBarPercentage' );
    progressBar.style.width = progressPercentage;

    // Update the log panel.
    const logPanel = document.getElementById( 'progressLogPanel' );
    if (progress.errors.length > 0) {
        logPanel.innerHTML = 'Failed to load some models.<br> See developer console for details.';
        progressBar.style.backgroundColor = '#aa0000';
    } else {
        logPanel.innerHTML = 'Loaded: ' + progressPercentage;
    }

    // Hide after everything has been loaded.
    if (progress.done) {
        //console.log(progress);
        const timeout = progress.errors.length === 0 ? 2000 : 5000;
        setTimeout(() => {
            document.getElementById('progressWindow').style.display = 'none';
        }, timeout)
    }
}