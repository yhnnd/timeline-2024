/** Requires param.js */
/** Requires books-index.js */

const bookNames = window.bookNames;

const bookList = document.getElementsByClassName("book-list");
if (bookList.length) {
    for (const i in bookNames) {
        if (i > 0) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "book.html?book=" + i;
            link.innerHTML = "<span>" + i + "</span>";
            if (bookNames[i] === "致王震書") {
                link.innerHTML += '&nbsp;<span class="rounded-circle" style="display: inline-block; width: 1rem; height: 1rem; background: var(--studio-blue-50); position: relative; top: 3px;"></span>';
                link.innerHTML += '&nbsp;<span class="rounded-circle" style="display: inline-block; width: 1rem; height: 1rem; background: var(--studio-green-30); position: relative; top: 3px; left: -10px;"></span>';
            } else if (bookNames[i] === "王震來信") {
                link.innerHTML += '&nbsp;<span class="rounded-circle" style="display: inline-block; width: 1rem; height: 1rem; background: var(--studio-red-50); position: relative; top: 3px;"></span>';
                link.innerHTML += '&nbsp;<span class="rounded-circle" style="display: inline-block; width: 1rem; height: 1rem; background: var(--studio-yellow-30); position: relative; top: 3px; left: -10px;"></span>';
            }
            link.innerHTML += "&nbsp;<span>" + bookNames[i] + "</span>";
            listItem.append(link);
            if (window.books[i]?.indexList?.length) {
                listItem.innerHTML += "<div class='highlight-green' style='margin-left: 16px;'>(" + window.books[i].indexList.length + ")</div>";
            } else {
                listItem.innerHTML += "<div class='highlight-red' style='margin-left: 16px;'>(no text content)</div>";
            }
            bookList[0].append(listItem);
        }
    }
}

const bookNumber = getParameter("book");
const rawLink = document.getElementById("raw-link");
if (rawLink != undefined) {
    rawLink.href = "raw-" + bookNumber + ".html";
    rawLink.innerText = "pics of book " + bookNumber + "《" + bookNames[bookNumber] + "》";
}
const indexWrapper = document.getElementById("index-list");
if (indexWrapper != undefined) {
    const list = books[bookNumber]["indexList"];
    let html = "";
    let counter = 1;
    for (const {fakeUrl, realUrl} of list) {
        let link = realUrl;
        const nameSplit = fakeUrl.split("/");
        const filename = nameSplit.pop();
        const folder = nameSplit.pop();
        const folderAbbr = folder.split("-").shift() + ' ' + folder.split("-").pop();
        let iframeSrc = realUrl, previewSrc = realUrl;
        if (window.location.href.startsWith("file://")) {
        } else {
            link = "book-reader.html?src=" + link + "&fakeUrl=" + fakeUrl;
            iframeSrc = link + "&is-iframe=true";
            previewSrc = link + "&is-iframe=true&is-preview=true";
        }
        html += "<div class=\"item\" id=\"item-" + counter + "\" onmouseover=\"previewFile('" + link + "','" + previewSrc + "')\" onclick=\"openFile('" + link + "')\">";
        html += "<div class=\"cover\" data-folder=\"" + folderAbbr + '-' + counter++ + "\" data-filename=\"" + filename + "\"></div>";
        html += "<iframe src=\"" + iframeSrc + "\" scrolling=\"no\"></iframe>";
        html += "</div>";
    }
    indexWrapper.innerHTML = html;

    if (window.location.href.startsWith("file://")) {
        let element = document.getElementById("online");
        element.parentElement.removeChild(element);
        let style = document.createElement("style");
        style.innerText = `
.index-wrapper>.item>.cover::before {
background-color: rgba(84, 6, 3, .75);
}`;
        document.body.appendChild(style);
    }

    const loading = document.querySelector(".loading");
    runSyncFunctions(function () {
        loading.style.opacity = "1";
    }, function () {
        loading.style.transition = "opacity 1s";
    }, function () {
        loading.style.opacity = "0";
    });
    setTimeout(() => {
        loading.style.display = "none";
        loading.style.transition = null;
        loading.style.opacity = null;
    }, 1000);
}

function previewFile(link, iframeSrc) {
    /** link has navbar, iframeSrc has no navbar */
    if (localStorage.getItem("enable-file-preview") === "true") {
        const iframe = document.querySelector(".reader>iframe");
        iframe.setAttribute("data-link", link);
        iframe.src = iframeSrc;
    }
}

function openFile(link) {
    if (link == undefined) {
        link = document.querySelector(".reader>iframe").getAttribute("data-link");
    }
    if (!link) {
        return;
    }
    document.querySelectorAll("body > div").forEach(e => {
        if (e.classList.contains("loading")) {
            e.style.display = null;
        } else {
            e.remove();
        }
    });
    window.open(link, "_self");
}

let timelineHtml = "<div style='height: 25px;'></div>";
for (const i in bookNames) {
    if (i > 0) {
        const indexList = window.books[i].indexList;
        let time = '&nbsp;', begin = '', end = '';
        if (indexList.length > 0) {
            const segments = indexList[indexList.length - 1].fakeUrl.split("/");
            const val = segments[2].split('-');
            if (Number.isNaN(Number(val[2])) || Number.isNaN(Number(val[3]))) {
                begin = indexList[0].fakeUrl.split("/")[3].split(".").slice(0, 2).join(".");
                end = indexList[indexList.length - 1].fakeUrl.split("/")[3].split(".").slice(0, 2).join(".");
            } else {
                begin = val[2] + '.' + val[3];
                end = val[4] + '.' + val[5];
            }
            time = begin + ' - ' + end;
        }
        const url = "book.html?book=" + i;
        timelineHtml += "<div class=node onclick='openFile(\"" + url + "\")'><span><span>" + time + "</span></span></div>";
    }
}
const timeline = document.getElementById("timeline");
if (timeline) {
    timeline.innerHTML = timelineHtml;
}