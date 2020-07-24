const f_default = "#730000";
const m_default = "#000873";
const n_default = "#125200";
const a_default = "#440052";

const toggle_element = document.querySelector('#ext-toggle')

toggle_element.querySelectorAll('span').forEach(x => {
  x.onclick = function () {
    changeToggle(setToggle(x.dataset.value))
  }
});

function changeToggle(newValue) {
  console.log(newValue);
  chrome.storage.sync.set({ext_active: newValue});
  chrome.tabs.reload();
}

function getToggle() {
  return toggle_element.querySelector('span.selected').dataset.value
}

function setToggle(value) {
  toggle_element.querySelectorAll('span').forEach(x => {
    x.classList.toggle('selected', x.dataset.value == value)
  });

  return value;
}

chrome.storage.sync.get(['ext_active'], function(result) {
  ext_active = result.ext_active;
  setToggle(ext_active);
});

// Saves options to chrome.storage
function saveOptions() {
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
  restoreOptions();
  chrome.tabs.reload();
}

function setOptionsBackground() {

}

// Reset to some legible defaults
function resetOptions() {
  chrome.storage.sync.set({
    femColor: f_default,
    mascColor: m_default,
    neutColor: n_default,
    ambColor: a_default
  });
  restoreOptions();
  chrome.tabs.reload();
}

function restoreOptions() {
  chrome.storage.sync.get({
    femColor: f_default,
    mascColor: m_default,
    neutColor: n_default,
    ambColor: a_default
  }, function(items) {
    document.getElementById('fcolor').value = items.femColor;
    document.getElementById('fcolor-label').style.color = items.femColor;

    document.getElementById('mcolor').value = items.mascColor;
    document.getElementById('mcolor-label').style.color = items.mascColor;

    document.getElementById('ncolor').value = items.neutColor;
    document.getElementById('ncolor-label').style.color = items.neutColor;

    document.getElementById('acolor').value = items.ambColor;
    document.getElementById('acolor-label').style.color = items.ambColor;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
