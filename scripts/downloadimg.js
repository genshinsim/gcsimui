
import fs from "fs";
import axios from "axios"
import genshindb from "genshin-db";
import path from "path"

const download_image = (url, image_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => resolve())
                    .on('error', e => reject(e));
            }),
    ).catch(e => console.log(e));



const chars = genshindb.characters("names", { matchCategories: true });

chars.forEach((char) => {
    const x = genshindb.characters(char);

    let filename = "./static/images/avatar/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + ".png"

    download_image(x.images.icon, filename).then(msg => {
        console.log('done downloading to file: ', filename);
    }).catch(e => {
        console.log(e)
    })

    //download cons
    let cons = genshindb.constellations(char)

    if (!cons) {
        console.log(char)
        console.log(cons)
        return
    }

    for (let i = 1; i <= 6; i++) {
        filename = `./static/images/avatar/cons/${x.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}_c${i}.png`
        download_image(cons.images["c" + i], filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

});

const weapons = genshindb.weapons("names", { matchCategories: true });

weapons.forEach((e) => {
    const x = genshindb.weapons(e);

    let filename = "./static/images/weapons/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + ".png"

    download_image(x.images.icon, filename).then(msg => {
        console.log('done downloading to file: ', filename);
    }).catch(e => {
        console.log(e)
    })
});

const sets = genshindb.artifacts("4", { matchCategories: true });

sets.forEach((e) => {
    const x = genshindb.artifacts(e);
    let filename;
    for (const [key, value] of Object.entries(x.images)) {
        console.log(`${key}: ${value}`);
        filename = `./static/images/artifacts/${x.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}_${key}.png`
        download_image(value, filename).then(() => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

});