window.books = [];

// 1《致王震書》
window.books[1] = {};
window.books[1].indexList = [
    "../yhnnd.wordpress.com/1-letters-to-patrick-wang-致王震書/2024.07.11.txt", /* 1 */
    "../yhnnd.wordpress.com/1-letters-to-patrick-wang-致王震書/2024.07.17.txt", /* 2 */
];

// 2《王震來信》
window.books[2] = {};
window.books[2].indexList = [
];

// 3《出路 5》
window.books[3] = {};
window.books[3].indexList = [
    "../yhnnd.wordpress.com/3-diary-2024-07-2024-12-出路5/2024.07.11.txt",
    "../yhnnd.wordpress.com/3-diary-2024-07-2024-12-出路5/2024.07.14.txt",
    "../yhnnd.wordpress.com/3-diary-2024-07-2024-12-出路5/2024.07.15.txt",
    "../yhnnd.wordpress.com/3-diary-2024-07-2024-12-出路5/2024.07.16.txt",
    "../yhnnd.wordpress.com/3-diary-2024-07-2024-12-出路5/2024.07.17.txt",
];

// [{
//     title: 'Read 05.21',
//     url: 'book-reader.html?src=../yhnnd.wordpress.com/17-diary-2024-01-2024-12-出路4/2024.05.21.txt',
//     start: '2024-05-21'
// }, {
//     title: 'Read 05.22',
//     url: 'book-reader.html?src=../yhnnd.wordpress.com/17-diary-2024-01-2024-12-出路4/2024.05.22.txt',
//     start: '2024-05-22'
// }, {
//     title: 'Read 05.24',
//     url: 'book-reader.html?src=../yhnnd.wordpress.com/17-diary-2024-01-2024-12-出路4/2024.05.24.txt',
//     start: '2024-05-24'
// }, {
//     title: 'Read 05.27',
//     url: 'book-reader.html?src=../yhnnd.wordpress.com/17-diary-2024-01-2024-12-出路4/2024.05.27.txt',
//     start: '2024-05-27'
// }, {
//     title: 'Read 06.01',
//     url: 'book-reader.html?src=../yhnnd.wordpress.com/17-diary-2024-01-2024-12-出路4/2024.06.01.txt',
//     start: '2024-06-01'
// }]

const calendarEvents = [];
for (const book of window.books) {
    if (book === undefined || book.indexList === undefined || !book.indexList.length) {
        continue;
    }
    for (const url of book.indexList) {
        const filename = url.split("/").pop();
        const segments = filename.split(".");
        let Year = 0, Month = 0, MonthDay = 0;
        if (segments.length > 3) {
            Year = segments[0];
            Month = segments[1];
            if (segments[2].includes("-")) {
                segments[2] = segments[2].split("-")[0];
            }
            MonthDay = segments[2];
        } else if(segments[0].includes("-")) {
            const fragments = segments[0].split("-");
            if (fragments.length >= 3) {
                Year = fragments[0];
                Month = fragments[1];
                MonthDay = fragments[2];
            } else {
                continue;
            }
        } else {
            continue;
        }
        if (isNaN(parseInt(Year)) || isNaN(parseInt(Month)) || isNaN(parseInt(MonthDay))) {
            continue;
        }
        if (!(parseInt(Year) > 0 && parseInt(Month) > 0 && parseInt(MonthDay) > 0)) {
            continue;
        }
        calendarEvents.push({
            title: "Read " + Month + "." + MonthDay,
            url: "book-reader.html?src=" + url,
            start: Year + "-" + Month + "-" + MonthDay
        });
    }
}
window.calendarEvents = calendarEvents;