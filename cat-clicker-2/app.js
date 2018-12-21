var model = {
  cats: [
    {
      img:
        "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
      name: "meow",
      clickCount: 0
    },
    {
      img:
        "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
      name: "meow2",
      clickCount: 0
    },
    {
      img:
        "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
      name: "meow3",
      clickCount: 0
    },
    {
      img:
        "https://93546-d-c.ooyala.com/content/images/1131/259836_636x357.jpg",
      name: "meow4",
      clickCount: 0
    }
  ],
  isAdminVisible: false,
  init: function() {
    this.isAdminVisible = false;
  }
};

var octopus = {
  currentCat: null,
  setCurrentCat: function(index) {
    this.currentCat = model.cats[index];
    catView.renderCat();
  },
  updateClickCount: function() {
    model.cats
      .filter(cat => cat === this.currentCat)
      .forEach(cat => {
        ++cat.clickCount;
      });
  },
  getAllCats: function() {
    return model.cats;
  },
  getCurrentCat: function() {
    return this.currentCat;
  },
  toogleAdmin: function() {
    model.isAdminVisible = !model.isAdminVisible;
    adminView.adminDiv.toggle();
  },
  saveCat: function(catName, catUrl, catClick) {
    this.currentCat.name = catName;
    this.currentCat.img = catUrl;
    this.currentCat.catClick = catClick;
  },
  init: function() {
    if (!this.currentCat) {
      console.log(this.currentCat);
      this.currentCat = this.getAllCats()[0];
    }
    model.init();
    listView.init();
    catView.init();
    adminView.init();
  }
};

var listView = {
  catsList: $("#select_cats"),
  renderList: function() {
    octopus.getAllCats().forEach((cat, index) => {
      let catList = '<li id="' + index + '">' + cat.name + "</li>";
      this.catsList.append(catList);
    });
  },
  init: function() {
    this.catsList.empty();
    this.renderList();
    this.catsList.on("click", e => {
      octopus.setCurrentCat(e.target.id);
    });
  }
};

var catView = {
  catViewId: $("#cats"),
  init: function() {
    this.renderCat();
    this.catViewId.on("click", ".cat-image", e => {
      octopus.updateClickCount();
      this.renderCat();
    });
  },
  renderCat: function() {
    if (octopus.currentCat) {
      let cat = octopus.getCurrentCat();
      let nameTd = "<span>" + cat.name + "</span>";
      let imageTag = '<img  src="' + cat.img + '" class="cat-image">';
      let clickTd =
        "<span>" + "<label >" + cat.clickCount + "</label>" + "</span>";
      let htmlTxt = nameTd + imageTag + clickTd;
      this.catViewId.html(htmlTxt);
    }
  }
};

var adminView = {
  adminDiv: null,
  adminBtn: null,
  saveBtn: null,
  init: function() {
    this.adminBtn = $("#admin-btn");
    this.adminDiv = $("#cat-admin");
    this.saveBtn = $("#save-cat");

    this.adminDiv.toggle();

    this.adminBtn.click(() => {
      this.toogleView();
    });
    this.saveBtn.click(() => {
      octopus.saveCat(
        $("#cat-name").val(),
        $("#cat-img-url").val(),
        $("#cat-clk").val()
      );
      catView.init();
      listView.init();
      this.toogleView();
    });
  },
  toogleView: function() {
    octopus.toogleAdmin();
    $("#cat-name").val(octopus.getCurrentCat().name);
    $("#cat-img-url").val(octopus.getCurrentCat().img);
    $("#cat-clk").val(octopus.getCurrentCat().clickCount);
  }
};

$(document).ready(function() {
  octopus.init();
});
