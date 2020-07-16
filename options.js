console.log("oh hello");
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
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
	chrome.storage.sync.get(['femColor'], function(result) {
	          console.log('Value currently is ' + result.femColor);
	});
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    femColor: '#730000',
    mascColor: '#000873',
	neutColor: '#125200',
	ambColor: '#440052'
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
