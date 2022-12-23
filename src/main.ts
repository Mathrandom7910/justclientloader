import { crAIdBtn, createJCAlert, crElem, curAlert } from "./element";
import { loaderVersion } from "../version";
import * as STYLE from "./style.css";


const styleElm = crElem("style");
styleElm.setAttribute("type", "text/css");
styleElm.appendChild(document.createTextNode(STYLE.default));
document.head.appendChild(styleElm);

interface IData {
  version: string,
  
}

const jlDatKey = "jLDat";

(async function() {


  const jcServerURL = "https://justclientserver.justgamer101.repl.co/";

  const key = localStorage.getItem("jcKey");
  var data: { accessId: string | null, userId: string | null };
  if(!key?.startsWith("{")) {
    data = {
      accessId: key,
      userId: null
    }
  } else {
    const lDat = localStorage.getItem(jlDatKey);
    if(lDat) {
      data = JSON.parse(lDat);
    } else {
      data = {
        accessId: null,
        userId: null
      }
    }
  }
  
  function fetchJCServer(path: string) {
    return fetch(jcServerURL + path, {
      body: JSON.stringify(data),
      method: "POST",
    
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  
  const resp = await fetch(jcServerURL + "data");
  const json: IData = await resp.json();

  if(json.version != loaderVersion) {
    createJCAlert(`The current JustClient loader version (${loaderVersion}) is not compatible with version ${json.version}`, "Get the latest version here: ");
    const aElem = crElem("a");
    aElem.href = jcServerURL + "latest";
    aElem.className = "redir";
    aElem.innerText = "Latest Version";
    curAlert!.appendChild(aElem);
    return;
  }
  
  if(data.accessId == null) {
    createJCAlert("Welcome to JustClient!",
    "Please input your access code below:");
  
    const accessIdInput = crElem("input");
    accessIdInput.className = "aIdInput";
  
    curAlert!.appendChild(accessIdInput);
  
    // curAlert!.appendChild(crElem("br"));
    // curAlert!.appendChild(crElem("br"));
  
    const accessIdSetBtn = crAIdBtn("Okay!");
  
    accessIdSetBtn.onclick = (e) => {
      if(e.button != 0) return;
  
      data.accessId = accessIdInput.value;
  
      const keyVer: string | undefined = data.accessId.split(":")[1];
  
      if(!keyVer) {
        createJCAlert("Invalid access id given!");
        return;
      }
  
      fetchJCServer("auth")
      .then(r => r.json()
      .then((json: { error: boolean }) => {
        // console.log(json)
        if(json.error) {
          createJCAlert("Failed to verify your access id for JustClient",
          "Contact AbsoluteZero#0925 if you think this is a mistake");
  
          const accessIdSetBtn = crAIdBtn("Ok (reload)");
  
          accessIdSetBtn.onclick = (e) => {
            if(e.button != 0) return;
            location.reload();
          }
  
          curAlert!.appendChild(accessIdSetBtn);
        } else {
          createJCAlert("Code verified", "Welcome to JustClient!");
          localStorage.setItem(jlDatKey, JSON.stringify(data.accessId));
  
          const accessIdSetBtn = crAIdBtn("Load JustClient! (reload)");
  
          accessIdSetBtn.onclick = (e) => {
            if(e.button != 0) return;
            location.reload();
          }
  
          curAlert!.appendChild(accessIdSetBtn);
        }
      }));
    }
  
    curAlert!.appendChild(accessIdSetBtn);
    
  } else {
    fetchJCServer("justclient")
    .then(resp => {
      resp.text()
      .then(txt => {
        try {
          JSON.parse(txt);
          console.log("failed jc")
    
          //failed 
          createJCAlert("Failed to get JustClient!");
  
          const accessIdSetBtn = crAIdBtn("OK (reload)");
  
          accessIdSetBtn.onclick = (e) => {
            if(e.button != 0) return;
            location.reload();
          }
  
          curAlert!.appendChild(accessIdSetBtn);
  
          localStorage.removeItem("jcKey");
      
          return;
        } catch(e) {
        }
        
        const script = crElem("script");
    
        script.textContent = txt;
    
        document.body.appendChild(script);
      });
    });
  }

})();