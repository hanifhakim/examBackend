const router = require('express').Router()
const conn = require('../connection/connection')


//CREATE movies (ADD)
router.post('/movies/add', async(req,res)=>{
    const data = req.body
    const sql = `INSERT INTO movies SET ?`
    const sql2 = `SELECT * from movies`

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        conn.query(sql2, (err, result)=>{
            if(err) return res.send(err)

            return res.send(result)
        })
    })
})

//UPDATE MOVIES (EDIT)
router.patch('/movies/edit/:movie_id', async(req, res)=>{
    const data = req.body
    const {movie_id} = req.params
    const sql = `UPDATE movies SET ? WHERE id=${movie_id}`

    conn.query(sql, data, (err, result)=>{
        if (err) return res.send(err)

        return res.send(result)
    })
})

//DELETE MOVIES
router.delete('/movies/delete/:movie_id', async(req, res)=>{
    const {movie_id} = req.params
    const sql = `DELETE FROM movies WHERE id in (${movie_id})`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        return res.send(result)
    })
})

//GET ALL MOVIES (SHOW)
router.get('/movies', async(req, res)=>{
    const sql = `SELECT * FROM movies`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        return res.send(result)
    })
})

//CREATE CATEGORIES (ADD)
router.post('/categories/add', async(req,res)=>{
    const data = req.body
    const sql = `INSERT INTO categories SET ?`
    const sql2 = `SELECT * from categories`

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        conn.query(sql2, (err, result)=>{
            if(err) return res.send(err)

            return res.send(result)
        })
    })
})

//UPDATE CATEGORIES (EDIT)
router.patch('/categories/edit/:category_id', async(req, res)=>{
    const data = req.body
    const {category_id} = req.params
    // console.log(req.params.category_id);
    
    const sql = `UPDATE categories SET ? WHERE id=${category_id}`

    conn.query(sql, data, (err, result)=>{
        if (err) return res.send(err)

        return res.send(result)
    })
})

//DELETE CATEGORIES
router.delete('/categories/delete/:category_id', async(req, res)=>{
    const {category_id} = req.params
    const sql = `DELETE FROM categories WHERE id in (${category_id})`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        return res.send(result)
    })
})

//GET ALL CATEGORIES (SHOW)
router.get('/categories', async(req, res)=>{
    const sql = `SELECT * FROM categories`

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        return res.send(result)
    })
})

//CREATE CONNECTION (ADD)
router.post('/connection/add', async(req,res)=>{
    const data = req.body
    const sql = `INSERT INTO movcat SET ?`
    const sql2 = `SELECT m.nama AS nama_film, c.nama AS nama_kategori
                FROM movies m 
                JOIN movcat mo ON m.id = mo.movie_id
                JOIN categories c ON c.id = mo.category_id`

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err)

        conn.query(sql2, (err, result)=>{
            if(err) return res.send(err)
 
            return res.send(result)
        })
        
    })
})

//DELETE CONNECTION
router.delete('/connection/delete/:movie_id/:category_id', async(req, res)=>{
    const {movie_id, category_id} = req.params
    const sql = `DELETE FROM movcat WHERE movie_id = ${movie_id} AND
                category_id = ${category_id}`
    

    conn.query(sql, (err, result)=>{
        if(err) return res.send(err)

        return res.send(result)
        
    })
})
module.exports = router

