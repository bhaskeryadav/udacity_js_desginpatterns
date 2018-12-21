var cats = [
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "meow",
    clickCount: 0
  },
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "meow2",
    clickCount: 0
  },
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "meow3",
    clickCount: 0
  },
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "meow4",
    clickCount: 0
  }
];

var labelPrefix = "-lbl";
var options = "";

$(document).ready(function() {
  $("#select_cats").MultiSelect({
    size: 5,
    css_class_selected: "test-selection"
  });

  cats.forEach((cat, index) => {
    options += "<OPTION value = '" + index + "' > " + cat.name + "</OPTION>";
  });

  $("#select_cats").change(() => {
    console.log($("#select_cats").val());
    clearCatsTable();
    let selectArray = $("#select_cats").val();
    selectArray
      .filter((cat, index) => index < selectArray.length - 1)
      .forEach((cat, index) => {
        renderCats(cats[cat]);
      });
  });

  $("#select_cats").append(options);

  $("#cats").on("click", ".cat-image", e => {
    console.log("clickedd");
    let lastCount = Number($("#" + e.target.id + labelPrefix).text());
    $("#" + e.target.id + labelPrefix).text(++lastCount);
  });
});

function renderCats(cat) {
  let imageTag =
    '<img  src="' + cat.img + '" id ="' + cat.name + '" class="cat-image">';

  let nameTd = "<td>" + imageTag + "</td>";
  let imgTd = "<td>" + cat.name + "</td>";
  let clickTd =
    "<td>" + '<label id="' + cat.name + labelPrefix + '">0</label>' + "</td>";
  let catTr = "<tr>" + imgTd + nameTd + clickTd + "</tr>";
  $("#cats tbody").append(catTr);
}

function clearCatsTable() {
  $("#cats tbody").empty();
}
