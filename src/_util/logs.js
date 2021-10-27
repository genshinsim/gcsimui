
export function eventColor(eve) {
    switch (eve) {
        case "procs":
            return "";
        case "damage":
            return "#2563EB";
        case "hurt":
            return "";
        case "heal":
            return "";
        case "calc":
            return "#9D174D";
        case "reaction":
            return "";
        case "element":
            return "#3F60A6";
        case "snapshot":
            return "#6366F1";
        case "snapshot_mods":
            return "#818CF8";
        case "status":
            return "";
        case "action":
            return "#AB5F45";
        case "queue":
            return "";
        case "energy":
            return "#036345";
        case "character":
            return "";
        case "enemy":
            return "";
        case "hook":
            return "";
        case "sim":
            return "";
        case "task":
            return "";
        case "artifact":
            return "";
        case "weapon":
            return "";
        case "shield":
            return "";
        case "construct":
            return "";
        case "icd":
            return "";
        default:
            return "gray-500";
    }
}

export function parseLog(active, team, log) {
    console.log("parsing log");
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
        let d = {};
        try {
            d = JSON.parse(line);
        } catch (e) {
            console.log("error reading line: ", line);
            console.log(e);
            return;
        }

        //if no frame then set frame to -1
        if (!("frame" in d)) {
            d.frame = -1;
        }

        //if no event then set event to sim
        if (!("event" in d)) {
            d.event = "sim";
        }

        //shift char index down by 1 (b/c index 0 is sim stuff)
        let index = 0;
        if ("char" in d) {
            index = d.char + 1;
        } else {
            d.char = 0;
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
            raw: JSON.stringify(JSON.parse(line), null, 2),
            event: d.event,
            char: d.char,
            color: eventColor(d.event),
            icon: "circle",
            amount: 0,
            target: "",
        };

        if (e.color === "") {
            e.color = "#6B7280";
        }

        //set icon/color etc... based one vent
        switch (e.event) {
            case "damage":
                e.msg +=
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
                    e.msg += " (" + extra.trim() + ")";
                }

                e.icon = "local_fire_department";
                e.amount = d.damage;
                e.target = d.target;
                break;
            case "action":
                if (d.M.includes("executed") && d.action === "swap") {
                    activeIndex = team.findIndex((e) => e === d.target) + 1;
                    e.msg += " to " + d.target;
                }
                e.icon = "play_arrow";
                break;
            case "element":
                switch (d.M) {
                    case "expired":
                        e.msg = d.old_ele + " expired";
                        break;
                    case "application":
                        e.msg =
                            d.applied_ele +
                            " applied" +
                            (d.existing_ele === "" ? "" : " to " + d.existing_ele);
                        break;
                    case "refreshed":
                        e.msg = d.ele + " refreshed";
                        break;
                    default:
                        e.msg = d.M;
                }

                e.icon = "bolt";
                e.target = d.target;
                break;
            case "energy":
                if (e.msg.includes("particle")) {
                    e.msg =
                        d.M +
                        " from " +
                        d.source +
                        ", next: " +
                        Math.round(d["post_recovery"]);
                }
                e.icon = "local_cafe";
                break;
            case "calc":
                e.icon = "calculate";
                e.target = d.target;

                break;
            case "character":
                e.icon = "person";
                break;
            case "snapshot":
                e.icon = "photo_camera";
                break;
            case "snapshot_mods":
                e.icon = "build";
                break;
            case "heal":
                e.icon = "healing";
                break;
            case "hurt":
                e.icon = "coronavirus";
                break;
            case "queue":
                e.icon = "queue";
                break;
            case "shield":
                e.icon = "shield";
                break;
            case "hook":
                e.icon = "attachment";
                break;
            case "icd":
                e.icon = "timer";
                break;
            case "construct":
                e.icon = "apartment";
                break;
            default:
                e.msg = e.event + ": " + e.msg;
        }

        //add it to slots
        // console.log(slots);
        // console.log(e.char);
        // console.log(d);
        slots[index].push(e);
    });

    console.log(result);

    return result;
}
