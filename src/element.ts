export const crElem = document.createElement.bind(document);
export const getElem = document.getElementById.bind(document);

var jcAlertHolder = crElem("div");
jcAlertHolder.id = "jcholder";
document.body.appendChild(jcAlertHolder);

export var curAlert: HTMLDivElement | null = null;

export function createJCAlert(...text: string[]) {
    curAlert?.remove();
    curAlert = crElem("div");
    curAlert.className = "jcAlert";

    for(const str of text) {
        const textElem = crElem("p");
        textElem.textContent = str;
        textElem.className = "jcText";

        curAlert.appendChild(textElem);
    }

    const pc = crElem("div");
    pc.className = "privC";
    const privacy = crElem("a");
    privacy.className = "privacy";
    privacy.textContent = "privacy";
    privacy.href = "https://justclientserver.justgamer101.repl.co/privacy";
    privacy.target = "blank";
    pc.appendChild(privacy);

    curAlert.appendChild(pc);

    jcAlertHolder.appendChild(curAlert);
    jcAlertHolder.style.display = "block";
}

export function closeJCAlert(alElm: HTMLDivElement) {
    jcAlertHolder.style.display = "none";
    alElm.remove();
}

export function crAIdBtn(txt: string) {
    const accessIdSetBtn = crElem("button");
    accessIdSetBtn.className = "aIdSB";
    accessIdSetBtn.innerText = txt;
    return accessIdSetBtn;
}