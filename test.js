var facts = {"Sun is big", "Moon is white", "Clocks are round"};

function main() {
  var elem = document.getElementById("text");
  elem.innerHTML = facts[Math.floor(Math.random()*facts.length)];;
}

window.onload = function(){
  main();
};
