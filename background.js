console.log('background running');
var PageURL;

function storeData() {
    var testArray = [];
    chrome.storage.sync.set({
        list: testArray
    }, function () {
        console.log("added to list");
    });
}

function updateData(bookName) {
    function update(array) {
        let objToAdd = { url: PageURL, name: bookName }
        array.push(objToAdd);
        // console.log("array of urls");
        // console.log(array);
        // console.log(PageURL);
        chrome.storage.sync.set({
            list: array
        }, function () {
            console.log("added to list with new values");
        });
    }
    chrome.storage.sync.get({
        list: []
    },
        function (data) {
            console.log("data.list");
            console.log(data.list);
            update(data.list);
        }
    );
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    PageURL = request.PageURL;
    console.log("setting PageURL");
    console.log(PageURL);
});
chrome.commands.onCommand.addListener(function (command) {
    // console.log("command");
    // console.log(command);
    if (command === "open") {
        let bookName = prompt("Shurtcut bookmark name? : ", "google");
        updateData(bookName);
        // alert("page bookmarked, key to access the url");
    } else if (command === "close") {
        null
    }
});

// deleting item
