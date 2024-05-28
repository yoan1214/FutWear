document.addEventListener("DOMContentLoaded", function() {
   
    function includeHTML() {
        var elements = document.querySelectorAll('[include-html]');
        elements.forEach(elmnt => {
            var file = elmnt.getAttribute("include-html");
            if (file) {
       
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                        
                            elmnt.innerHTML = this.responseText;
                            elmnt.removeAttribute("include-html");
                            executeScripts(elmnt);
                        }
                        if (this.status == 404) {
                            console.error("Page not found: " + file);
                            elmnt.innerHTML = "Page not found.";
                        }
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
            }
        });
    }

    function executeScripts(container) {
        var scripts = container.querySelectorAll("script");
        scripts.forEach(oldScript => {
            var newScript = document.createElement("script");
            if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.onload = function() {
              
                };
            } else {
                newScript.textContent = oldScript.textContent;
              
            }
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    includeHTML();
});
