chrome.bookmarks.onCreated.addListener(function (id, bookmark) {
    var timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var logMessage = '[' + timestamp + '] "' + bookmark.title + '" "' + bookmark.url + '"';
    console.log(logMessage);
    createAndDownloadFile(logMessage, "bookmark " + timestamp + ".txt");
});


function createAndDownloadFile(content, filename) {
    // 파일을 생성하기 위한 Blob 객체 생성
    const blob = new Blob([content], { type: 'text/plain' });

    // 다운로드 링크 생성
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.style.display = 'none';

    // 다운로드 링크를 문서에 추가하고 클릭 이벤트를 트리거하여 다운로드 시작
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 다운로드가 완료된 후 다운로드 링크와 Blob 객체를 정리
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
}