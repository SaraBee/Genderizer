const f_default = "#730000";
const m_default = "#000873";
const n_default = "#125200";
const a_default = "#440052";

// Saves options to chrome.storage
function save_options() {
  var fcolor = document.getElementById('fcolor').value;
  var mcolor = document.getElementById('mcolor').value;
  var ncolor = document.getElementById('ncolor').value;
  var acolor = document.getElementById('acolor').value;
  chrome.storage.sync.set({
    femColor: fcolor,
    mascColor: mcolor,
    neutColor: ncolor,
    ambColor: acolor
  });
  chrome.tabs.reload();
}

// Reset to some legible defaults
function reset_options() {
  chrome.storage.sync.set({
    femColor: f_default,
    mascColor: m_default,
    neutColor: n_default,
    ambColor: a_default
  });
  restore_options();
  chrome.tabs.reload();
}

function restore_options() {
  chrome.storage.sync.get({
    femColor: f_default,
    mascColor: m_default,
    neutColor: n_default,
    ambColor: a_default
  }, function(items) {
    document.getElementById('fcolor').value = items.femColor;
    document.getElementById('mcolor').value = items.mascColor;
    document.getElementById('ncolor').value = items.neutColor;
    document.getElementById('acolor').value = items.ambColor;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('reset').addEventListener('click', reset_options);
