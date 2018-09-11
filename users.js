exports.checkUser = (pool, lineID) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "SELECT * FROM data_diri WHERE id_line ='" + lineID + "'";
                client.query(query, (err, res) => {
                    if (err) {
                        reject(err)
                        client.release();
                    } else {
                        let users = res['rows']
                        if (users.length > 0) {
                            resolve(users[0])
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


exports.insertUser = (pool, lineID, namaLengkap, alamat, phone) => {
    return new Promise((resolve, reject) => {
        pool.connect()
            .then(client => {
                let query = "INSERT INTO data_diri (id, fullname, address, phone, id_line) VALUES ('" + lineID + "', '" + namaLengkap + "', '" + alamat + "', '" + phone + "', '" + lineID + "')";
                client.query(query, (err, res) => {
                    if (err) {
                        client.release()
                        reject(err)
                    } else {
                        client.release()
                        resolve(true)
                    }
                })
            }).catch(e => {
                client.release()
                console.log(err.stack)
            })
    })
}
