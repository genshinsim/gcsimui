
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
    );



const chars = genshindb.characters("names", { matchCategories: true });

chars.forEach((e) => {
    const x = genshindb.characters(e);

    let filename = "./static/images/avatar/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + ".png"

    download_image(x.images.icon, filename).then(msg => {

        console.log('done downloading to file: ', filename);

    }).catch(e => {
        console.log(e)
    })
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

    let filename = "./static/images/artifacts/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + "_flower.png"
    let url = x.images.flower
    if (url) {
        download_image(url, filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

    filename = "./static/images/artifacts/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + "_plume.png"
    url = x.images.plume
    if (url) {
        download_image(url, filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

    filename = "./static/images/artifacts/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + "_sands.png"
    url = x.images.sands
    if (url) {
        download_image(url, filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

    filename = "./static/images/artifacts/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + "_goblet.png"
    url = x.images.goblet
    if (url) {
        download_image(url, filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

    filename = "./static/images/artifacts/" + x.name.replace(/[^0-9a-z]/gi, "").toLowerCase() + "_circlet.png"
    url = x.images.circlet
    if (url) {
        download_image(url, filename).then(msg => {
            console.log('done downloading to file: ', filename);
        }).catch(e => {
            console.log(e)
        })
    }

});