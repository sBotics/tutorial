const urlParams = new URLSearchParams(window.location.search);
const getLang = urlParams.get("lang");

var pathOrigin = window.location.origin;
const deploy = false;

if (pathOrigin == "http://localhost" || deploy == false) {
    pathOrigin = `${pathOrigin}/sBotics_Projetos/tutorial`;
}

const ControllerTag = (tagName, fn) => {
    document.createElement(tagName);
    var tagInstances = document.getElementsByTagName(tagName);
    for (var i = 0; i < tagInstances.length; i++) {
        fn(tagInstances[i]);
    }
};

const ValidationLang = () => {
    var langValid = ["pt_BR"];
    if (langValid.indexOf(getLang) != -1) return getLang;
    else return "en";
};

const Language = (element) => {
    const ValidLang = ValidationLang();
    var text = element.attributes.text.value;
    const l = text.split(":");
    if (ValidLang != "en") {
        $.getJSON(`${pathOrigin}/lang/${ValidLang}.json`, function(json) {
            var t = "";
            for (let i = 0; i < l.length; i++) {
                const e = l[i];
                if (i == 0) t = json[e]
                else t = t[e]
            }
            if (t === undefined || t == "") {
                element.innerHTML = l[l.length - 1];
            } else {
                element.innerHTML = t;
            }
        });
    } else {
        element.innerHTML = l[l.length - 1];
    }
};

ControllerTag("lang", Language);