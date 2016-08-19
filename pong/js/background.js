chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('index.html', {
        bounds: {
            width: 1024,
            height: 640
        },
        minWidth: 1024,
        minHeight: 640,
        maxWidth: 1024,
        maxHeight: 640
    });
});