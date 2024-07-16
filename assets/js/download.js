document.addEventListener('DOMContentLoaded', function() {

    let alias = location.hash.substring(1);

    switch (alias) {
        case "test":
            fname = "testdoc.txt";
            fpath = "files/testdoc.txt";
            break;

        case "duolingo-torture":
            fname = "duolingo-torture-main.zip";
            fpath = "files/duolingo-torture-main.zip";
            break;

        default:
            fname = "no valid file specified.";
            break;
    }

    try {
        download(fpath, fname);
        document.getElementById("download-message").style.display = "block";
    } finally {
        document.getElementById("file-name").innerHTML = 'downloading <strong>' + fname + '</strong>...'
    }

});

function download(p, n) {
    const link = document.createElement("a");
    link.href = p;
    link.download = n;
    link.click();
    document.getElementById("manual-link").href = p;
}