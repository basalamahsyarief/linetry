exports.getAllProvince = (pool) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM province";
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let provinces = res['rows']
                        if (provinces.length > 0) {
                            resolve(provinces)
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}


exports.getKabkot = (pool, idProv) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM kabupaten WHERE id_ext LIKE '" + idProv + "%'";
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let kabs = res['rows']
                        if (kabs.length > 0) {
                            resolve(kabs)
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}




exports.getKec = (pool, idkec) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM kecamatan WHERE id_ext LIKE '" + idkec + "%'";
                console.log(query)
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let kecs = res['rows']
                        if (kecs.length > 0) {
                            resolve(kecs)
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}




exports.getKeldes = (pool, idkel) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM kelurahan WHERE id_ext LIKE '" + idkel + "%'";
                console.log(query)
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let kels = res['rows']
                        if (kels.length > 0) {
                            resolve(kels)
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}



exports.getTps = (pool, idkel) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM tps WHERE id LIKE '" + idkel + "%'";
                console.log(query)
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let tps = res['rows']
                        if (tps.length > 0) {
                            resolve(tps)
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}


exports.tpsname = (pool, idtps, nameTps) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = idtps.split("-");
            let idprov = data[0]
            let idKab = data[1]
            let idkec = data[2]
            let idkel = data[3]
            let client = await pool.connect();
            let namaProv = await client.query("SELECT * FROM province WHERE id_ext = '" + idprov + "'")
            namaProv = namaProv['rows'][0]['name']
            console.log(idprov, namaProv)
            let namaKab = await client.query("SELECT * FROM kabupaten WHERE id_ext = '" + idprov + "-" + idKab + "'")
            namaKab = namaKab['rows'][0]['name']
            console.log(idKab, namaKab)
            let namaKec = await client.query("SELECT * FROM kecamatan WHERE id_ext = '" + idprov + "-" + idKab + "-" + idkec + "'")
            namaKec = namaKec['rows'][0]['name']
            console.log(idkec, namaKec)
            let namaKel = await client.query("SELECT * FROM kelurahan WHERE id_ext = '" + idprov + "-" + idKab + "-" + idkec + "-" + idkel + "'")
            namaKel = namaKel['rows'][0]['name']
            console.log(idkel, namaKel)
            let det = {
                id_tps: idtps,
                prov: namaProv,
                kab: namaKab,
                kec: namaKec,
                kel: namaKel,
                name: nameTps
            }
            client.release();
            resolve(det)
        } catch (error) {
            reject(error)
        }
    })
}


exports.tpsdetail = (pool, idtps) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM tps WHERE id = '" + idtps + "'";
                console.log(query)
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let tps = res['rows']
                        if (tps.length > 0) {
                            resolve(tps[0])
                            client.release();
                        } else {
                            resolve(false)
                            client.release();
                        }
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}