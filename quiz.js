 //JS for Quiz functions 

// Grade on submit event
document.getElementById('quizForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var score = 0;
  var total = 10; // Q1 = 3pts Q2..Q4 = 1 pt each, Q5 = 4pts

  // clear old feedback
  clearBlock('fb1');
  clearBlock('fb2');
  clearBlock('fb3');
  clearBlock('fb4');  
  clearBlock('fb5');
  clearOverall();

  // Q1 (case-insensitive)
  var a1 = document.getElementById('q1').value;
  var ok1 = a1.trim().toLowerCase() === 'hypertext transfer protocol';
  if (ok1) {
    score += 3; // worth 3 points
    setGood('fb1', 'Correct (3/3). HyperText Transfer Protocol.');
  } else {
    setBad('fb1', 'Incorrect (0/3). Answer: HyperText Transfer Protocol.');
  }

  // Q2
var a2 = readRadio('q2');
if (a2 === 'tls') {
  score += 1; // worth 1 point
  setGood('fb2', 'Correct (1/1). HTTPS uses TLS.');
} else {
  setBad('fb2', 'Incorrect (0/1). HTTPS uses TLS to encrypt data.');
}

// Q3
var a3 = readRadio('q3');
if (a3 === 'cache-control') {
  setGood('fb3', 'Correct (1/1). Cache-Control defines caching rules.');
  score += 1; // worth 1 point
} else {
  setBad('fb3', 'Incorrect (0/1). Answer: Cache-Control.');
}

// Q4
var a4 = readRadio('q4');
if (a4 === '2') {
  score += 1; // worth 1 point
  setGood('fb4', 'Correct (1/1). HTTP/2 added multiplexing.');
} else {
  setBad('fb4', 'Incorrect (0/1). Answer: HTTP/2.');
}

// Q5 Multiple Select (Partial credit for each right answer)
var picked = readChecks('q5'); // array of values 
var correctSet = ['GET', 'PUT', 'DELETE', 'HEAD'];
var pointsQ5 = 0;

// +1 for each correct method that was selected
for (var i = 0; i < correctSet.length; i++) {
  if (arrayHas(picked, correctSet[i])) {
    pointsQ5 += 1;
  }
}

// add to total score 
score += pointsQ5;

if (pointsQ5 === 4) {
  setGood('fb5', 'Correct (4/4): GET, PUT, DELETE, HEAD.');
} else {
  setBad('fb5', 'Partial (' + pointsQ5 + '/4). Correct set: GET, PUT, DELETE, HEAD.');
}


  // overall box 
  var passed = (score >= 7);
  var box = document.getElementById('overall');
  box.textContent = 'Score: ' + score + ' / ' + total + ' — ' + (passed ? 'PASS' : 'FAIL');
  box.className = 'overall ' + (passed ? 'correct' : 'false');
});

// Reset clears inputs and feedback
document.getElementById('resetBtn').addEventListener('click', function () {
  document.getElementById('quizForm').reset();
  clearBlock('fb1');
  clearBlock('fb2');
  clearBlock('fb3');
  clearBlock('fb4');
  clearBlock('fb5');
  clearOverall();
});

// Helper functions for setting feedback and overall score
function setGood(id, msg) {
  var el = document.getElementById(id);
  el.textContent = msg;
  el.className = 'feedback correct';
}
function setBad(id, msg) {
  var el = document.getElementById(id);
  el.textContent = msg;
  el.className = 'feedback false';
}
function clearBlock(id) {
  var el = document.getElementById(id);
  el.textContent = '';
  el.className = 'feedback';
}
function clearOverall() {
  var box = document.getElementById('overall');
  box.textContent = '';
  box.className = 'overall';
}
function readRadio(name) {  // Read the chosen radio value by group name (returns null if none picked)
  var nodes = document.getElementsByName(name);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) return nodes[i].value;
  }
  return null;
}
function readChecks(name) {
  var out = [];
  var nodes = document.getElementsByName(name);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) out.push(nodes[i].value);
  }
  return out;
}

function arrayHas(arr, value) {     // simple index
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true;
  }
  return false;
}