function getProductName(path) {
    return path.split("/").slice(0, -1).pop()
}

function productDescription(productPath) {
    var productName = getProductName(productPath)
    var xhr_file = new XMLHttpRequest();
    xhr_file.open("HEAD", productPath + productName + ".zip", true);
    xhr_file.onreadystatechange = function () {
        if (xhr_file.readyState == 4 && xhr_file.status == 200) {
            document.getElementsByName(productName + "_size")[0].innerHTML = "<strong>Size:</strong> " + (xhr_file.getResponseHeader('Content-Length') / (1024 * 1024)).toFixed(2) + " mb";
        }
    };
    xhr_file.send(null);
    var xhr_version = new XMLHttpRequest();
    xhr_version.open("GET", productPath + "VERSION.txt", true);
    xhr_version.onreadystatechange = function () {
        if (xhr_version.readyState == 4 && xhr_version.status == 200) {
            document.getElementsByName(productName + "_version")[0].innerHTML = "<strong>Version:</strong> " + xhr_version.responseText;
        }
    };
    xhr_version.send(null);
}

function productShowDownloads(productPath, downloads) {
    if (downloads == undefined) {
        productReadDownloads(productPath, productShowDownloads)
    } else {
        document.getElementsByName(getProductName(productPath) + "_downloads")[0].innerHTML = "<strong>Downloads:</strong> " + downloads;
    }
}

function productReadDownloads(productPath, callBack) {
    var xhr_downloads = new XMLHttpRequest();
    xhr_downloads.open("GET", productPath + "DOWNLOADS.txt", true);
    xhr_downloads.onreadystatechange = function () {
        if (xhr_downloads.readyState == 4 && xhr_downloads.status == 200) {
            callBack(productPath, xhr_downloads.responseText);
        }
    };
    xhr_downloads.send(null);
}

function productDownload(productName) {
    customAlert("Downloading...", productName.replace("_", " ") + " has now started downloading.<br><br>Please read the INSTALL.txt or the installation instructions at the bottom of the page.");
    document.getElementById("installationDetails").scrollIntoView()
    //productUpdateDownloads(productPath);
    //productShowDownloads(productPath);
}

function productUpdateDownloads(productPath, downloads) {
    if (downloads == undefined) {
        productReadDownloads(productPath, productUpdateDownloads)
    } else {
        var xhr_updateDownloads = new XMLHttpRequest();
        xhr_updateDownloads.open("POST", productPath + "DOWNLOADS.txt", true);
        xhr_updateDownloads.send((parseInt(downloads) + 1).toString());
    }
}
