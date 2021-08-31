console.log('---content script loaded---');

// console.log("PageURL");
// console.log(PageURL);
// let allBookmarks = [];
var PageURL = window.location.href;
chrome.runtime.sendMessage({ PageURL });
document.addEventListener("visibilitychange", event => {
    if (document.visibilityState == "visible") {
        console.log("tab is active")
        console.log(PageURL);
        chrome.runtime.sendMessage({ PageURL });
    } else {
        console.log("tab going inactive")
        // var PageURL = window.location.href;
        console.log(PageURL);
        chrome.runtime.sendMessage({ PageURL });
    }
})

//  deletiion function
// function deletingItem(idx) {
//     function updateDeletion(array) {
//         let objToAdd = { url: PageURL, name: bookName }
//         array.push(objToAdd);
//         chrome.storage.sync.set({
//             list: array
//         }, function () {
//             console.log("added to list with new values");
//         });
//     }
//     chrome.storage.sync.get({ list: [] }, function (items) {
//         items.list.splice(idx, 1);
//         updateDeletion(items.list)
//         // console.log("items in stirage");
//         // console.log(items.list);
//     });
// }

chrome.storage.sync.get(function (result) {
    if (result.list == null || result.list.length === 0) {
        console.log('list is null');
        null;
    } else {
        console.log("result.list[i]");
        for (let i = 0; i < result.list.length; i++) {
            console.log(result.list[i]);
            var divTag = document.createElement("DIV");
            var aTag = document.createElement('a');
            aTag.setAttribute('href', result.list[i].url);
            aTag.setAttribute('target', "_blank");
            aTag.appendChild(document.createTextNode(result.list[i].name));
            divTag.appendChild(aTag);
            document.getElementById("lists").appendChild(divTag);
        }
    }
})

// deletingItem();