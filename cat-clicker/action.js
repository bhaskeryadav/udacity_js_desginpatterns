var cats = [
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "meow",
    clickCount: 0
  },
  {
    img: "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
    name: "priti",
    clickCount: 0
  }
];

var labelPrefix = "-lbl";

$(document).ready(function() {
  cats.forEach(cat => {
    let imageTag =
      '<img  src="' + cat.img + '" id ="' + cat.name + '" class="cat-image">';

    let nameTd = "<td>" + imageTag + "</td>";
    let imgTd = "<td>" + cat.name + "</td>";
    let clickTd =
      "<td>" + '<label id="' + cat.name + labelPrefix + '">0</label>' + "</td>";
    let catTr = "<tr>" + imgTd + nameTd + clickTd + "</tr>";
    $("#cats tbody").append(catTr);
  });

  $(".cat-image").on("click", e => {
    console.log(e.target.id);
    let lastCount = Number($("#" + e.target.id + labelPrefix).text());
    $("#" + e.target.id + labelPrefix).text(++lastCount);
  });
});
