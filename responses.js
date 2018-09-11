exports.defaultResponseNotRegistered = (client, replyToken) => {
    let defaultResp = {
        type: 'template',
        altText: 'Buttons alt text',
        template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: 'CEPAT 2019',
            text: 'Anda belum terdaftar, daftar untuk melanjutkan',
            actions: [
                { label: 'Daftarkan Saya!', type: 'message', text: 'JOIN' },
                { label: 'Tentang program ini', type: 'uri', uri: 'http://178.128.211.90' }
            ],
        },
    }
    return client.replyMessage(replyToken, defaultResp);
}


exports.defaultResponseRegistered = (client, replyToken, nama) => {
    let resp = {
        type: 'template',
        altText: 'Buttons alt text',
        template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: 'CEPAT 2019',
            text: 'Halo ' + nama,
            actions: [
                { label: 'Tentang program ini', type: 'uri', uri: 'http://178.128.211.90' },
                { label: 'Laporkan', type: 'message', text: 'REPORT' }
            ],
        },
    }
    return client.replyMessage(replyToken, resp);
}



exports.sendProvinces = (client, replyToken, provinces) => {
    let templates = [];
    for (let i = 0; i < provinces.length; i++) {
        let prov = {
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: provinces[i]['name'],
            text: provinces[i]['id_ext'],
            actions: [
                { label: 'PILIH PROVINSI', type: 'message', text: "PROVINSI_" + provinces[i]['id_ext'] }
            ],
        }
        templates.push(prov)
    }

    let resp = {
        type: 'template',
        altText: 'Carousel alt text',
        template: {
            type: 'carousel',
            columns: templates,
        },
    }
    return client.replyMessage(replyToken, resp);
}




exports.sendKabs = (client, replyToken, kabs) => {
    let templates = [];
    for (let i = 0; i < kabs.length; i++) {
        let prov = {
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: kabs[i]['name'],
            text: kabs[i]['id_ext'],
            actions: [
                { label: 'PILIH KABUPATEN/KOTA', type: 'message', text: "KABKOT_" + kabs[i]['id_ext'] }
            ],
        }
        templates.push(prov)
    }

    let resp = {
        type: 'template',
        altText: 'Carousel alt text',
        template: {
            type: 'carousel',
            columns: templates,
        },
    }
    return client.replyMessage(replyToken, resp);
}



exports.sendKecs = (client, replyToken, kecs) => {
    let templates = [];
    for (let i = 0; i < kecs.length; i++) {
        let prov = {
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: kecs[i]['name'],
            text: kecs[i]['id_ext'],
            actions: [
                { label: 'PILIH KECAMATAN', type: 'message', text: "KECAMATAN_" + kecs[i]['id_ext'] }
            ],
        }
        templates.push(prov)
    }

    let resp = {
        type: 'template',
        altText: 'Carousel alt text',
        template: {
            type: 'carousel',
            columns: templates,
        },
    }
    return client.replyMessage(replyToken, resp);
}




exports.sendKeldes = (client, replyToken, kels) => {
    let templates = [];
    for (let i = 0; i < kels.length; i++) {
        let prov = {
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: kels[i]['name'],
            text: kels[i]['id_ext'],
            actions: [
                { label: 'PILIH KELURAHAN/DESA', type: 'message', text: "KELDES_" + kels[i]['id_ext'] }
            ],
        }
        templates.push(prov)
    }

    let resp = {
        type: 'template',
        altText: 'Carousel alt text',
        template: {
            type: 'carousel',
            columns: templates,
        },
    }
    return client.replyMessage(replyToken, resp);
}




exports.sendTpss = (client, replyToken, tps) => {
    let templates = [];
    for (let i = 0; i < tps.length; i++) {
        let prov = {
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: tps[i]['name'],
            text: tps[i]['id'],
            actions: [
                { label: 'PILIH TPS INI', type: 'message', text: "TPS_" + tps[i]['id'] }
            ],
        }
        templates.push(prov)
    }

    let resp = {
        type: 'template',
        altText: 'Carousel alt text',
        template: {
            type: 'carousel',
            columns: templates,
        },
    }
    return client.replyMessage(replyToken, resp);
}




exports.reponseMenuDaftar = (client, replyToken) => {
    const daftarResponse = {
        type: "text",
        text: "Untuk mendaftar, silahkan isi data diri dengan format berikut: "
            + "\nDAFTAR (enter)"
            + "\nNama_Lengkap (enter)"
            + "\nAlamat_Anda (enter)"
            + "\nNomor_Telepon (enter)"
            + "\n"
            + "\nContoh:"
            + "\nDAFTAR"
            + "\nHendra Permana"
            + "\nBuah batu, kabupaten Bandung"
            + "\n081311415274"
    };
    return client.replyMessage(replyToken, daftarResponse);
}





exports.reponseSuksesDaftar = (client, replyToken) => {
    const daftarResponse = {
        type: "text",
        text: "Pendaftaran berhasil."
    };
    return client.replyMessage(replyToken, daftarResponse);
}


exports.reponseJoin = (client, replyToken) => {
    const daftarResponse = {
        type: "text",
        text: "Halo, selamat datang di CEPAT 2019, Silahkan ketik MENU untuk melihat fitur"
    };
    return client.replyMessage(replyToken, daftarResponse);
}



exports.tpsAction = (client, replyToken, details) => {
    let resp = {
        type: 'template',
        altText: 'Buttons alt text',
        template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://optinmonster.com/wp-content/uploads/2016/01/High-Converting-Places-to-Add-Email-Signup-Forms.png',
            title: 'INPUT DATA',
            text: details['id_tps'],
            actions: [
                {
                    label: 'Detail TPS',
                    type: 'message',
                    text: "INFO:\nID TPS: " + details['id_tps'] + "\nDetil TPS yang akan Anda input datanya saat ini adalah: " + details['name'] + " (" + details['kel'] + " - " + details['kec'] + " - " + details['kab'] + " - " + details['prov'] + ")"
                },
                { label: 'Rekap suara', type: 'uri', uri: 'https://pastebin.com/raw/J8MgH781' },
                { label: 'Pilih lokasi data', type: 'uri', uri: "line://nv/location" },
                { label: 'Pilih foto C1', type: 'uri', uri: "line://nv/cameraRoll/single" }
            ],
        },
    }
    return client.replyMessage(replyToken, resp);
}
