/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path: string, tag: string) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

// This is used in the devtools panel to only accept messages from the current tab
// @ts-expect-error TODO: Fix type
let tabId = undefined;

// Only inject the fetch patch script when the START_RECORDING message
// is received from the devtools panel

chrome.runtime.onMessage.addListener(function (request) {
  if (request.type === "START_RECORDING") {
    // Store the tabId so that the devtools panel can filter messages to
    // only show the ones from the current tab
    tabId = request.tabId;

    injectScript(chrome.runtime.getURL("assets/fetch-patch.js"), "body");
  }

  return true;
});

// This code passes along events from fetch-patch to the devtools panel
window.addEventListener(
  "message",
  function (event) {
    // We only accept messages from this window to itself [i.e. not from any iframes]
    if (event.source != window) {
      return;
    }

    if (event.data.type && event.data.type == "RSC_CHUNK") {
      // @ts-expect-error TODO: Fix type
      chrome.runtime.sendMessage({ ...event.data, tabId });
    }
  },
  false,
);

// When the content script is unloaded (like for a refresh), send a message to the devtools panel to reset it
window.addEventListener("beforeunload", () => {
  // @ts-expect-error TODO: Fix type
  chrome.runtime.sendMessage({ type: "CONTENT_SCRIPT_UNLOADED", tabId });
});
