new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    heal_up_limit: 3,
    game_is_on: false,
    disabled_heal: false,
    logs: [],
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      var point = Math.ceil(Math.random() * 10);
      this.monster_heal = this.monster_heal - point;
      this.add_to_log({ turn: "p", text: "OYUNCUNUN ATAĞI (" + point + ")" });
      this.monster_attack();
    },
    special_attack: function () {
      var point = Math.ceil(Math.random() * 25);
      this.monster_heal = this.monster_heal - point;
      this.add_to_log({ turn: "p", text: "OYUNCUNUN ATAĞI (" + point + ")" });
      this.monster_attack();
    },
    heal_up: function () {
      var point = Math.ceil(Math.random() * 20);
      this.player_heal = this.player_heal + point;
      this.add_to_log({ turn: "p", text: "İLK YARDIM (" + point + ")" });
      this.monster_attack();
    },
    heal_up_limited: function () {
      this.heal_up_limit--;
    },
    give_up: function () {
      this.player_heal = 0;
      this.add_to_log({ turn: "p", text: "OYUNCU PES ETTİ" });
    },
    monster_attack: function () {
      var point = Math.ceil(Math.random() * 15);
      this.player_heal = this.player_heal - point;
      this.add_to_log({
        turn: "m",
        text: "CANAVARIN ATAĞI ATAĞI (" + point + ")",
      });
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_heal: function (value) {
      if (value <= 0) {
        this.player_heal = 0;

        if (confirm("OYUNU KAYBETTİN TEKRAR DENEMEK İSTER MİSİN?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },
    monster_heal: function (value) {
      if (value <= 0) {
        this.monster_heal = 0;

        if (confirm("OYUNU KAZANDIN TEKRAR DENEMEK İSTER MİSİN?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      }
    },
    heal_up_limit: function (value) {
      console.log(value);
      if (value <= 0) {
        console.log("xdxd");
        this.heal_up_limit = 0;
        this.disabled_heal = true;
      }
    },
  },
  computed: {
    user_progress: function () {
      return {
        width: this.player_heal + "%",
      };
    },
    monster_progress: function () {
      return {
        width: this.monster_heal + "%",
      };
    },
  },
});
