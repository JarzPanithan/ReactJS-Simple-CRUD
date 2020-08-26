const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "reactjs_demo"
});

connection.connect((error)=> {
    if (error) {
        console.log("Cannot connect to database!!");
    } else {
        console.log("Successfully connect to database!!");
    }
});

app.get("/", (request, response)=> {
    response.send("Server 4000 is working!!");
})

app.get("/products", (request, response)=> {
    const SELECT_FROM_PRODUCTS_QUERY = `SELECT * FROM products`;
    connection.query(SELECT_FROM_PRODUCTS_QUERY, (error, results)=> {
        if (error) {
            console.log("Cannot get products: " + error);
            response.send("Cannot get products!!");
        } else {
            console.log("Successfully get products!!");
            response.json({data: results});
        }
    });
});

app.get("/products/find", (request, response)=> {
    const { id } = request.query;
    const SELECT_FROM_PRODUCTS_QUERY = `SELECT * FROM products WHERE id=${id}`;
    connection.query(SELECT_FROM_PRODUCTS_QUERY, (error, results)=> {
        if (error) {
            console.log("Cannot find product: " + error);
            response.send("Cannot find product!!");
        } else {
            console.log("Successfully find product");
            response.json({data: results});
        }
    })
});

app.get("/products/add", (request, response)=> {
    const { name, price, developer, publisher, date } = request.query;
    const INSERT_INTO_PRODUCTS_QUERY = `INSERT INTO products (name, price, developer, publisher, date)
                                        VALUES("${name}", ${price}, "${developer}", "${publisher}", "${date}")`;
    connection.query(INSERT_INTO_PRODUCTS_QUERY, (error, results)=> {
        if (error) {
            console.log("Cannot add product: " + error);
            response.send("Cannot add product!!");
        } else {
            console.log("Successfully add product: " + JSON.stringify(results));
            response.send("Successfully add product!!");
        }
    });
});

app.get("/products/update", (request, response)=> {
    const { id, name, price, developer, publisher, date } = request.query;
    const UPDATE_PRODUCTS_QUERY = `UPDATE products SET name="${name}", price=${price}, developer="${developer}",
                                    publisher="${publisher}", date="${date}" WHERE id=${id}`;
    connection.query(UPDATE_PRODUCTS_QUERY, (error, results)=> {
        if (error) {
            console.log("Cannot update product: " + error);
            response.send("Cannot update product!!");
        } else {
            console.log("Successfully update product: " + JSON.stringify(results));
            response.send("Successfully update product!!");
        }
    });
});

app.get("/products/delete", (request, response)=> {
    const { id } = request.query;
    const DELETE_FROM_PRODUCTS_QUERY = `DELETE FROM products WHERE id=${id}`;
    connection.query(DELETE_FROM_PRODUCTS_QUERY, (error, results)=> {
        if (error) {
            console.log("Cannot delete product: " + error);
            response.send("Cannot delete product!!");
        } else {
            console.log("Successfully delete product: " + JSON.stringify(results));
            response.send("Succesfully delete product!!");
        }
    });
});

app.listen(4000, ()=>{
    console.log("Server 4000 is connection!!");
});