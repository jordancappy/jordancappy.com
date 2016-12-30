function setup() {
  document.body.classList = 'spider-man';
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change',changeEvent);
  }
  document.getElementsByTagName('form')[0].addEventListener('submit', characterSubmit);
}

function changeEvent(e) {
  document.body.classList = e.target.value;
}

function characterSubmit(e) {
  e.preventDefault();
  var classes = document.body.classList;
  document.body.classList = classes + ' submit';
  if (classes.length > 5)
    document.body.classList = classes + ' gotme';
  setTimeout(removeSubmit, 4000);
}

function removeSubmit() {
  document.body.classList = document.body.classList[0];
}

window.onload = setup;