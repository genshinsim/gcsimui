/*
  export let data = {
    frame: 0,
    msg: "title goes here",
    raw: "",
    event: "",
    char: "",
    color: "bg-gray-600",
    icon: "circle",
    amount: 0,
    target: "",
  };
  //array by frame
  [
    {
        f: number
        slots: [][]data
        active: number (index)
    }
  ]
*/

export function parseLog(active, team, log) {
  //find initial active char
  let activeIndex = team.findIndex((e) => e === active);
  activeIndex++;

  let result = [];
  let slots = [[], [], [], [], []];

  let lastFrame = -1;

  //split the logs by new line
  const lines = log.split(/\r?\n/);

  lines.forEach((line) => {
    //parse json
    const d = JSON.parse(line);

    //if no frame then set frame to -1
    if (!("frame" in d)) {
      d.frame = -1;
    }

    //if no event then set event to sim
    if (!("event" in d)) {
      d.event = "sim";
      return;
    }

    //shift char index down by 1 (b/c index 0 is sim stuff)
    let index = 0;
    if ("char" in d) {
      index = d.char + 1;
    }

    //check if frame changed; if so append stuff
    if (d.frame !== lastFrame) {
      result.push({
        f: lastFrame,
        slots: slots,
        active: activeIndex,
      });
      //reset
      lastFrame = d.frame;
      slots = [];
      for (var i = 0; i <= team.length; i++) {
        slots.push([]);
      }
    }

    //parse the data
    let e = {
      frame: d.frame,
      msg: d.M,
      raw: JSON.stringify(JSON.parse(v), null, 2),
      event: d.event,
      char: d.char,
      color: "",
      icon: "circle",
      amount: 0,
      target: "",
    };

    //set icon/color etc... based one vent
    switch (e.event) {
      case "damage":
        x.M +=
          " [" +
          Math.round(d.damage)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          "]";
        let extra = "";
        if (d.amp && d.amp !== "") {
          extra += d.amp;
        }
        if (d.crit) {
          extra += " crit";
        }
        if (extra !== "") {
          x.M += " (" + extra.trim() + ")";
        }

        x.Icon = IconNames.FLAME;
        x.Intent = "primary";
        x.Amount = d.damage;
        x.Right = d.target;
        break;
      case "action":
        if (d.M.includes("executed") && d.action === "swap") {
          current = names.findIndex((e) => e === d.target);
          current++;
          x.M += " to " + d.target;
        }
        x.Icon = IconNames.PLAY;
        break;
      case "element":
        switch (d.M) {
          case "expired":
            x.M = d.old_ele + " expired";
            break;
          case "application":
            x.M =
              d.applied_ele +
              " applied" +
              (d.existing_ele === "" ? "" : " to " + d.existing_ele);
            break;
          case "refreshed":
            x.M = d.ele + " refreshed";
            break;
          default:
            x.M = d.M;
        }

        x.Icon = IconNames.FLASH;
        x.Intent = "warning";
        x.Right = d.target;
        break;
      case "energy":
        if (x.M.includes("particle")) {
          x.M =
            d.M +
            " from " +
            d.source +
            ", next: " +
            Math.round(d["post_recovery"]);
        }
        x.Icon = IconNames.IMPORT;
        x.Intent = "success";
        break;
      case "calc":
        x.Icon = IconNames.CALCULATOR;
        x.Right = d.target;
        break;
      case "character":
        x.Icon = IconNames.PERSON;
        break;
      case "snapshot":
        x.Icon = IconNames.CAMERA;
        break;
      case "snapshot_mods":
        x.Icon = IconNames.BUILD;
        break;
      case "heal":
        x.Icon = IconNames.HEART;
        break;
      case "hurt":
        x.Icon = IconNames.VIRUS;
        break;
      case "queue":
        x.Icon = IconNames.ADD_TO_ARTIFACT;
        break;
      case "shield":
        x.Icon = IconNames.SHIELD;
        break;
      case "hook":
        x.Icon = IconNames.PAPERCLIP;
        break;
      case "icd":
        x.Icon = IconNames.STOPWATCH;
        break;
      case "construct":
        x.Icon = IconNames.WRENCH;
        break;
      default:
        e.msg = e.event + ": " + e.msg;
    }

    //add it to slots
    slots[e.char].push(e);
  });

  return result;
}
