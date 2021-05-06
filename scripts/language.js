const pathParams = new URLSearchParams(window.location.search);
const paramLang = pathParams.get("lang");

var pathOrigin = window.location.origin;
const deployState = true;

if (pathOrigin == "http://localhost" || deployState == false)
    pathOrigin = `${pathOrigin}/sBotics_Projetos/tutorial`;
else pathOrigin = `${pathOrigin}/tutorial`;

const LangValidate = (lang) => {
    const langSystem = navigator.language;
    var replaceLang = langSystem.replace("-", "_");
    var langAvailable = ["pt_BR"];
    if (langAvailable.indexOf(lang) != -1) return lang;
    if (langAvailable.indexOf(replaceLang) != -1) return replaceLang;
    else return "en";
};

$("a").each(function() {
    var href = $(this).attr("href");
    const language = LangValidate(paramLang);
    if (href[0] != "#") $(this).attr("href", href + "?lang=" + language);
});

const TagController = (tagName, tagFunction) => {
    document.createElement(tagName);
    const tagInstances = document.getElementsByTagName(tagName);
    for (var i = 0; i < tagInstances.length; i++) tagFunction(tagInstances[i]);
};

const InnerTextLangCreateAdvanced = (textSplit, textLength, JSON) => {
    var text = "";
    for (let index = 0; index < textLength; index++) {
        const currentText = textSplit[index];
        const currentTextSubstr = currentText.substr(-2, 2);
        const currentTextReplace = currentText.replace("[{", "");
        var nextText = "";
        var nextTextSubstr = "";
        var nextTextReplace = "";
        if (textSplit[index + 1] != undefined && textSplit[index + 1] != "") {
            nextText = textSplit[index + 1];
            nextTextSubstr = nextText.substr(-nextText.length, 2);
            nextTextReplace = nextText.replace("}]", "");
        }
        if (index == 0) text = JSON[currentText];
        else if (currentTextSubstr == "[{" && nextTextSubstr == "}]") {
            text = text[`${currentTextReplace}:${nextTextReplace}`];
            index++;
            if (index == textLength) break;
        } else {
            text = text[currentText];
        }
    }
    return text;
};

const InnerTextLangCreateSimple = (textSplit, textLength) => {
    const firstIndex = textSplit[textLength - 2];
    const secondIndex = textSplit[textLength - 1];
    if (secondIndex != "") {
        var firstIndexReplace = firstIndex.replace("[{", "");
        var secondIndexReplace = secondIndex.replace("}]", "");
        var textIndexInner = `${firstIndexReplace}:${secondIndexReplace}`;
    }
    if (secondIndex.substr(-secondIndex.length, 2) == "}]")
        return textIndexInner;
    else return secondIndex;
};

const PositionController = (position, element, textInner) => {
    if (position == "left")
        element.innerHTML = `${textInner}${element.innerHTML}`;
    else if (position == "right")
        element.innerHTML = `${element.innerHTML}${textInner}`;
    else element.innerHTML = textInner;
};

const Language = (elementTag) => {
    var loadLang = LangValidate(paramLang);
    var textTag = elementTag.attributes.text.value;
    try {
        var positionTag = elementTag.attributes.position.value;
    } catch (error) {
        var positionTag = "";
    }
    const textSplit = textTag.split(":");
    const textLength = textSplit.length;
    if (loadLang != "en") {
        $.getJSON(`${pathOrigin}/lang/${loadLang}.json`, function(JSON) {
            const textInner = InnerTextLangCreateAdvanced(
                textSplit,
                textLength,
                JSON,
            );
            if (textInner === undefined || textInner == "") {
                PositionController(
                    positionTag,
                    elementTag,
                    InnerTextLangCreateSimple(textSplit, textLength),
                );
            } else {
                PositionController(positionTag, elementTag, textInner);
            }
        });
    } else {
        PositionController(
            positionTag,
            elementTag,
            InnerTextLangCreateSimple(textSplit, textLength),
        );
    }
};
TagController("lang", Language);