var x = 1;
sidecolbuttoncolors = ["white", "rgb(243, 120, 37)"];
$(function () {
  if ($(document).width() < 768) {
    x = 1;
  } else {
    x = 0;
  }
  $(".sidecolbutton").css({ color: sidecolbuttoncolors[x] });
  x++;
  x %= 2;
});
$(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar,#content").toggleClass("active");
    $(".sidecolbutton").css({ color: sidecolbuttoncolors[x] });
    x++;
    x %= 2;
  });
});

var cd_command = `<h4 style="color: white">cd<br>Usage : cd [dir]<br>Navigate between directories using this command<br></h4>`;
var ls_command = `<h4 style="color: white">ls<br>Usage : ls [dir]<br>List all the files present in dir<br>By default, ls lists files of the present working directory</h4>`;
var clear_command = `<h4 style="color: white">clear<br>Usage : clear<br>Clear contents of the screen</h4>`;
var help_command = `<h4 style="color: white">help<br>Usage : help<br>Displays all the possible commands along with their usages.</h4>`;
var currentfolder = "/";
var dict1 = {
  "/": ["projects/", "skills/", "about/", "hacks/"],
  "/projects/": [
    "C-Shell",
    "Job Application Portal",
    "River Crossing Game",
    "CollegeNet",
    "Hit Bricks",
    "Genetic Algorithms",
  ],
  "/skills/": [
    "HTML",
    "CSS",
    "JavaScript",
    "Bootstrap",
    "jQuery",
    "Java",
    "Python",
    "SQL",
    "C",
    "C++",
    "Flask",
    "Flutter",
    "Firebase",
    "Bash",
    "Pygame",
    "Docker",
  ],
  "/about/": [
    "I am Arth Raj, sophomore at International Institute of Information Technology, Hyderabad.",
    "I grew up in Lucknow and did my schooling from City Montessori School.",
    "I love to code and my keen interest is in competitive programming and networking.",
    "Not much here but will try to add more in the future :)",
  ],
  "/hacks/": ["Have to add stuff here", "Come back later."],
};
$(document).on("keypress", "input", function (e) {
  if (e.which == 13) {
    var x = document.getElementById("textinput").value;
    document.getElementById("textinput").value = "";
    if (x == "help") {
      document.getElementById("instructions").innerHTML = [
        cd_command,
        ls_command,
        clear_command,
        help_command,
      ].join("<br>");
    } else if (x.startsWith("ls")) {
      g = x.split(" ");
      if (g.length == 1) {
        g.push(".");
      }
      if (g[1] == ".") {
        var x = "";
        for (var i = 0; i < dict1[currentfolder].length; i++) {
          x += `<h4 style="color: white">${dict1[currentfolder][i]}</h4>`;
        }
        document.getElementById("instructions").innerHTML = x;
      }
    } else if (x.startsWith("cd")) {
      g = x.split(" ");
      if (g.length == 1) {
        currentfolder = "/";
        document.getElementById("cf").innerHTML = currentfolder;
        document.getElementById("instructions").innerHTML = "";
      } else {
        if (g[1] == "..") {
          currentfolder = "/";
          document.getElementById("cf").innerHTML = currentfolder;
          document.getElementById("instructions").innerHTML = "";
        } else if (dict1[currentfolder].includes(g[1]) == false) {
          document.getElementById(
            "instructions"
          ).innerHTML = `<h4 style="color: red">Invalid Directory</h4>`;
        } else {
          currentfolder = `/${g[1]}`;
          document.getElementById("cf").innerHTML = currentfolder;
          document.getElementById("instructions").innerHTML = "";
        }
      }
    }
  }
});
var descList = ["Developer", "Sport Programmer", "ML Enthusiast"];
var curr = 0;
var currIdx = 0;
var interval;
var currEle = document.querySelector(".maintxt");
var cursorEle = document.querySelector("#main_cursor");

interval = setInterval(type, 70);

function type() {
  var text = descList[curr].substring(0, currIdx + 1);
  currEle.innerHTML = text + `<span id="main_cursor"></span>`;
  currIdx++;
  if (text === descList[curr]) {
    clearInterval(interval);
    setTimeout(function () {
      interval = setInterval(backspace, 40);
    }, 1000);
  }
}

function backspace() {
  var text = descList[curr].substring(0, currIdx - 1);
  currEle.innerHTML = text + `<span id="main_cursor"></span>`;
  currIdx--;
  if (text === "") {
    clearInterval(interval);
    if (curr == descList.length - 1) curr = 0;
    else curr++;
    currIdx = 0;
    setTimeout(function () {
      cursorEle.style.display = "inline-block";
      interval = setInterval(type, 70);
    }, 200);
  }
}
