const urlParams = new URLSearchParams(window.location.search);
const getLang = urlParams.get("lang");

var pathOrigin = window.location.origin;
const deploy = true;

if (pathOrigin == "http://localhost" || deploy == false) {
    pathOrigin = `${pathOrigin}/sBotics_Projetos/tutorial`;
} else {
    pathOrigin = `${pathOrigin}/tutorial`;
}
console.log(pathOrigin);

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
    else {
        if (getLang != "" && getLang != null) return getLang;;
        const languageSystem = navigator.language;
        var replace_caracter = languageSystem.replace("-", "_");
        if (langValid.indexOf(replace_caracter) != -1) return replace_caracter;
        else return "en";
    }

};

$("a").each(function() {
    var href = $(this).attr("href");
    const language = ValidationLang();
    if (href[0] != "#") $(this).attr("href", href + "?lang=" + language);
});

const Language = (element) => {
    const ValidLang = ValidationLang();
    var text = element.attributes.text.value;
    try {
        var possitionInner = element.attributes.position.value;
    } catch (error) {
        var possitionInner = "";
    }
    const l = text.split(":");
    if (ValidLang != "en") {
        $.getJSON(`${pathOrigin}/lang/${ValidLang}.json`, function(json) {
            var t = "";
            for (let i = 0; i < l.length; i++) {
                const e = l[i];
                const n = l[i + 1];
                if (i == 0) t = json[e];
                else {
                    if (
                        e.substr(-2, 2) == "[{" &&
                        n.substr(-n.length, 2) == "}]"
                    ) {
                        const re = e.replace("[{", "");
                        const rn = n.replace("}]", "");
                        const te = `${re}:${rn}`;
                        t = t[te];
                        i++;
                        if (i == l.length) break;
                    } else {
                        t = t[e];
                    }
                }
            }
            if (t === undefined || t == "") {
                const ou = l[l.length - 2];
                const u = l[l.length - 1];

                if (u.substr(-u.length, 2) == "}]") {
                    const re = ou.replace("[{", "");
                    const rn = u.replace("}]", "");
                    const te = `${re}:${rn}`;
                    if (possitionInner == "left")
                        element.innerHTML = `${te}${element.innerHTML}`;
                    else if (possitionInner == "right")
                        element.innerHTML = `${element.innerHTML}${te}`;
                    else element.innerHTML = te;
                } else {
                    if (possitionInner == "left")
                        element.innerHTML = `${u}${element.innerHTML}`;
                    else if (possitionInner == "right")
                        element.innerHTML = `${element.innerHTML}${u}`;
                    else element.innerHTML = u;
                }
            } else {
                if (possitionInner == "left")
                    element.innerHTML = `${t}${element.innerHTML}`;
                else if (possitionInner == "right")
                    element.innerHTML = `${element.innerHTML}${t}`;
                else element.innerHTML = t;
            }
        });
    } else {
        const ou = l[l.length - 2];
        const u = l[l.length - 1];

        if (u.substr(-u.length, 2) == "}]") {
            const re = ou.replace("[{", "");
            const rn = u.replace("}]", "");
            const te = `${re}:${rn}`;
            if (possitionInner == "left")
                element.innerHTML = `${te}${element.innerHTML}`;
            else if (possitionInner == "right")
                element.innerHTML = `${element.innerHTML}${te}`;
            else element.innerHTML = te;
        } else {
            if (possitionInner == "left")
                element.innerHTML = `${u}${element.innerHTML}`;
            else if (possitionInner == "right")
                element.innerHTML = `${element.innerHTML}${u}`;
            else element.innerHTML = u;
        }
    }
};

ControllerTag("lang", Language);