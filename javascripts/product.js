function productDescription(product_name) {
    var xhr_file = new XMLHttpRequest();
    xhr_file.open("HEAD", "products/" + product_name + "/" + product_name + ".zip", true);
    xhr_file.onreadystatechange = function(){
      if (xhr_file.readyState == 4 && xhr_file.status == 200) {
            document.getElementsByName(product_name + "_size")[0].innerHTML = "<strong>Size:</strong> " + (xhr_file.getResponseHeader('Content-Length') / (1024 * 1024)).toFixed(2) + " mb";
      }
    };
    xhr_file.send(null);
    var xhr_version = new XMLHttpRequest();
    xhr_version.open("GET", "products/" + product_name + "/" + "VERSION.txt", true);
    xhr_version.onreadystatechange = function(){
      if (xhr_version.readyState == 4 && xhr_version.status == 200) {
            document.getElementsByName(product_name + "_version")[0].innerHTML = "<strong>Version:</strong> " + xhr_version.responseText;
      }
    };
    xhr_version.send(null);
}

function productReadDownloads(product_name) {
    var xhr_downloads = new XMLHttpRequest();
    xhr_downloads.open("GET", "products/" + product_name + "/" + "DOWNLOADS.txt", true);
    xhr_downloads.onreadystatechange = function(){
      if (xhr_downloads.readyState == 4 && xhr_downloads.status == 200) {
            document.getElementsByName(product_name + "_downloads")[0].innerHTML = "<strong>Downloads:</strong> " + xhr_downloads.responseText;
      }
    };
    xhr_downloads.send(null);
}

function productDownload(product_name) {
    alert(product_name.replace("_", " ") + " will now start downloading.\nPlease read INSTALL.txt or the installation instructions at the bottom of the page.");
    autoScrollTimer(Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - document.documentElement.clientHeight);
    productWriteDownloads(product_name);
    productReadDownloads(product_name);
}

function productWriteDownloads(product_name) {
    var xhr_updateDownloads = new XMLHttpRequest();
    xhr_updateDownloads.open("POST", "products/" + product_name + "/" + "DOWNLOADS.txt", true);
    var value1 = document.getElementsByName(product_name + "_downloads")[0].innerHTML;
    var value2 = value1.replace("<strong>Downloads:</strong> ", "");
    var value3 = (parseInt(value2) + 1);
    var value = value3.toString();
    xhr_updateDownloads.send(value);
}