/*global define*/
define(function (require) {
    "use strict";
    var Backbone = require("backbone");
    return Backbone.View.extend({
        el: ".experience_bar_view",
        initialize: function () {
            this.updateExperienceBar();
            this.listenTo(this.model, "change:experience", this.updateExperienceBar);
            //this.el.querySelector(".player_name").innerText = this.model.get("name");
            //this.el.querySelector(".player_kills").innerText = this.model.get("killed");
        },
        updateExperienceBar: function () {
            var experienceBar = this.el.querySelector(".player_experience_bar"),
                xpForCurrentLevel = this.model.getExperienceForLevel(this.model.get("level") - 1),
                xpForNextLevel = this.model.getExperienceForLevel(this.model.get("level")),
                percentage = (this.model.get("experience") - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel),
                transitionEndCallback = function () {
                    experienceBar.removeEventListener("transitionend", transitionEndCallback, false);
                    experienceBar.classList.remove("animate");
                    experienceBar.style.width = "0%";
                    (function () { return experienceBar.offsetHeight; }());
                    experienceBar.classList.add("animate");
                    experienceBar.style.width = (percentage * 100) + "%";
                };

            this.el.querySelector(".player_experience_bar_text").textContent = this.model.get("experience") + " / " + xpForNextLevel;

            if (this.model.hasChanged("level")) {
                experienceBar.style.width = "100%";
                experienceBar.addEventListener("transitionend", transitionEndCallback, false);
            } else {
                experienceBar.style.width = (percentage * 100) + "%";
            }
        }
    });
});
